'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Trophy, ChevronDown, ChevronUp, Minus, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Match } from '@/types/index'

export type TableRow = {
  _key: string
  position: number
  teamName: string
  teamLogo?: string
  matches: number
  points: number
  won: number
  drawn: number
  lost: number
  goals: string
}

export type LeagueConfig = {
  promotionSpots?: number
  promotionPlayoffSpots?: number
  relegationPlayoffSpots?: number
  relegationSpots?: number
}

interface LeagueTableProps {
  competitionName: string
  rows: TableRow[]
  matches: (Match & { round: number })[]
  config?: LeagueConfig
}

export default function LeagueTable({
  competitionName,
  rows,
  matches,
  config,
}: LeagueTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (key: string) => {
    if (window.innerWidth >= 768) return
    setExpandedRow(expandedRow === key ? null : key)
  }

  // Funkcja obliczająca formę
  const getTeamForm = (teamName: string) => {
    if (!teamName) return []
    const teamMatches = matches
      .filter(
        (m) =>
          (m.homeTeam?.name === teamName || m.awayTeam?.name === teamName) &&
          typeof m.homeScore === 'number' &&
          typeof m.awayScore === 'number',
      )
      .sort((a, b) => b.round - a.round)
      .slice(0, 5)
      .reverse()

    return teamMatches.map((m) => {
      const isHome = m.homeTeam?.name === teamName
      const myScore = isHome ? m.homeScore : m.awayScore
      const oppScore = isHome ? m.awayScore : m.homeScore

      if (myScore === undefined || oppScore === undefined) return 'U'
      if (myScore > oppScore!) return 'W'
      if (myScore === oppScore) return 'D'
      return 'L'
    })
  }

  const renderFormIcon = (result: string, index: number) => {
    let colorClass = 'bg-gray-600'
    let content = <Minus size={10} />
    if (result === 'W') {
      colorClass = 'bg-green-500'
      content = <Check size={10} strokeWidth={4} />
    } else if (result === 'D') {
      colorClass = 'bg-gray-500'
      content = <Minus size={10} strokeWidth={4} />
    } else if (result === 'L') {
      colorClass = 'bg-red-500'
      content = <X size={10} strokeWidth={4} />
    }

    return (
      <div
        key={index}
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-[4px] text-white shadow-sm',
          colorClass,
        )}
        title={result}
      >
        {content}
      </div>
    )
  }

  const promoSpots = config?.promotionSpots || 0
  const promoPlayoffSpots = config?.promotionPlayoffSpots || 0
  const relPlayoffSpots = config?.relegationPlayoffSpots || 0
  const relSpots = config?.relegationSpots || 0
  const totalTeams = rows.length || 0

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-4 md:flex-row md:items-center">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="bg-club-green/10 border-club-green/20 rounded-lg border p-2">
              <Trophy className="text-club-green" size={24} />
            </div>
            <h2 className="font-montserrat text-2xl font-black tracking-tight text-white uppercase">
              {competitionName || 'Brak Nazwy Rozgrywek'}
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 rounded-xl border border-white/5 bg-[#121212] px-4 py-2 text-[10px] font-bold tracking-wider uppercase">
            {promoSpots > 0 && (
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded border border-emerald-400/50 bg-emerald-500"></span>
                <span className="text-gray-400">Awans</span>
              </div>
            )}
            {promoPlayoffSpots > 0 && (
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded border border-blue-400/50 bg-blue-500"></span>
                <span className="text-gray-400">Baraże o awans</span>
              </div>
            )}
            {relPlayoffSpots > 0 && (
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded border border-orange-400/50 bg-orange-500"></span>
                <span className="text-gray-400">Baraże o utrzymanie</span>
              </div>
            )}
            {relSpots > 0 && (
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded border border-red-700/50 bg-red-800"></span>
                <span className="text-gray-400">Spadek</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl">
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_0%,rgba(23,65,53,0.1),transparent_70%)]" />
        <div className="relative z-10">
          {rows && rows.length > 0 ? (
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-[11px] font-bold tracking-widest text-gray-400 uppercase">
                  <th className="w-12 px-4 py-5 text-center md:w-16">#</th>
                  <th className="w-auto px-4 py-5 md:w-[35%]">Drużyna</th>
                  <th className="hidden px-4 py-5 text-center md:table-cell">
                    Mecze
                  </th>
                  <th className="px-4 py-5 text-center">PKT</th>
                  <th className="hidden px-4 py-5 text-center md:table-cell">
                    Z
                  </th>
                  <th className="hidden px-4 py-5 text-center md:table-cell">
                    R
                  </th>
                  <th className="hidden px-4 py-5 text-center md:table-cell">
                    P
                  </th>
                  <th className="hidden px-4 py-5 text-center md:table-cell">
                    Bramki
                  </th>
                  <th className="hidden px-4 py-5 text-center md:table-cell">
                    Forma
                  </th>
                  <th className="w-8 px-2 py-5 md:hidden"></th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                {rows.map((row, index) => {
                  const safeTeamName = row.teamName || 'Nieznana drużyna'
                  const isMyTeam = safeTeamName
                    .toLowerCase()
                    .includes('kujawianka')
                  const pos = row.position || index + 1

                  const isPromotion = promoSpots > 0 && pos <= promoSpots
                  const isPromoPlayoff =
                    promoPlayoffSpots > 0 &&
                    pos > promoSpots &&
                    pos <= promoSpots + promoPlayoffSpots
                  const isRelegation =
                    relSpots > 0 && pos > totalTeams - relSpots
                  const isRelPlayoff =
                    relPlayoffSpots > 0 &&
                    pos > totalTeams - relSpots - relPlayoffSpots &&
                    pos <= totalTeams - relSpots

                  const isExpanded = expandedRow === row._key

                  return (
                    <React.Fragment key={row._key || index}>
                      <tr
                        onClick={() => toggleRow(row._key)}
                        className={cn(
                          'group relative cursor-pointer border-b border-white/5 transition-colors md:cursor-default',
                          isPromotion
                            ? 'bg-emerald-900/40 hover:bg-emerald-900/50'
                            : isPromoPlayoff
                              ? 'bg-blue-900/20 hover:bg-blue-900/30'
                              : isRelegation
                                ? 'bg-red-900/20 hover:bg-red-900/30'
                                : isRelPlayoff
                                  ? 'bg-orange-900/10 hover:bg-orange-900/20'
                                  : isMyTeam
                                    ? 'bg-white/5 hover:bg-white/10'
                                    : 'hover:bg-white/5',
                        )}
                      >
                        <td
                          className={cn(
                            'px-2 py-4 text-center font-black text-white/50 transition-colors group-hover:text-white md:px-6',
                            isMyTeam ? 'border-club-green border-l-4' : '',
                          )}
                        >
                          <div
                            className={cn(
                              'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                              isPromotion
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                                : isPromoPlayoff
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                  : isRelegation
                                    ? 'bg-red-800 text-white shadow-lg shadow-red-900/20'
                                    : isRelPlayoff
                                      ? 'bg-orange-700 text-white shadow-lg shadow-orange-900/20'
                                      : '',
                            )}
                          >
                            {pos}
                          </div>
                        </td>

                        <td className="px-2 py-4 md:px-4">
                          <div className="flex items-center gap-3 md:gap-4">
                            <div className="relative h-8 w-8 flex-shrink-0 md:h-10 md:w-10">
                              <Image
                                src={row.teamLogo || '/l1.png'}
                                alt={safeTeamName}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span
                              title={safeTeamName}
                              className={cn(
                                // Usunięto: 'max-w-[140px] truncate'
                                // Dodano: 'text-balance line-clamp-2 md:line-clamp-none'
                                'line-clamp-2 text-sm tracking-wide text-balance uppercase md:line-clamp-none md:text-base',
                                isMyTeam
                                  ? 'font-black text-white'
                                  : 'font-bold text-gray-300',
                              )}
                            >
                              {safeTeamName}
                            </span>
                          </div>
                        </td>

                        <td className="hidden px-4 py-4 text-center text-base font-bold text-gray-400 md:table-cell">
                          {row.matches}
                        </td>
                        <td className="px-2 py-4 text-center md:px-4">
                          <span
                            className={cn(
                              'text-xl font-black',
                              isMyTeam ? 'text-club-green-light' : 'text-white',
                            )}
                          >
                            {row.points}
                          </span>
                        </td>

                        <td className="hidden px-4 py-4 text-center text-gray-500 md:table-cell">
                          {row.won}
                        </td>
                        <td className="hidden px-4 py-4 text-center text-gray-500 md:table-cell">
                          {row.drawn}
                        </td>
                        <td className="hidden px-4 py-4 text-center text-gray-500 md:table-cell">
                          {row.lost}
                        </td>
                        <td className="hidden px-4 py-4 text-center font-mono text-gray-500 md:table-cell">
                          {row.goals}
                        </td>
                        <td className="hidden px-4 py-4 md:table-cell">
                          <div className="flex items-center justify-center gap-1.5">
                            {getTeamForm(safeTeamName).map((result, idx) =>
                              renderFormIcon(result, idx),
                            )}
                          </div>
                        </td>

                        <td className="px-2 py-4 text-center text-gray-500 md:hidden">
                          {isExpanded ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </td>
                      </tr>

                      {/* WIDOK MOBILE (Rozwijany) */}
                      {isExpanded && (
                        <tr className="animate-in fade-in slide-in-from-top-2 border-b border-white/5 bg-[#0a0a0a] duration-300 md:hidden">
                          <td
                            colSpan={5}
                            className={cn(
                              'p-4',
                              isMyTeam ? 'border-club-green/50 border-l-4' : '',
                            )}
                          >
                            <div className="mb-4 grid grid-cols-3 gap-4 text-xs font-bold text-gray-400 uppercase">
                              <div className="flex flex-col items-center gap-1 rounded-lg bg-white/5 p-2">
                                <span className="text-[10px] tracking-widest opacity-60">
                                  Mecze
                                </span>
                                <span className="text-lg text-white">
                                  {row.matches}
                                </span>
                              </div>
                              <div className="flex flex-col items-center gap-1 rounded-lg border border-emerald-500/10 bg-emerald-900/10 p-2">
                                <span className="text-[10px] tracking-widest text-emerald-500">
                                  W
                                </span>
                                <span className="text-lg text-white">
                                  {row.won}
                                </span>
                              </div>
                              <div className="flex flex-col items-center gap-1 rounded-lg bg-white/5 p-2">
                                <span className="text-[10px] tracking-widest opacity-60">
                                  R
                                </span>
                                <span className="text-lg text-white">
                                  {row.drawn}
                                </span>
                              </div>
                              <div className="flex flex-col items-center gap-1 rounded-lg border border-red-500/10 bg-red-900/10 p-2">
                                <span className="text-[10px] tracking-widest text-red-500">
                                  P
                                </span>
                                <span className="text-lg text-white">
                                  {row.lost}
                                </span>
                              </div>
                              <div className="col-span-2 flex flex-col items-center gap-1 rounded-lg bg-white/5 p-2">
                                <span className="text-[10px] tracking-widest opacity-60">
                                  Bramki
                                </span>
                                <span className="font-mono text-lg tracking-widest text-white">
                                  {row.goals}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <span className="ml-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                                Ostatnie mecze:
                              </span>
                              <div className="flex items-center gap-2">
                                {getTeamForm(safeTeamName).map((result, idx) =>
                                  renderFormIcon(result, idx),
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center font-medium text-gray-400">
              Tabela nie została jeszcze wygenerowana (brak rozegranych meczów).
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
