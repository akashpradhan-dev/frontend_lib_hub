import Link from 'next/link'
import React from 'react'

export const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="bg-gradient-to-r 
            from-slate-100/70 to-slate-200/70 
            dark:from-slate-800/50 dark:to-slate-900/50 
            backdrop-blur-sm 
            border border-slate-200 dark:border-slate-700/50 
            rounded-3xl p-12"
        >
          <h2
            className="text-4xl font-bold mb-6 
              bg-gradient-to-r from-slate-900 to-slate-600 
              dark:from-white dark:to-slate-300 
              bg-clip-text text-transparent"
          >
            Save & Publish Your Libraries
          </h2>

          <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
            Easily save your favorite libraries, share them with the community,
            and get them published for developers worldwide to discover and use.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={'/lib'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 
                px-8 py-4 rounded-full text-lg font-semibold 
                text-white shadow-md
                hover:shadow-2xl hover:shadow-purple-500/25 
                transition-all duration-300 transform hover:scale-105"
            >
              Save Libraries
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
