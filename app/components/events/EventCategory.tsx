'use client'

import Image, { StaticImageData } from 'next/image'

interface EventCategoryProps {
  icon: StaticImageData
  label: string
}

export const EventCategory: React.FC<EventCategoryProps> = ({
  icon,
  label
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Image
          src={icon}
          width={45}
          height={45}
          className="text-neutral-600"
          alt="categoria"
        />
        {label.slice(0,label.length-1)}
      </div>
    </div>
  )
}
