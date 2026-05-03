import React from "react";

export function HomeMission() {
  return (
    <section className="bg-neutral-100 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-4">
          Our Mission
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 leading-tight">
          We back the builders of the <span className="italic">physical world.</span>
        </h2>
        <p className="mt-5 text-lg text-neutral-600 leading-relaxed">
          Dipalo Ventures invests in breakthrough hard tech across Energy, Climate, and
          Physical AI — and embeds with founders to help them get from prototype to production.
        </p>
      </div>
    </section>
  );
}
