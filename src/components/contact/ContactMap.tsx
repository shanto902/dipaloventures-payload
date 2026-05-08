'use client'

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom Technical HQ Icon
const HQIcon = L.divIcon({
  className: 'custom-hq-marker',
  html: `
    <div class="relative flex items-center justify-center">
      <div class="absolute w-10 h-10 bg-[#ffb012]/20 rounded-full animate-ping"></div>
      <div class="relative w-10 h-10 bg-[#ffb012] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,176,18,0.4)] border-2 border-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
        </svg>
      </div>
      <div class="absolute -bottom-1 w-2 h-2 bg-[#ffb012] rotate-45 border-r-2 border-b-2 border-white"></div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

const CHICAGO_HQ: [number, number] = [41.8867, -87.6676]

export default function ContactMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-full bg-neutral-100 animate-pulse" />

  return (
    <div className="w-full h-full relative isolate">
      <MapContainer
        center={CHICAGO_HQ}
        zoom={15}
        scrollWheelZoom={false} // Prevents scroll wheel from zooming
        dragging={true} // Allows dragging/panning
        zoomControl={true} // Keeps +/- buttons working
        className="w-full h-full"
        style={{ background: '#fcfbf9' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={CHICAGO_HQ} icon={HQIcon}>
          <Popup>
            <div className="font-mono text-[10px] uppercase tracking-widest text-center text-neutral-900 font-bold flex flex-col gap-2">
              <div>Dipalo Ventures <br /> Chicago</div>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=mHUB+Chicago" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#ffb012] hover:text-neutral-900 transition-colors"
              >
                [ Get Directions ↗ ]
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
