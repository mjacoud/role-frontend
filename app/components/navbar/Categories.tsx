'use client'

import { Container } from '../Container'
import cinema from '@/public/icons/cinema.png'
import museu from '@/public/icons/museu.png'
import teatro from '@/public/icons/teatro.png'
import parque from '@/public/icons/parque.png'
import show from '@/public/icons/show.png'
import feira from '@/public/icons/barraca-de-comida.png'
import bar from '@/public/icons/bar.png'
import restaurante from '@/public/icons/restaurante.png'
import brecho from '@/public/icons/brecho.png'
import { CategoryBox } from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'

export const categories = [
  { label: 'Cinemas', icon: cinema },
  { label: 'Museus', icon: museu },
  { label: 'Teatros', icon: teatro },
  { label: 'Parques', icon: parque },
  { label: 'Shows', icon: show },
  { label: 'Feiras', icon: feira },
  { label: 'Bares', icon: bar },
  { label: 'Restaurantes', icon: restaurante },
  { label: 'Brechos', icon: brecho }
]

export const Categories = () => {
  const params = useSearchParams()
  const category = params?.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <div
        className="
      flex
      flex-row
      items-center
      justify-between
      overflow-x-auto
      pt-4"
      >
        {categories.map(item => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  )
}
