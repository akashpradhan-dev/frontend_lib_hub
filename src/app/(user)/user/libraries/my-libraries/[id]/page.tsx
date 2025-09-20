import { Library } from '@/components/user/Library'

const MyLibrariesById = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params

  return (
    <div className="min-h-screen transition-colors duration-300">
      <section className="pt-6 md:pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <Library id={id} />
      </section>
    </div>
  )
}

export default MyLibrariesById
