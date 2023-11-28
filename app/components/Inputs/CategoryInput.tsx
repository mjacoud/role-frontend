'use client'

import { StaticImageData } from 'next/image'
import Image from 'next/image'

interface CategoryInputProps {
  icon: StaticImageData
  label: string
  selected?: boolean
  onClick: (value: string) => void
}

export const CategoryInput: React.FC<CategoryInputProps> = ({
  icon,
  label,
  selected,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
  hover:border-blacktransition
  flex
  cursor-pointer
  flex-col
  items-center
  gap-3
  rounded-xl
  border-2
  p-4
  ${selected ? 'border-black' : 'border-neutral-200'}`}
    >
      <Image src={icon} width={50} height={50} alt={label} />
      <div className="font-semibold">{label}</div>
    </div>
  )
}
