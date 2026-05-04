'use client'

import React, { useState } from 'react'
import { sendContactEmail } from './actions'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    try {
      const result = await sendContactEmail(formData)
      if (result.success) {
        setStatus('success')
        ;(e.target as HTMLFormElement).reset()
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="relative group p-8 md:p-12 bg-white border border-neutral-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-neutral-900/5 transition-all duration-700 overflow-hidden">
      {/* Blueprint Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative">
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex items-center justify-between">
            <div className="font-mono   text-xs uppercase tracking-[0.4em] text-amber-400 font-bold">
              Inquiry Terminal · Active
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-amber-400/30" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
            Submit Technical Inquiry
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="font-mono   text-xs uppercase tracking-widest text-neutral-400 font-bold ml-1"
              >
                Operator Name
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-6 py-4 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white transition-all duration-300 font-light"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-mono   text-xs uppercase tracking-widest text-neutral-400 font-bold ml-1"
              >
                Transmission Endpoint
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-6 py-4 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white transition-all duration-300 font-light"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="font-mono   text-xs uppercase tracking-widest text-neutral-400 font-bold ml-1"
            >
              Subject Header
            </label>
            <input
              required
              type="text"
              name="subject"
              id="subject"
              placeholder="Primary Inquiry Topic"
              className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-6 py-4 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white transition-all duration-300 font-light"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="font-mono   text-xs uppercase tracking-widest text-neutral-400 font-bold ml-1"
            >
              Transmission Content
            </label>
            <textarea
              required
              name="message"
              id="message"
              rows={5}
              placeholder="Technical Brief..."
              className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white transition-all duration-300 font-light resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="group relative w-full inline-flex items-center justify-center gap-3 bg-neutral-900 text-white py-5 rounded-2xl font-mono text-xs uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all duration-500 overflow-hidden disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-linear-to-r from-amber-400/20 via-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {status === 'sending' ? (
              <span className="animate-pulse">Transmitting...</span>
            ) : status === 'success' ? (
              <span className="text-amber-400">Transmission Complete ✓</span>
            ) : status === 'error' ? (
              <span className="text-red-400">Transmission Failed</span>
            ) : (
              <>
                <span>Submit Inquiry</span>
                <span className="text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                  ↗
                </span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-neutral-50 flex flex-col items-center gap-4">
          <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-neutral-300 font-bold">
            Encryption Status: Active · Node: CHI_HUB_01
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-1 h-px bg-neutral-100" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
