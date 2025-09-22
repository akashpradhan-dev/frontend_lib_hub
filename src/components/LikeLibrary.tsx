'use client'
import { useState } from 'react'
import { AlertModal } from './AlertModal'
import { useAuth } from '@/contexts/AuthContext'
import { useLikeMutation } from '@/services/mutation/likeLibrary'
import toast from 'react-hot-toast'

const LikeLibrary = ({ libraryId }: { libraryId: string }) => {
  const [isOpen, setIsOpen] = useState(false)

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
        liked: true,
      },
      {
        onSuccess: () => {
          setIsOpen(false)
          toast.success(`you have liked this library`)
        },
      },
    )
  }

  return (
    <div className="mt-2 w-full">
      <AlertModal
        name={'Like'}
        disabled={status === 'pending'}
        title="Are you absolutely sure?"
        description="Are you sure you want to like this library?"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCancel={() => {
          setIsOpen(false)
        }}
        onContinue={handleLike}
      />
    </div>
  )
}

export default LikeLibrary
