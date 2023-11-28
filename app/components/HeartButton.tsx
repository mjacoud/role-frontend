'use client'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
  eventId: string
}

export const HeartButton: React.FC<HeartButtonProps> = ({ eventId }) => {
  /*   const { hasFavorited, toggleFavorite } = useFavorite({ eventId }) */

  return (
    <div
      /*  onClick={toggleFavorite} */
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
        className={
          /* hasFavorited ? 'fill-amber-500' :  */ 'fill-neutral-500/70'
        }
      />
    </div>
  )
}
