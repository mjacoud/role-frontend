'use client'

import { useRouter } from 'next/navigation'
import { Container } from '../components/Container'
import { Heading } from '../components/Heading'
import { SafeUser } from '../types'
import { EventsCard } from '../components/events/EventsCard'
import { Event } from '@prisma/client'

interface FavoriteEventsClientProps {
  currentUser?: SafeUser | null
  favoriteEvents?: Event[]
}

export const FavoriteEventsClient: React.FC<
  FavoriteEventsClientProps
> = async ({ favoriteEvents, currentUser }) => {
  return (
    <Container>
      <Heading
        title="Favoritos"
        subtitle="Os eventos que você já curtiu ou ainda vai aproveitar! "
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {favoriteEvents?.map(item => (
          <EventsCard data={item} key={item.id} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  )
}
