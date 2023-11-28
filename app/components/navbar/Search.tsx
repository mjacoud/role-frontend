'use client'

import { useSearchModal } from '@/app/hooks/useSearchModal'
import { BiSearch } from 'react-icons/bi'

export const Search = () => {
  const searchModal = useSearchModal()

  return (
    <div
      onClick={searchModal.onOpen}
      className="
  w-full
  cursor-pointer
  rounded-full
  border-[1px]
  py-2
  shadow-sm
  hover:shadow-md
  md:w-auto
  "
    >
      <div
        className="
flex
flex-row
items-center
justify-between"
      >
        <div className="px-6 text-sm font-semibold">Onde</div>
        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">
          Quando
        </div>

        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">Quanto</div>
          <div className="rounded-full bg-amber-500 p-2 text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}
