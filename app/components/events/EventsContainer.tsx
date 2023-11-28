'use client'

import { EventsCard } from './EventsCard'
import { Event } from '@/app/types'

interface EventsContainerProps {
  events: Event[]
}

export const EventsContainer: React.FC<EventsContainerProps> = ({ events }) => {
  return (
    <div
      className="grid
grid-cols-1
gap-8
pt-24
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
xl:grid-cols-5
2xl:grid-cols-6"
    >
      {events.map((event: any) => {
        return <EventsCard key={event.title} data={event} />
      })}
    </div>
  )
}
