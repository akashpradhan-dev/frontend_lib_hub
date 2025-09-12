import { Button } from '@/components/ui/button'
import MyLibraries from '@/components/user/MyLibraries'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

const MyLibrariesList = () => {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <section className="pt-6 md:pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            My Library
          </h1>
          <Button asChild>
            <Link href="/libraries/new">
              <PlusIcon className="size-5" />
              Add New
            </Link>
          </Button>
        </div>
        <MyLibraries />
      </section>
    </div>
  )
}

export default MyLibrariesList
