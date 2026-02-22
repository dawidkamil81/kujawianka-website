'use client'

import SplitColorTitle from '@/components/ui/SplitColorTitle'
import SectionBadge from '@/components/ui/SectionBadge'

interface SponsorsHeroProps {
  title: string
  description: string
}

export default function SponsorsHero({
  title,
  description,
}: SponsorsHeroProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 text-center">
      <SectionBadge>Wsparcie i Rozwój</SectionBadge>

      <h1 className="font-montserrat text-center text-4xl font-black tracking-tight uppercase drop-shadow-2xl md:text-5xl">
        <SplitColorTitle text={title} />
      </h1>

      <p className="max-w-2xl text-center text-sm font-medium text-gray-400 md:text-base">
        {description}
      </p>
    </div>
  )
}
