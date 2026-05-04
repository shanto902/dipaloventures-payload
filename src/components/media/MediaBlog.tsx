import React from 'react'
import { socialLinks, blogPosts as demoPosts } from '@/lib/demo'
import type { MediumPost } from '@/lib/medium'

export function MediaBlog({ initialPosts }: { initialPosts?: MediumPost[] }) {
  // Map Medium posts to our internal format or use demo data
  const posts =
    initialPosts && initialPosts.length > 0
      ? initialPosts.map((p) => ({
          title: p.title,
          date: new Date(p.pubDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          href: p.link,
          body: p.description.replace(/<[^>]*>/g, '').slice(0, 140) + '...',
        }))
      : demoPosts

  return (
    <section
      id="blog"
      className="relative py-20 md:py-24 overflow-hidden bg-white border-b border-neutral-100 px-5 md:px-12"
    >
      <div className="container mx-auto">
        {/* Section Identity */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-neutral-100 pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
                Archive.03 · Thought Leadership
              </div>
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              Honest takes on <br />
              the <span className="italic text-amber-400  ">hard stuff.</span>
            </h2>
          </div>

          <div className="max-w-xs">
            <p className="text-sm text-neutral-500 leading-relaxed font-light italic border-l-2 border-amber-400/10 pl-6">
              Long-form essays on manufacturing, physical AI, and the engineering challenges of
              scaling hard tech.
            </p>
          </div>
        </div>

        {/* Compact Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((p, i) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col h-full bg-white border border-neutral-100 rounded-3xl p-8 hover:border-amber-400 hover:shadow-2xl hover:shadow-neutral-900/5 transition-all duration-700"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="font-mono  text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">
                  Manuscript.0{i + 1}
                </div>
                <div className="font-mono  text-xs uppercase tracking-[0.15em] text-neutral-400 font-bold">
                  {p.date}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 leading-tight tracking-tight mb-4 group-hover:text-amber-500 transition-colors duration-500 line-clamp-3">
                {p.title}
              </h3>

              <p className="text-sm text-neutral-500 leading-relaxed font-light line-clamp-3 mb-8">
                {p.body}
              </p>

              <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between">
                <span className="font-mono  text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold group-hover:text-amber-500 transition-colors">
                  Read Full Take
                </span>
                <span className="text-neutral-300 group-hover:text-amber-400 group-hover:translate-x-1 transition-all duration-500">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Archive Link */}
        <div className="mt-12 flex justify-center">
          <a
            href={socialLinks.medium}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-amber-500 transition-colors font-bold"
          >
            <span>Explore Full Archive on Medium</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
