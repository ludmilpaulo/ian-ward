'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      message: String(fd.get('message') || ''),
    }

    try {
      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api'
      const res = await fetch(`${base}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to send message')
      setStatus('success')
      e.currentTarget.reset()
    } catch (err: any) {
      setStatus('error')
      setError(err?.message || 'Something went wrong')
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl grid gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input name="name" required className="w-full rounded-md border px-3 py-2" placeholder="Your name" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input name="email" type="email" required className="w-full rounded-md border px-3 py-2" placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea name="message" rows={5} required className="w-full rounded-md border px-3 py-2" placeholder="How can Ian help?" />
      </div>
      <div className="flex items-center gap-3">
        <button disabled={status === 'loading'} className="rounded-md bg-blue-700 text-white px-5 py-2">
          {status === 'loading' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'success' && <span className="text-green-700 text-sm">Sent! Ian will get back to you.</span>}
        {status === 'error' && <span className="text-red-600 text-sm">{error}</span>}
      </div>
    </form>
  )
}
