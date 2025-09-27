import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SelectProps } from '@radix-ui/react-select'

interface Item<T extends string> {
  value: T
  name: string
}

interface SingleSelectProps<T extends string> extends SelectProps {
  placeholder: string
  selectLabel?: string
  items: Item<T>[]
}

export function SingleSelect<T extends string>({
  placeholder = 'Select a item',
  selectLabel,
  items,
  ...props
}: SingleSelectProps<T>) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
          {items.map(item => (
            <SelectItem key={item.value} value={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
