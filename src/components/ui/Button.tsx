import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
  showArrow?: boolean
}

export function Button({
  href,
  label,
  variant = 'primary',
  className,
  showArrow = true,
}: ButtonProps) {
  const isPrimary = variant === 'primary'

  return (
    <Link
      href={href}
      className={cn(
        'group relative inline-flex items-center gap-4 px-10 py-5 rounded-full overflow-hidden transition-all duration-500',
        isPrimary
          ? 'bg-neutral-900 text-white hover:shadow-2xl hover:shadow-amber-400/20'
          : 'bg-white border border-neutral-200 text-neutral-900 hover:border-neutral-900',
        className
      )}
    >
      {/* Hover Background Slide Effect */}
      <div
        className={cn(
          'absolute inset-0 transition-transform duration-500 translate-y-full group-hover:translate-y-0',
          isPrimary ? 'bg-amber-400' : 'bg-neutral-900'
        )}
      />

      {/* Label */}
      <span
        className={cn(
          'relative z-10 font-mono text-xs uppercase tracking-[0.2em] font-bold transition-colors duration-500',
          isPrimary ? 'group-hover:text-neutral-900' : 'group-hover:text-white'
        )}
      >
        {label}
      </span>

      {/* Arrow */}
      {showArrow && (
        <span
          className={cn(
            'relative z-10 transition-all duration-500 group-hover:translate-x-2',
            isPrimary ? 'group-hover:text-neutral-900' : 'group-hover:text-white'
          )}
        >
          →
        </span>
      )}
    </Link>
  )
}
