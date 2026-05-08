import React from 'react'

export const TeamEtymologyDossier = () => (
  <div className="bg-white border border-neutral-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow duration-500 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffb012]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
    <div className="font-mono text-base md:text-lg uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold flex items-center gap-2">
      <span>[ DI · PA · LO ]</span>
      <div className="h-px flex-1 bg-[#ffb012]/10" />
    </div>
    <ol className="space-y-4">
      {[
        <React.Fragment key="1">
          Bangla, the modern South Asian language, is rooted in Sanskrit.
        </React.Fragment>,
        <React.Fragment key="2">
          <span className="text-neutral-900 font-medium italic text-lg">Pra-dip</span> — meaning
          &quot;light, lantern&quot;
        </React.Fragment>,
        <React.Fragment key="3">
          <span className="text-neutral-900 font-medium italic text-lg">Alo</span> — meaning
          &quot;light&quot;
        </React.Fragment>,
      ].map((content, i) => (
        <li key={i} className="flex gap-6 text-base text-neutral-600 italic font-light">
          <span>{content}</span>
        </li>
      ))}
    </ol>
  </div>
)
