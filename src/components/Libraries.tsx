'use client'

import { LibraryCard } from '@/components/LibraryCard'
import { Button } from '@/components/ui/button'
import { useLibrariesQuery } from '@/services/query/libraries'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  categories: string[]
}

export function Libraries({ categories }: Props) {
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
    return <div className="px-4 py-20 text-center">loading...</div>
  }

  const list = data?.data

  return (
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

      {/* Libraries Grid */}
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
  )
}
