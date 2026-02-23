'use client'

import { Sponsor, SponsorsPageData } from '@/types/index'
import ContactSection from '@/components/sections/ContactSection'
import SectionsRenderer from '@/components/sections/SectionsRenderer'
import SponsorsStats from './SponsorsStats'
import MainSponsors from './MainSponsors'
import StrategicSponsors from './StrategicSponsors'
import OtherSponsors from './OtherSponsors'
import PageHero from '../common/PageHero'

type GroupedSponsors = {
  tierName: string
  rank: number
  sponsors: Sponsor[]
}

interface SponsorsViewProps {
  sponsors: Sponsor[]
  pageData: SponsorsPageData
}

export default function SponsorsView({
  sponsors,
  pageData,
}: SponsorsViewProps) {
  // 1. Grupowanie sponsorów
  const groupsMap = sponsors.reduce(
    (acc, sponsor) => {
      const tierName = sponsor.tier?.name || 'Pozostali'
      const tierRank = sponsor.tier?.rank || 99

      if (!acc[tierName]) {
        acc[tierName] = { tierName, rank: tierRank, sponsors: [] }
      }
      acc[tierName].sponsors.push(sponsor)
      return acc
    },
    {} as Record<string, GroupedSponsors>,
  )

  const sortedGroups = Object.values(groupsMap).sort((a, b) => a.rank - b.rank)

  const mainGroup = sortedGroups.find((g) => g.rank === 1)
  const strategicGroup = sortedGroups.find((g) => g.rank === 2)
  const otherGroups = sortedGroups.filter((g) => g.rank > 2)

  return (
    <div className="flex flex-col gap-24">
      <PageHero
        animated
        badgeText="Wsparcie i Rozwój"
        title={pageData.title || 'Nasi Sponsorzy'}
        description={pageData.description}
        className="mb-0"
      />

      {pageData.stats && (
        <SponsorsStats
          stats={pageData.stats}
          totalSponsorsCount={sponsors.length}
        />
      )}

      {mainGroup && <MainSponsors group={mainGroup} />}

      {strategicGroup && <StrategicSponsors group={strategicGroup} />}

      <OtherSponsors groups={otherGroups} />

      {/* Sekcje Dynamiczne z CMS */}
      {pageData?.contentBuilder && pageData.contentBuilder.length > 0 && (
        <div>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <SectionsRenderer sections={pageData.contentBuilder as any[]} />
        </div>
      )}
    </div>
  )
}
