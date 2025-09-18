'use client'
import React, { useState } from 'react'
// import { Button } from '../ui/button'
// import { Trash2 } from 'lucide-react'
import { useDeleteMutation } from '@/services/mutation/user/deleteLibrary'
import { AlertModal } from '../AlertModal'
import toast from 'react-hot-toast'

export const DeleteLibrary = ({ id }: { id: string }) => {
  const { mutate } = useDeleteMutation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="">
      <AlertModal
        name={'Delete'}
        buttonVariant="destructive"
        className="h-8 "
        title="Are you sure?"
        description="Are you sure you want to delete this library?"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onCancel={() => {
          setIsOpen(false)
        }}
        onContinue={() => {
          mutate(
            {
              libraryId: id,
            },
            {
              onSuccess: () => {
                toast.success('Library deleted sucessfully')
                setIsOpen(false)
              },
            },
          )
        }}
      />
    </div>
  )
}
