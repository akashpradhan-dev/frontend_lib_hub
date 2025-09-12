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
  title: 'Library Hub',
  description:
    'A hub for frontend libraries and tools to enhance your development experience.',
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
