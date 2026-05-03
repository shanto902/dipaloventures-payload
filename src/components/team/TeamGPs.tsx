import React from 'react'
import { team, orgs, type TeamMember, type OrgLink } from '@/lib/demo'
import { InitialsAvatar, focalFor, PHOTO_FILTER } from './TeamHelpers'

function GPCard({ m }: { m: TeamMember & { orgLinks?: OrgLink[] } }) {
  const links = m.orgLinks || orgs[m.name] || []
  const allLinks: OrgLink[] = [{ label: 'LinkedIn', href: m.linkedin }, ...links]

  return (
    <article className="flex flex-col md:flex-row bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative bg-neutral-100 shrink-0 w-full md:w-[160px] lg:w-[220px] h-[240px] md:h-auto">
        {m.photo ? (
          <img
            src={m.photo}
            alt={m.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: PHOTO_FILTER }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <InitialsAvatar name={m.name} />
          </div>
        )}
      </div>
      <div className="flex flex-col p-6 lg:p-8 min-w-0 flex-1">
        <div className="font-serif text-2xl text-neutral-900 leading-tight font-medium">
          {m.name}
        </div>
        <div className="mt-2 font-mono uppercase text-sm tracking-[0.2em] text-amber-400 font-bold">
          {m.role} · {m.location}
        </div>
        <p className="mt-4 text-base text-neutral-600 leading-relaxed line-clamp-4 lg:line-clamp-none">
          {m.bio}
        </p>
        <div className="mt-6 sm:mt-auto pt-4 font-mono text-sm text-neutral-400 font-bold border-t border-neutral-100">
          {allLinks.map((l, i) => (
            <span key={l.label}>
              {i > 0 && <span className="text-neutral-300 mx-2">·</span>}
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 hover:text-amber-700 hover:underline transition-colors"
              >
                {l.label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function TeamGPs({ members }: { members?: TeamMember[] }) {
  // If members are provided (from Payload), use them as is.
  // Otherwise, filter the demo team for anyone categorized as 'gp'.
  const displayTeam = members || team.filter((m) => m.category === 'gp')

  return (
    <section className="container mx-auto px-4 pt-12 pb-6">
      <div className="bg-[#FFF8EE] border border-[#E8D9B8] rounded-[14px] p-6 md:p-10">
        <div className="font-mono uppercase mb-6 text-base tracking-[0.22em] text-amber-400 font-bold">
          General Partners
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayTeam.map((m) => (
            <GPCard key={m.name} m={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
