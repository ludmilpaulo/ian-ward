import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ian Ward — Entrepreneur & Advisor',
  description: 'Three decades building businesses and mentoring founders across South Africa. Growth, partnerships, and impact.',
  openGraph: {
    title: 'Ian Ward — Entrepreneur & Advisor',
    description:
      'Three decades building businesses and mentoring founders across South Africa. Growth, partnerships, and impact.',
    type: 'website',
    url: 'https://ianward.example',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ian Ward — Entrepreneur & Advisor',
    description:
      'Three decades building businesses and mentoring founders across South Africa. Growth, partnerships, and impact.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
