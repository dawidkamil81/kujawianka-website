'use client'

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Sponsor } from '@/types/index'
import SectionHeader from '@/components/ui/SectionHeader'

type GroupedSponsors = {
  tierName: string
  rank: number
  sponsors: Sponsor[]
}

export default function OtherSponsors({
  groups,
}: {
  groups: GroupedSponsors[]
}) {
  // Sprawdzamy czy są jakiekolwiek grupy do wyświetlenia
  if (!groups || groups.length === 0) return null

  // Filtrujemy grupy, aby wyświetlić tylko te, które mają przynajmniej jednego
  // poprawnego sponsora (posiadającego nazwę lub logo)
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      sponsors: group.sponsors.filter((s) => s.name || s.logoUrl),
    }))
    .filter((group) => group.sponsors.length > 0)

  if (visibleGroups.length === 0) return null

  return (
    <>
      {visibleGroups.map((group) => (
        <section key={group.tierName}>
          <SectionHeader
            title={group.tierName}
            lineColorClass="border-white/10 text-gray-400"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {group.sponsors.map((sponsor) => {
              const Wrapper = sponsor.website ? 'a' : 'div'
              const wrapperProps = sponsor.website
                ? {
                    href: sponsor.website,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {}

              return (
                <Wrapper
                  key={sponsor._id}
                  {...wrapperProps}
                  className={`group relative flex aspect-square items-center justify-center rounded-xl border border-white/5 bg-white/5 p-6 transition-colors hover:bg-white/10 ${
                    sponsor.website
                      ? 'cursor-pointer hover:border-white/30'
                      : ''
                  }`}
                >
                  {sponsor.website && (
                    <div className="absolute top-2 right-2 text-white/50 opacity-0 transition-all group-hover:text-white group-hover:opacity-100">
                      <ExternalLink size={14} />
                    </div>
                  )}
                  {sponsor.logoUrl ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        fill
                        className="object-contain transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <span className="text-center text-xs font-bold text-gray-500">
                      {sponsor.name}
                    </span>
                  )}
                </Wrapper>
              )
            })}
          </div>
        </section>
      ))}
    </>
  )
}
