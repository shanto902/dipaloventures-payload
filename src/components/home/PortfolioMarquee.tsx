import React from 'react'
import Image from 'next/image'
import Marquee from 'react-fast-marquee'
import { portfolio } from '@/lib/demo'
import { AnimatedLink } from '@/components/ui/AnimatedLink'

export function PortfolioMarquee({ items }: { items?: any[] }) {
  const displayItems = items || portfolio

  // Split items into two rows for a more dynamic look
  const midPoint = Math.ceil(displayItems.length / 2)
  const row1 = [...displayItems.slice(0, midPoint), ...displayItems.slice(0, midPoint)]
  const row2 = [...displayItems.slice(midPoint), ...displayItems.slice(midPoint)]

  return (
    <section className="bg-[#fcfbf9] py-8  px-5 md:px-12 overflow-hidden border-y border-neutral-100">
      <div className="container mx-auto px-4  ">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="text-sm font-mono uppercase tracking-[0.2em] text-[#ffb012] mb-6 font-bold">
              Selected portfolio
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 leading-[1.1]">
              Designed to Scale. <br /> <span className="text-[#ffb012] italic">Built to Last</span>
            </h2>
          </div>
          <AnimatedLink href="/portfolio">Full Portfolio</AnimatedLink>
        </div>
      </div>

      <div className="relative px-5 mt-10 md:mt-20 flex flex-col gap-16">
        {/* Row 1: Left to Right */}
        <Marquee gradient={false} speed={35} pauseOnHover={true} direction="left">
          {row1.map((item, i) => {
            const isLink = item.url && item.url !== '#'
            const Container = isLink ? 'a' : 'div'
            return (
              <Container
                key={`${item.name}-r1-${i}`}
                {...(isLink ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`mx-10 md:mx-16 flex flex-col items-center group relative ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="relative h-10 w-28 md:h-12 md:w-36 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image src={item.logo} alt={item.name} fill className="object-contain" />
                </div>
              </Container>
            )
          })}
        </Marquee>

        {/* Row 2: Right to Left */}
        <Marquee gradient={false} speed={30} pauseOnHover={true} direction="right">
          {row2.map((item, i) => {
            const isLink = item.url && item.url !== '#'
            const Container = isLink ? 'a' : 'div'
            return (
              <Container
                key={`${item.name}-r2-${i}`}
                {...(isLink ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`mx-10 md:mx-16 flex flex-col items-center group relative ${isLink ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="relative h-10 w-28 md:h-12 md:w-36 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <Image src={item.logo} alt={item.name} fill className="object-contain" />
                </div>
              </Container>
            )
          })}
        </Marquee>
      </div>
    </section>
  )
}
