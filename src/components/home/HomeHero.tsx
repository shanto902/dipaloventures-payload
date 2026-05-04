import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Replace with your actual image path if this fails to resolve
import heroImg from '@/assets/hero-warm.jpg'

export function HomeHero() {
  return (
    <section className="container min-h-screen flex  justify-center items-center mx-auto mt-12 md:mt-0  px-4 pt-12 md:pt-20 pb-12">
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <h1 className="text-4xl md:text-7xl font-semibold text-neutral-900 leading-[1.05] tracking-tight">
            Venture Capital <span className="italic text-amber-400">for the</span>
            <br /> Physical World.
          </h1>
          <div className="mt-6 md:mt-8 max-w-xl text-lg md:text-xl text-neutral-600 leading-relaxed font-light">
            <p>
              We back founders building breakthrough deep tech across Energy, Climate, and Physical
              AI, bringing hands-on engineering expertise and the product manufacturing networks to
              help you go from prototype to production.
            </p>
          </div>
          <div className="mt-8 md:mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-amber-400 hover:text-white text-black font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-900 transition-all duration-300 shadow-lg shadow-amber-400/10 w-full sm:w-auto text-center"
            >
              Submit your company <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-neutral-200 text-neutral-900 font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:bg-neutral-50 transition-all duration-300 w-full sm:w-auto text-center"
            >
              For investors
            </Link>
          </div>

          <div className="mt-6 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-neutral-100 pt-10 md:pt-12">
            {[
              { value: '3,500+', label: 'Deals sourced' },
              { value: '50%', label: 'Diverse founders' },
              { value: '400+', label: 'Patents' },
              { value: '16', label: 'Portfolio' },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-2xl md:text-3xl   italic text-neutral-900 group-hover:text-amber-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs md:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mt-2 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative group mx-5 md:mx-0">
          <div
            className="absolute -inset-4 bg-amber-400/5 rounded-[2rem] -rotate-1 transition-transform duration-700 group-hover:rotate-0"
            aria-hidden
          />
          <div className="relative">
            <Image
              src={heroImg}
              alt="Vumo portfolio product"
              width={1536}
              height={1024}
              className="relative rounded-[2rem] object-cover shadow-2xl border border-neutral-200/50 w-full aspect-4/3"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
