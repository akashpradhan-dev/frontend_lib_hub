import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

interface AlertModalProps {
  name: string
  title: string
  description: string
  onCancel: () => void
  onContinue: () => void
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  disabled?: boolean
  className?: string
  buttonVariant?:
    | 'outline'
    | 'link'
    | 'default'
    | 'destructive'
    | 'secondary'
    | 'ghost'
    | null
    | undefined
}
export function AlertModal({
  name,
  title,
  description,
  onCancel,
  onContinue,
  isOpen,
  setIsOpen,
  disabled,
  className = '',
  buttonVariant = 'outline',
}: AlertModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className={cn('w-full', className)}
          disabled={disabled}
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true)
            }
          }}
          variant={buttonVariant}
        >
          {name}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <Button onClick={onContinue}>Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
