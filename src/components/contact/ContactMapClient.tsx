'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Leaflet map component with SSR disabled
// This must be done within a Client Component ('use client')
const ContactMap = dynamic(() => import('./ContactMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-neutral-50 animate-pulse" />,
})

export function ContactMapClient() {
  return <ContactMap />
}
