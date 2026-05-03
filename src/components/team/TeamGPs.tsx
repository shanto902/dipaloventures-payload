import React from 'react'
import { team, orgs, type TeamMember, type OrgLink } from '@/lib/demo'
import { InitialsAvatar, focalFor, PHOTO_FILTER } from './TeamHelpers'

function GPCard({ m }: { m: TeamMember }) {
  const links = orgs[m.name] ?? []
  const allLinks: OrgLink[] = [{ label: 'LinkedIn', href: m.linkedin }, ...links]

  return (
    <article className="flex gap-6 bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
      <div
        className="relative bg-neutral-100 overflow-hidden shrink-0"
        style={{ width: 110, height: 140, borderRadius: 8 }}
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
      <div className="flex flex-col min-w-0 flex-1">
        <div className="font-serif text-xl text-neutral-900 leading-tight font-medium">
          {m.name}
        </div>
        <div className="mt-1.5 font-mono uppercase text-sm tracking-[0.18em] text-neutral-500 font-bold">
          {m.role} · {m.location}
        </div>
        <p className="mt-3.5 text-base text-neutral-600 leading-relaxed">{m.bio}</p>
        <div className="mt-auto pt-3 font-mono text-sm text-amber-600 font-bold">
          {allLinks.map((l, i) => (
            <span key={l.label}>
              {i > 0 && <span className="text-neutral-400 mx-2">·</span>}
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-amber-700 transition-colors"
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

export function TeamGPs() {
  return (
    <section className="container mx-auto px-4 pt-12 pb-6">
      <div className="bg-[#FFF8EE] border border-[#E8D9B8] rounded-[14px] p-6 md:p-10">
        <div className="font-mono uppercase mb-6 text-base tracking-[0.22em] text-amber-600 font-bold">
          General Partners
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {team
            .filter((m) => m.name === 'Rafiq Ahmed' || m.name === 'Mitul Patel')
            .map((m) => (
              <GPCard key={m.name} m={m} />
            ))}
        </div>
      </div>
    </section>
  )
}
