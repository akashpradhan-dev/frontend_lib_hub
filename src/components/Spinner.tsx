import { cn } from '@/lib/utils'
import React from 'react'

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'size-4 border-2 border-white/20 border-t-white rounded-full animate-spin',
          className,
        )}
      ></div>
    </div>
  )
}
