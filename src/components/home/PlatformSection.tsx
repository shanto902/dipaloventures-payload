import React from 'react'

export function PlatformSection() {
  const locations = [
    {
      label: 'Chicago · HQ',
      body: "Our operational home since 2020. Based at mHUB, the nation's largest hard tech incubator — at the center of Midwest deep tech deal flow.",
    },
    {
      label: 'Lisbon · EU',
      body: 'Raquel Lourenço leads our European hub, supporting portfolio companies entering EU markets and building partnerships across the continent.',
    },
    {
      label: 'Gulf · GCC',
      body: 'Rezwan Shafique anchors our Gulf presence — connecting portfolio companies to GCC capital and regional partners across the Middle East.',
    },
  ]

  return (
    <section className="bg-[#fcfbf9] px-6 md:px-12 pb-16 md:pb-24 border-y border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="text-sm font-mono uppercase tracking-[0.2em] text-amber-400 mb-6 font-bold">
          Our Platform
        </div>
        <div className="grid md:grid-cols-3 gap-12 md:gap-0">
          {locations.map((c, i) => (
            <div
              key={c.label}
              className={`md:px-10 ${i !== 0 ? 'md:border-l md:border-neutral-200' : 'md:pl-0'}`}
            >
              <div className="text-2xl   italic text-neutral-900 mb-4">
                {c.label.split(' · ')[0]}
                <span className="inline-block mx-2 text-neutral-200 font-sans not-italic">·</span>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 not-italic align-middle">
                  {c.label.split(' · ')[1]}
                </span>
              </div>
              <p className="text-base text-neutral-600 leading-relaxed font-light">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
