import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logoImg from '@/assets/dipalo-logo.png'

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <Link href="/" className="inline-block transition-transform hover:scale-105">
      <Image
        src={logoImg}
        alt="Dipalo Ventures"
        height={size}
        className="w-auto"
        style={{ height: size }}
      />
    </Link>
  )
}
