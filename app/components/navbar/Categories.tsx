'use client'

import { Container } from '../Container'
import cinema from '@/public/icons/cinema.webp'
import museu from '@/public/icons/museu.webp'
import teatro from '@/public/icons/teatro.webp'
import parque from '@/public/icons/parque.webp'
import show from '@/public/icons/show.webp'
import feira from '@/public/icons/barraca-de-comida.webp'
import bar from '@/public/icons/bar.webp'
import restaurante from '@/public/icons/restaurante.webp'
import brecho from '@/public/icons/brecho.webp'
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
