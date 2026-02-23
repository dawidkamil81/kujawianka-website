'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Users, RotateCw } from 'lucide-react'
import { Player } from '@/types'
import { StatsConfig } from '@/components/squad/SquadStatsTable'

interface PlayerCardProps {
  player: Player
  statsConfig?: StatsConfig
}

// Komponent pomocniczy do wiersza statystyk na tyle karty
const StatRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex w-full items-center justify-between border-b border-white/5 py-1.5 last:border-0">
    <span className="text-[10px] tracking-wider text-gray-400 uppercase">
      {label}
    </span>
    <span className="font-mono text-sm font-bold text-white">{value}</span>
  </div>
)

export default function PlayerCard({ player, statsConfig }: PlayerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const isStaff = player.position === 'Sztab'
  const displayPosition =
    isStaff && player.staffRole ? player.staffRole : player.position

  const stats = player.stats || {
    matches: 0,
    goals: 0,
    assists: 0,
    cleanSheets: 0,
    yellowCards: 0,
    redCards: 0,
  }

  // Wczytanie konfiguracji z Sanity
  const config = {
    showMatches: statsConfig?.showMatches !== false,
    showGoals: statsConfig?.showGoals !== false,
    showAssists: statsConfig?.showAssists !== false,
    showCleanSheets: statsConfig?.showCleanSheets !== false,
    showCards: statsConfig?.showCards !== false,
  }

  // Karta może zostać obrócona tylko wtedy, gdy zawodnik nie jest ze sztabu i JAKAKOLWIEK opcja w configu jest aktywna,
  // nawet jeśli same wartości statystyk zawodnika to zera.
  const hasAnyVisibleStatsConfig =
    config.showMatches ||
    config.showGoals ||
    config.showAssists ||
    config.showCleanSheets ||
    config.showCards
  const canFlip = !isStaff && hasAnyVisibleStatsConfig

  return (
    <div
      className={`group relative aspect-[3/4] w-full [perspective:1000px] ${canFlip ? 'cursor-pointer' : ''}`}
      onClick={() => canFlip && setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped && canFlip ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'} `}
      >
        {/* === PRZÓD KARTY === */}
        <div
          className={`group-hover:border-club-green/40 absolute inset-0 h-full w-full [transform:rotateY(0deg)] overflow-hidden rounded-xl border border-white/5 bg-[#121212] transition-all duration-300 [backface-visibility:hidden] [webkit-backface-visibility:hidden] group-hover:shadow-[0_0_15px_rgba(23,65,53,0.2)]`}
        >
          {/* ZDJĘCIE */}
          <div className="absolute inset-0 z-0 bg-neutral-900">
            {player.imageUrl ? (
              <Image
                src={player.imageUrl}
                alt={`${player.name} ${player.surname}`}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                priority={false}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white/10">
                <Users size={40} />
              </div>
            )}
          </div>

          <div className="absolute top-2 right-2 z-10 md:top-3 md:right-3">
            <span className="rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[8px] font-bold tracking-widest text-white uppercase shadow-lg backdrop-blur-md md:px-2.5 md:text-[9px]">
              {displayPosition}
            </span>
          </div>

          {/* IKONA OBRÓTU (pojawia się tylko jeśli da się obrócić) */}
          {canFlip && (
            <div className="absolute top-3 left-3 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-md">
                <RotateCw size={14} className="text-white" />
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 z-20 w-full">
            <div className="absolute inset-0 border-t border-white/10 bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] backdrop-blur-md" />
            <div className="relative flex items-center justify-between p-2 md:p-3">
              <div className="flex flex-col overflow-hidden pr-2">
                <h3 className="font-montserrat truncate text-sm leading-none font-bold text-white uppercase transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-300 md:text-base">
                  {player.surname}
                </h3>
                <p className="mt-0.5 truncate text-[9px] font-medium tracking-wide text-gray-200 uppercase transition-all duration-300 group-hover:translate-x-1 md:text-[10px]">
                  {player.name}
                </p>
              </div>
              <div className="flex items-center justify-center">
                {!isStaff && (
                  <span className="font-montserrat text-xl font-black text-white/30 transition-colors duration-300 group-hover:text-white md:text-2xl">
                    {player.number}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* === TYŁ KARTY === */}
        <div
          className={`border-club-green/40 absolute inset-0 flex h-full w-full [transform:rotateY(180deg)] flex-col overflow-hidden rounded-xl border bg-[#141414] p-5 shadow-2xl [backface-visibility:hidden] [webkit-backface-visibility:hidden]`}
        >
          <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white">
                {player.number}
              </span>
            </div>
            <div className="text-right">
              <span className="mb-0.5 block text-xs leading-none font-bold text-white">
                {player.name}
              </span>
              <span className="text-club-green block text-sm leading-none font-black uppercase">
                {player.surname}
              </span>
            </div>
          </div>

          {/* STATYSTYKI WIDOCZNE WARUNKOWO */}
          <div className="scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex flex-1 flex-col gap-1 overflow-y-auto md:[-ms-overflow-style:none] md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden">
            {config.showMatches && (
              <StatRow label="Mecze" value={stats.matches || 0} />
            )}

            {player.position === 'Bramkarz' ? (
              config.showCleanSheets && (
                <StatRow label="Czyste konta" value={stats.cleanSheets || 0} />
              )
            ) : (
              <>
                {config.showGoals && (
                  <StatRow label="Bramki" value={stats.goals || 0} />
                )}
                {config.showAssists && (
                  <StatRow label="Asysty" value={stats.assists || 0} />
                )}
              </>
            )}

            {/* Kartki */}
            {config.showCards && (
              <div className="mt-auto flex items-center justify-center gap-6 border-t border-white/10 pt-3">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-4 w-3 rounded-sm bg-yellow-500 shadow-sm" />
                  <span className="font-mono text-xs font-bold">
                    {stats.yellowCards || 0}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-4 w-3 rounded-sm bg-red-600 shadow-sm" />
                  <span className="font-mono text-xs font-bold">
                    {stats.redCards || 0}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
