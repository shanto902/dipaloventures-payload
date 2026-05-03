import React from 'react'

export function SiteLayout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <main className={`flex min-h-screen flex-col ${className}`}>{children}</main>
}
