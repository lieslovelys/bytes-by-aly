import { asc } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import { messages, projects, skills } from './db/schema'

// Best-effort per-isolate protection, not globally coordinated.
const attempts = new Map<string, { count: number; expires: number }>()
const headers = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}
const json = (body: unknown, status = 200) => Response.json(body, {
  status, headers: { ...headers, 'Cache-Control': 'no-store' },
})
export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url)
    if (url.pathname !== '/api' && !url.pathname.startsWith('/api/')) {
      const response = await env.ASSETS.fetch(request)
      const secured = new Response(response.body, response)
      Object.entries(headers).forEach(([key, value]) => secured.headers.set(key, value))
      return secured
    }
    try {
      const db = drizzle(env.DB)
      if (request.method === 'GET' && url.pathname === '/api/projects') {
        return json(await db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id)))
      }
      if (request.method === 'GET' && url.pathname === '/api/skills') {
        return json(await db.select().from(skills).orderBy(asc(skills.sortOrder), asc(skills.id)))
      }
      if (request.method !== 'POST' || url.pathname !== '/api/contact') return json({ error: 'Not found.' }, 404)
      if (request.headers.get('Origin') && request.headers.get('Origin') !== url.origin) return json({ error: 'Request rejected.' }, 403)
      const now = Date.now()
      for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key)
      const ip = request.headers.get('CF-Connecting-IP') ?? 'local'
      const limit = attempts.get(ip) ?? { count: 0, expires: now + 60_000 }
      if (limit.count >= 5 || (!attempts.has(ip) && attempts.size >= 10_000)) return json({ error: 'Too many requests. Please try again later.' }, 429)
      limit.count++
      attempts.set(ip, limit)
      if (!request.headers.get('Content-Type')?.includes('application/json')) return json({ error: 'Expected JSON.' }, 415)
      const reader = request.body?.getReader()
      if (!reader) return json({ error: 'Invalid input.' }, 400)
      let text = ''
      let size = 0
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > 16_384) {
          await reader.cancel()
          return json({ error: 'Request too large.' }, 413)
        }
        text += decoder.decode(value, { stream: true })
      }
      text += decoder.decode()
      let input: unknown
      try { input = JSON.parse(text) } catch { return json({ error: 'Invalid input.' }, 400) }
      if (!input || typeof input !== 'object') return json({ error: 'Invalid input.' }, 400)
      const body = input as Record<string, unknown>
      if (body.website !== undefined && body.website !== '') return json({ error: 'Request rejected.' }, 400)
      const name = typeof body.name === 'string' ? body.name.trim() : ''
      const email = typeof body.email === 'string' ? body.email.trim() : ''
      const message = typeof body.message === 'string' ? body.message.trim() : ''
      if (!name || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 2000) return json({ error: 'Check your name, email, and message.' }, 400)
      await db.insert(messages).values({ name, email, message })
      return json({ success: true }, 201)
    } catch { return json({ error: 'Something went wrong. Please try again later.' }, 500) }
  },
} satisfies ExportedHandler<Env>
