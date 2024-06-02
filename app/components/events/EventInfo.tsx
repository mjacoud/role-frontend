'use client'

import { StaticImageData } from 'next/image'
import { EventCategory } from './EventCategory'

import parse from 'html-react-parser'

interface EventInfoProps {
  description: string

  location: string
  coordenates: number[]

  category:
    | {
        icon: StaticImageData
        label: string
      }
    | undefined
}

export const EventInfo: React.FC<EventInfoProps> = ({
  category,
  description,
  location
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
     
      <hr />
      <div className="flex items-center justify-between">
        {category && (
          <EventCategory icon={category.icon} label={category.label} />
        )}
        <div className="flex flex-col">
          <div className='flex gap-4'>
            <div>Seg - Sex</div>
            <div>5:00 - 20:00</div>
          </div>
          <div className='flex gap-4'>
            <div>Sábado</div>
            <div>5:00 - 20:00</div>
          </div>
          <div className='flex gap-4'>
            <div>Domingo</div>
            <div>5:00 - 20:00</div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {parse(description)}
      </div>
    </div>
  )
}
