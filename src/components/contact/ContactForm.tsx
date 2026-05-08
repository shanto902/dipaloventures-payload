'use client'

import React, { useState } from 'react'
import { sendContactEmail } from './actions'

type InquiryType = 'founder' | 'investor' | 'general'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [inquiryType, setInquiryType] = useState<InquiryType>('general')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    formData.append('inquiryType', inquiryType)

    try {
      const result = await sendContactEmail(formData)
      if (result.success) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="bg-[#fcfbf9] rounded-4xl md:p-8 relative overflow-hidden group">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 flex flex-col gap-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <input
              required
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full bg-white border border-neutral-200/60 rounded-xl px-6 py-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#ffb012] shadow-sm transition-all duration-300 font-light"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full bg-white border border-neutral-200/60 rounded-xl px-6 py-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#ffb012] shadow-sm transition-all duration-300 font-light"
            />
            <input
              type="text"
              name="company"
              placeholder="Company (optional)"
              className="w-full bg-white border border-neutral-200/60 rounded-xl px-6 py-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#ffb012] shadow-sm transition-all duration-300 font-light"
            />
          </div>

          {/* Inquiry Type Toggles */}
          <div className="flex flex-wrap gap-2 pt-2 p-1 bg-white/50 rounded-full border border-neutral-100">
            {(['general', 'founder', 'investor'] as InquiryType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setInquiryType(type)}
                className={`
                  flex-1 min-w-[100px] py-3 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300
                  ${
                    inquiryType === type
                      ? 'bg-[#ffb012] text-black shadow-lg'
                      : 'text-neutral-400 hover:text-neutral-600'
                  }
                `}
              >
                {type}
              </button>
            ))}
          </div>

          <textarea
            required
            name="message"
            rows={5}
            placeholder="Your message..."
            className="w-full bg-white border border-neutral-200/60 rounded-2xl px-6 py-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#ffb012] shadow-sm transition-all duration-300 font-light resize-none"
          />

          <div className="pt-4 flex flex-col gap-6">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="group relative w-full bg-neutral-900 text-white py-5 rounded-full font-mono text-xs uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all duration-500 overflow-hidden disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#ffb012]/10 via-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {status === 'sending' ? (
                <span className="animate-pulse">Sending Message...</span>
              ) : status === 'success' ? (
                <span className="text-[#ffb012]">Message Sent ✓</span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  Send Message
                  <span className="text-neutral-600 group-hover:text-[#ffb012] transition-colors">
                    →
                  </span>
                </span>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 opacity-50">
              <div className="h-px flex-1 bg-neutral-200" />
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 font-bold">
                Privacy Protected · End-to-End
              </p>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
