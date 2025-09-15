'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ChartArea,
  CircleUser,
  Heart,
  Library,
  LogOut,
  Moon,
  Sun,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { User } from '@/services/mutation/login'
import { useLogoutMutation } from '@/services/mutation/logout'
import { useRouter } from 'next/navigation'
import { useMeQuery } from '@/services/query/useMeQuery'

export function Header() {
  const { isLoggedIn, logout, user } = useAuth()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure hydration consistency
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="p-2 cursor-pointer rounded-full bg-white/5 hover:bg-white/10 transition"
        aria-label="Toggle Theme"
      >
        <div className="w-5 h-5" />
      </button>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b dark:border-slate-800 backdrop-blur-lg bg-white/40 dark:bg-black/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          LibraryHub
        </Link>

        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <button
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
            className="p-2 cursor-pointer rounded-full bg-white/5 hover:bg-white/10 transition"
            aria-label="Toggle Theme"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Login / User Popover */}
          {isLoggedIn ? (
            <UserPopover logout={logout} user={user} />
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full border 
             border-slate-300 dark:border-slate-700
             text-sm font-medium 
             text-slate-700 dark:text-slate-300
             hover:text-white 
             hover:border-purple-500 
             hover:bg-purple-500/10 
             transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

interface UserPopoverProps {
  logout: () => void
  user: User | null
}

const UserPopover = ({ logout, user }: UserPopoverProps) => {
  const { mutate } = useLogoutMutation()
  const { data, status } = useMeQuery()
  const { setProfile } = useAuth()
  const router = useRouter()

  // Update profile only once when query succeeds
  useEffect(() => {
    if (status === 'success' && data?.data) {
      setProfile(data.data)
    }
  }, [status, data, setProfile])

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        logout()
        router.push('/login')
      },
      onError: error => console.error('Logout failed', error),
    })
  }

  return (
    <Popover>
      <PopoverTrigger>
        <CircleUser className="w-6 h-6 text-gray-600 cursor-pointer" />
      </PopoverTrigger>

      <PopoverContent>
        <div className="p-2 flex flex-col space-y-1">
          <Button asChild variant="ghost" size="sm" className="justify-start">
            <Link href="/profile">
              <CircleUser className="mr-2 h-4 w-4" /> Profile
            </Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="justify-start">
            <Link href="/libraries/my-libraries">
              <Library className="mr-2 h-4 w-4" /> My Libraries
            </Link>
          </Button>

          <Button asChild variant="ghost" size="sm" className="justify-start">
            <Link href="/liked-libraries">
              <Heart className="mr-2 h-4 w-4" /> Liked Libraries
            </Link>
          </Button>

          {user?.role === 'admin' && (
            <Button asChild variant="ghost" size="sm" className="justify-start">
              <Link href="/dashboard">
                <ChartArea className="mr-2 h-4 w-4" /> Dashboard
              </Link>
            </Button>
          )}
        </div>

        <div className="p-2">
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-start cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
