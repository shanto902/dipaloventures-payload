import React from 'react'
import { cn } from '@/lib/utils'

export function Monogram({ name, className }: { name: string; className?: string }) {
  const initial = name.trim()[0] ?? '·'
  return (
    <div
      className={cn(
        'h-full w-full bg-neutral-100 flex items-center justify-center rounded-md   text-3xl font-medium text-neutral-600',
        className,
      )}
    >
      {initial}
    </div>
  )
}
