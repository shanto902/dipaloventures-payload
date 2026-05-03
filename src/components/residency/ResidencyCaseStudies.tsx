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
          ? 'border-amber-600/40 text-amber-700 bg-amber-50'
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
    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wider font-medium bg-amber-600 text-white">
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
      className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
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
    <article className="bg-white border border-neutral-200 rounded-2xl overflow-hidden grid md:grid-cols-[260px_1fr] shadow-sm">
      <div className="flex flex-col md:border-r border-neutral-200">
        <div
          className="flex items-center justify-center px-4 bg-white border-b border-neutral-200"
          style={{ minHeight: 80 }}
        >
          <Image
            src={props.logo}
            alt={`${props.name} logo`}
            className="object-contain max-h-[44px] w-auto"
          />
        </div>
        <div
          className="relative bg-neutral-100 flex-1 min-h-[200px]"
          style={{ aspectRatio: '4/3' }}
        >
          <Image
            src={props.productImage}
            alt={props.productAlt}
            fill
            className="absolute inset-0 h-full w-full object-cover"
          />
          {props.productOverlay}
        </div>
      </div>

      <div className="flex flex-col p-6 md:p-8 gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 leading-tight font-medium">
            {props.name}
          </h3>
          {props.badges}
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-amber-600 mb-1.5 font-bold">
            Overview
          </div>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">{props.overview}</p>
        </div>

        <div className="border-t border-neutral-100" />

        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-amber-600 mb-1.5 font-bold">
            Solution
          </div>
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">{props.solution}</p>
        </div>

        {props.link && <div className="pt-2">{props.link}</div>}

        <div className="mt-auto pt-6 border-t border-neutral-100 flex flex-wrap gap-2">
          {PHASES.map((p) => (
            <PhaseTag key={p.label} p={p} />
          ))}
        </div>
      </div>
    </article>
  )
}

export function ResidencyCaseStudies() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mb-12">
        <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">
          Case studies
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
          From the field: what Residency <span className="italic">actually does.</span>
        </h2>
        <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
          Three companies. Three different technical challenges. One program.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
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
                className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-mono uppercase tracking-wider font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
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
                Watch Residency video
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
