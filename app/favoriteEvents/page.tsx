import { ClientOnly } from '../components/ClientOnly'
import { EmptyState } from '../components/EmptyState'
import getCurrentUser from '../actions/getCurrentUser'
import { FavoriteEventsClient } from './FavoriteEventsClient'
import getFavoriteEvents from '../actions/getEventsById'

export default async function favoriteEvents() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Não Autorizado"
          subtitle="Por favor, realize o login"
        />
      </ClientOnly>
    )
  }

  if (currentUser?.favoriteIds.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Nenhum evento encontrado"
          subtitle="Parece que você não favoritou nenhum evento ainda"
        />
      </ClientOnly>
    )
  }
  const favoriteEvents = await getFavoriteEvents({ userId: currentUser.id })

  return (
    <ClientOnly>
      <FavoriteEventsClient
        currentUser={currentUser}
        favoriteEvents={favoriteEvents}
      />
    </ClientOnly>
  )
}
