import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Library } from '@/types/sharedTypes'
import LikeButton from './LikeButton'

interface LibraryCardProps {
  library: Library
}

export const LibraryCard = ({ library }: LibraryCardProps) => {
  return (
    <div className="block h-full no-underline transition-transform duration-300 hover:scale-[1.03]">
      <Card className="flex h-full flex-col justify-between rounded-2xl border bg-card/80 p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/10">
        {/* Header */}
        <CardHeader className="flex flex-row items-start justify-between p-0">
          <CardTitle className="text-xl font-semibold capitalize tracking-tight">
            {library.name}
          </CardTitle>

          <CardAction>
            <LikeButton libraryId={library._id} liked={library?.liked} />
          </CardAction>
        </CardHeader>
        <Link href={`/lib/${library._id}`}>
          {/* Content */}
          <CardContent className="mt-4 flex-1 space-y-4 p-0">
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {library.description}
            </p>

            {library?.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {library.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="rounded-full px-3 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          {/* Footer */}
          <CardFooter className="mt-6 p-0">
            <Button
              variant="default"
              className="w-full rounded-xl font-medium transition-colors"
            >
              View Details
            </Button>
          </CardFooter>
        </Link>
      </Card>
    </div>
  )
}
