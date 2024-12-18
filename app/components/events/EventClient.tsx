'use client'

import { Container } from '@/app/components/Container'
import { categories } from '@/app/components/navbar/Categories'

import { EventHead } from './EventHead'
import { EventInfo } from './EventInfo'
import dynamic from 'next/dynamic'
import { Event } from '@/app/types'
import { EventPrice } from './EventPrice'
import NoSSRCalendar from 'react-calendar'
import Link from 'next/link'


const Map = dynamic(() => import('../LocalMap'), {
  ssr: false
})

export const EventClient = ({ event }: { event: Event }) => {
  const category = categories.find(item => item.label === event.category)

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <EventHead
            title={event.title} 
            imageSrc={event.imageSrc}
            coordenates={[event.latitude,event.longitude]}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <EventInfo
              category={category}
              coordenates={[event.latitude,event.longitude]}
              description={event.description}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white ">
                <EventPrice price={event.price} /> 
                <div className="py-10 flex justify-center">
                  <NoSSRCalendar  value={[new Date(event.startDate), new Date(event.endDate)]} /> 
                </div>

                <hr />
                <Map center={[event.latitude,event.longitude]} />
                <div className="flex flex-row items-center justify-between p-4 py-5 text-lg font-semibold">
                  <button
                    className="disabled:opacity:70
    text-md
    relative
    w-full
    rounded-lg
    border-2
    bg-amber-500
    py-3
    font-semibold
    text-white
    transition
    hover:opacity-80
    disabled:cursor-not-allowed
    "
                  >
                    <Link
                      href={event.eventSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ir para o site
                    </Link> 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
