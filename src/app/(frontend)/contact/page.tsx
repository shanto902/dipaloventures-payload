import React from 'react'
import { SiteLayout } from '@/components/SiteLayout'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactLeftColumn } from '@/components/contact/ContactLeftColumn'

export const metadata = {
  title: 'Contact | Dipalo Ventures',
  description: 'Connect with the firm. Submit technical inquiries and join the operator network.',
}

export default function ContactPage() {
  return (
    <div className="relative pt-5 md:pt-0 overflow-hidden bg-[#fcfbf9]">
      {/* Architectural Studio Tint */}
      <div className="absolute inset-0 bg-[#f7f0e6]/20 -z-10" />

      {/* High-Precision Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] -z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <SiteLayout>
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start mb-20 md:mb-32">
            {/* Inquiry Brief */}
            <div className="lg:col-span-5">
              <ContactLeftColumn />
            </div>

            {/* Inquiry Terminal */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          <div className="relative group overflow-hidden bg-white border border-neutral-100 rounded-[2rem] md:rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-neutral-900/5 transition-all duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Technical Map Interface */}
              <div className="lg:col-span-8 relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-neutral-900/5 z-10 pointer-events-none grayscale mix-blend-multiply opacity-20" />
                <iframe
                  title="Dipalo Ventures — Chicago studio"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-87.6726%2C41.8847%2C-87.6626%2C41.8887&layer=mapnik&marker=41.8867%2C-87.6676"
                  loading="lazy"
                  className="w-full h-full border-none  contrast-125 opacity-80 group-hover:opacity-100 transition-all duration-1000"
                />
              </div>

              {/* Location Metadata */}
              <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-neutral-100 bg-[#fcfbf9]/50 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                  <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
                    HQ · Chicago Node
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight mb-6">
                  mHUB Chicago <br />
                  Technical Studio
                </h3>

                <p className="text-sm text-neutral-500 leading-relaxed font-light italic mb-10 border-l-2 border-amber-400/10 pl-6">
                  Our headquarters is located within the mHUB ecosystem, North America's leading
                  innovation center for physical product development and manufacturing.
                </p>

                <div className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
                      Address
                    </span>
                    <span className="text-neutral-900 text-sm font-medium leading-relaxed">
                      1623 W Fulton St, Suite 237 <br />
                      Chicago, IL 60612
                    </span>
                  </div>

                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=mHUB+Chicago"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white rounded-full font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all shadow-sm hover:shadow-xl hover:shadow-neutral-900/10"
                  >
                    <span>Get Directions</span>
                    <span className="text-neutral-500 group-hover:text-amber-400 transition-colors">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SiteLayout>

      {/* Aesthetic Lead-Lines */}
      <div className="absolute top-0 left-1/2 w-px h-64 bg-linear-to-b from-amber-400/20 to-transparent -z-10" />
      <div className="absolute bottom-0 right-1/4 w-px h-96 bg-linear-to-t from-amber-400/10 to-transparent -z-10" />
    </div>
  )
}
