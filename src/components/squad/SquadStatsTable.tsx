'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Player } from '@/types/index'
import { ArrowUp, ArrowDown, ArrowUpDown, User } from 'lucide-react'

export interface StatsConfig {
  showMatches?: boolean
  showGoals?: boolean
  showAssists?: boolean
  showCleanSheets?: boolean
  showCards?: boolean
}

interface SquadStatsTableProps {
  players: Player[]
  statsConfig?: StatsConfig
}

type SortField =
  | 'name'
  | 'matches'
  | 'goals'
  | 'assists'
  | 'cleanSheets'
  | 'yellowCards'

interface ThProps {
  field: SortField
  label: string
  mobileHidden?: boolean
  alignRight?: boolean
  sortField: SortField
  sortDirection: 'asc' | 'desc'
  onSort: (field: SortField) => void
}

const Th = ({
  field,
  label,
  mobileHidden,
  alignRight,
  sortField,
  sortDirection,
  onSort,
}: ThProps) => {
  const isActive = sortField === field
  const Icon = isActive
    ? sortDirection === 'asc'
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown

  return (
    <th
      className={`group cursor-pointer px-4 py-4 text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors hover:text-white ${mobileHidden ? 'hidden md:table-cell' : ''} ${alignRight ? 'text-right' : 'text-left'} ${isActive ? 'text-white' : ''} `}
      onClick={() => onSort(field)}
    >
      <div
        className={`flex items-center gap-2 ${alignRight ? 'justify-end' : 'justify-start'}`}
      >
        {label}
        <Icon
          size={12}
          className={`transition-all duration-300 ${isActive ? 'text-club-green opacity-100' : 'opacity-20 group-hover:opacity-60'}`}
        />
      </div>
    </th>
  )
}

