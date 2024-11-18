'use client'

import { Modal } from './Modal'
import { useCallback, useMemo, useState } from 'react'
import { LocationInput, locationObject } from '../Inputs/LocationInput'

import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSearchModal } from '@/app/hooks/useSearchModal'

import qs from 'query-string'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'


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
  const [coordenates, setCoordenates] = useState<number[]>([-23.545271, -46.6337751])
  const [date, setDate] = useState<string[]>(['',''])
  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState<number | undefined>(0)
  const [radius, setRadius] = useState(1)

  const onSubmit = useCallback(async () => {
    
    setIsLoading(true)
  
    let currentQuery = {}
  
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
  
    let updatedQuery: any = { ...currentQuery }
  
    if (coordenates[0] !== -23.545271 && coordenates[1] !== -46.6337751) {
      updatedQuery.latitude = coordenates[0]
      updatedQuery.longitude = coordenates[1]
      updatedQuery.radius = radius
    }
  
    if (date[0] != '' && date[1] !=''){
      updatedQuery.startDate = convertDate(date[0])
      updatedQuery.endDate = convertDate(date[1])
    }

    if (price == null || price == 0) {
      updatedQuery.price = null
    } else {
      updatedQuery.price = price
    }
  
    const url = qs.stringifyUrl(
      {
        url: '/',
        query:updatedQuery
      },
      { skipNull: true }
    )

      router.push(url)
      console.log('updatedquery: ', updatedQuery)
      setStep(STEPS.LOCATION)
      searchModal.onClose()
      setIsLoading(false) // Sempre desative o carregamento no final
    
  }, [searchModal, coordenates,router, date, params, price, radius])
  

  const secondaryAction = () => {
    setDate(['',''])
    setPrice(undefined)
    setCoordenates([-23.545271, -46.6337751])
  }

  const actionLabel = useMemo(() => {
    return 'Pesquisar'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    return 'Limpar'
  }, [step])

  const Map = useMemo(
    () => dynamic(() => import('../LocalMap'), { ssr: false }),
    [coordenates, radius]
  )

  const onSelectCoordenates = (value: locationObject) => {
    if (!value) {
      return setCoordenates([-23.545271, -46.6337751])
    } else {
      return setCoordenates([value.properties.lat, value.properties.lon])
    }
  }


  const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const isoString = date.toISOString();
  return isoString.replace('Z', '+0000');
  };

  const handleDate = (value:any) =>{
    return setDate(value)
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
            {coordenates[0] !== -23.545271 ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
          <div
            onClick={() => setStep(STEPS.DATE)}
            className={`h-full w-full  flex-1 justify-self-center border-x-[1px] px-6 py-2 text-center text-sm font-semibold hover:bg-amber-200 sm:block
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
            className={`h-full w-full flex-1 justify-self-center rounded-e-2xl px-6 py-2 text-center text-sm font-semibold sm:block
          hover:bg-neutral-100`}
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
          onChange={onSelectCoordenates}
          radius={radius}
          handleRadius={handleRadius}
        />

        <Map
          center={coordenates || [-23.545271, -46.6337751]}
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
            {coordenates[0] !== -23.545271 ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
          <div
            onClick={() => setStep(STEPS.DATE)}
            className={`h-full w-full  flex-1 justify-self-center border-x-[1px] px-6 py-2 text-center text-sm font-semibold hover:bg-amber-200 sm:block
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
            className={`h-full w-full flex-1 justify-self-center rounded-e-2xl px-6 py-2 text-center text-sm font-semibold sm:block
          hover:bg-neutral-100`}
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
          <Calendar onChange={handleDate} selectRange defaultValue={new Date()}/>
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
            {coordenates[0] !== -23.545271 ? (
              <div className="rounded-2xl border-2 border-red-500"></div>
            ) : (
              ''
            )}
          </div>
          <div
            onClick={() => setStep(STEPS.DATE)}
            className={`h-full w-full  flex-1 justify-self-center border-x-[1px] px-6 py-2 text-center text-sm font-semibold hover:bg-amber-200 sm:block
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
            className={`h-full w-full flex-1 justify-self-center rounded-e-2xl px-6 py-2 text-center text-sm font-semibold sm:block
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
