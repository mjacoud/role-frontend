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
import { useSearchParams } from 'next/navigation'

interface SearchParams {
  endDate?: string | null
  price?: number | null
  startDate?: string | null
  coordenates?: number[] | null
  category?: string | null
  radius?: number | null
}

const Home = () => {
  const [eventsData, setEventsData] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const searchParams = useSearchParams()

  console.log(parseUrlParams(searchParams.toString()))

  function parseUrlParams(url: string): SearchParams {
    const params = new URLSearchParams(url)

    const endDate = params.get('endDate') || null
    const price = params.get('price') || null
    const startDate = params.get('startDate') || null
    const location = params.getAll('location') || null
    const radius = params.get('radius') || null
    const category = params.get('category') || null

    return {
      endDate: endDate,
      price: Number(price),
      startDate: startDate,
      coordenates:
        location && location.length === 2
          ? [Number(location[0]), Number(location[1])]
          : null,
      radius: Number(radius),
      category: category
    }
  }

  const fetchEvents = () => {
    setIsLoading(true)

    axios
      .post(
        'https://role-backend.onrender.com/getEvents',
        parseUrlParams(searchParams.toString())
      )
      .then(response => {
        console.log(parseUrlParams(searchParams.toString()))
        console.log(searchParams.toString())
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
