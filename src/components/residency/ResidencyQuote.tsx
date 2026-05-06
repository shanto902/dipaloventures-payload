import React from 'react'

export function ResidencyQuote() {
  return (
    <section>
      <main className=" py-8 overflow-hidden border-y border-neutral-100">
        <div className="container mx-auto px-5 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Decorative Quote Mark */}
              <div className="absolute -top-12 -left-8 text-[12rem] font-serif text-amber-400/10 select-none pointer-events-none italic">
                “
              </div>

              <blockquote className="relative z-10">
                <p className="text-3xl md:text-5xl  font-semibold text-neutral-900 leading-[1.1] tracking-tight italic">
                  "There's a tremendous amount of{' '}
                  <span className="text-amber-500">craftsmanship</span> in between a great idea and
                  a great product."
                </p>

                <footer className="mt-8 flex items-center justify-end gap-6">
                  <div className="h-px w-12 bg-amber-400" />
                  <div className="flex flex-col gap-1">
                    <cite className="not-italic text-sm md:text-base font-semibold text-neutral-900">
                      Steve Jobs
                    </cite>
                    <span className="font-mono text-xs uppercase tracking-widest text-neutral-600 font-bold">
                      WWDC, 1997
                    </span>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}
