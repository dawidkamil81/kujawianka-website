'use client'

import SplitColorTitle from '@/components/ui/SplitColorTitle'
import SectionBadge from '@/components/ui/SectionBadge'

interface PartnersHeroProps {
  title?: string
  description?: string
}

export default function PartnersHero({
  title,
  description,
}: PartnersHeroProps) {
  const defaultTitle = 'Klub Biznesu'

  return (
    <div className="mb-20 flex flex-col items-center justify-center space-y-5 text-center">
      <SectionBadge>Lokalny Biznes</SectionBadge>
      <h1 className="font-montserrat text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
        <SplitColorTitle text={title || defaultTitle} />
      </h1>
      {description && (
        <p className="max-w-2xl text-center text-sm font-medium text-gray-400 md:text-base">
          {description}
        </p>
      )}
    </div>
  )
}
