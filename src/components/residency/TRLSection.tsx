import React from 'react'

const phases = [
  {
    name: 'DEPLOYMENT',
    color: '#ffb012',
    levels: [
      { id: 9, label: 'ACTUAL SYSTEM PROVEN IN OPERATIONAL ENVIRONMENT' },
      { id: 8, label: 'SYSTEM COMPLETE AND QUALIFIED' },
      { id: 7, label: 'SYSTEM PROTOTYPE DEMONSTRATION IN OPERATIONAL ENVIRONMENT' },
    ],
  },
  {
    name: 'DEVELOPMENT',
    color: '#f97316',
    levels: [
      { id: 6, label: 'TECHNOLOGY DEMONSTRATED IN RELEVANT ENVIRONMENT' },
      { id: 5, label: 'TECHNOLOGY VALIDATED IN RELEVANT ENVIRONMENT' },
      { id: 4, label: 'TECHNOLOGY VALIDATED IN LAB' },
    ],
  },
  {
    name: 'RESEARCH',
    color: '#8b5cf6',
    levels: [
      { id: 3, label: 'EXPERIMENTAL PROOF OF CONCEPT' },
      { id: 2, label: 'TECHNOLOGY CONCEPT FORMULATED' },
      { id: 1, label: 'BASIC PRINCIPLES OBSERVED' },
    ],
  },
]

export function TRLDiagram() {
  return (
    <div className="flex flex-col gap-8 md:gap-10">
      {phases.map((phase) => (
        <div key={phase.name} className="flex items-center gap-3 md:gap-6 group">
          {/* Left: Category Label */}
          <div
            className="w-20 md:w-32 font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] text-right shrink-0"
            style={{ color: phase.color }}
          >
            {phase.name}
          </div>

          {/* Middle: Bracket and Dot */}
          <div className="relative self-stretch w-4 flex items-center shrink-0">
            {/* The Bracket Line */}
            <div className="absolute inset-y-2 left-0 w-full border-y border-l border-neutral-200 rounded-l-lg" />
            {/* The Dot */}
            <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neutral-900 border-2 border-white z-10" />
          </div>

          {/* Right: Levels Stack */}
          <div className="flex-1 flex flex-col gap-2.5">
            {phase.levels.map((level) => (
              <div key={level.id} className="flex items-center gap-2 md:gap-3">
                {/* Connection Dot */}
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 group-hover:bg-neutral-900 transition-colors shrink-0" />

                {/* Level Card */}
                <div className="flex-1 flex items-center rounded-r-full rounded-l-md bg-[#f0f7ff]/40 border border-[#e0efff] hover:border-[#ffb012]/40 transition-all duration-300 overflow-hidden">
                  <div
                    className="w-9 h-9 flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{ backgroundColor: phase.color }}
                  >
                    {level.id}
                  </div>
                  <div className="px-3 md:px-4 py-2 text-[10px] md:text-xs font-bold font-mono tracking-wider text-neutral-800 leading-tight">
                    {level.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
