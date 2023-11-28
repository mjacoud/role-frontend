import { create } from 'zustand'

interface PublishEventModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const usePublishEventModal = create<PublishEventModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
