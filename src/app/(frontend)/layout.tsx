import React from 'react'
import './styles.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Toaster } from 'sonner'

export const metadata = {
  description:
    'Early-stage hard tech investing across Energy, Climate, and Physical AI. Chicago-based operators who have shipped physical products at scale',
  title: 'Dipalo Ventures — Operators Who Invest',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
