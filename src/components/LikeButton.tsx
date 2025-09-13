'use client'
import { Button } from './ui/button'
import { HeartIcon } from 'lucide-react'
import { useLikeMutation } from '@/services/mutation/likeLibrary'
import toast from 'react-hot-toast'

const LikeButton = ({
  libraryId,
  liked,
}: {
  libraryId: string
  liked: boolean
}) => {
  const { mutate, status } = useLikeMutation()
  const handleLike = () => {
    mutate(
      {
        libraryId,
        liked,
      },
      {
        onSuccess: () => {
          toast.success('you have liked this library')
        },
      },
    )
  }
  return (
    <Button
      variant="link"
      className="rounded-full text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
      aria-label="Add to favorites"
      disabled={status === 'pending'}
      onClick={handleLike}
    >
      {liked ? (
        <HeartIcon className="h-5 w-5" />
      ) : (
        <HeartIcon className="h-5 w-5 text-red-500" fill="red" />
      )}
    </Button>
  )
}

export default LikeButton
