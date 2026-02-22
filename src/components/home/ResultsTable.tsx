'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Trophy, Table2 } from 'lucide-react'
// ZMIANA 1: Dodany import LeagueConfig z globalnych typów
import { LeagueTable, Match, Team, LeagueConfig } from '@/types/index'
import { cn } from '@/lib/utils'

type ExtendedMatch = Match & {
  _id?: string
}

// ZMIANA 2: Usunięto lokalną definicję "type LeagueConfig = { ... }"

type ResultsTableProps = {
  table: LeagueTable
  matches: ExtendedMatch[]
  teams: Team[]
  config?: LeagueConfig // Teraz korzysta z zaimportowanego, poprawnego typu
}

export default function ResultsTable({
  table,
  matches,
  teams,
  config,
}: ResultsTableProps) {
  const getTeamLogo = (teamName: string) => {
    if (!teamName) return '/l1.png'
    const cleanName = teamName.toLowerCase().trim()
    const found = teams.find((t) => t.name.toLowerCase().trim() === cleanName)
    return found?.logoUrl || '/l1.png'
  }

  const rows = table?.rows || []
  const totalRowsCount = rows.length

  const kujawiankaIndex = rows.findIndex((row) =>
    row.teamName.includes('Kujawianka'),
  )
  const targetIndex = kujawiankaIndex !== -1 ? kujawiankaIndex : 0

  const tableLimit = 8
  const start = Math.max(0, targetIndex - Math.floor(tableLimit / 2))
  const end = Math.min(rows.length, start + tableLimit)

  const adjustedStart =
    start === 0
      ? 0
      : end === rows.length
        ? Math.max(0, rows.length - tableLimit)
        : start
  const adjustedEnd =
    adjustedStart + tableLimit > rows.length
      ? rows.length
      : adjustedStart + tableLimit

  const teaserTable = rows.slice(adjustedStart, adjustedEnd)
  const recentMatches = matches || []

  // ZMIANA 3: Dopasowanie do poprawnej struktury (config.promotionRelegation)
  const promoSpots = config?.promotionSpots || 0
  const promoPlayoffSpots = config?.promotionPlayoffSpots || 0
  const relPlayoffSpots = config?.relegationPlayoffSpots || 0
  const relSpots = config?.relegationSpots || 0

  return (
    <section className="relative w-full overflow-hidden border-t border-white/5 bg-[#0e0e0e] py-16">
      <div className="bg-club-green/5 pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full blur-[150px]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-10 flex flex-col items-end justify-between gap-4 border-b border-white/10 pb-4 md:flex-row">
          <div className="flex items-center gap-3">
            <h2 className="font-montserrat text-3xl font-black tracking-tight text-white uppercase md:text-4xl">
              Wyniki i <span className="text-emerald-500">Tabela</span>
            </h2>
          </div>

          <Link
            href="/wyniki/seniorzy"
            className="group flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-white"
          >
            Pełna tabela i wyniki
            <ArrowRight
              size={16}
              className="text-club-green transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-12">
          {/* LEWA KOLUMNA: WYNIKI */}
          <div className="flex flex-col gap-6 xl:col-span-7">
            <div className="flex items-center gap-2 px-2">
              <Trophy size={16} className="text-club-green" />
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Ostatnie wyniki
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {recentMatches.length > 0 ? (
                recentMatches.map((match) => {
                  const homeName = match.homeTeam?.name || 'Nieznana drużyna'
                  const awayName = match.awayTeam?.name || 'Nieznana drużyna'
                  const homeLogo =
                    match.homeTeam?.logoUrl || getTeamLogo(homeName)
                  const awayLogo =
                    match.awayTeam?.logoUrl || getTeamLogo(awayName)

                  return (
                    <div
                      key={match._id || match._key}
                      className="group hover:border-club-green/30 relative flex items-center justify-between rounded-xl border border-white/5 bg-[#121212] px-4 py-4 shadow-lg transition-all duration-300 hover:bg-white/5"
                    >
                      <div className="flex w-[40%] items-center justify-end gap-3">
                        <span className="group-hover:text-club-green-light line-clamp-1 text-right text-sm leading-tight font-bold text-white transition-colors">
                          {homeName}
                        </span>
                        <div className="relative h-8 w-8 flex-shrink-0 transition-all duration-300">
                          <Image
                            src={homeLogo}
                            alt={homeName}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="flex w-[20%] items-center justify-center">
                        <div className="font-montserrat flex h-9 min-w-[60px] items-center justify-center rounded-lg border border-white/10 bg-black/40 text-lg font-black text-white shadow-inner transition-colors group-hover:border-white/20">
                          {match.homeScore !== undefined &&
                          match.awayScore !== undefined ? (
                            <>
                              <span
                                className={
                                  match.homeScore > match.awayScore
                                    ? 'text-emerald-400'
                                    : 'text-white'
                                }
                              >
                                {match.homeScore}
                              </span>
                              <span className="mx-0.5 text-gray-600">:</span>
                              <span
                                className={
                                  match.awayScore > match.homeScore
                                    ? 'text-emerald-400'
                                    : 'text-white'
                                }
                              >
                                {match.awayScore}
                              </span>
                            </>
                          ) : (
                            '-:-'
                          )}
                        </div>
                      </div>

                      <div className="flex w-[40%] items-center justify-start gap-3">
                        <div className="relative h-8 w-8 flex-shrink-0 transition-all duration-300">
                          <Image
                            src={awayLogo}
                            alt={awayName}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="group-hover:text-club-green-light line-clamp-1 text-left text-sm leading-tight font-bold text-white transition-colors">
                          {awayName}
                        </span>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="col-span-2 rounded-2xl border border-white/5 bg-[#121212] p-8 text-center">
                  <p className="text-sm text-gray-400 italic">
                    Brak rozegranych meczy.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PRAWA KOLUMNA: TABELA */}
          <div className="flex flex-col gap-6 xl:col-span-5">
            <div className="flex items-center gap-2 px-2">
              <Table2 size={16} className="text-club-green" />
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Tabela Ligowa
              </span>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl">
              <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_0%,rgba(23,65,53,0.1),transparent_70%)]" />

              <div className="relative z-10 overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-white/5 text-[10px] font-bold tracking-wider text-gray-400 uppercase md:text-xs">
                    <tr>
                      <th className="w-12 px-4 py-4 text-center">#</th>
                      <th className="w-full px-3 py-4">Drużyna</th>
                      <th className="px-2 py-4 text-center">M</th>
                      <th className="px-4 py-4 text-center text-white">PKT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {teaserTable.map((row, index) => {
                      const isKujawianka = row.teamName.includes('Kujawianka')

                      // BEZPIECZNA POZYCJA: Nawet jeśli w bazie będzie ucięte, ta linijka zawsze wyliczy 100% poprawną pozycję.
                      const pos = row.position || adjustedStart + index + 1

                      // OBLICZANIE STREF
                      const isPromotion = promoSpots > 0 && pos <= promoSpots
                      const isPromoPlayoff =
                        promoPlayoffSpots > 0 &&
                        pos > promoSpots &&
                        pos <= promoSpots + promoPlayoffSpots
                      const isRelegation =
                        relSpots > 0 && pos > totalRowsCount - relSpots
                      const isRelPlayoff =
                        relPlayoffSpots > 0 &&
                        pos > totalRowsCount - relSpots - relPlayoffSpots &&
                        pos <= totalRowsCount - relSpots

                      return (
                        <tr
                          key={row._key || index}
                          className={cn(
                            'transition-all duration-300',
                            isPromotion
                              ? 'bg-emerald-900/10 hover:bg-emerald-900/20'
                              : isPromoPlayoff
                                ? 'bg-blue-900/10 hover:bg-blue-900/20'
                                : isRelegation
                                  ? 'bg-red-900/10 hover:bg-red-900/20'
                                  : isRelPlayoff
                                    ? 'bg-orange-900/10 hover:bg-orange-900/20'
                                    : isKujawianka
                                      ? 'bg-white/5 hover:bg-white/10'
                                      : 'hover:bg-white/5',
                          )}
                        >
                          <td
                            className={cn(
                              'px-4 py-3 text-center',
                              isKujawianka
                                ? 'border-club-green border-l-4'
                                : '',
                            )}
                          >
                            <span
                              className={cn(
                                'text-xs font-bold',
                                isPromotion
                                  ? 'text-emerald-500'
                                  : isPromoPlayoff
                                    ? 'text-blue-500'
                                    : isRelegation
                                      ? 'text-red-500'
                                      : isRelPlayoff
                                        ? 'text-orange-500'
                                        : 'text-gray-500',
                              )}
                            >
                              {pos}.
                            </span>
                          </td>

                          <td className="px-3 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative h-6 w-6 flex-shrink-0">
                                <Image
                                  src={
                                    row.teamLogo || getTeamLogo(row.teamName)
                                  }
                                  alt={row.teamName}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span
                                className={cn(
                                  'block max-w-[140px] truncate text-xs font-semibold sm:max-w-[180px] sm:text-sm',
                                  isKujawianka
                                    ? 'text-club-green-light font-black tracking-wide'
                                    : 'text-gray-300',
                                )}
                              >
                                {row.teamName}
                              </span>
                            </div>
                          </td>

                          <td className="px-2 py-3 text-center text-xs font-medium text-gray-500">
                            {row.matches}
                          </td>

                          <td className="px-4 py-3 text-center">
                            <span
                              className={cn(
                                'font-montserrat text-sm font-black',
                                isPromotion
                                  ? 'text-emerald-400'
                                  : isPromoPlayoff
                                    ? 'text-blue-400'
                                    : isRelegation
                                      ? 'text-red-400'
                                      : isRelPlayoff
                                        ? 'text-orange-400'
                                        : 'text-white',
                              )}
                            >
                              {row.points}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
