'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Player } from '@/types'
import PlayerCard from '@/components/common/PlayerCard'
import SquadStatsTable, {
  StatsConfig,
} from '@/components/squad/SquadStatsTable'
import { Users, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SquadTabsViewProps {
  players: Player[]
  statsConfig?: StatsConfig
}

const SECTIONS_ORDER = [
  'Bramkarze',
  'Obrońcy',
  'Pomocnicy',
  'Napastnicy',
  'Sztab',
] as const

function SquadTabsContent({ players, statsConfig }: SquadTabsViewProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // 1. Grupowanie zawodników
  const squadGroups = useMemo(() => {
    return {
      Bramkarze: players.filter((p) => p.position === 'Bramkarz'),
      Obrońcy: players.filter((p) => p.position === 'Obrońca'),
      Pomocnicy: players.filter((p) => p.position === 'Pomocnik'),
      Napastnicy: players.filter((p) => p.position === 'Napastnik'),
      Sztab: players.filter((p) => p.position === 'Sztab'),
    }
  }, [players])

  // 2. Sprawdzamy, czy w drużynie są jacyś faktyczni zawodnicy (nie sztab)
  const hasActualPlayers = useMemo(() => {
    return players.some((p) => p.position !== 'Sztab')
  }, [players])

  // 3. Odczytujemy aktywną zakładkę. Jeśli ktoś wpisał ?tab=stats dla drużyny bez zawodników, wymuszamy 'squad'
  const activeTab =
    searchParams.get('tab') === 'stats' && hasActualPlayers ? 'stats' : 'squad'

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleTabChange = (tab: 'squad' | 'stats') => {
    const params = new URLSearchParams(searchParams.toString())

    if (tab === 'squad') {
      params.delete('tab')
    } else {
      params.set('tab', tab)
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  if (!players?.length) return null

  return (
    <div className="w-full">
      {/* --- PRZEŁĄCZNIK ZAKŁADEK (Widoczny tylko gdy są zawodnicy) --- */}
      {hasActualPlayers && (
        <div
          className={cn(
            'mb-12 flex justify-center gap-4 transition-all duration-700 ease-out',
            isMounted
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0',
          )}
        >
          {['squad', 'stats'].map((tab) => {
            const isSquad = tab === 'squad'
            const isActive = activeTab === tab

            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab as 'squad' | 'stats')}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 md:text-sm',
                  isActive
                    ? 'scale-105 transform border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'border-white/10 bg-[#121212] text-gray-400 hover:border-emerald-500/50 hover:text-white',
                )}
              >
                {isSquad ? <Users size={16} /> : <BarChart3 size={16} />}
                {isSquad ? 'Kadra' : 'Statystyki'}
              </button>
            )
          })}
        </div>
      )}

      {/* --- TREŚĆ ZAKŁADEK --- */}
      <div
        className={cn(
          'min-h-[400px] transition-opacity duration-500',
          isMounted ? 'opacity-100' : 'opacity-0',
        )}
      >
        {/* WIDOK KADRY */}
        <div
          className={cn(
            activeTab === 'squad' ? 'block' : 'hidden',
            'animate-in fade-in space-y-16 duration-500',
          )}
        >
          {SECTIONS_ORDER.map((sectionName) => {
            const groupPlayers = squadGroups[sectionName]
            if (!groupPlayers?.length) return null

            return (
              <section key={sectionName}>
                <div className="mb-8 flex items-center gap-4">
                  <h3 className="font-montserrat border-l-4 border-emerald-500 pl-4 text-xl font-bold tracking-widest text-white uppercase md:text-2xl">
                    {sectionName}
                  </h3>
                  <div className="h-[1px] flex-grow bg-white/10"></div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
                  {groupPlayers.map((player) => (
                    <PlayerCard
                      key={player._id}
                      player={player}
                      statsConfig={statsConfig}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* WIDOK STATYSTYK */}
        {hasActualPlayers && (
          <div
            className={cn(
              activeTab === 'stats' ? 'block' : 'hidden',
              'animate-in fade-in duration-500',
            )}
          >
            <SquadStatsTable players={players} statsConfig={statsConfig} />
          </div>
        )}
      </div>
    </div>
  )
}

export default function SquadTabsView(props: SquadTabsViewProps) {
  return (
    <Suspense fallback={<div className="min-h-[400px]" />}>
      <SquadTabsContent {...props} />
    </Suspense>
  )
}
