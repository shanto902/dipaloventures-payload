'use client'

import React, { useState } from 'react'
import { toast } from 'sonner'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('You have been subscribed to Dipaloventures Letters')
        setEmail('')
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      toast.error('Network error. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-sm">
      <input
        required
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-white border border-neutral-200 rounded-full pl-6 pr-28 py-4 text-sm text-neutral-900 outline-none focus:border-[#ffb012]/50 transition-all placeholder:text-neutral-600"
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#ffb012] text-black hover:text-white text-xs font-mono uppercase tracking-widest font-bold rounded-full hover:bg-neutral-900 transition-all disabled:opacity-50 min-w-[80px]"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
        ) : (
          'Join'
        )}
      </button>
    </form>
  )
}
