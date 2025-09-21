import { CTA } from '@/components/CTA'
import { Features } from '@/components/Features'
import LibraryMarquee from '@/components/LibraryMarquee'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
            {/* In light mode: darker gradient, in dark mode: lighter gradient */}
            <span className="block  tracking-tight bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              DevVault
            </span>
            <span className="block bg-gradient-to-r from-slate-900 via-purple-700 to-pink-700 dark:from-white dark:via-purple-400 dark:to-pink-300 bg-clip-text text-transparent">
              Store & Share Any Package
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover the most powerful, modern libraries and packages curated
            for developers who build exceptional applications, across frontend,
            backend, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link
              href="/lib"
              className="group bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 px-8 py-4 rounded-full text-lg font-semibold shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-pink-500/30 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-white"
            >
              Explore Packages
              <ArrowRight
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/user/libraries/new"
              className="px-8 py-4 rounded-full border border-slate-300 dark:border-slate-700 text-lg font-medium text-slate-700 dark:text-slate-300 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
            >
              Submit a Package
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { number: '50+', label: 'Libraries' },
              { number: '200', label: 'Monthly Visitors' },
              { number: '10', label: 'Active Developers' },
              { number: '99%', label: 'Uptime' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center rounded-xl bg-slate-100 dark:bg-white/5 p-6 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown
            className="w-6 h-6 text-slate-600 dark:text-slate-400"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* Features section */}
      <Features />

      {/* Testimonials / Library Marquee */}
      <LibraryMarquee />

      {/* CTA section */}
      <CTA />
    </>
  )
}
