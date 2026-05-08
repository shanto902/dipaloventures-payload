'use client'

import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Globe } from 'lucide-react'

import pluieLogo from '@/assets/logos/pluie.png'
import vumoLogo from '@/assets/logos/vumo.png'
import scalableLogo from '@/assets/logos/scalable.webp'
import pluieProduct from '@/assets/products/pluie-product.jpg'
import vumoProduct from '@/assets/products/vumo-product.jpg'
import scalableProduct from '@/assets/products/scalable-product.jpg'
import { scopeCards } from '@/lib/demo'

function MutedTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-mono uppercase tracking-wider border border-neutral-200 text-neutral-600 bg-neutral-100/80 font-bold shadow-xs">
      {children}
    </span>
  )
}

function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wider font-medium bg-[#ffb012] text-white">
      {children}
    </span>
  )
}

function GoldLink({
  href,
  icon,
  children,
}: {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#ffb012] hover:text-amber-700 transition-colors"
    >
      {icon}
      <span className="underline underline-offset-4">{children}</span>
    </a>
  )
}

type CaseCardProps = {
  logo: StaticImageData
  productImage: StaticImageData
  productAlt: string
  productOverlay?: React.ReactNode
  name: string
  note?: string
  badges: React.ReactNode
  overview: string
  solution: string
  link?: React.ReactNode
}

