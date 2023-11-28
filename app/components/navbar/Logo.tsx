'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '@/public/images/logo.png'

export const Logo = () => {
  const router = useRouter()

  return (
    <Image
      onClick={() => router.push('/')}
      src={logo}
      alt="logo"
      className="hidden 
      cursor-pointer md:block"
      height="100"
      width="100"
    />
  )
}
