import React from "react";
import Link from "next/link";
import Image from "next/image";
import { team } from "@/lib/demo";

function initial(n: string) {
  return n.trim()[0] ?? "·";
}

export function TeamSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">
              The team
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">
              Operators with <span className="italic">scars.</span>
            </h2>
            <p className="mt-4 text-lg text-neutral-600 leading-relaxed max-w-xl">
              From Motorola to med-tech — our GPs have built physical products at scale.
            </p>
          </div>
          <Link href="/team" className="text-sm text-amber-600 hover:opacity-80 underline underline-offset-4">
            Meet the full team →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <article key={m.name} className="p-6 bg-white border border-neutral-200 rounded-xl hover:-translate-y-1 transition-transform text-center shadow-sm">
              <div className="relative h-20 w-20 mx-auto rounded-full overflow-hidden">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full border border-neutral-200 object-cover object-top"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-amber-100 flex items-center justify-center font-serif text-3xl text-amber-600">
                    {initial(m.name)}
                  </div>
                )}
              </div>
              <div className="mt-4 font-serif text-xl font-medium text-neutral-900 whitespace-nowrap">
                {m.name}
              </div>
              <div className="text-xs text-neutral-500 mt-1">{m.role}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
