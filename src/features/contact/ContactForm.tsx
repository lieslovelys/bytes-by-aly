import { useState } from 'react'
import type { FormEvent } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 2000) {
      setStatus('error'); setFeedback('Enter a name (up to 100 characters), valid email, and message (up to 2000 characters).'); return
    }
    setStatus('submitting'); setFeedback('Sending your message…')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, website: data.get('website') }),
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success'); setFeedback('Thanks! Your message has been saved.'); form.reset()
    } catch { setStatus('error'); setFeedback('Unable to send. Please try again later or email me directly.') }
  }
  const fieldClass = 'mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 text-ink'
  return <form onSubmit={submit} className="mt-10 grid max-w-2xl gap-5" aria-busy={status === 'submitting'}>
    <label className="text-sm font-medium" htmlFor="contact-name">Name
      <input id="contact-name" name="name" autoComplete="name" required maxLength={100} className={fieldClass} />
    </label>
    <label className="text-sm font-medium" htmlFor="contact-email">Email
      <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} />
    </label>
    <label className="text-sm font-medium" htmlFor="contact-message">Message
      <textarea id="contact-message" name="message" required maxLength={2000} rows={5} className={fieldClass} />
    </label>
    <div className="hidden" aria-hidden="true"><label htmlFor="contact-website">Leave this blank</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <button disabled={status === 'submitting'} className="w-fit rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast hover:bg-accent-hover disabled:opacity-60">{status === 'submitting' ? 'Sending…' : 'Send message'}</button>
    <p role="status" aria-live="polite" className="text-sm text-muted">{feedback}</p>
  </form>
}
