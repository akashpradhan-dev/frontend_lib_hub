'use client'
import { Button } from './ui/button'
import { HeartIcon } from 'lucide-react'
import { useLikeMutation } from '@/services/mutation/likeLibrary'
import toast from 'react-hot-toast'
import { useAuth } from '@/contexts/AuthContext'

const LikeButton = ({
  libraryId,
  liked = false,
}: {
  libraryId: string
  liked: boolean | undefined
}) => {
  const { isLoggedIn } = useAuth()
  const { mutate, status } = useLikeMutation()
  const handleLike = () => {
    if (!isLoggedIn) {
      toast.error('Please login to like')
      return
    }
    mutate(
      {
        libraryId,
        liked: !liked,
      },
      {
        onSuccess: () => {
          toast.success(`you have ${liked ? 'unliked' : 'like'} this library`)
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
        <HeartIcon className="h-5 w-5 text-red-500" fill="red" />
      ) : (
        <HeartIcon className="h-5 w-5" />
      )}
    </Button>
  )
}

export default LikeButton
