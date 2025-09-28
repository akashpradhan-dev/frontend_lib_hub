'use client'
import React, { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import { CheckIcon, Clipboard } from 'lucide-react'

export const ShareLibrary = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href) // copy current URL
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // reset after 2s
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" onClick={handleCopy}>
          {copied ? (
            <CheckIcon className="size-5 text-green-500" />
          ) : (
            <Clipboard className="size-5" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Share</p>
      </TooltipContent>
    </Tooltip>
  )
}
