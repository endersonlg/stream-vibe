import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

import '@/styles/globals.css'
import { Header } from '@/components/Header'

const manrope = Manrope({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Stream Vibe',
  description: 'Discover currently trending movies and filter by genres.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} bg-dark-700  max-w-screen-2xl mx-auto max-2xl:mx-12 `}
      >
        <Header />
        <div className="py-12">{children}</div>
      </body>
    </html>
  )
}
