'use client'

import { AiOutlineMenu } from 'react-icons/ai'
import { Avatar } from '../Avatar'
import { useCallback, useState } from 'react'
import { MenuItem } from './MenuItem'
import { useRegisterModal } from '@/app/hooks/useRegisterModal'
import { useLoginModal } from '@/app/hooks/useLoginModal'
import { usePublishEventModal } from '@/app/hooks/usePublishEventModal'
import { useRouter } from 'next/navigation'

export const UserMenu = () => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const publishEventModal = usePublishEventModal()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value)
  }, [])

  /*   const onPublishEvent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    return publishEventModal.onOpen()
  }, [currentUser, loginModal, publishEventModal])
 */
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          /* onClick={onPublishEvent} */
          className="
          trasition
          hidden
          cursor-pointer
          rounded-full
          px-4
          py-3
          text-sm
          font-semibold
        hover:bg-neutral-100
          md:block"
        >
          Publique seu Evento
        </div>
        <div
          onClick={toggleOpen}
          className="
        rounded-fullborder-[1px]
        flex
        cursor-pointer
        flex-row
        items-center
        gap-3 
      border-neutral-200
        p-4
        transition
        hover:shadow-md
        md:px-2
        md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {/* <Avatar src={currentUser?.image} /> */}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {
              /* currentUser ? (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Meus Eventos" />
                <MenuItem
                  onClick={() => router.push('/favoriteEvents')}
                  label="Favoritos"
                />
                <MenuItem
                  onClick={publishEventModal.onOpen}
                  label="Publicar Evento"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Deslogar" />
              </>
            ) : */ <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Inscrever-se" />
              </>
            }
          </div>
        </div>
      )}
    </div>
  )
}
