'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { MapPin, Calendar, ArrowRight, Shield } from 'lucide-react'
import { Match, Team } from '@/types/index'

type ExtendedMatch = Match & {
  _id?: string
  round?: number
}

interface MatchCenterProps {
  nextMatch: ExtendedMatch | null
  lastMatches: ExtendedMatch[]
  teams: Team[]
  clubLogo?: string
  defaultResultSlug?: string // <--- DODANE
}

const CLUB_NAME_PART = 'Kujawianka Izbica'

const formatTimeValue = (value: number) => String(value).padStart(2, '0')

const TimeBox = ({
  value,
  label,
}: {
  value: number | string
  label: string
}) => (
  <div className="flex flex-col items-center gap-1">
    <div className="group relative">
      <div className="group-hover:border-club-green/50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(23,65,53,0.3)] sm:h-14 sm:w-14 md:h-16 md:w-16">
        <span className="font-montserrat text-lg font-black tracking-tighter text-white sm:text-2xl md:text-3xl">
          {value}
        </span>
      </div>
    </div>
    <span className="text-[8px] font-bold tracking-widest text-gray-500 uppercase sm:text-[10px]">
      {label}
    </span>
  </div>
)

const CountdownTimer = ({ targetDate }: { targetDate?: string | null }) => {
  const calculateTimeLeft = () => {
    if (!targetDate) return null

    const difference = +new Date(targetDate) - +new Date()
    if (difference <= 0) return { dni: 0, godziny: 0, minuty: 0, sekundy: 0 }

    return {
      dni: Math.floor(difference / (1000 * 60 * 60 * 24)),
      godziny: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minuty: Math.floor((difference / 1000 / 60) % 60),
      sekundy: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    if (!targetDate) return
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearTimeout(timer)
  })

  if (!timeLeft) {
    return (
      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
        <TimeBox value="??" label="Dni" />
        <div className="mt-2 text-xl font-bold text-white/20 sm:mt-3 sm:text-2xl">
          :
        </div>
        <TimeBox value="??" label="Godz" />
        <div className="mt-2 text-xl font-bold text-white/20 sm:mt-3 sm:text-2xl">
          :
        </div>
        <TimeBox value="??" label="Min" />
      </div>
    )
  }

  return (
    <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
      <TimeBox value={formatTimeValue(timeLeft.dni)} label="Dni" />
      <div className="mt-2 text-xl font-bold text-white/20 sm:mt-3 sm:text-2xl">
        :
      </div>
      <TimeBox value={formatTimeValue(timeLeft.godziny)} label="Godz" />
      <div className="mt-2 text-xl font-bold text-white/20 sm:mt-3 sm:text-2xl">
        :
      </div>
      <TimeBox value={formatTimeValue(timeLeft.minuty)} label="Min" />
      <div className="mt-2 text-xl font-bold text-white/20 sm:mt-3 sm:text-2xl">
        :
      </div>
      <TimeBox value={formatTimeValue(timeLeft.sekundy)} label="Sek" />
    </div>
  )
}

const getLocation = (match: ExtendedMatch) => {
  const homeName = match.homeTeam?.name || ''
  if (homeName.includes(CLUB_NAME_PART)) return 'Dom'
  return 'Wyjazd'
}

