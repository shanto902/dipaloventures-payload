'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate API call for now
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success('Successfully subscribed to Letters from the Hard Side.')
    setEmail('')
    setLoading(false)
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-sm">
      <input
        required
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-white border border-neutral-200 rounded-full pl-6 pr-28 py-4 text-sm text-neutral-900 outline-none focus:border-amber-400/50 transition-all placeholder:text-neutral-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-amber-400 text-black hover:text-white text-xs font-mono uppercase tracking-widest font-bold rounded-full hover:bg-neutral-900 transition-all disabled:opacity-50"
      >
        {loading ? '...' : 'Join'}
      </button>
    </form>
  )
}
