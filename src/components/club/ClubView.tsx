'use client'

import type { PortableTextBlock } from 'next-sanity'
import ClubHistory from './ClubHistory'
import ClubAchievements from './ClubAchievements'
import ClubStadium from './ClubStadium'
import ClubAuthorities from './ClubAuthorities'
import PageHero from '../common/PageHero'

interface ClubViewProps {
  data: {
    heroHeading: string
    heroDescription: string
    historyTitle: string
    historyContent: PortableTextBlock[]
    historyImageUrl?: string
    achievements: Array<{
      title: string
      description: string
      iconType: string
    }>
    stadiumDescription: string
    stadiumImageUrl?: string
    stadiumAddress: string
    stadiumCapacity: string
    stadiumBuilt: string
    clubAuthorities: Array<{
      name: string
      group: 'management' | 'audit'
      role: string
      isVisible: boolean
    }>
  }
}

export default function ClubView({ data }: ClubViewProps) {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Tło */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <PageHero
          animated
          badgeText="Tradycja • Pasja • Wspólnota"
          title={data.heroHeading || 'Kujawianka Izbica Kujawska'}
          description={data.heroDescription}
        />

        <ClubHistory
          title={data.historyTitle}
          content={data.historyContent}
          imageUrl={data.historyImageUrl}
        />

        <ClubAchievements achievements={data.achievements} />

        <ClubStadium
          description={data.stadiumDescription}
          imageUrl={data.stadiumImageUrl}
          address={data.stadiumAddress}
          capacity={data.stadiumCapacity}
          built={data.stadiumBuilt}
        />

        <ClubAuthorities authorities={data.clubAuthorities} />
      </div>
    </main>
  )
}
