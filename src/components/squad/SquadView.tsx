import PageHero from '@/components/common/PageHero'
import SquadTabsView from './SquadTabsView'
import SquadInfoBoard from './SquadInfoBoard'
import type { SquadPageData } from '@/types'
import { getCurrentSeason } from '@/lib/utils'

interface SquadViewProps {
  squadData: SquadPageData
}

export default function SquadView({ squadData }: SquadViewProps) {
  const players = squadData.players || []
  const currentSeason = getCurrentSeason()

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <PageHero
          animated
          badgeText={`Sezon ${currentSeason}`}
          title={`Kadra ${squadData.name}`}
          className="mb-16"
        />

        <SquadInfoBoard
          description={squadData.description}
          coachName={squadData.coachName}
          coachPhone={squadData.coachPhone}
          coachEmail={squadData.coachEmail}
        />

        {/* ZMIANA: PRZEKAZUJEMY statsConfig DO ŚRODKA */}
        <SquadTabsView players={players} statsConfig={squadData.statsConfig} />
      </div>
    </main>
  )
}
