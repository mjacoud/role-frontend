'use client'

import axios from 'axios'
import { ClientOnly } from './components/ClientOnly'
import { Container } from './components/Container'
import { EmptyState } from './components/EmptyState'
import { EventsContainer } from './components/events/EventsContainer'
import { useEffect, useState } from 'react'
import { Event } from './types'
import toast from 'react-hot-toast'
import { Loading } from './components/Loading'

const Home = ({ searchParams }: any) => {
  const [eventsData, setEventsData] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchEvents = () => {
    setIsLoading(true)

    axios
      .post('http://localhost:3500/events', searchParams)
      .then(response => {
        setEventsData(response.data)
      })
      .catch(() => toast.error('Erro ao buscar eventos'))
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchEvents()
  }, [searchParams])

  if (eventsData.length === 0) {
    return (
      <ClientOnly>
        {isLoading ? <Loading /> : <EmptyState showReset />}
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        {isLoading ? <Loading /> : <EventsContainer events={eventsData} />}
      </Container>
    </ClientOnly>
  )
}
export default Home
