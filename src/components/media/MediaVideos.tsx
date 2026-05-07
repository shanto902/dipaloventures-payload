'use client'
import React, { useState } from 'react'
import { videos, socialLinks } from '@/lib/demo'

export function MediaVideos({ initialVideos }: { initialVideos?: any[] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayVideos = initialVideos && initialVideos.length > 0 ? initialVideos : videos
  const featuredVideo = displayVideos[0]
  const otherVideos = displayVideos.slice(1, 3) // Only show latest 3 total (1 featured + 2 archive)

  return (
    <section
      id="video"
      className="relative py-8 overflow-hidden bg-white border-b border-neutral-100"
    >
      <div className="container mx-auto px-4">
        {/* Section Identity */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffb012] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          <div className=" text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
            Archive.01 · Visual Intelligence
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Cinema Artifact */}
          <div className="lg:col-span-8 group">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-neutral-100 bg-neutral-900 shadow-2xl transition-all duration-700 hover:shadow-amber-900/10">
              <iframe
                className="absolute inset-0 w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                src={`https://www.youtube.com/embed/${featuredVideo.id}`}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

              {/* Technical Overlay */}
              <div className="absolute top-8 left-8 flex items-center gap-2 pointer-events-none">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffb012] animate-pulse" />
                <span className="font-mono  text-xs uppercase tracking-[0.3em] text-white/50 font-bold">
                  Tales_From_The_Hard_Side
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 leading-tight tracking-tight group-hover:text-[#ffb012] transition-colors duration-500">
                {featuredVideo.title}
              </h2>
              <div className="mt-6 border-l-2 border-[#ffb012]/10 pl-8 max-w-2xl">
                <p className="text-lg text-neutral-600 leading-relaxed italic">
                  {isExpanded || featuredVideo.desc.length <= 200
                    ? featuredVideo.desc
                    : `${featuredVideo.desc.substring(0, 200)}...`}
                </p>
                {featuredVideo.desc.length > 200 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 font-mono  text-xs uppercase tracking-[0.2em] text-[#ffb012] hover:text-[#ffb012] transition-colors font-bold flex items-center gap-2 group/btn"
                  >
                    <span>{isExpanded ? '[ Collapse_Dossier ]' : '[ Read_More ]'}</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">
                      {isExpanded ? '↑' : '→'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Archive Sidebar */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100">
              <span className="font-mono  text-xs uppercase tracking-[0.2em] text-neutral-600 font-bold">
                Transmission History
              </span>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="text-[#ffb012] hover:text-amber-600 transition-colors font-mono  text-xs uppercase tracking-[0.2em] font-bold"
              >
                Full Archive →
              </a>
            </div>

            <div className="space-y-4">
              {otherVideos.map((v) => (
                <article key={v.id} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-100 bg-neutral-50 mb-4 group-hover:shadow-xl group-hover:shadow-neutral-900/5 transition-all duration-500">
                    <iframe
                      className="absolute inset-0 w-full h-full border-none transition-all duration-1000"
                      src={`https://www.youtube.com/embed/${v.id}`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 leading-tight tracking-tight group-hover:text-[#ffb012] transition-colors">
                    {v.title}
                  </h4>
                  <div className="mt-2 font-mono  text-xs uppercase tracking-[0.2em] text-neutral-600 font-bold">
                    Transmission_V.0{v.id.slice(0, 1)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
