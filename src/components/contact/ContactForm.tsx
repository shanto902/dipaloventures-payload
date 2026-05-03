'use client'

import React, { useState } from 'react'
import { z } from 'zod'
import { toast } from 'sonner'
import { submitContactForm } from './actions'

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email required').max(255),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  type: z.enum(['founder', 'investor', 'general']),
  message: z.string().trim().min(10, 'Tell us a bit more (10+ chars)').max(5000),
})

const inputCls =
  'w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-sm text-neutral-900 outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all placeholder:text-neutral-400'

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    type: 'founder' as 'founder' | 'investor' | 'general',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = schema.safeParse(form)
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Please check the form')
      return
    }
    setLoading(true)

    const result = await submitContactForm(parsed.data)
    setLoading(false)

    if (result.success) {
      setDone(true)
      toast.success("Thanks — we'll be in touch shortly.")
    } else {
      toast.error(result.error || 'Failed to send message. Please try again.')
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
      <div className="font-mono uppercase text-neutral-500 mb-4 text-xs tracking-[0.2em] font-bold">
        Quick form
      </div>

      {done ? (
        <div className="flex-1 flex items-center justify-center text-center min-h-[300px]">
          <div>
            <div className="font-serif text-3xl text-neutral-900 font-medium">Thank you.</div>
            <p className="mt-3 text-neutral-600 text-base leading-relaxed">
              Your message is in. Expect a thoughtful reply within a few business days.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex-1 flex flex-col gap-3.5">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
          <input
            required
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls}
          />
          <input
            placeholder="Company (optional)"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={inputCls}
          />
          <div className="flex gap-2">
            {(
              [
                ['founder', 'Founder'],
                ['investor', 'Investor'],
                ['general', 'Hello'],
              ] as const
            ).map(([val, label]) => {
              const active = form.type === val
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm({ ...form, type: val })}
                  className="flex-1 transition-all"
                  style={{
                    fontSize: '13px',
                    padding: '10px 12px',
                    borderRadius: '999px',
                    border: active ? '1px solid #1a1a1a' : '1px solid #e5e5e5',
                    background: active ? '#1a1a1a' : 'transparent',
                    color: active ? '#ffffff' : '#737373',
                    fontWeight: active ? 500 : 400,
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
          <textarea
            required
            rows={5}
            placeholder="Your message..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputCls}
            style={{ resize: 'none', flex: 1, minHeight: '140px' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full transition-all disabled:opacity-60 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full py-3.5 text-base font-medium mt-1"
          >
            {loading ? 'Sending…' : 'Send message →'}
          </button>
          <p className="text-center text-neutral-400 text-sm mt-2 font-medium">
            We never share your information
          </p>
        </form>
      )}
    </div>
  )
}
