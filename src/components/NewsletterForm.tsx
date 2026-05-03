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
    <form onSubmit={onSubmit} className="relative max-w-sm">
      <input
        required
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-white border border-neutral-200 rounded-full pl-5 pr-28 py-3 text-base outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10 transition-all placeholder:text-neutral-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-1 top-1 bottom-1 px-6 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors disabled:opacity-50"
      >
        {loading ? 'Joining...' : 'Join →'}
      </button>
    </form>
  )
}
