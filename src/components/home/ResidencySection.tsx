import { residencyTags } from '@/lib/demo'
import { AnimatedLink } from '@/components/ui/AnimatedLink'

export function ResidencySection() {
  return (
    <section className="bg-[#fcfbf9] px-5 md:px-12 py-8 border-y border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-center">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm group">
            {/* Architectural Placeholder Visual */}
            <div className="absolute inset-0 bg-linear-to-br from-neutral-100 to-white flex flex-col items-center justify-center p-12 text-center">
              <div className="w-16 h-16 rounded-full border border-[#ffb012]/20 flex items-center justify-center mb-6 relative">
                <div className="w-2 h-2 bg-[#ffb012] rounded-full animate-pulse" />
                <div className="absolute inset-0 rounded-full border border-[#ffb012]/10 scale-150 animate-ping" />
              </div>
              <div className="  italic text-2xl text-neutral-600">Technical Residency</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#ffb012] mb-6 font-bold">
              The Residency
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              Better selection, <br />
              <span className="italic text-[#ffb012]">lower failure rates.</span>
            </h2>
            <p className="mt-6 md:mt-8 text-base md:text-lg text-neutral-800 leading-relaxed font-light">
              The Dipalo Ventures Residency is a technical diligence and audit program that
              identifies and mitigates gaps in product design and engineering. It provides technical
              evaluations, workshops, mentorship, and specific design and engineering support before
              we invest and long after.
            </p>

            <div className="mt-10">
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-600 font-bold mb-6">
                What we embed with you
              </div>
              <div className="flex flex-wrap gap-2">
                {residencyTags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-medium px-4 py-1.5 rounded-full border border-neutral-200 text-neutral-500 hover:border-[#ffb012] hover:text-[#ffb012] transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <AnimatedLink href="/residency">Explore the Residency</AnimatedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
