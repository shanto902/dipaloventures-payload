import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Replace with your actual image path if this fails to resolve
import heroImg from '@/assets/hero-warm.jpg'

export function HomeHero() {
  return (
    <section className="container min-h-screen flex justify-center items-center mx-auto px-4 pt-6 md:pt-12">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
            Venture Capital <span className="italic">for the</span>
            <br /> Physical World.
          </h1>
          <div className="mt-6 max-w-xl text-lg text-neutral-600 leading-relaxed space-y-4">
            <p>
              We back founders building breakthrough deep tech across Energy, Climate, and Physical
              AI, bringing hands-on engineering expertise and the product manufacturing networks to
              help you go from prototype to production.
            </p>
            <p>
              We are at a historic inflection point. Product innovation, global manufacturing, and
              supply chains must be reimagined to solve critical challenges for people and the
              planet. Software alone cannot solve these challenges.
            </p>
            <p>
              As founders set out to bring these innovations from the research lab and prototypes to
              market commercialization, it's important to have investors who understand their
              technology and can provide more than financial investment. At Dipalo Ventures, our
              Partners are founders and operators who know how to bridge this divide. Join us.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors"
            >
              Submit your company <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-neutral-300 text-neutral-900 font-medium rounded-md hover:bg-neutral-50 transition-colors"
            >
              For investors
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-amber-500/10 rounded-3xl rotate-2" aria-hidden />
          <div className="relative">
            <Image
              src={heroImg}
              alt="Vumo portfolio product"
              width={1536}
              height={1024}
              className="relative rounded-3xl object-cover shadow-lg w-full aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
