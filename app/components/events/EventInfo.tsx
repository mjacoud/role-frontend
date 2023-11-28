'use client'

import { format } from 'date-fns'
import { StaticImageData } from 'next/image'
import { EventCategory } from './EventCategory'

import parse from 'html-react-parser'

interface EventInfoProps {
  description: string
  eventSrc: string | null
  location: string
  coordenates: number[]
  dateRange: Date[]
  category:
    | {
        icon: StaticImageData
        label: string
      }
    | undefined
}

export const EventInfo: React.FC<EventInfoProps> = ({
  category,
  dateRange,
  description,
  location
}) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-neutral-500">
          Local: <span className="font-bold text-black">{location}</span>
        </div>
        <div className="text-neutral-500">
          Data:{' '}
          <span className="font-bold text-black">
            &#32;
            {`${format(new Date(dateRange[0]), 'dd/MM/yy')} até
              ${format(new Date(dateRange[1]), 'dd/MM /yy')}`}
          </span>
        </div>

        <div
          className="flex
        flex-row
        items-center
        gap-4
        font-light
        text-neutral-500"
        ></div>
      </div>
      <hr />
      {category && (
        <EventCategory icon={category.icon} label={category.label} />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {parse(description)}
      </div>
    </div>
  )
}
