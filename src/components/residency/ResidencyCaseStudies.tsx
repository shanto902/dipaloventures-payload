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
          : 'border-neutral-200 text-neutral-800 bg-neutral-50'
      }`}
    >
      {p.label}
    </span>
  )
}

function MutedTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wider border border-neutral-200 text-neutral-800 font-medium">
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
    <article className="group bg-white border border-neutral-100 rounded-[2rem] overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
      {/* Visual Header */}
      <div className="relative aspect-video overflow-hidden bg-neutral-900 shrink-0">
        <Image
          src={props.productImage}
          alt={props.productAlt}
          fill
          className="absolute inset-0 h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
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

        {/* Technical Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 font-bold bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
            Archive 0{props.name.length % 9}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h3 className="text-2xl font-semibold text-neutral-900 tracking-tight leading-tight">
            {props.name}
          </h3>
          <div className="flex flex-wrap gap-1.5 justify-end">{props.badges}</div>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-bold mb-2 flex items-center gap-2">
              <div className="w-2 h-px bg-amber-400" />
              Challenge
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed font-light italic">
              {props.overview}
            </p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-600 font-bold mb-2 flex items-center gap-2">
              <div className="w-2 h-px bg-amber-400" />
              Outcome
            </div>
            <p className="text-sm text-neutral-800 leading-relaxed font-light">{props.solution}</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-50 flex items-center justify-between">
          <div className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-widest">
            Ref: DV-RES-0{props.name.length}
          </div>
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-neutral-600 font-bold">
                Field Reports
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold text-neutral-900 leading-[1.1] tracking-tight">
              From the field: what <br />
              Residency <span className="italic   text-amber-400">actually does.</span>
            </h2>
          </div>
          <p className="max-w-xs text-base md:text-lg  text-neutral-800 leading-relaxed font-light italic border-l-2 border-amber-400/20 pl-6">
            Three companies. <br />
            Three different technical challenges. <br />
            One program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CaseCard
            logo={pluieLogo}
            productImage={pluieProduct}
            productAlt="Pluie self-sanitizing baby changing table"
            name="Pluie"
            badges={<MutedTag>Physical AI</MutedTag>}
            overview="The world's first self-sanitizing baby changing table — patented UV-C light technology that kills 99.9% of germs."
            solution="Phase 1 covered engineering review and business audit. Phase 2 completed production units and managed full supply chain."
            link={
              <GoldLink href="https://hellopluie.com/" icon={<Globe size={14} />}>
                Link
              </GoldLink>
            }
          />

          <CaseCard
            logo={vumoLogo}
            productImage={vumoProduct}
            productAlt="Vumo robotic car scanner"
            name="Vumo"
            badges={<MutedTag>Physical AI</MutedTag>}
            overview="Robotized computer vision system enabled by machine learning to automate car inspection and documentation."
            solution="Residency helped Vumo optimize user validation, Gen 2 planning, PRDs, certification plans, and a full production roadmap."
            link={
              <GoldLink href="https://vumo.ai/" icon={<Globe size={14} />}>
                Link
              </GoldLink>
            }
          />

          <CaseCard
            logo={scalableLogo}
            productImage={scalableProduct}
            productAlt="Scalable Systems WasteWizer connected scale"
            name="Scalable"
            badges={<MutedTag>Climate</MutedTag>}
            overview="Internet-connected scales monitor trash container weight so pickups happen at the optimal time."
            solution="Adapted design for production, planned assembly fixtures, and created tooling suggestions. Established durability tests meeting IPXX."
            link={
              <GoldLink href="https://www.scalable-systems.io/" icon={<Globe size={14} />}>
                Link
              </GoldLink>
            }
          />
        </div>
      </main>
    </section>
  )
}
