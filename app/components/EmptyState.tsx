'use client'

import { useRouter } from 'next/navigation'
import { Heading } from './Heading'
import { Button } from './Button'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Nenhum Rolé Encontrado',
  subtitle = 'Tente mudar ou remover alguns filtros',
  showReset
}) => {
  const router = useRouter()
  return (
    <div className="flex h-[60vh] flex-col items-center justify-between gap-2 pt-44">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4 w-48">
        {showReset && (
          <Button
            outline
            label="Remover todos os filtros"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}
