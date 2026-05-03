import React from 'react'
import { team, orgs, type TeamMember, type OrgLink } from '@/lib/demo'
import { InitialsAvatar, focalFor, PHOTO_FILTER } from './TeamHelpers'

function SupportingCard({ m }: { m: TeamMember }) {
  const links = orgs[m.name] ?? []
  const allLinks: OrgLink[] = [{ label: 'LinkedIn', href: m.linkedin }, ...links]

  return (
    <article className="flex flex-col h-full bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
      <div
        className="relative bg-neutral-100 overflow-hidden mx-auto"
        style={{ width: 64, height: 64, borderRadius: '50%' }}
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
      <div className="mt-5 text-center text-base font-semibold text-neutral-900 leading-tight">
        {m.name}
      </div>
      <div className="mt-1.5 text-center font-mono uppercase text-sm tracking-[0.16em] text-neutral-500 font-bold">
        {m.role}
      </div>
      <p className="mt-3.5 text-base text-neutral-600 leading-relaxed text-center">{m.bio}</p>
      <div className="mt-auto pt-5 text-center font-mono text-sm text-amber-600 font-bold">
        {allLinks.map((l, i) => (
          <span key={l.label}>
            {i > 0 && <span className="text-neutral-400 mx-1.5">·</span>}
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
    </article>
  )
}

export function TeamVPs() {
  return (
    <section className="container mx-auto px-4 pt-6 pb-12">
      <div className="font-mono uppercase mb-5 text-base tracking-[0.22em] text-neutral-500 font-bold">
        Venture Partners & Platform
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        {team
          .filter((m) => m.name !== 'Rafiq Ahmed' && m.name !== 'Mitul Patel')
          .map((m) => (
            <SupportingCard key={m.name} m={m} />
          ))}
      </div>
    </section>
  )
}
