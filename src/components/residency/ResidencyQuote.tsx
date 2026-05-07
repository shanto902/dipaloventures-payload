import React from 'react'

export function ResidencyQuote() {
  return (
    <section className="bg-[#fcfbf9] border-y border-neutral-100">
      <div className="container mx-auto px-6 md:px-12 py-8">
        <div className="max-w-5xl mx-auto items-center">
          {/* Quote Block */}
          <div className="relative">
            <div className="absolute -top-16 -left-8 text-[12rem] font-serif text-[#ffb012]/10 select-none pointer-events-none italic">
              “
            </div>

            <blockquote className="relative z-10">
              <p className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight italic">
                &quot;There&apos;s a tremendous amount of{' '}
                <span className="text-[#ffb012]">craftsmanship </span> in between a great idea and a
                great product.&quot;
              </p>

              <footer className=" flex items-center gap-6 justify-end">
                <div className="h-px w-12 bg-[#ffb012]" />
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
    </section>
  )
}
