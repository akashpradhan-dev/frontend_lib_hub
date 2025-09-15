'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'
import { useMeQuery } from '@/services/query/useMeQuery'

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

  if (status === 'success') {
    login(data.data)
    toast.success('Google login successful!')
    router.replace(data.data.role === 'admin' ? '/dashboard' : '/profile')
  }

  if (status === 'error') {
    toast.error('Google login failed. Please try again.')
    router.replace('/login')
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4">
      <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-10 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Logging you in...</h1>
        <p className="mb-6 text-white/90">
          We are connecting your Google account. Please wait a moment.
        </p>
        {renderContent()}
      </div>
    </section>
  )
}
