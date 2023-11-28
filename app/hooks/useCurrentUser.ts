import { create } from 'zustand'

interface CurrentUserStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useLoginModal = create<CurrentUserStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
