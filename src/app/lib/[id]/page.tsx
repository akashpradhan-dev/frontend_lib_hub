import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { LibaryDetailsTabs } from '@/components/LibaryDetailsTabs'
import Link from 'next/link'
import { BaseResponse, Library } from '@/types/sharedTypes'
import LikeLibrary from '@/components/LikeLibrary'

interface ResponseType extends BaseResponse {
  data: Library
}

const libraryDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const baseUrl = process.env.NEXT_PUBLIC_API_URL as string

  const url = baseUrl + '/v1/libraries/' + id
  const data = await fetch(url, { cache: 'no-store' })
  const res: ResponseType = await data.json()

  const library = res.data

  if (res.status !== 'success') {
    return (
      <div className="flex h-[80vh] items-center justify-center text-lg text-muted-foreground">
        Something went wrong
      </div>
    )
  }
  if (!library) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-lg text-muted-foreground">
        No Data found
      </div>
    )
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <section className="pt-6 md:pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/lib"
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
              {/* <CardAction>
                <Link
                  href={library.repositoryUrl}
                  target="_blank"
                  className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <EyeIcon className="h-5 w-5" />
                </Link>
              </CardAction> */}
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

          <LikeLibrary libraryId={library._id} />
        </div>
      </section>
    </div>
  )
}

export default libraryDetails
