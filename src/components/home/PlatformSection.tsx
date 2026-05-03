import React from "react";

export function PlatformSection() {
  const locations = [
    {
      label: "Chicago · HQ",
      body: "Our operational home since 2020. Based at mHUB, the nation's largest hard tech incubator — at the center of Midwest deep tech deal flow.",
    },
    {
      label: "Lisbon · EU",
      body: "Raquel Lourenço leads our European hub, supporting portfolio companies entering EU markets and building partnerships across the continent.",
    },
    {
      label: "Gulf · GCC",
      body: "Rezwan Shafique anchors our Gulf presence — connecting portfolio companies to GCC capital and regional partners across the Middle East.",
    },
  ];

  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-sm font-semibold uppercase tracking-widest text-neutral-500 mb-8">
          Our platform
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-0">
          {locations.map((c, i) => (
            <div
              key={c.label}
              className={`md:px-7 ${i !== 0 ? "md:border-l md:border-neutral-200" : "md:pl-0"}`}
            >
              <div className="text-base font-bold text-neutral-900 mb-3">{c.label}</div>
              <p className="text-neutral-600 text-base leading-relaxed">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
