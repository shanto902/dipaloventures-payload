import React from 'react'
import { team, orgs, type TeamMember, type OrgLink } from '@/lib/demo'
import { InitialsAvatar, focalFor, PHOTO_FILTER } from './TeamHelpers'

function SupportingCard({ m }: { m: TeamMember & { orgLinks?: OrgLink[] } }) {
  const links = m.orgLinks || orgs[m.name] || []
  const allLinks: OrgLink[] = [{ label: 'LinkedIn', href: m.linkedin }, ...links]

  return (
    <article className="group relative bg-white border border-neutral-100 rounded-3xl p-6 flex flex-col h-full transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900/5 hover:-translate-y-1">
      <div className="flex items-center gap-5 mb-5">
        {/* Small Portrait Artifact */}
        <div className="relative shrink-0 w-16 h-16 rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-50 shadow-inner">
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
        </div>

        <div className="min-w-0">
          <h4 className="text-lg font-semibold text-neutral-900 tracking-tight leading-tight group-hover:text-[#ffb012] transition-colors">
            {m.name}
          </h4>
          <div className="mt-1 font-mono uppercase  text-xs tracking-[0.2em] text-[#ffb012] font-bold">
            {m.role}
          </div>
        </div>
      </div>

      <p className="text-sm text-neutral-500 leading-relaxed font-light line-clamp-3 mb-6">
        {m.bio}
      </p>

      <div className="mt-auto pt-4 border-t border-neutral-50 flex gap-4 font-mono  text-xs uppercase tracking-[0.2em] font-bold">
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
    </article>
  )
}

export function TeamVPs({ members }: { members?: TeamMember[] }) {
  const displayTeam = members || team.filter((m) => m.category === 'vp')

  return (
    <section className="px-5 md:px-12">
      <section className="relative py-8 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffb012] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <div className=" text-base font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
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
