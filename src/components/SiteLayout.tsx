import React from 'react'

export function SiteLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <main className={`flex mx-5 md:mx-12 flex-col ${className}`}>{children}</main>
}
