'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Match } from '@/types/index'

interface MatchFixturesProps {
  matches: (Match & { round: number })[]
}

export default function MatchFixtures({ matches }: MatchFixturesProps) {
  const rounds = Array.from(new Set(matches.map((m) => m.round))).sort(
    (a, b) => a - b,
  )

  const lastPlayedRound = matches
    .filter((m) => m.homeScore !== null && m.homeScore !== undefined)
    .reduce((max, m) => (m.round > max ? m.round : max), rounds[0] || 1)

  const [currentRound, setCurrentRound] = useState(lastPlayedRound || 1)

  const currentMatches = matches
    .filter((m) => m.round === currentRound)
    .sort((a, b) => {
      const isKujawiankaA =
        (a.homeTeam?.name || '').toLowerCase().includes('kujawianka') ||
        (a.awayTeam?.name || '').toLowerCase().includes('kujawianka')
      const isKujawiankaB =
        (b.homeTeam?.name || '').toLowerCase().includes('kujawianka') ||
        (b.awayTeam?.name || '').toLowerCase().includes('kujawianka')
      if (isKujawiankaA && !isKujawiankaB) return -1
      if (!isKujawiankaA && isKujawiankaB) return 1
      return 0
    })

  const handleRoundChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setCurrentRound(Number(e.target.value))

  const goToNextRound = () => {
    const currentIndex = rounds.indexOf(currentRound)
    if (currentIndex < rounds.length - 1)
      setCurrentRound(rounds[currentIndex + 1])
  }

  const goToPrevRound = () => {
    const currentIndex = rounds.indexOf(currentRound)
    if (currentIndex > 0) setCurrentRound(rounds[currentIndex - 1])
  }

  const getMatchScoreStyle = (match: Match & { round: number }) => {
    const homeName = (match.homeTeam?.name || '').toLowerCase()
    const awayName = (match.awayTeam?.name || '').toLowerCase()
    const isKujawiankaHome = homeName.includes('kujawianka')
    const isKujawiankaAway = awayName.includes('kujawianka')

    if (!isKujawiankaHome && !isKujawiankaAway)
      return 'bg-black/40 border-white/10 text-white'
    if (match.homeScore === null || match.homeScore === undefined)
      return 'bg-black/40 border-white/10 text-white'

    const homeScore = match.homeScore
    const awayScore = match.awayScore!

    if (isKujawiankaHome) {
      if (homeScore > awayScore)
        return 'bg-green-900/40 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.1)]'
      if (homeScore < awayScore)
        return 'bg-red-900/40 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(248,113,113,0.1)]'
    } else {
      if (awayScore > homeScore)
        return 'bg-green-900/40 border-green-500/50 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.1)]'
      if (awayScore < homeScore)
        return 'bg-red-900/40 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(248,113,113,0.1)]'
    }
    return 'bg-gray-800/60 border-white/10 text-gray-300'
  }

  return (
    <div id="terminarz" className="flex w-full flex-col gap-8">
      <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-xl md:flex-row">
        <div className="bg-club-green/5 pointer-events-none absolute top-0 right-0 h-full w-64 blur-3xl" />
        <div className="z-10 flex items-center gap-3">
          <Calendar className="text-club-green" size={28} />
          <div>
            <h3 className="font-montserrat text-xl font-black tracking-tight text-white uppercase">
              Terminarz
            </h3>
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase">
              Sprawdź wyniki meczów
            </p>
          </div>
        </div>
        <div className="z-10 flex w-full items-center justify-center gap-4 md:w-auto">
          <button
            onClick={goToPrevRound}
            disabled={rounds.indexOf(currentRound) === 0}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="group relative">
            <select
              value={currentRound}
              onChange={handleRoundChange}
              className="focus:border-club-green/50 min-w-[220px] cursor-pointer appearance-none rounded-xl border border-white/10 bg-[#0a0a0a] py-3 pr-10 pl-6 text-center font-bold tracking-wide text-white uppercase transition-colors hover:bg-white/5 focus:outline-none"
            >
              {rounds.map((r) => (
                <option key={r} value={r} className="bg-[#121212] text-white">
                  Kolejka {r}
                </option>
              ))}
            </select>
            <div className="text-club-green pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
              <ChevronRight size={16} className="rotate-90" />
            </div>
          </div>
          <button
            onClick={goToNextRound}
            disabled={rounds.indexOf(currentRound) === rounds.length - 1}
            className="rounded-xl border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentMatches.length > 0 ? (
          currentMatches.map((match) => {
            const safeHomeName = match.homeTeam?.name || 'Nieznana drużyna'
            const safeAwayName = match.awayTeam?.name || 'Nieznana drużyna'

            return (
              <div
                key={match._key}
                className="hover:border-club-green/30 group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(23,65,53,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-3 text-[11px] font-bold tracking-wider text-gray-500 uppercase">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-club-green" />
                    {match.date
                      ? new Date(match.date).toLocaleDateString('pl-PL', {
                          day: 'numeric',
                          month: 'long',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'TBA'}
                  </span>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex w-[30%] flex-col items-center gap-3">
                    <div className="relative h-14 w-14 transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
                      <Image
                        src={match.homeTeam?.logoUrl || '/l1.png'}
                        alt={safeHomeName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span
                      title={safeHomeName}
                      className="text-center text-[11px] leading-tight font-bold text-balance break-words text-gray-300 uppercase"
                    >
                      {safeHomeName}
                    </span>
                  </div>

                  <div className="flex w-[40%] flex-col items-center justify-center">
                    <div
                      className={cn(
                        'mb-2 rounded-xl border px-4 py-2 backdrop-blur-md transition-colors duration-300',
                        getMatchScoreStyle(match),
                      )}
                    >
                      <span className="font-montserrat text-2xl font-black tracking-widest whitespace-nowrap md:text-3xl">
                        {match.homeScore !== null &&
                        match.homeScore !== undefined &&
                        match.awayScore !== null &&
                        match.awayScore !== undefined
                          ? `${match.homeScore}:${match.awayScore}`
                          : '-:-'}
                      </span>
                    </div>
                    <span className="text-club-green text-[10px] font-bold tracking-wide uppercase">
                      {match.homeScore !== null && match.homeScore !== undefined
                        ? 'Koniec'
                        : ''}
                    </span>
                  </div>

                  <div className="flex w-[30%] flex-col items-center gap-3">
                    <div className="relative h-14 w-14 transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
                      <Image
                        src={match.awayTeam?.logoUrl || '/l1.png'}
                        alt={safeAwayName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span
                      title={safeAwayName}
                      className="text-center text-[11px] leading-tight font-bold text-balance break-words text-gray-300 uppercase"
                    >
                      {safeAwayName}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/5 bg-[#121212] py-16 text-center">
            <Calendar size={48} className="text-white/10" />
            <p className="text-lg text-gray-500 italic">
              Brak meczów w tej kolejce.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
