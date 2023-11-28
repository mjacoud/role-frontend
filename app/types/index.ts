import { User } from '@prisma/client'

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type Event = {
  _id: string
  imageSrc: string
  title: string
  description: string
  coordenates: number[]
  location: string
  startDate: Date
  endDate: Date
  price: number
  category: string
  eventSrc: string
}
