'use client'
import React, { useState } from 'react'
import { videos, socialLinks } from '@/lib/demo'

export function MediaVideos({ initialVideos }: { initialVideos?: any[] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [liveVideos, setLiveVideos] = useState<any[]>([])

  React.useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/youtube')
        if (!res.ok) return
        const data = await res.json()
        if (data && data.length > 0) {
          setLiveVideos(data)
        }
      } catch (err) {
        console.error('Error fetching live videos:', err)
      }
    }
    fetchVideos()
  }, [])

  const displayVideos =
    liveVideos.length > 0
      ? liveVideos
      : initialVideos && initialVideos.length > 0
        ? initialVideos
        : videos

  const featuredVideo = displayVideos[0]
  const otherVideos = displayVideos.slice(1, 3) // Show up to 3 archive videos

  return (
    <header className="relative  px-5 md:px-12 pt-24 pb-8 overflow-hidden">
      {/* Technical Background Pattern */}
      <div className="absolute inset-0 bg-[#fcfbf9] -z-10" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4">
        {/* Architectural Header — Horizontal Split */}

        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.05] tracking-tight">
            Tales from the
            <span className="italic text-[#ffb012]  "> Hard Side.</span>
          </h1>

          {/* <div className="max-w-xl">
            <p className="text-base md:text-lg text-neutral-800 leading-relaxed font-light italic border-l-2 border-[#ffb012]/10 pl-6 mb-2">
              Honest conversations with the founders manufacturing the physical future.
            </p>
          </div> */}
        </div>

        {/* Technical Navigation / Filters */}
        {/* <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="font-mono  text-xs uppercase tracking-[0.2em] text-neutral-600 font-bold mr-4">
            Filter Archive:
          </span>
          {[
            { id: 'video', label: 'Podcast' },
            { id: 'instagram', label: 'Instagram' },
            { id: 'blog', label: 'Medium' },
            { id: 'social', label: 'Social' },
          ].map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="px-6 py-2 bg-white border border-neutral-100 rounded-full font-mono  text-xs uppercase tracking-[0.15em] text-neutral-600 hover:border-[#ffb012] hover:text-[#ffb012] hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-500 font-bold"
            >
              {p.label}
            </a>
          ))}
        </div> */}
      </div>
      <section id="video" className="relative py-8 overflow-hidde">
        <div className="container mx-auto px-4">
          {/* Section Identity */}

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
                      <span>{isExpanded ? '[ Read_Less ]' : '[ Read_More ]'}</span>
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
                  Old Stories
                </span>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#ffb012] hover:text-amber-600 transition-colors font-mono  text-xs uppercase tracking-[0.2em] font-bold"
                >
                  Full Playlist →
                </a>
              </div>

              <div className="space-y-8 ">
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
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  )
}
