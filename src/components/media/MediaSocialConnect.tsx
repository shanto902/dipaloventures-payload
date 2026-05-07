import React from 'react'
import { socialLinks } from '@/lib/demo'
import { NewsletterForm } from '@/components/NewsletterForm'

const LinkedInLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0z" />
  </svg>
)

const YouTubeLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#FF0000"
      d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8z"
    />
    <path fill="#fff" d="M9.6 15.6V8.4L15.8 12z" />
  </svg>
)

const InstagramLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-g-media" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FED576" />
        <stop offset="26%" stopColor="#F47133" />
        <stop offset="61%" stopColor="#BC3081" />
        <stop offset="100%" stopColor="#4C63D2" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-g-media)" />
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" />
  </svg>
)

const MediumLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.54 12c0 3.04-2.42 5.5-5.4 5.5S2.73 15.04 2.73 12s2.42-5.5 5.4-5.5 5.41 2.46 5.41 5.5zM19.5 12c0 2.86-1.21 5.18-2.7 5.18-1.5 0-2.7-2.32-2.7-5.18s1.21-5.18 2.7-5.18S19.5 9.14 19.5 12zM21.27 12c0 2.56-.43 4.64-.95 4.64-.53 0-.95-2.08-.95-4.64s.42-4.64.95-4.64c.52 0 .95 2.08.95 4.64z" />
  </svg>
)

const socialCards = [
  { name: 'LinkedIn', href: socialLinks.linkedin, Icon: LinkedInLogo },
  { name: 'YouTube', href: socialLinks.youtube, Icon: YouTubeLogo },
  { name: 'Instagram', href: socialLinks.instagram, Icon: InstagramLogo },
  { name: 'Medium', href: socialLinks.medium, Icon: MediumLogo },
]

export function MediaSocialConnect() {
  return (
    <section className="relative py-12 md:py-16 bg-[#fcfbf9] border-b border-neutral-100 px-5 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Module 01: Transmission Network */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffb012] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                Connect · Archive
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {socialCards.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 bg-white border border-neutral-100 rounded-2xl p-4 hover:border-[#ffb012] hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-500"
                >
                  <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center shrink-0 border border-neutral-50 group-hover:border-[#ffb012]/20 group-hover:bg-[#ffb012]/5 transition-all duration-500">
                    <s.Icon />
                  </div>
                  <div className="font-mono  text-xs uppercase tracking-[0.2em] text-neutral-900 font-bold">
                    {s.name}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Module 02: Editorial Terminal */}
          <div className="relative p-8 md:p-10 bg-white border border-neutral-100 rounded-[2rem] overflow-hidden shadow-sm">
            {/* Blueprint Overlay */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative space-y-6 text-center lg:text-left">
              <div className="font-mono uppercase  text-xs tracking-[0.3em] text-[#ffb012] font-bold">
                Letters from the Hard Side
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 leading-tight tracking-tight">
                Quarterly notes on <span className="italic text-[#ffb012]  ">deep tech.</span>
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed font-light italic">
                Our honest takes on manufacturing and physical AI. Direct from Substack to your
                inbox.
              </p>
              <div className="max-w-md mx-auto lg:mx-0">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
