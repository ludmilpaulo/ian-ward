import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ianward.com'),
  title: {
    default: 'Ian Ward — Entrepreneur & Business Advisor | Cape Town, South Africa',
    template: '%s | Ian Ward'
  },
  description: 'Three decades building businesses and mentoring founders across South Africa. Known for integrity, deep client relationships, and ability to spot new opportunities. At Maindo Digital, Ian focuses on driving growth and forging meaningful partnerships.',
  keywords: ['Ian Ward', 'Entrepreneur', 'Business Advisor', 'Cape Town', 'South Africa', 'Maindo Digital', 'Business Mentor', 'Startup Advisor', 'Growth Strategy'],
  authors: [{ name: 'Ian Ward' }],
  creator: 'Ian Ward',
  publisher: 'Ian Ward',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: '/',
    siteName: 'Ian Ward Portfolio',
    title: 'Ian Ward — Entrepreneur & Business Advisor',
    description: 'Three decades building businesses and mentoring founders across South Africa. Growth, partnerships, and impact.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ian Ward - Entrepreneur & Advisor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ian Ward — Entrepreneur & Business Advisor',
    description: 'Three decades building businesses and mentoring founders across South Africa.',
    creator: '@ianaward',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-ZA" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ian Ward',
              jobTitle: 'Entrepreneur & Business Advisor',
              description: 'Three decades building businesses and mentoring founders across South Africa.',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ianward.com',
              sameAs: [
                'https://www.linkedin.com/in/ianaward/',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Cape Town',
                addressCountry: 'ZA',
              },
              worksFor: {
                '@type': 'Organization',
                name: 'Maindo Digital',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
