'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import toast from 'react-hot-toast'
import { useMeQuery } from '@/services/query/useMeQuery'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function OAuthSuccessPage() {
  const router = useRouter()
  const { login } = useAuth()
  const param = useSearchParams()
  const token = param.get('token')

  // Store token immediately so TanStack Query can use it
  if (token) {
    Cookies.set('token', token, { expires: 7 })
  }

  const { data, status, error } = useMeQuery({
    enabled: !!token,
  })

  useEffect(() => {
    if (status === 'success' && data?.status === 'success') {
      const user = data.data
      login(user) // ✅ safe here
      toast.success('Google login successful!', { id: 'login_success' })
      router.replace(
        user.role === 'admin' ? '/admin/dashboard' : '/user/profile',
      )
    } else if (status === 'error') {
      toast.error('Google login failed. Redirecting to login.')
      console.error('OAuth login failed:', error?.message)
      router.replace('/login')
    }
  }, [status, data, error, login, router])

  return (
    <section className="flex items-center justify-center min-h-[90vh] ">
      <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-lg p-12 text-center max-w-md w-full animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Logging You In
        </h1>
        <p className="text-white/70 text-base md:text-lg mb-8">
          Connecting your Google account. Please wait a moment.
        </p>
        <div className="flex justify-center mb-6">
          <div className="size-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
        <div className="text-white/50 text-sm md:text-base">
          {status === 'pending' && 'Authenticating...'}
          {status === 'error' && 'Something went wrong. Redirecting you...'}
        </div>
      </div>
    </section>
  )
}
