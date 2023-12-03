'use client'

import { ClientOnly } from '@/app/components/ClientOnly'
import { EmptyState } from '@/app/components/EmptyState'
import { Loading } from '@/app/components/Loading'
import { EventClient } from '@/app/components/events/EventClient'
import { Event } from '@/app/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface IParams {
  eventId?: string
}

const EventPage = ({ params }: { params: IParams }) => {
  const [eventData, setEventData] = useState<Event | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchEventById = () => {
    setIsLoading(true)

    axios
      .post('https://role-backend.onrender.com/getEventById', params)
      .then(response => {
        setEventData(response.data)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchEventById()
  }, [])

  if (!eventData) {
    return <ClientOnly>{isLoading ? <Loading /> : <EmptyState />}</ClientOnly>
  }

  return (
    <ClientOnly>
      <EventClient event={eventData} />
    </ClientOnly>
  )
}

export default EventPage
