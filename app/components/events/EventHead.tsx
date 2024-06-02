'use client'

import { Heading } from '@/app/components/Heading'

import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface EventHead {
  title: string
  imageSrc: string
  coordenates: number[]
}

export const EventHead: React.FC<EventHead> = ({
  title,
  imageSrc,
  coordenates
}) => {
  const [address, setAddress] = useState('')

  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${coordenates[0]}&lon=${coordenates[1]}&format=json&apiKey=${process.env.NEXT_PUBLIC_AUTOCOMPLETE_API_KEY}`
  
  console.log(address)
  useEffect(() => {
    axios.get(url).then(res => {
      setAddress(
        `${res.data.results[0].address_line1}
        ${res.data.results[0].address_line2}`
      )
    })
  }, [url])

  return (
    <>
      <Heading title={title} subtitle={address} />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          alt="image"
          src={imageSrc}
          fill
          className="w-full object-cover"
        />
        <div className="absolute right-5 top-5">
          {/*     <HeartButton eventId={id} currentUser={currentUser} /> */}
        </div>
      </div>
    </>
  )
}
