import React from 'react'
import { ArrowUpRight, Award } from 'lucide-react'

export interface CompanyItem {
  id: string
  name: string
  logo?: string
  link?: string
  exit?: boolean
  isInactive?: boolean
}

export function CompanyCard({ company }: { company: CompanyItem }) {
  const cardContent = (
    <div className="relative w-full aspect-square bg-white border border-neutral-100 rounded-2xl p-5 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/5 hover:-translate-y-1 animate-fadeIn group">
      {/* Link indicator */}
      {company.link && (
        <div className="absolute top-3 right-3 text-neutral-300 group-hover:text-[#ffb012] transition-colors pointer-events-none">
          <ArrowUpRight size={14} />
        </div>
      )}

      {/* Main Focus: Centered Logo */}
      <div className="flex-1 w-full flex items-center justify-center p-2">
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            className="object-contain aspect-square transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="font-mono text-sm font-bold text-neutral-400 uppercase tracking-widest text-center select-none">
            {company.name}
          </span>
        )}
      </div>

      {/* Footer Info */}
      <div className="w-full flex items-center justify-between gap-2 pt-3 border-t border-neutral-50 mt-auto">
        <span className="text-xs font-semibold text-neutral-800 truncate">{company.name}</span>

        <div className="flex gap-1 shrink-0">
          {company.isInactive && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider bg-neutral-100 text-neutral-500 border border-neutral-200">
              Inactive
            </span>
          )}
          {company.exit && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wider bg-amber-50 text-green-600 border border-green-100">
              <Award size={8} /> Exit
            </span>
          )}
        </div>
      </div>
    </div>
  )

  if (company.link) {
    return (
      <a
        href={company.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        {cardContent}
      </a>
    )
  }

  return cardContent
}
