import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/Footer'
import { Provider } from './Provider'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Dev Volt - Library Hub',
  description:
    'A curated collection of frontend libraries and resources to accelerate your development workflow.',
  keywords: [
    'frontend',
    'libraries',
    'developer resources',
    'UI',
    'components',
    'devvolt',
    'library hub',
  ],
  authors: [
    { name: 'Devvolt Team', url: 'https://www.linkedin.com/in/akash-pradhan/' },
  ],
  openGraph: {
    title: 'devvolt - Library Hub',
    description:
      'A curated collection of frontend libraries and resources to accelerate your development workflow.',
    url: 'https://devvolt.vercel.app',
    siteName: 'devvolt',
    images: [
      {
        url: 'https://devvolt.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'devvolt Library Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'devvolt - Library Hub',
    description:
      'A curated collection of frontend libraries and resources to accelerate your development workflow.',
    images: ['https://devvolt.vercel.app/og-image.jpg'],
    site: '@devvolt',
    creator: '@devvolt',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(geistSans.variable, geistMono.variable)}
    >
      <body className="antialiased">
        <Provider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Sticky Header */}
          <Header />

          {/* Main Content */}
          <main className="min-h-screen max-w-7xl mx-auto px-6 py-12">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
