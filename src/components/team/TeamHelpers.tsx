'use client'

import React, { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import type { TeamMember } from '@/lib/demo'
import { orgs } from '@/lib/demo'

export function trimBio(bio: string, maxSentences = 3) {
  const sentences = bio.match(/[^.!?]+[.!?]+/g)
  if (!sentences) return { short: bio, rest: '', hasMore: false }
  if (sentences.length <= maxSentences) {
    return { short: bio.trim(), rest: '', hasMore: false }
  }
  return {
    short: sentences.slice(0, maxSentences).join(' ').trim(),
    rest: sentences.slice(maxSentences).join(' ').trim(),
    hasMore: true,
  }
}

export function getInitials(name: string) {
  const parts = name
    .replace(/[^A-Za-z\s]/g, '')
    .trim()
    .split(/\s+/)
  if (parts.length === 0) return '·'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const faceOffset: Record<string, string> = {
  'Rafiq Ahmed': 'center top',
  'Mitul Patel': 'center top',
  'Rezwan Shafique': 'center top',
  'Larry Hayward': 'center top',
  'Monika Razdan': 'center top',
  'Raquel Lourenço': 'center top',
  'Greg Rublev': 'center top',
}

export function focalFor(name: string) {
  return faceOffset[name] ?? 'center top'
}

export const PHOTO_FILTER = 'brightness(1.02) contrast(1.02) saturate(0.96)'

export function InitialsAvatar({ name, className = '' }: { name: string; className?: string }) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
      style={{
        background: 'linear-gradient(135deg, oklch(0.78 0.10 60), oklch(0.62 0.13 35))',
      }}
      aria-label={name}
    >
      <span
        className="font-serif text-white select-none"
        style={{
          fontSize: 'clamp(2rem, 7cqw + 1rem, 4.5rem)',
          letterSpacing: '0.02em',
          lineHeight: 1,
          textShadow: '0 1px 2px rgba(0,0,0,0.18)',
        }}
      >
        {getInitials(name)}
      </span>
    </div>
  )
}

export function OrgPill({
  label,
  href,
  size = 'md',
}: {
  label: string
  href: string
  size?: 'md' | 'sm'
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1 border border-neutral-200 text-neutral-600 hover:text-amber-400 hover:border-amber-400 transition-colors ${
        size === 'sm' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1'
      } rounded-md`}
    >
      {label}
      <ArrowUpRight size={size === 'sm' ? 9 : 10} />
    </a>
  )
}

export function TeamCard({ m }: { m: TeamMember }) {
  const links = orgs[m.name] ?? []
  const { short, rest, hasMore } = trimBio(m.bio, 3)
  const [open, setOpen] = useState(false)

  return (
    <article className="border border-neutral-200 bg-white overflow-hidden flex flex-col h-full rounded-xl shadow-sm">
      <div
        className="relative bg-neutral-100 overflow-hidden w-full"
        style={{ aspectRatio: '1/1', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
      >
        {m.photo ? (
          <img
            src={m.photo}
            alt={m.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: focalFor(m.name), filter: PHOTO_FILTER }}
          />
        ) : (
          <InitialsAvatar name={m.name} />
        )}
      </div>

      <div className="flex flex-col flex-1 min-w-0 border-t border-neutral-200 p-5">
        <div className="text-base font-semibold text-neutral-900 leading-tight">{m.name}</div>
        <div className="mt-1.5 font-mono text-sm uppercase tracking-widest text-neutral-500 font-bold">
          {m.role} · {m.location}
        </div>
        <p className="mt-4 text-base text-neutral-600 leading-relaxed">
          {short}
          {hasMore && open && <span> {rest}</span>}
        </p>
        {hasMore && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-2.5 self-start inline-flex items-center gap-1 font-mono text-sm uppercase tracking-widest text-amber-400 hover:text-amber-700 transition-colors font-bold"
          >
            {open ? 'Read less' : 'Read more'}
            <ChevronDown
              size={12}
              className="transition-transform"
              style={{ transform: open ? 'rotate(180deg)' : 'none' }}
            />
          </button>
        )}

        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map((l) => (
              <OrgPill key={l.label} label={l.label} href={l.href} size="sm" />
            ))}
          </div>
        )}

        <div className="mt-auto pt-5">
          <div className="pt-4 border-t border-neutral-200">
            <a
              href={m.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-sm uppercase tracking-widest text-neutral-500 hover:text-amber-700 transition-colors font-bold"
            >
              <ArrowUpRight size={13} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
