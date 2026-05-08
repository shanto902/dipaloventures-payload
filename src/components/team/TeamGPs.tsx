'use client'
import React, { useState } from 'react'
import { team, orgs, type TeamMember, type OrgLink } from '@/lib/demo'
import { InitialsAvatar, focalFor, PHOTO_FILTER } from './TeamHelpers'

function GPCard({ m }: { m: TeamMember & { orgLinks?: OrgLink[] } }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const links = m.orgLinks || orgs[m.name] || []
  const allLinks: OrgLink[] = [{ label: 'LinkedIn', href: m.linkedin }, ...links]

  return (
    <article className="group relative bg-white border border-neutral-100 rounded-4xl p-6 flex flex-col sm:flex-row gap-6 lg:gap-8 transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900/5 hover:-translate-y-1">
      {/* Small Portrait Artifact */}
      <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-50 shadow-inner">
        {m.photo ? (
          <img
            src={m.photo}
            alt={m.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
            style={{ filter: PHOTO_FILTER }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-neutral-50 to-neutral-100">
            <InitialsAvatar name={m.name} />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-neutral-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Profile Intelligence */}
      <div className="flex-1 flex flex-col min-w-0">
        <h3 className="text-xl font-semibold text-neutral-900 tracking-tight leading-tight mb-1 ">
          {m.name}
        </h3>
        <div className="font-mono uppercase  text-xs tracking-[0.2em] text-neutral-600 font-bold">
          {m.role} · {m.location}
        </div>

        <div className="mt-3 relative">
          <p
            className={`text-sm text-neutral-600 leading-relaxed font-light ${!isExpanded ? 'line-clamp-3' : ''}`}
          >
            {m.bio}
          </p>
          {m.bio && m.bio.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 font-mono text-[10px] uppercase tracking-widest font-bold text-[#ffb012] hover:text-neutral-900 transition-colors"
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </button>
          )}
        </div>

        <div className="mt-auto pt-4 flex gap-4 font-mono  text-xs uppercase tracking-[0.2em] font-bold">
          {allLinks.slice(0, 2).map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-600 hover:text-[#ffb012] transition-colors flex items-center gap-1 group/link"
            >
              <span>{l.label}</span>
              <span className="opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export function TeamGPs({ members }: { members?: TeamMember[] }) {
  const displayTeam = members || team.filter((m) => m.category === 'gp')

  return (
    <section className="relative px-5 md:px-12 pb-8 overflow-hidden bg-[#fcfbf9]">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className=" text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] font-bold">
            Partnership Board
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {displayTeam.map((m) => (
            <GPCard key={m.name} m={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
