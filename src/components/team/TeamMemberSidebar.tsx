import React from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

export interface AffiliationItem {
  label: string
  href: string
}

interface TeamMemberSidebarProps {
  name: string
  photoUrl?: string
  category: string
  location?: string | null
  linkedin?: string | null
  orgLinks?: AffiliationItem[] | null
}

export function TeamMemberSidebar({
  name,
  photoUrl,
  category,
  location,
  linkedin,
  orgLinks,
}: TeamMemberSidebarProps) {
  const categoryLabels = {
    gp: 'General Partner',
    vp: 'Venture Partner',
    advisor: 'Advisor',
  }

  const categoryLabel = categoryLabels[category as keyof typeof categoryLabels] || category

  return (
    <div className="lg:col-span-2 flex flex-col items-center lg:items-start">
      {/* Portrait Photo */}
      <div className="relative w-full max-w-[280px] aspect-square rounded-3xl overflow-hidden bg-neutral-50 border border-neutral-100 shadow-md group">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-1000"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-neutral-50 to-neutral-100 text-3xl font-bold text-[#ffb012] uppercase font-mono">
            {name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
        )}
      </div>

      {/* Details Under Photo */}
      <div className="mt-6 w-full text-center lg:text-left space-y-3">
        <div>
          <span className="font-mono uppercase text-xs tracking-[0.2em] text-[#ffb012] font-bold">
            {categoryLabel}
          </span>
          {location && <p className="text-sm text-neutral-600 font-light mt-0.5">{location}</p>}
        </div>

        {linkedin && (
          <div className="pt-1">
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-700 hover:text-[#ffb012] transition-colors border-b border-neutral-200 pb-0.5"
            >
              LinkedIn <ArrowUpRight size={12} />
            </a>
          </div>
        )}

        {orgLinks && orgLinks.length > 0 && (
          <div className="pt-3 border-t border-neutral-100 space-y-2">
            <p className="font-mono uppercase text-[10px] tracking-widest text-neutral-400 font-bold">
              Affiliations
            </p>
            <div className="flex flex-col gap-1.5">
              {orgLinks.map((l, idx) => (
                <a
                  key={idx}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-600 hover:text-[#ffb012] transition-colors inline-flex items-center gap-1 w-fit mx-auto lg:mx-0"
                >
                  {l.label} <ExternalLink size={12} className="opacity-60" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
