import React from "react";
import Link from "next/link";
import { residencyCovers } from "@/lib/demo";

export function ResidencyCovers() {
  return (
    <section id="residency-program" className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
        <div>
          <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-3">What Residency covers</div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
            Engineering, supply chain, <span className="italic">execution.</span>
          </h2>
          <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
            Residency isn't an accelerator and it isn't advisory hours. It's operators
            embedded with your team, doing the technical work alongside you — from early
            design reviews to your first production runs.
          </p>
          <Link
            href="/team"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline underline-offset-4"
          >
            See who runs Residency →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {residencyCovers.map((x) => (
            <div key={x.t} className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <div className="font-serif text-xl font-medium text-neutral-900 leading-tight">{x.t}</div>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{x.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
