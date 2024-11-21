'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Event } from '@/app/types'
import { categories } from '@/app/components/navbar/Categories'

interface EventsCardProps {
  data: Event
}

export const EventsCard: React.FC<EventsCardProps> = ({ data }) => {

  const category = categories.find(item => item.label === data.category)
  const router = useRouter()

  return (
    <div
      className="group col-span-1 cursor-pointer"
      onClick={() => router.push(`/events/${data._id}`)}
    >
      <div className="flex w-full h-full flex-col gap-2">
        <div className="relative aspect-square w-full h-full overflow-hidden rounded-xl bg-">
           <Image
            alt="event"
            src={data.imageSrc}
            className="
            h-full
            w-full
            object-cover transition group-hover:scale-110 sm:h-[350px] sm:w-[350px] md:h-[350px] md:w-[350px] lg:h-[267px] lg:w-[267px] xl:h-[390px] xl:w-[390px]"
            width={500}
            height={500}
          /> 
          <div className="absolute right-3 top-3">
            {/* <HeartButton eventId={data.id} currentUser={currentUser} /> */}
          </div>
          <div className="absolute bottom-0 right-0 flex h-8 w-32 items-center justify-center rounded-tl-3xl bg-amber-500">
            <div className="font-bold">
              
               {data.price > 0
                ? `R$${data.price} | R$${data.price / 2}`
                : 'Grátis'} 
            </div>
          </div>
        </div>
        <div className="text-lg font-semibold">{data.title}</div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <Image
            alt="event-category"
            src={category ? category.icon : ''}
            width={35}
            height={35}
          /> 
 
          {`${data.category.slice(0,data.category.length-1)}`}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div>
      {/*       {format(new Date(data.startDate), 'dd/MM/yy')} até{' '}
            {format(new Date(data.endDate), 'dd/MM/yy')} */}
          </div>
        </div>
      </div>
    </div>
  )
}
