import React from 'react'
import { videos, socialLinks } from '@/lib/demo'

export function MediaVideos() {
  return (
    <section id="video" className="py-16 bg-white border-b border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="font-mono uppercase text-sm tracking-[0.2em] text-amber-600 font-bold">
            01 · Video · Tales From The Hard Side
          </div>
        </div>

        <div className="relative group">
          <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory">
            {videos.map((v) => (
              <div
                key={v.id}
                className="min-w-[300px] md:min-w-[450px] lg:min-w-[500px] snap-start flex-shrink-0"
              >
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                  <iframe
                    className="w-full h-full border-none"
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <h3 className="mt-4 text-lg md:text-xl font-serif text-neutral-900 font-medium leading-tight">
                  {v.title}
                </h3>
                <p className="mt-2 text-base text-neutral-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href={socialLinks.youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-600 hover:text-amber-700 hover:underline transition-all font-bold"
          >
            Watch full playlist ↗
          </a>
        </div>
      </div>
    </section>
  )
}
