import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

import { SafeUser } from '../types'

import { useLoginModal } from './useLoginModal'

interface IUseFavorite {
  eventId: string
  currentUser?: SafeUser | null
}

export const useFavorite = ({ eventId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []
    return list.includes(eventId)
  }, [currentUser, eventId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${eventId}`)
        } else {
          request = () => axios.post(`/api/favorites/${eventId}`)
        }

        await request()
        router.refresh()
      } catch (error) {
        toast.error('Alguma coisa deu errado')
      }
    },
    [currentUser, hasFavorited, eventId, loginModal, router]
  )

  return {
    hasFavorited,
    toggleFavorite
  }
}
