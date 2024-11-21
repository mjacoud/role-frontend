'use client'

import Image, { StaticImageData } from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import qs from 'query-string'

interface CategoryBoxProps {
  icon: StaticImageData
  label: string
  selected?: boolean
}

export const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon,
  label,
  selected
}) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(async () => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    if (params?.get('category') === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    )

    router.push(url)
  }, [label, params, router])

  return (
    <div
      onClick={handleClick}
      className={`
        group
    flex
    cursor-pointer
    flex-col
    items-center
    gap-2
    border-b-2
    p-3
    transition
    hover:text-neutral-800
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}
    >
        <Image src={icon} width={50} height={50} alt={label} className='group-hover:scale-110'/>
        <div
          className="
          text-sm
          font-medium
          group-hover:scale-110
          "
        >
          {label}
        </div>
      </div>
  )
}
