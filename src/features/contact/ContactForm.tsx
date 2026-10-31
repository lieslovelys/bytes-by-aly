import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send } from 'lucide-react'

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
  const fieldClass = 'field'
  return <form onSubmit={submit} className="space-y-[var(--item-gap)]" aria-busy={status === 'submitting'} aria-describedby="contact-feedback">
    <label className="block text-sm font-medium" htmlFor="contact-name">Name
      <input id="contact-name" name="name" type="text" inputMode="text" enterKeyHint="next" autoComplete="name" placeholder="Your name" required maxLength={100} className={fieldClass} />
    </label>
    <label className="block text-sm font-medium" htmlFor="contact-email">Email
      <input id="contact-email" name="email" type="email" inputMode="email" enterKeyHint="next" autoComplete="email" placeholder="you@example.com" required maxLength={254} className={fieldClass} />
    </label>
    <label className="block text-sm font-medium" htmlFor="contact-message">Message
      <textarea id="contact-message" name="message" autoComplete="off" enterKeyHint="enter" placeholder="Tell me about your opportunity or project…" required maxLength={2000} rows={5} className={`${fieldClass} resize-y`} />
    </label>
    <div className="hidden" aria-hidden="true"><label htmlFor="contact-website">Leave this blank</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <div>
      <button disabled={status === 'submitting'} className="button w-full sm:w-auto">
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
      <p id="contact-feedback" role="status" aria-live="polite" data-status={status} className="feedback mt-3 text-sm text-muted">{feedback}</p>
    </div>
  </form>
}
