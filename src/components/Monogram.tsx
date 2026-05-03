import React from "react";

export function Monogram({ name }: { name: string }) {
  const initial = name.trim()[0] ?? "·";
  return (
    <div className="h-full w-full bg-neutral-100 flex items-center justify-center rounded-md font-serif text-3xl font-medium text-neutral-400">
      {initial}
    </div>
  );
}
