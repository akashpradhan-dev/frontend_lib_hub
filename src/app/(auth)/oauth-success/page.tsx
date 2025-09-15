'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'
import { useMeQuery } from '@/services/query/useMeQuery'
import { useEffect } from 'react'

export default function OAuthSuccessPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { data, status } = useMeQuery()

  const renderContent = () => {
    if (status === 'pending') {
      return (
        <div className="flex flex-col items-center">
          <span className="mt-3 text-white/80">Authenticating...</span>
        </div>
      )
    }

    if (status === 'error') {
      return (
        <p className="text-red-200 mt-4">
          Something went wrong. Redirecting you to login...
        </p>
      )
    }

    return null
  }

  useEffect(() => {
    if (status === 'success' && data?.status === 'success') {
      const user = data.data
      login(user)
      toast.success('Google login successful!', { id: 'login_success' })
      router.replace(user.role === 'admin' ? '/dashboard' : '/profile')
    } else if (status === 'error') {
      toast.error('Google login failed. Redirecting to login.')
      router.replace('/login')
    }
  }, [status, data, login, router])

  return (
    <section className="flex items-center justify-center min-h-[90vh] ">
      <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-lg p-12 text-center max-w-md w-full animate-fadeIn">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Logging You In
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-base md:text-lg mb-8">
          Connecting your Google account. Please wait a moment.
        </p>

        {/* Loading Spinner */}
        <div className="flex justify-center mb-6">
          <div className="size-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>

        {/* Optional dynamic content */}
        <div className="text-white/50 text-sm md:text-base">
          {renderContent()}
        </div>
      </div>
    </section>
  )
}
