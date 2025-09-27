'use client'

import { LibraryCard } from '@/components/LibraryCard'
import React from 'react'
import { useLibrariesQuery } from '@/services/query/libraries'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

const categories = ['All', 'Backend', 'Frontend', 'Mobile', 'DevOps']

const Libraries = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') || 'All'

  // fetch libraries based on category in URL
  const { data, status } = useLibrariesQuery({
    category: categoryParam === 'All' ? '' : categoryParam,
  })

  const handleCategoryClick = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', cat)
    router.push(`/lib?${params.toString()}`)
  }

  if (status === 'pending') {
    return <div>loading...</div>
  }
  const list = data?.data

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

      {/* Libraries Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:items-end mb-3">
          {/* Category badges */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition 
                ${
                  categoryParam === cat
                    ? 'bg-gradient-color text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {list?.map(library => (
            <LibraryCard key={library._id} library={library} />
          ))}
        </div>

        {/* Empty State */}
        {list?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
            <p className="text-lg">No libraries found.</p>
            <p className="mt-2 text-sm">Please check back later.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Libraries
