'use client'

import { useCallback } from 'react'

interface BooleanInputProps {
  title: string
  subtitle: string
  value: number
  onChange: (value: boolean) => void
}

export const BooleanInput: React.FC<BooleanInputProps> = ({
  title,
  subtitle,
  value,
  onChange
}) => {
  const toggle = useCallback(() => {
    onChange(!value)
  }, [onChange, value])

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <input
          type="checkbox"
          onClick={toggle}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
        />
      </div>
    </div>
  )
}
