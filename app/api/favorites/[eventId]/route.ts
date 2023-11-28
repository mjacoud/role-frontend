import { NextResponse } from 'next/server'
import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
  eventId?: string
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { eventId } = params

  if (!eventId || typeof eventId !== 'string') {
    throw new Error('ID INVÁLIDO')
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds.push(eventId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  })

  return NextResponse.json(user)
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { eventId } = params
  if (!eventId || typeof eventId !== 'string') {
    throw new Error('ID INVÁLIDO')
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds = favoriteIds.filter(id => id !== eventId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds: favoriteIds
    }
  })
  return NextResponse.json(user)
}
