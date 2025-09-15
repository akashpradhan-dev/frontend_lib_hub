'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export function useProtectedRoute() {
  const { isLoggedIn, isAuthResolved } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthResolved && !isLoggedIn) {
      router.replace('/login')
    }
  }, [isAuthResolved, isLoggedIn, router])

  return { isLoggedIn, isAuthResolved }
}
