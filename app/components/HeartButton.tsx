'use client'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { SafeUser } from '../types'
import { useFavorite } from '../hooks/useFavorite'

interface HeartButtonProps {
  eventId: string
  currentUser?: SafeUser | null
}

export const HeartButton: React.FC<HeartButtonProps> = ({
  eventId,
  currentUser
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ eventId, currentUser })

  return (
    <div
      onClick={toggleFavorite}
      className="relative
  cursor-pointer
  transition
  hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-amber-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}
