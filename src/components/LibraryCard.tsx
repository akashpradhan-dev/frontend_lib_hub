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
import { Star } from 'lucide-react'
import { LibraryCardProps } from '@/types/sharedTypes'

export const LibraryCard = ({ library }: LibraryCardProps) => {
  return (
    <Link href={`/lib/${library.id}`} className="no-underline">
      <Card className="group bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold capitalize">{library.name}</h2>
              <span className="text-slate-400 text-sm flex items-center">
                <Star className="inline mr-1 size-4 text-yellow-500" />
                {library.stars}
              </span>
            </div>
          </CardTitle>

          <CardAction>
            <Button variant="link">Like</Button>
          </CardAction>
        </CardHeader>
        <CardContent className="">
          <div className="flex items-center gap-2 mb-4 ">
            <span className="text-slate-300 line-clamp-3">
              {library.overview}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {library?.tags?.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full cursor-pointer">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
