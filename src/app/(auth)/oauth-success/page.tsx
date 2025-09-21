import OAuthSuccessPage from '@/components/OAuthSuccess'
import React from 'react'

function success() {
  return (
    <section className="flex items-center justify-center min-h-[90vh] ">
      <div className="bg-white/5 backdrop-blur-md rounded-3xl shadow-lg p-12 text-center max-w-md w-full animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Logging You In
        </h1>
        <p className="text-white/70 text-base md:text-lg mb-8">
          Connecting your Google account. Please wait a moment.
        </p>
        <OAuthSuccessPage />
      </div>
    </section>
  )
}

export default success
