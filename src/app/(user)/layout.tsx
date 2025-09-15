'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoggedIn, isAuthResolved } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthResolved && !isLoggedIn) {
      router.replace('/login')
    }
  }, [isAuthResolved, isLoggedIn, router])

  if (!isAuthResolved) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        {/* <p>Checking authentication...</p> */}
      </section>
    )
  }

  if (!isLoggedIn) {
    return null // redirecting
  }

  return <>{children}</>
}
