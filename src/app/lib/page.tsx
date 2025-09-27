import { Libraries } from '@/components/Libraries'
import React, { Suspense } from 'react'

const categories = ['All', 'Backend', 'Frontend', 'Mobile', 'DevOps']

export default function LibrariesPage() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 md:pt-32 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl lg:text-7xl">
            Explore Modern Development Libraries
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Browse curated React, frontend, and backend libraries designed to
            simplify your workflow, boost productivity, and inspire your next
            project.
          </p>
        </div>
      </section>

      <Suspense
        fallback={<div className="px-4 py-20 text-center">loading...</div>}
      >
        <Libraries categories={categories} />
      </Suspense>
    </div>
  )
}
