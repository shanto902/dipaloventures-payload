import React from 'react'

export function MediaHero() {
  return (
    <header className="pt-24 pb-12 md:pt-32 md:pb-16 bg-[#F5F0E8] border-b border-[#d4c9b0]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="font-mono uppercase text-sm tracking-[0.2em] text-amber-400 font-bold mb-4">
              Dipalo Ventures · Media
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-[1.1] font-medium">
              Stories from the <span className="italic">hard side.</span>
            </h1>
          </div>

          <nav className="flex flex-wrap gap-2 md:mb-2">
            {[
              { id: 'video', label: 'Video' },
              { id: 'instagram', label: 'Instagram' },
              { id: 'blog', label: 'Blog' },
            ].map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="px-4 py-2 bg-white border border-[#d4c9b0] rounded-full font-mono text-xs uppercase tracking-wider text-neutral-500 hover:border-amber-400 hover:text-amber-400 transition-all font-bold"
              >
                {p.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
