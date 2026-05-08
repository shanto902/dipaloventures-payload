'use client'

import React, { useState } from 'react'
import { team, orgs, type TeamMember, type OrgLink } from '@/lib/demo'
import { InitialsAvatar, focalFor, PHOTO_FILTER } from './TeamHelpers'

function SupportingCard({ m }: { m: TeamMember & { orgLinks?: OrgLink[] } }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const links = m.orgLinks || orgs[m.name] || []
  const allLinks: OrgLink[] = [{ label: 'LinkedIn', href: m.linkedin }, ...links]

  return (
    <article className="group flex flex-col bg-[#fcfbf9]  border border-neutral-100 p-6 rounded-3xl transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900/5">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative shrink-0 w-16 h-16 rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-50 shadow-inner">
          {m.photo ? (
            <img
              src={m.photo}
              alt={m.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              style={{ filter: PHOTO_FILTER }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-neutral-50 to-neutral-100">
              <InitialsAvatar name={m.name} />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="text-lg font-semibold text-neutral-900 tracking-tight leading-tight transition-colors">
            {m.name}
          </h4>
          <div className="mt-1 font-mono uppercase text-xs tracking-[0.2em] text-[#ffb012] font-bold">
            {m.role}
          </div>
        </div>
      </div>

      <div className="relative mb-6">
        <p
          className={`text-sm text-neutral-600 leading-relaxed font-light ${
            !isExpanded ? 'line-clamp-3' : ''
          }`}
        >
          {m.bio}
        </p>
        {m.bio && m.bio.length > 120 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 font-mono text-[10px] uppercase tracking-widest font-bold text-[#ffb012] hover:text-neutral-900 transition-colors cursor-pointer"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      <div className="mt-auto  border-t border-neutral-50 flex gap-4 font-mono text-xs uppercase tracking-[0.2em] font-bold">
        {allLinks.slice(0, 2).map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-[#ffb012] transition-colors"
          >
            {l.label}
          </a>
        ))}
      </div>
    </article>
  )
}

export function TeamVPs({ members }: { members?: TeamMember[] }) {
  const displayTeam = members || team.filter((m) => m.category === 'vp')

  return (
    <section className="px-5 md:px-12">
      <section className="relative py-8 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className=" text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] font-bold">
              Venture Partners & Platform
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {displayTeam.map((m) => (
              <SupportingCard key={m.name} m={m} />
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}
