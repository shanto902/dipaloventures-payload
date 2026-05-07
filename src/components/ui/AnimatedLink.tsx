import React from 'react'
import Link from 'next/link'

interface AnimatedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function AnimatedLink({ href, children, className = '' }: AnimatedLinkProps) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-900 font-bold hover:text-[#ffb012] transition-all duration-300 ${className}`}
    >
      <span>{children}</span>
      <span className="h-px w-8 bg-neutral-200 group-hover:bg-[#ffb012] group-hover:w-14 transition-all duration-500" />
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </Link>
  )
}
