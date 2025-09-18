import { useAuth } from '@/contexts/AuthContext'
import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'

export const ProfileSection = () => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col justify-between md:flex-row items-center md:items-start gap-6 md:gap-12 mb-12">
      {/* <Avatar
          src={dummyUser.avatarUrl}
          className="w-28 h-28 ring-2 ring-purple-500 dark:ring-pink-500"
        /> */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {user?.name}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">{user?.email}</p>
        {/* {user?.bio && (
          <p className="mt-2 text-slate-600 dark:text-slate-300">{user?.bio}</p>
        )} */}
      </div>
      <Button asChild>
        <Link href="/libraries/new">
          <PlusIcon className="size-5" />
          Add New
        </Link>
      </Button>
    </div>
  )
}
