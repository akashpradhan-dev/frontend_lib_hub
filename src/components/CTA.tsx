import Link from 'next/link'
import React from 'react'

export const CTA = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Ready to Build Something Amazing?
          </h2>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join thousands of developers using our curated frontend libraries to
            create exceptional web experiences
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={'/lib'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Find Libraries
            </Link>
            {/* <button className="bg-slate-700/50 hover:bg-slate-600/50 px-8 py-4 rounded-full text-lg font-semibold transition-colors">
              View Documentation
            </button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
