'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/contexts/AuthContext'
const queryClient = new QueryClient()

export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
      <Toaster position="top-center" />
    </NextThemesProvider>
  )
}
