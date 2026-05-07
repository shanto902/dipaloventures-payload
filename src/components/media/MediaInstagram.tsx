import React from 'react'
import { socialLinks } from '@/lib/demo'
import type { InstagramPost } from '@/lib/instagram'

export function MediaInstagram({ initialPosts }: { initialPosts?: InstagramPost[] }) {
  // If no posts are provided, we show a clean placeholder state
  const posts = initialPosts || []
  const displayCount = 8 // 2 rows of 4 on desktop

  return (
    <section
      id="instagram"
      className="relative py-8 px-5 md:px-12  overflow-hidden bg-[#fcfbf9] border-b border-neutral-100"
    >
      {/* Background Studio Tint */}
      <div className="absolute inset-0 bg-[#f7f0e6]/30 -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffb012] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className=" text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                Archive.02 · Visual Field Notes
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-tight tracking-tight">
              Reports from <br />
              the <span className="italic text-[#ffb012] ">field.</span>
            </h2>
          </div>

          <div className="max-w-xs">
            <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light italic border-l-2 border-[#ffb012]/10 pl-6 mb-2">
              A chronological archive of physical prototypes, site visits, and operator insights
              from the Dipalo network.
            </p>
          </div>
        </div>

        {/* High-Impact Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {posts.length > 0
            ? posts.slice(0, displayCount).map((post) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-square rounded-3xl overflow-hidden bg-white border border-neutral-100 shadow-sm hover:shadow-2xl hover:shadow-neutral-900/5 transition-all duration-700"
                >
                  <img
                    src={
                      post.media_type === 'VIDEO'
                        ? post.thumbnail_url || post.media_url
                        : post.media_url
                    }
                    alt={post.caption || 'Instagram Post'}
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-700" />

                  {/* Technical ID Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#ffb012] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/70 font-bold">
                      Field_Report
                    </span>
                  </div>
                </a>
              ))
            : // High-Fidelity Placeholder Grid
              Array.from({ length: displayCount }).map((_, i) => (
                <div
                  key={i}
                  className="group relative aspect-square rounded-3xl border border-neutral-100 bg-white/40 overflow-hidden flex flex-col items-center justify-center"
                >
                  {/* Technical Blueprint Background */}
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="relative flex flex-col items-center gap-4 text-neutral-600 group-hover:text-[#ffb012] transition-colors duration-700">
                    <div className="w-10 h-10 rounded-full border border-current border-dashed animate-[spin_10s_linear_infinite] flex items-center justify-center">
                      <span className=" text-xs">✦</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-mono text-xs uppercase tracking-[0.3em] font-bold">
                        Awaiting_Signal
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-4 px-8 py-4 bg-white border border-neutral-100 rounded-full font-mono  text-xs uppercase tracking-[0.3em] text-[#ffb012] hover:text-[#ffb012] shadow-sm hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-500 font-bold"
          >
            <span>Follow @dipaloventures</span>
            <span className="w-8 h-px bg-[#ffb012]/20 group-hover:w-12 transition-all duration-500" />
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