const LastMatchCard = ({
  match,
  getLogo,
}: {
  match: ExtendedMatch
  getLogo: (name: string) => string
}) => {
  const formattedDate = match.date
    ? new Date(match.date).toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Data nieznana'

  const location = getLocation(match)

  const homeName = match.homeTeam?.name || 'Nieznana drużyna'
  const awayName = match.awayTeam?.name || 'Nieznana drużyna'
  const homeLogo = match.homeTeam?.logoUrl || getLogo(homeName)
  const awayLogo = match.awayTeam?.logoUrl || getLogo(awayName)

  return (
    <div className="group/last relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(23,65,53,0.15)]">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-black/80" />
      <div className="relative z-10 flex flex-col items-center justify-center p-5">
        <div className="mb-4 text-center">
          <span className="text-club-green border-club-green/20 bg-club-green/5 rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase">
            Kolejka {match.round || '-'}
          </span>
        </div>

        <div className="mb-4 flex w-full items-center justify-between gap-2">
          <div className="flex w-1/3 flex-col items-center">
            <div className="relative mb-2 h-14 w-14 transition-transform duration-500 group-hover/last:scale-110">
              <Image
                src={homeLogo}
                alt={homeName}
                fill
                className="object-contain"
              />
            </div>
            <span
              title={homeName}
              className="text-center text-[10px] leading-tight font-bold text-balance break-words text-gray-400 uppercase"
            >
              {homeName}
            </span>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center">
            <div className="font-montserrat flex items-center gap-1 rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-4xl font-black text-white shadow-inner backdrop-blur-sm">
              <span className="text-white">{match.homeScore ?? 0}</span>
              <span className="text-club-green/50">:</span>
              <span className="text-white">{match.awayScore ?? 0}</span>
            </div>
          </div>
          <div className="flex w-1/3 flex-col items-center">
            <div className="relative mb-2 h-14 w-14 transition-transform duration-500 group-hover/last:scale-110">
              <Image
                src={awayLogo}
                alt={awayName}
                fill
                className="object-contain"
              />
            </div>
            <span
              title={awayName}
              className="text-center text-[10px] leading-tight font-bold text-balance break-words text-gray-400 uppercase"
            >
              {awayName}
            </span>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-4 border-t border-white/5 pt-3 text-center">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={14} className="text-club-green" />
            <span className="text-xs font-medium tracking-wide uppercase">
              {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin size={14} className="text-club-green/60" />
            <span className="text-xs font-medium tracking-wide uppercase">
              {location}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MatchCenter({
  nextMatch,
  lastMatches,
  teams,
  clubLogo,
  defaultResultSlug, // <--- ODBIERAMY PROP
}: MatchCenterProps) {
  const getLogo = (teamName: string) => {
    if (!teamName) return '/logo.png'
    const cleanName = teamName.toLowerCase()

    if (cleanName.includes('kujawianka') && clubLogo) {
      return clubLogo
    }

    const team = teams.find((t) => t.name.toLowerCase() === cleanName)
    return team?.logoUrl || '/logo.png'
  }

  const formatNextMatchDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return {
      day: date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString('pl-PL', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
  }

  const nextMatchLocation = nextMatch ? getLocation(nextMatch) : null
  const formattedNextDate = nextMatch
    ? formatNextMatchDate(nextMatch.date)
    : null

  const nextHomeName = nextMatch?.homeTeam?.name || 'Nieznana drużyna'
  const nextAwayName = nextMatch?.awayTeam?.name || 'Nieznana drużyna'
  const nextHomeLogo = nextMatch?.homeTeam?.logoUrl || getLogo(nextHomeName)
  const nextAwayLogo = nextMatch?.awayTeam?.logoUrl || getLogo(nextAwayName)

  // GŁÓWNA ZMIANA: Dynamiczny adres URL z domyślnym fallbackiem 'seniorzy' w razie braku danych
  const resultsUrl = defaultResultSlug
    ? `/wyniki/${defaultResultSlug}#terminarz`
    : '/wyniki/seniorzy#terminarz'
  return (
    <section className="relative w-full overflow-hidden border-t border-white/5 bg-[#0e0e0e] py-16">
      <div className="bg-club-green/10 pointer-events-none absolute top-0 left-1/2 h-[300px] w-full max-w-4xl -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mb-10 flex flex-col items-end justify-between gap-4 border-b border-white/10 pb-4 md:flex-row">
          <div className="flex items-center gap-3">
            <h2 className="font-montserrat text-3xl font-black tracking-tight text-white uppercase md:text-4xl">
              Centrum <span className="text-emerald-500">Meczowe</span>
            </h2>
          </div>
          {/* Używamy tutaj naszej nowej, dynamicznej zmiennej */}
          <Link
            href={resultsUrl}
            className="group flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-white"
          >
            Pełny terminarz{' '}
            <ArrowRight
              size={16}
              className="text-club-green transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[1fr_350px]">
          {/* LEWA STRONA: NASTĘPNY MECZ */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl xl:sticky xl:top-8">
            <div className="group-hover:border-club-green/30 pointer-events-none absolute inset-0 z-20 rounded-3xl border-2 border-transparent transition-colors duration-500" />
            <div className="from-club-green/5 absolute inset-0 z-0 bg-gradient-to-br via-transparent to-black" />

            {nextMatch ? (
              <div className="relative z-10 flex h-full min-h-[400px] flex-col items-center justify-center p-6 md:p-10">
                <div className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                  <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">
                    Najbliższe spotkanie
                  </span>
                </div>

                <div className="mb-8 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-12">
                  {/* Gospodarz */}
                  <div className="flex flex-col items-center gap-3 md:gap-4">
                    <div className="relative h-20 w-20 drop-shadow-[0_0_25px_rgba(23,65,53,0.4)] transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24 md:h-32 md:w-32">
                      <Image
                        src={nextHomeLogo}
                        alt={nextHomeName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-montserrat max-w-[120px] text-center text-sm leading-tight font-bold text-white sm:text-lg md:max-w-[180px] md:text-2xl">
                      {nextHomeName}
                    </h3>
                  </div>

                  {/* Środek: VS + Timer (TYLKO DESKTOP) */}
                  <div className="relative flex min-w-[50px] flex-col items-center justify-center md:min-w-0">
                    <span className="font-montserrat absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 text-4xl font-black text-white/10 select-none md:text-6xl">
                      VS
                    </span>

                    <div className="mt-20 hidden scale-100 md:block">
                      <CountdownTimer targetDate={nextMatch.date} />
                    </div>
                  </div>

                  {/* Gość */}
                  <div className="flex flex-col items-center gap-3 md:gap-4">
                    <div className="relative h-20 w-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:scale-110 sm:h-24 sm:w-24 md:h-32 md:w-32">
                      <Image
                        src={nextAwayLogo}
                        alt={nextAwayName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-montserrat max-w-[120px] text-center text-sm leading-tight font-bold text-white sm:text-lg md:max-w-[180px] md:text-2xl">
                      {nextAwayName}
                    </h3>
                  </div>
                </div>

                {/* Timer widoczny TYLKO na mobile */}
                <div className="mb-8 scale-95 md:hidden">
                  <CountdownTimer targetDate={nextMatch.date} />
                </div>

                {/* Info na dole */}
                <div className="grid w-full grid-cols-1 gap-4 border-t border-white/10 pt-6 md:grid-cols-3">
                  <div className="flex items-center justify-center gap-3 text-gray-400">
                    <Shield size={18} className="text-club-green" />
                    <span className="text-sm font-medium tracking-wide uppercase">
                      Kolejka {nextMatch.round || '-'}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3 border-y border-white/5 py-2 text-gray-400 md:border-x md:border-y-0 md:py-0">
                    <Calendar size={18} className="text-club-green" />
                    <span className="text-sm font-medium">
                      {formattedNextDate ? (
                        <>
                          {formattedNextDate.day}, godz.{' '}
                          <span className="font-bold text-white">
                            {formattedNextDate.time}
                          </span>
                        </>
                      ) : (
                        <span className="text-white/60 italic">
                          Termin do ustalenia
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-gray-400">
                    <MapPin size={18} className="text-club-green" />
                    <span
                      className={`text-sm font-bold tracking-wider text-gray-400 uppercase`}
                    >
                      {nextMatchLocation}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex h-full min-h-[450px] flex-col items-center justify-center p-10 text-center">
                <h3 className="mb-2 text-2xl font-bold text-white">
                  Brak zaplanowanych spotkań
                </h3>
                <p className="text-gray-400">
                  Terminarz na kolejną rundę pojawi się wkrótce.
                </p>
              </div>
            )}
          </div>

          {/* PRAWA STRONA: OSTATNIE WYNIKI */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 px-2">
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Ostatnie wyniki
              </span>
            </div>
            {lastMatches && lastMatches.length > 0 ? (
              lastMatches.map((match) => (
                <LastMatchCard
                  key={match._id || match._key}
                  match={match}
                  getLogo={getLogo}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-white/5 p-4 text-center text-gray-500">
                Brak rozegranych meczy.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
