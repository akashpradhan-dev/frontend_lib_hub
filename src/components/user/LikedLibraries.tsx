'use client'
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { useLikedLibrariesQuery } from '@/services/query/likedLibraries'
import LikeButton from '../LikeButton'

export const LikedLibraries = () => {
  const { data, status, error } = useLikedLibrariesQuery()
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
        <span>Something went wrong ${error.message}</span>
      </div>
    )
  }

  const libraries = data?.data

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {libraries.length == 0 && <span>No Library found</span>}
      {libraries?.map(lib => (
        <Card
          key={lib._id}
          className="h-full flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                {lib.name}{' '}
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  v{lib.version}
                </span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-slate-600 dark:text-slate-300 hover:text-purple-500"
              >
                <a href={lib.repositoryUrl} target="_blank">
                  <Github className="w-4 h-4 mr-1" /> Repo
                </a>
              </Button>
            </CardTitle>

            <CardAction>
              <LikeButton libraryId={lib._id} liked={lib?.liked} />
            </CardAction>
          </CardHeader>

          <CardContent className="flex flex-col justify-between flex-1 space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
              {lib.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {lib.tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