function CaseCard(props: CaseCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <article className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
      {/* Visual Header */}
      <div className="relative aspect-video overflow-hidden bg-neutral-900 shrink-0">
        <Image
          src={props.productImage}
          alt={props.productAlt}
          fill
          className="absolute inset-0 h-full w-full object-cover  transition-all duration-1000 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

        {/* Logo Overlay */}
        <div className="absolute top-4 left-4 p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
          <Image
            src={props.logo}
            alt={`${props.name} logo`}
            className="h-5 w-auto object-contain brightness-0 invert"
          />
        </div>

        {/* Technical Badge & Note */}
        {/* <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffb012] font-bold bg-black/40 backdrop-blur-sm px-2 py-1 rounded w-fit">
            {props.name}
          </span>
          {props.note && (
            <span className="font-mono text-xs uppercase tracking-widest text-white/90 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded border border-white/10 w-fit">
              {props.note}
            </span>
          )}
        </div> */}
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Top: Technical Badges */}
        <div className="flex flex-wrap gap-2 mb-6">{props.badges}</div>

        {/* Middle: Expandable Content */}
        <div
          className={`space-y-4 transition-all duration-500 ease-in-out overflow-hidden ${
            isExpanded ? 'max-h-[1000px] opacity-100 mb-6' : 'max-h-0 opacity-0 mb-0'
          }`}
        >
          <div className="border-t border-neutral-100 pt-4">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-bold mb-2 flex items-center gap-2">
              <div className="w-2 h-px bg-[#ffb012]" />
              Challenge
            </div>
            <p className="text-base text-neutral-800 leading-relaxed font-light">
              {props.overview}
            </p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-bold mb-2 flex items-center gap-2">
              <div className="w-2 h-px bg-[#ffb012]" />
              Outcome
            </div>
            <p className="text-base text-neutral-800 leading-relaxed font-light">
              {props.solution}
            </p>
          </div>
        </div>

        {/* Bottom: Action Bar */}
        <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-mono uppercase tracking-[0.2em] text-[#ffb012] font-bold flex items-center gap-2 hover:text-amber-600 transition-colors"
          >
            <div
              className={`w-4 h-4 rounded-full border border-[#ffb012]/30 flex items-center justify-center transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              {isExpanded ? '−' : '+'}
            </div>
            {isExpanded ? 'Hide Details' : 'Details'}
          </button>

          {props.link && <div className="shrink-0">{props.link}</div>}
        </div>
      </div>
    </article>
  )
}

export function ResidencyCaseStudies() {
  return (
    <section className="px-5 md:px-12">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-8">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-[#ffb012] mb-6 font-bold">
              Case Studies
            </div>

            {/* <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              What <span className="italic   text-[#ffb012]">Residency</span> actually does
            </h2> */}
          </div>
          {/* <p className="max-w-xs text-base md:text-lg  text-neutral-800 leading-relaxed font-light italic border-l-2 border-[#ffb012]/20 pl-6">
            Three companies. <br />
            Three different technical challenges. <br />
            One program.
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
          {scopeCards.map((s) => (
            <div
              key={s.n}
              className="group relative flex flex-col p-6 bg-[#fcfbf9] border border-neutral-200/60 rounded-2xl transition-all duration-500 hover:border-[#ffb012]/50 hover:shadow-lg hover:shadow-amber-900/5"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#ffb012] font-bold tracking-[0.2em]">
                  {s.n}
                </span>
                <div className="w-1 h-1 rounded-full bg-neutral-300 group-hover:bg-[#ffb012] animate-pulse" />
              </div>

              <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-[#ffb012] transition-colors">
                {s.t}
              </h3>

              <p className="text-base md:text-lg text-neutral-800 leading-snug font-light">{s.d}</p>

              {/* Technical Bottom Accent */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px w-6 bg-[#ffb012]/20 group-hover:w-10 transition-all duration-500" />
                <div className="h-px w-1 bg-[#ffb012]/10 group-hover:bg-[#ffb012]/40" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          <CaseCard
            logo={pluieLogo}
            productImage={pluieProduct}
            productAlt="Pluie self-sanitizing baby changing table"
            name="Pluie"
            note="Shark Tank S14 · E16"
            badges={
              <>
                <MutedTag>UX Design</MutedTag>
                <MutedTag>Engineering</MutedTag>
                <MutedTag>Data Science</MutedTag>
                <MutedTag>Business Launch</MutedTag>
              </>
            }
            overview="The world's first self-sanitizing baby changing table, patented UV-C light technology that kills 99.9% of germs."
            solution="Phase 1: engineering reviews (mechanical + electrical), BOM, and business audit. Phase 2: first 100 production units, cleansing time reduced from 10 minutes to 1 minute, and end-to-end supply chain management."
            link={
              <GoldLink href="https://hellopluie.com/" icon={<Globe size={14} />}>
                hellopluie.com
              </GoldLink>
            }
          />

          <CaseCard
            logo={vumoLogo}
            productImage={vumoProduct}
            productAlt="Vumo robotic car scanner"
            name="Vumo"
            note="Car Scanner"
            badges={
              <>
                <MutedTag>UX Design</MutedTag>
                <MutedTag>Engineering</MutedTag>
                <MutedTag>Data Science</MutedTag>
                <MutedTag>Business Launch</MutedTag>
              </>
            }
            overview="Vumo uses a robotic computer vision system powered by machine learning to automate car inspections and documentation."
            solution="Optimized user validation, product requirements, and Gen 2 planning. Outputs included customer experience journey maps, PRDs, certification plans, and a full production roadmap."
            link={
              <GoldLink href="https://vumo.ai/" icon={<Globe size={14} />}>
                vumo.ai
              </GoldLink>
            }
          />

          <CaseCard
            logo={scalableLogo}
            productImage={scalableProduct}
            productAlt="Scalable Systems WasteWizer connected scale"
            name="Scalable Systems Group"
            note="Formerly WasteWizer"
            badges={
              <>
                <MutedTag>UX Design</MutedTag>
                <MutedTag>Engineering</MutedTag>
                <MutedTag>Data Science</MutedTag>
                <MutedTag>Business Launch</MutedTag>
              </>
            }
            overview="Internet-connected scales that monitor trash container weight so pickups happen at the optimal time, not on a fixed schedule."
            solution="Adapted the design for larger production runs, planned assembly fixtures, and created tooling suggestions. Calibration press plan and destructive durability tests meeting IPXX certification standards."
            link={
              <GoldLink href="https://scalable-systems.io/" icon={<Globe size={14} />}>
                scalable-systems.io
              </GoldLink>
            }
          />
        </div>
      </main>
    </section>
  )
}
