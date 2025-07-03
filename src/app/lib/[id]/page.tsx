import { _libraries } from '../../../../data/libraries'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronLeft, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LibaryDetailsTabs } from '@/components/LibaryDetailsTabs'
import Link from 'next/link'

const libraryDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const library = _libraries.find(lib => lib.id.toString() === id.toString())
  if (!library) {
    return (
      <div className="text-center  text-lg h-[80vh] flex justify-center items-center">
        Sorry, Library not found
      </div>
    )
  }
  return (
    <div>
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <Link
          href="/lib"
          className={`flex items-center gap-2 mb-6 cursor-pointer  md:hidden`}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Libraries
        </Link>
        <div className="max-w-7xl mx-auto flex flex-col items-center w-full md:w-2/3">
          <Card className="group sm:w-full  bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{library?.name}</h2>
                  <span className="text-slate-400 text-sm flex items-center">
                    <Star className="inline mr-1 size-4 text-yellow-500" />
                    {library?.stars}
                  </span>
                </div>
              </CardTitle>

              <CardAction>
                <Button
                  variant="link"
                  className="text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  View on GitHub
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="">
              <div className="flex items-center gap-2 mb-4 ">
                <span className="text-slate-300 line-clamp-3">
                  {library?.overview}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {library?.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 w-full border p-2 bg-slate-800/30 backdrop-blur-sm border-slate-700/50 rounded-2xl">
            <LibaryDetailsTabs library={library} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default libraryDetails
