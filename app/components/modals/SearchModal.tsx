'use client'

import { Modal } from './Modal'
import { useCallback, useMemo, useState } from 'react'
import { LocationInput, locationObject } from '../Inputs/LocaltionInput'
import Calendar from 'react-calendar'

import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import 'react-calendar/dist/Calendar.css'
import { useSearchModal } from '@/app/hooks/useSearchModal'

import qs from 'query-string'
import { formatISO } from 'date-fns'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}

export const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEPS.LOCATION)
  const [location, setLocation] = useState<number[]>([-23.545271, -46.6337751])
  const [date, setDate] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [radius, setRadius] = useState(1)

  const onSubmit = useCallback(async () => {
    setIsLoading(true)

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    let updatedQuery: any = { ...currentQuery }

    if (location[0] !== -23.545271 && location[1] !== -46.6337751) {
      updatedQuery.location = location
      updatedQuery.radius = radius
    }
    if (date.length !== 0) {
      updatedQuery.startDate = formatISO(date[0])
      updatedQuery.endDate = formatISO(date[1])
    }

    if (price) {
      updatedQuery.price = price
    } else {
      updatedQuery.price = 0
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    setIsLoading(false)

    router.push(url)
  }, [step, searchModal, location, router, date, params, price, radius])

  const secondaryAction = () => {
    setDate([])
    setPrice(undefined)
    setLocation([-23.545271, -46.6337751])
  }

  const actionLabel = useMemo(() => {
    return 'Pesquisar'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    return 'Limpar'
  }, [step])

  const Map = useMemo(
    () => dynamic(() => import('../LocalMap'), { ssr: false }),
    [location, radius]
  )

  const onSelectLocation = (value: locationObject) => {
    if (!value) {
      return setLocation([-23.545271, -46.6337751])
    } else {
      return setLocation([value.properties.lat, value.properties.lon])
    }
  }

  const handleDate = (value: any) => {
    console.log(new Date(value[0]))
    console.log(new Date(value[1]))
    setDate(value)
  }

  const handleRadius = (value: number) => {
    setRadius(value)
  }

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.valueAsNumber)
  }

  let bodyContent = (
    <div
      className="flex
        flex-col
      gap-8"
    >
      <div>
        <div>Localização</div>
        <div>Data</div>
        <div>Preço</div>
      </div>
    </div>
  )
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div
        className="flex
        flex-col
      gap-8"
      >
        <div
          className="grid w-full  cursor-pointer
  grid-cols-3
  rounded-full
  border-x-[1px]
  shadow-sm
  md:w-auto
  "
        >
          <div
            onClick={() => setStep(STEPS.LOCATION)}
            className={`h-full w-full flex-1 justify-self-center rounded-s-2xl
            px-6 py-2 text-center text-sm font-semibold
            hover:bg-amber-200 sm:block 
            ${step === 0 ? 'bg-amber-500 text-white' : ''}`}
          >
            Localização
            {location[0] !== -23.545271 ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
          <div
            onClick={() => setStep(STEPS.DATE)}
            className={`hidden h-full w-full  flex-1 justify-self-center border-x-[1px] px-6 py-2 text-center text-sm font-semibold hover:bg-amber-200 sm:block
           `}
          >
            Data
            {date[0] !== undefined ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
          <div
            onClick={() => setStep(STEPS.INFO)}
            className={`hidden h-full w-full flex-1 justify-self-center rounded-e-2xl px-6 py-2 text-center text-sm font-semibold sm:block
          ${STEPS.DATE ? 'hover:bg-neutral-100' : ''}`}
          >
            Preço
            {price || price === 0 ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
        </div>
        <LocationInput
          onChange={onSelectLocation}
          radius={radius}
          handleRadius={handleRadius}
        />

        <Map
          center={location || [-23.545271, -46.6337751]}
          overlay
          radius={radius}
        />
      </div>
    )
  }
  if (step === STEPS.DATE) {
    bodyContent = (
      <div
        className="flex
        flex-col
      gap-8"
      >
        <div
          className="grid w-full  cursor-pointer
  grid-cols-3
  rounded-full
  border-x-[1px]
  shadow-sm
  md:w-auto
  "
        >
          <div
            onClick={() => setStep(STEPS.LOCATION)}
            className={`h-full w-full flex-1 justify-self-center rounded-s-2xl px-6 py-2
            text-center text-sm font-semibold hover:bg-amber-200 sm:block
            `}
          >
            Localização
            {location[0] !== -23.545271 ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
          <div
            onClick={() => setStep(STEPS.DATE)}
            className={`hidden h-full w-full  flex-1 justify-self-center border-x-[1px] px-6 py-2 text-center text-sm font-semibold hover:bg-amber-200 sm:block
            ${step === 1 ? 'bg-amber-500 text-white' : ''}`}
          >
            Data
            {date[0] !== undefined ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
          <div
            onClick={() => setStep(STEPS.INFO)}
            className={`hidden h-full w-full flex-1 justify-self-center rounded-e-2xl px-6 py-2 text-center text-sm font-semibold sm:block
          ${STEPS.DATE ? 'hover:bg-neutral-100' : ''}`}
          >
            Preço
            {price || price === 0 ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Calendar onChange={handleDate} selectRange />
        </div>
      </div>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div
        className="flex
        flex-col
      gap-8"
      >
        <div
          className="grid w-full  cursor-pointer
  grid-cols-3
  rounded-full
  border-x-[1px]
  shadow-sm
  md:w-auto
  "
        >
          <div
            onClick={() => setStep(STEPS.LOCATION)}
            className={`h-full w-full flex-1 justify-self-center rounded-s-2xl px-6 py-2
            text-center text-sm font-semibold hover:bg-amber-200 sm:block
            `}
          >
            Localização
            {location[0] !== -23.545271 ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
          <div
            onClick={() => setStep(STEPS.DATE)}
            className={`hidden h-full w-full  flex-1 justify-self-center border-x-[1px] px-6 py-2 text-center text-sm font-semibold hover:bg-amber-200 sm:block
          `}
          >
            Data
            {date[0] !== undefined ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
          <div
            onClick={() => setStep(STEPS.INFO)}
            className={`hidden h-full w-full flex-1 justify-self-center rounded-e-2xl px-6 py-2 text-center text-sm font-semibold sm:block
            ${step === STEPS.INFO ? 'bg-amber-500 text-white' : ''}`}
          >
            Preço
            {price || price === 0 ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label
            htmlFor="price"
            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
          >
            {price === 0 || price === undefined ? 'Grátis' : `R$ ${price}`}
          </label>
          <input
            type="range"
            className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
            id="price"
            min={0}
            max={150}
            onChange={handlePrice}
            value={price}
          />
        </div>
      </div>
    )
  }

  return (
    <Modal
      title="Qual rolé você está procurando?"
      body={bodyContent}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={secondaryAction}
      onSubmit={onSubmit}
    />
  )
}
