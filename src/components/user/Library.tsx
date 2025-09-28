'use client'
import { ChevronLeft, EditIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { LibaryDetailsTabs } from '../LibaryDetailsTabs'
import { useMyLibraryByIdQuery } from '@/services/query/myLibraryById'
import { AlertModal } from '../AlertModal'
import toast from 'react-hot-toast'
import { usePublishMutation } from '@/services/mutation/user/publish'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const Library = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { data, status, error } = useMyLibraryByIdQuery({ id })
  const router = useRouter()
  const { mutate } = usePublishMutation()

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
      <Button
        variant="link"
        onClick={() => router.back()}
        className="mb-6 cursor-pointer flex max-w-7xl justify-start items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors md:w-2/3 md:mx-auto"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Libraries
      </Button>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center md:w-2/3">
        {/* Card Section */}
        <Card className="group w-full rounded-2xl border gap-2 bg-card/80 px-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <CardHeader className="flex flex-row items-center justify-between p-0">
            <CardTitle className="w-full text-2xl font-bold tracking-tight flex justify-between items-center">
              {library.name}
              <Link href={`/user/libraries/my-libraries/${library._id}/edit`}>
                <EditIcon className="size-5" />
              </Link>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 p-0">
            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed">
              {library.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {library?.category && (
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-0.5 text-xs font-medium"
                >
                  {library?.category}
                </Badge>
              )}

              {library?.framework && (
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-0.5 text-xs font-medium"
                >
                  {library?.framework}
                </Badge>
              )}

              {library?.language && (
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-0.5 text-xs font-medium"
                >
                  {library?.language}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <div className="mt-8 w-full rounded-2xl border bg-card/80 p-4 shadow-sm backdrop-blur-sm">
          <LibaryDetailsTabs library={library} />
        </div>

        <div className="mt-2 w-full">
          <AlertModal
            name={
              library.status === 'pending'
                ? 'Request for publish'
                : library.status === 'approved'
                  ? 'Published'
                  : 'Publish'
            }
            disabled={library.status !== 'created'}
            title="Are you absolutely sure?"
            description="After submit admin will review and publish your library"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onCancel={() => {
              setIsOpen(false)
            }}
            onContinue={() => {
              mutate(
                {
                  libraryId: id,
                  action: 'publish',
                },
                {
                  onSuccess: () => {
                    toast.success('Send for publish')
                    setIsOpen(false)
                  },
                },
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}
