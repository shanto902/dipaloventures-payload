import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Globe } from 'lucide-react'

import pluieLogo from '@/assets/logos/pluie.png'
import vumoLogo from '@/assets/logos/vumo.webp'
import scalableLogo from '@/assets/logos/scalable.webp'
import pluieProduct from '@/assets/products/pluie-product.jpg'
import vumoProduct from '@/assets/products/vumo-product.jpg'
import scalableProduct from '@/assets/products/scalable-product.jpg'

type Phase = { label: string; tone: 'gold' | 'muted' }
const PHASES: Phase[] = [
  { label: 'UX Design', tone: 'gold' },
  { label: 'Engineering', tone: 'gold' },
  { label: 'Data Science', tone: 'muted' },
  { label: 'Business Launch', tone: 'muted' },
]

function PhaseTag({ p }: { p: Phase }) {
  const isGold = p.tone === 'gold'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wider border font-medium ${
        isGold
          ? 'border-amber-400/40 text-amber-700 bg-amber-50'
          : 'border-neutral-200 text-neutral-600 bg-neutral-50'
      }`}
    >
      {p.label}
    </span>
  )
}

function MutedTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wider border border-neutral-200 text-neutral-600 font-medium">
      {children}
    </span>
  )
}

function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wider font-medium bg-amber-400 text-white">
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
      className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-700 transition-colors"
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
  badges: React.ReactNode
  overview: string
  solution: string
  link?: React.ReactNode
}

function CaseCard(props: CaseCardProps) {
  return (
    <article className="group relative bg-white border border-neutral-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-neutral-900/5 transition-all duration-700 hover:-translate-y-1">
      <div className="grid lg:grid-cols-[400px_1fr]">
        {/* Cinematic Visual Side */}
        <div className="relative overflow-hidden bg-neutral-900 aspect-video lg:aspect-auto">
          <Image
            src={props.productImage}
            alt={props.productAlt}
            fill
            className="absolute inset-0 h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Logo Floating Over Visual */}
          <div className="absolute top-8 left-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <Image
              src={props.logo}
              alt={`${props.name} logo`}
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </div>

          {/* Technical Artifact Tag */}
          <div className="absolute bottom-8 left-8 flex flex-col">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400 font-bold mb-1">
              Field Archive
            </span>
            <span className="  text-white text-lg italic opacity-80">
              {props.name} Technical Audit
            </span>
          </div>

          {props.productOverlay}
        </div>

        {/* Technical Report Side */}
        <div className="p-8 md:p-12 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="  text-3xl md:text-5xl font-medium text-neutral-900 tracking-tight">
                {props.name}
              </h3>
              <div className="flex gap-2">{props.badges}</div>
            </div>
            {props.link && <div className="shrink-0">{props.link}</div>}
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-[1px] bg-amber-400" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  Problem Definition
                </span>
              </div>
              <p className="text-base text-neutral-600 leading-relaxed font-light italic">
                {props.overview}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-[1px] bg-amber-400" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 font-bold">
                  Technical Solution
                </span>
              </div>
              <p className="text-base text-neutral-600 leading-relaxed font-light">
                {props.solution}
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold mr-4">
                Program Phases:
              </span>
              {PHASES.map((p) => (
                <PhaseTag key={p.label} p={p} />
              ))}
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-bold">
              Ref: DV-RES-0{props.name.length + 10}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ResidencyCaseStudies() {
  return (
    <section className="container mx-auto px-4 py-24 md:py-32">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 font-bold">
              Field Reports
            </div>
          </div>
          <h2 className="text-4xl md:text-7xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
            From the field: what <br />
            Residency <span className="italic   text-amber-400">actually does.</span>
          </h2>
        </div>
        <p className="max-w-xs text-lg text-neutral-500 leading-relaxed font-light italic border-l-2 border-amber-400/20 pl-6">
          Three companies. <br />
          Three different technical challenges. <br />
          One program.
        </p>
      </div>

      <div className="flex flex-col gap-12 md:gap-20">
        <CaseCard
          logo={pluieLogo}
          productImage={pluieProduct}
          productAlt="Pluie self-sanitizing baby changing table"
          name="Pluie"
          badges={
            <>
              <MutedTag>Physical AI</MutedTag>
              <a
                href="https://www.youtube.com/watch?v=MO7a5wdFCPM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wider font-bold bg-neutral-900 text-white hover:bg-amber-400 hover:text-neutral-900 transition-all duration-500"
              >
                Shark Tank S14·E16 ↗
              </a>
            </>
          }
          overview="The world's first self-sanitizing baby changing table — patented UV-C light technology that kills 99.9% of germs."
          solution="Phase 1 covered engineering review (mechanical, electrical), BOM, and business audit. Phase 2 completed the first 100 production units, reduced cleansing time from 10 minutes to 1 minute, and managed the full supply chain end-to-end."
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
          badges={<MutedTag>Physical AI</MutedTag>}
          overview="Vumo (Car Scanner) uses a robotized computer vision system enabled by machine learning to automate car inspection and documentation."
          solution="Residency helped Vumo optimize user validation, product requirements, and Gen 2 planning. Outputs included customer experience journey maps, product requirements documents, certification plans, and a full production roadmap."
          link={
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <GoldLink href="https://vumo.ai/" icon={<Globe size={14} />}>
                vumo.ai
              </GoldLink>
              <GoldLink
                href="https://youtu.be/eyLFm9hyXLE?si=8gerKu7GvFI5_Zby"
                icon={<Globe size={14} />}
              >
                Watch video
              </GoldLink>
            </div>
          }
        />

        <CaseCard
          logo={scalableLogo}
          productImage={scalableProduct}
          productAlt="Scalable Systems WasteWizer connected scale"
          name="Scalable Systems Group"
          badges={<MutedTag>Climate</MutedTag>}
          overview="Formerly WasteWizer — internet-connected scales that monitor trash container weight so pickups happen at the optimal time, not on a fixed schedule."
          solution="Residency adapted the design for larger production runs, planned assembly fixtures, and created tooling suggestions. Testing procedures included a calibration press plan and destructive durability tests meeting IPXX certification standards."
          link={
            <GoldLink href="https://www.scalable-systems.io/" icon={<Globe size={14} />}>
              scalable-systems.io
            </GoldLink>
          }
        />
      </div>
    </section>
  )
}
