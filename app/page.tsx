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
  price?: string | number | undefined | null
  startDate?: string | null
  category?: string | null
  radius?: number | null
  latitude?:number| null
  longitude?:number| null
}

const Home = () => {
  const [eventsData, setEventsData] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const searchParams = useSearchParams()

  function parseUrlParams(url: string): SearchParams {
    const params = new URLSearchParams(url)
    const latitude =params.get('latitude') || null
    const longitude =params.get('longitude') || null
    const radius = params.get('radius') || null
    const category = params.get('category') || null
    const startDate = params.get('startDate') || null
    const endDate = params.get('endDate') || null
    const price = params.get('price') || null

    return {
      latitude:Number(latitude),
      longitude:Number(longitude),
      radius: Number(radius),
      price:price,
      startDate: startDate,
      endDate: endDate,
      category: category
    }
  }

  const fetchEvents = () => {
    setIsLoading(true)
    console.log(`Search Params: ${searchParams.toString()}`)
    
    axios
      .post(
        'https://role-backend.onrender.com/getEvents',
        parseUrlParams(searchParams.toString())
      )
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