export default function SquadStatsTable({
  players,
  statsConfig,
}: SquadStatsTableProps) {
  // BEZPIECZNA KONFIGURACJA (jeśli z bazy nic nie przyjdzie, zakładamy że widoczne)
  const config = {
    showMatches: statsConfig?.showMatches !== false,
    showGoals: statsConfig?.showGoals !== false,
    showAssists: statsConfig?.showAssists !== false,
    showCleanSheets: statsConfig?.showCleanSheets !== false,
    showCards: statsConfig?.showCards !== false,
  }

  // INTELIGENTNE DOMYŚLNE SORTOWANIE (jeśli wyłączymy gole, domyślnie sortujemy po czymś innym)
  const defaultSortField: SortField = config.showGoals
    ? 'goals'
    : config.showMatches
      ? 'matches'
      : config.showAssists
        ? 'assists'
        : 'name'

  const [sortField, setSortField] = useState<SortField>(defaultSortField)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const activePlayers = players.filter((p) => p.position !== 'Sztab')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const handleMobileSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = e.target.value.split('-') as [
      SortField,
      'asc' | 'desc',
    ]
    setSortField(field)
    setSortDirection(direction)
  }

  const sortedPlayers = [...activePlayers].sort((a, b) => {
    const statsA = a.stats || {
      matches: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      yellowCards: 0,
    }
    const statsB = b.stats || {
      matches: 0,
      goals: 0,
      assists: 0,
      cleanSheets: 0,
      yellowCards: 0,
    }

    let valA: string | number
    let valB: string | number

    if (sortField === 'name') {
      valA = a.surname || ''
      valB = b.surname || ''
    } else {
      valA = (statsA as Record<string, number>)[sortField] || 0
      valB = (statsB as Record<string, number>)[sortField] || 0
    }

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const getRankStyle = (index: number) => {
    if (index === 0) return 'text-yellow-500 font-bold scale-110'
    if (index === 1) return 'text-gray-300 font-bold scale-105'
    if (index === 2) return 'text-amber-700 font-bold'
    return 'text-gray-600 font-medium'
  }

  const commonThProps = {
    sortField,
    sortDirection,
    onSort: handleSort,
  }

  // DYNAMICZNA KLASA DLA GRIDA W MOBILE
  const activeMobileStatsCount = [
    config.showMatches,
    config.showGoals,
    config.showAssists,
    config.showCards,
  ].filter(Boolean).length

  const gridClass =
    activeMobileStatsCount === 4
      ? 'grid-cols-4'
      : activeMobileStatsCount === 3
        ? 'grid-cols-3'
        : activeMobileStatsCount === 2
          ? 'grid-cols-2'
          : 'grid-cols-1'

  return (
    <div className="mt-2 mb-12 w-full">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/10 pb-4 md:flex-row md:items-end">
        <div className="flex items-center gap-3">
          <h3 className="font-montserrat text-2xl font-black tracking-tight text-white uppercase md:text-3xl">
            Statystyki <span className="text-emerald-500">Drużyny</span>
          </h3>
        </div>

        <div className="md:hidden">
          <select
            value={`${sortField}-${sortDirection}`}
            onChange={handleMobileSortChange}
            className="w-full rounded-lg border border-white/10 bg-[#121212] p-3 text-sm font-bold tracking-widest text-white uppercase focus:border-emerald-500 focus:outline-none"
          >
            {config.showGoals && (
              <option value="goals-desc">Najwięcej bramek</option>
            )}
            {config.showAssists && (
              <option value="assists-desc">Najwięcej asyst</option>
            )}
            {config.showMatches && (
              <option value="matches-desc">Najwięcej meczów</option>
            )}
            {config.showCleanSheets && (
              <option value="cleanSheets-desc">Czyste konta</option>
            )}
            {config.showCards && (
              <option value="yellowCards-desc">Najwięcej kartek</option>
            )}
          </select>
        </div>
      </div>

      {/* === 1. WIDOK MOBILNY (KARTY) === */}
      <div className="flex flex-col gap-4 md:hidden">
        {sortedPlayers.map((player, index) => {
          const stats = player.stats || {
            matches: 0,
            goals: 0,
            assists: 0,
            cleanSheets: 0,
            yellowCards: 0,
            redCards: 0,
          }

          return (
            <div
              key={player._id}
              className="flex flex-col rounded-xl border border-white/5 bg-[#121212] p-4 shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-neutral-900">
                    {player.imageUrl ? (
                      <Image
                        src={player.imageUrl}
                        alt={player.surname}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <span className="block font-bold text-white">
                      {player.surname} {player.name}
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      {player.position}
                    </span>
                  </div>
                </div>
                <div className={`font-mono text-xl ${getRankStyle(index)}`}>
                  #{index + 1}
                </div>
              </div>

              {/* Siatka na mobile automatycznie dostosowująca ilość kolumn */}
              <div className={`grid ${gridClass} gap-2`}>
                {config.showMatches && (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-2">
                    <span className="mb-1 text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                      Mecze
                    </span>
                    <span className="font-mono text-base font-bold text-white">
                      {stats.matches}
                    </span>
                  </div>
                )}
                {config.showGoals && player.position !== 'Bramkarz' && (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-900/10 py-2">
                    <span className="mb-1 text-[9px] font-bold tracking-widest text-emerald-500 uppercase">
                      Bramki
                    </span>
                    <span className="font-mono text-base font-bold text-emerald-400">
                      {stats.goals}
                    </span>
                  </div>
                )}

                {/* Logika dla bramkarzy (Czyste konta w kolorze czerwonym) */}
                {(config.showCleanSheets || config.showGoals) &&
                  player.position === 'Bramkarz' && (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-red-500/20 bg-red-900/10 px-1 py-2 text-center">
                      <span className="mb-1 text-[9px] leading-tight font-bold tracking-widest text-red-500 uppercase">
                        Czyste konta
                      </span>
                      <span className="font-mono text-base font-bold text-red-400">
                        {stats.cleanSheets}
                      </span>
                    </div>
                  )}
                {config.showAssists && (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-2">
                    <span className="mb-1 text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                      Asysty
                    </span>
                    <span className="font-mono text-base font-bold text-white">
                      {stats.assists > 0 ? stats.assists : '-'}
                    </span>
                  </div>
                )}
                {config.showCards && (
                  <div className="flex flex-col items-center justify-center rounded-lg bg-white/5 py-2">
                    <span className="mb-1 text-[9px] font-bold tracking-widest text-gray-500 uppercase">
                      Kartki
                    </span>
                    <div className="flex items-center gap-1">
                      {stats.yellowCards === 0 && stats.redCards === 0 ? (
                        <span className="font-mono text-base font-bold text-gray-600">
                          -
                        </span>
                      ) : (
                        <>
                          {stats.yellowCards > 0 && (
                            <div className="flex items-center gap-0.5">
                              <span className="font-mono text-xs font-bold text-yellow-500">
                                {stats.yellowCards}
                              </span>
                              <div className="h-3 w-2 rounded-[2px] bg-yellow-500" />
                            </div>
                          )}
                          {stats.redCards > 0 && (
                            <div className="ml-1 flex items-center gap-0.5">
                              <span className="font-mono text-xs font-bold text-red-500">
                                {stats.redCards}
                              </span>
                              <div className="h-3 w-2 rounded-[2px] bg-red-500" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* === 2. WIDOK DESKTOPOWY (TABELA) === */}
      <div className="hidden overflow-hidden rounded-xl border border-white/5 bg-[#121212] shadow-lg md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead className="border-b border-white/5 bg-white/[0.02]">
              <tr>
                <th className="w-16 px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase">
                  Poz.
                </th>
                <Th field="name" label="Zawodnik" {...commonThProps} />

                {config.showMatches && (
                  <Th
                    field="matches"
                    label="Mecze"
                    alignRight
                    {...commonThProps}
                  />
                )}
                {config.showGoals && (
                  <Th
                    field="goals"
                    label="Bramki"
                    alignRight
                    {...commonThProps}
                  />
                )}
                {config.showAssists && (
                  <Th
                    field="assists"
                    label="Asysty"
                    alignRight
                    {...commonThProps}
                  />
                )}
                {config.showCleanSheets && (
                  <Th
                    field="cleanSheets"
                    label="Czyste konta"
                    mobileHidden
                    alignRight
                    {...commonThProps}
                  />
                )}
                {config.showCards && (
                  <Th
                    field="yellowCards"
                    label="Kartki"
                    mobileHidden
                    alignRight
                    {...commonThProps}
                  />
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {sortedPlayers.map((player, index) => {
                const stats = player.stats || {
                  matches: 0,
                  goals: 0,
                  assists: 0,
                  cleanSheets: 0,
                  yellowCards: 0,
                  redCards: 0,
                }

                return (
                  <tr
                    key={player._id}
                    className="group transition-colors duration-200 hover:bg-white/[0.02]"
                  >
                    <td
                      className={`px-4 py-4 text-center font-mono text-sm ${getRankStyle(index)}`}
                    >
                      {index + 1}.
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <div className="relative hidden h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-neutral-900 sm:block">
                          {player.imageUrl ? (
                            <Image
                              src={player.imageUrl}
                              alt={player.surname}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <User className="h-full w-full p-2 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <span className="block text-sm font-bold text-gray-200 transition-colors group-hover:text-white">
                            {player.surname} {player.name}
                          </span>
                          <span className="text-[10px] font-bold tracking-wide text-gray-500 uppercase">
                            {player.position}
                          </span>
                        </div>
                      </div>
                    </td>

                    {config.showMatches && (
                      <td className="px-4 py-3 text-right font-mono text-sm text-gray-400">
                        {stats.matches}
                      </td>
                    )}

                    {config.showGoals && (
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`font-mono text-sm font-bold ${stats.goals > 0 ? 'text-club-green' : 'text-gray-600'}`}
                        >
                          {stats.goals}
                        </span>
                      </td>
                    )}

                    {config.showAssists && (
                      <td className="px-4 py-3 text-right font-mono text-sm text-gray-400">
                        {stats.assists > 0 ? stats.assists : '-'}
                      </td>
                    )}

                    {config.showCleanSheets && (
                      <td className="hidden px-4 py-3 text-right font-mono text-sm text-gray-400 md:table-cell">
                        {player.position === 'Bramkarz' && stats.cleanSheets ? (
                          <span className="font-bold text-red-500">
                            {stats.cleanSheets}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                    )}

                    {config.showCards && (
                      <td className="hidden px-4 py-3 text-right font-mono text-sm md:table-cell">
                        <div className="flex items-center justify-end gap-2">
                          {stats.yellowCards > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-yellow-500">
                                {stats.yellowCards}
                              </span>
                              <div className="h-3 w-2 rounded-[1px] bg-yellow-500" />
                            </div>
                          )}
                          {stats.redCards > 0 && (
                            <div className="ml-1 flex items-center gap-1">
                              <span className="font-bold text-red-500">
                                {stats.redCards}
                              </span>
                              <div className="h-3 w-2 rounded-[1px] bg-red-500" />
                            </div>
                          )}
                          {stats.yellowCards === 0 && stats.redCards === 0 && (
                            <span className="text-gray-700">-</span>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
