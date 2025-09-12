'use client'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { LibaryDetailsTabs } from '../LibaryDetailsTabs'
import { useMyLibraryByIdQuery } from '@/services/query/myLibraryById'

export const Library = ({ id }: { id: string }) => {
  const { data, status, error } = useMyLibraryByIdQuery({ id })

  if (status === 'pending') {
    return (
      <div className="w-full">
        <span>Loading MyLibraries...</span>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="w-full">
        <span>Something went wrong {error.message}</span>
      </div>
    )
  }

  const library = data.data
  return (
    <div>
      <Link
        href="/profile"
        className="mb-6 flex max-w-7xl items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors md:w-2/3 mx-auto"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Libraries
      </Link>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center md:w-2/3">
        {/* Card Section */}
        <Card className="group w-full rounded-2xl border gap-2 bg-card/80 px-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {library.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 p-0">
            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed">
              {library.description}
            </p>

            {/* Tags */}
            {library?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {library.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <div className="mt-8 w-full rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur-sm">
          <LibaryDetailsTabs library={library} />
        </div>
      </div>
    </div>
  )
}
