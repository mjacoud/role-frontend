'use client'

interface EventPriceProps {
  price: number
}

export const EventPrice: React.FC<EventPriceProps> = ({ price }) => {
  return (
    <>
      {price !== 0 ? (
        <div className="flex flex-row justify-between gap-1 p-4">
          <div className="text-2xl font-semibold">Inteira: R$ {price}</div>
          <div className="text-2xl font-semibold">Meia: R$ {price / 2}</div>
        </div>
      ) : (
        <div className="flex flex-row justify-center gap-1 p-4">
          <div className="text-2xl font-semibold">GRÁTIS</div>
        </div>
      )}
      <hr />
    </>
  )
}
