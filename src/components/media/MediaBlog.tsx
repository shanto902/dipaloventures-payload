import React from 'react'
import { blogPosts, socialLinks } from '@/lib/demo'

export function MediaBlog() {
  return (
    <section id="blog" className="py-16 bg-white border-b border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="font-mono uppercase text-sm tracking-[0.2em] text-amber-600 font-bold">
            03 · Blog · Medium
          </div>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory">
          {blogPosts.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 w-[280px] md:w-[350px] group bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:border-amber-600 transition-all snap-start"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="font-mono text-xs uppercase tracking-widest text-amber-600 font-bold">
                  Medium · {p.date}
                </div>
                <span className="text-neutral-400 group-hover:text-amber-600 transition-colors">
                  ↗
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-serif text-neutral-900 font-medium leading-tight mb-3 group-hover:text-amber-700 transition-colors">
                {p.title}
              </h3>
              <p className="text-base text-neutral-500 leading-relaxed line-clamp-3">{p.body}</p>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={socialLinks.medium}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-600 hover:text-amber-700 hover:underline transition-all font-bold"
          >
            Read more on Medium ↗
          </a>
        </div>
      </div>
    </section>
  )
}
