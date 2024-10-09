'use client'

import { usePublishEventModal } from '@/app/hooks/usePublishEventModal'
import { Modal } from './Modal'
import { useMemo, useState } from 'react'
import { Heading } from '../Heading'
import { categories } from '../navbar/Categories'
import { CategoryInput } from '../Inputs/CategoryInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { LocationInput, locationObject } from '../Inputs/LocationInput'

import dynamic from 'next/dynamic'

import { ImageUpload } from '../Inputs/ImageUpload'
import { Input } from '../Inputs/Input'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4
}

export const PublishEventModal = () => {
  const router = useRouter()
  const publishEvent = usePublishEventModal()
  const [mapCenter, setMapCenter] = useState([-23.545271, -46.6337751])
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      imageSrc: '',
      price: 1,
      description: '',
      dateRange: null
    }
  })

  const category = watch('category')
  const location = watch('location')
  const imageSrc = watch('imageSrc')
  const dateRange = watch('dateRange')

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    setStep(value => value + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) return onNext()

    setIsLoading(true)
    axios
      .post('/api/events', data)
      .then(() => {
        toast.success('Evento criado!')
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        publishEvent.onClose()
      })
      .catch(() => {
        toast.error('Algo deu errado')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Publicar'
    }
    return 'Avançar'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }
    return 'Voltar'
  }, [step])

  const Map = useMemo(
    () => dynamic(() => import('../LocalMap'), { ssr: false }),
    [location]
  )

  const onSelectLocation = (value: locationObject) => {
    let coordenates = [value.properties.lat, value.properties.lon]
    setMapCenter(coordenates)
    setCustomValue('location', coordenates)
  }

  const handleDate = (value: any) => {
    console.log(value)
    setCustomValue('dateRange', value)
  }

  let bodyContent = (
    <div
      className="flex
        flex-col
      gap-8"
    >
      <Heading
        title="Qual dessas categorias descreve o seu evento?"
        subtitle="Escolha uma categoria"
      />
      <div
        className="
          grid
          max-h-[50vh]
        grid-cols-1
        gap-3
        overflow-y-auto
        md:grid-cols-2"
      >
        {categories.map(item => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={category => {
                setCustomValue('category', category)
              }}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Aonde será o seu evento?"
          subtitle="Facilite encontrarem seu Rolé"
        />
        <LocationInput onChange={onSelectLocation} />
        <Map center={mapCenter} />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Adicione uma foto de capa para o seu evento"
          subtitle="Mostre o espírito do seu evento!"
        />
        <ImageUpload
          onChange={value => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Como você descreveria seu evento?"
          subtitle="Fale um pouco sobre o seu evento!"
        />
        <Input
          id="title"
          label="Título"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Descrição"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <div className="flex items-center justify-center">
          {/* <Calendar onChange={handleDate} selectRange /> */}
        </div>
      </div>
    )
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Seu evento tem preço?"
          subtitle="Quanto custa a entrada do seu evento?"
        />
        <Input
          id="price"
          label="Preço"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }
  return (
    <Modal
      title="Divulgue seu Evento!"
      body={bodyContent}
      isOpen={publishEvent.isOpen}
      onClose={publishEvent.onClose}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}
