import { LibraryCard } from '@/components/LibraryCard'
import React from 'react'
import { _libraries } from '../../../data/libraries'

const libraries = () => {
  return (
    <div>
      <section className="relative pt-20 md:pt-32 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Libraries for Modern Development
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover the modern React tools that simplify, enhance, and inspire
            your frontend projects.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {_libraries.map(library => (
            <LibraryCard key={library.id} library={library} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default libraries
