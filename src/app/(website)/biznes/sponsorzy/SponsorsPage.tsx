'use client'

import { useState } from 'react' // Usunięto import useEffect
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Sponsor, SponsorsPageData } from '@/types/index'
import {
  Handshake,
  TrendingUp,
  Users,
  Calendar,
  ExternalLink,
  Globe,
  Trophy,
  Star,
} from 'lucide-react'
import ContactSection from '@/components/sections/ContactSection'

// Helper type do grupowania
type GroupedSponsors = {
  tierName: string
  rank: number
  sponsors: Sponsor[]
}

// Mapowanie nazw ikon z CMS na komponenty Lucide
const iconMap: Record<string, React.ReactNode> = {
  handshake: <Handshake className="text-emerald-400" size={24} />,
  users: <Users className="text-emerald-400" size={24} />,
  trending: <TrendingUp className="text-emerald-400" size={24} />,
  calendar: <Calendar className="text-emerald-400" size={24} />,
  trophy: <Trophy className="text-emerald-400" size={24} />,
  star: <Star className="text-emerald-400" size={24} />,
}

interface SponsorsPageProps {
  sponsors: Sponsor[]
  pageData: SponsorsPageData
}

export default function SponsorsPage({
  sponsors,
  pageData,
}: SponsorsPageProps) {
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

  // ZMIANA: Zastąpienie useEffect logiką derive state
  // Przechowujemy tylko tego sponsora, na którego kliknął użytkownik.
  // Jeśli na nic nie kliknął (null) i istnieje mainGroup - użyj pierwszego elementu.
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null)
  const activeSponsor = selectedSponsor || (mainGroup?.sponsors?.[0] ?? null)

  // 2. PRZELICZANIE STATYSTYK (Obsługa "AUTO")
  const calculatedStats =
    pageData.stats?.map((stat) => ({
      ...stat,
      value:
        stat.value.toUpperCase() === 'AUTO' ? `${sponsors.length}` : stat.value,
    })) || []

  // 3. FUNKCJA KOLORUJĄCA TYTUŁ (Druga połowa słów na zielono)
  const renderColoredTitle = (title: string) => {
    const words = title.trim().split(/\s+/)
    if (words.length < 2) return <span className="text-white">{title}</span>

    const halfIndex = Math.ceil(words.length / 2)

    return (
      <>
        <span className="text-white">
          {words.slice(0, halfIndex).join(' ')}{' '}
        </span>
        <span className="text-emerald-500">
          {words.slice(halfIndex).join(' ')}
        </span>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-24">
      {/* === NAGŁÓWEK === */}
      <div className="flex flex-col items-center justify-center space-y-5 text-center">
        <span className="bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
          Wsparcie i Rozwój
        </span>

        {/* Użycie funkcji kolorującej */}
        <h1 className="font-montserrat text-center text-4xl font-black tracking-tight uppercase drop-shadow-2xl md:text-5xl">
          {renderColoredTitle(pageData.title)}
        </h1>

        <p className="max-w-2xl text-center text-sm font-medium text-gray-400 md:text-base">
          {pageData.description}
        </p>
      </div>

      {/* === STATYSTYKI === */}
      {calculatedStats.length > 0 && (
        <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {calculatedStats.map((stat, index) => (
            <div
              key={index}
              className="hover:border-club-green/30 group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#121212] p-6 transition-all duration-300"
            >
              <div className="group-hover:bg-club-green/10 mb-3 rounded-full bg-white/5 p-3 transition-colors">
                {iconMap[stat.icon] || iconMap['handshake']}
              </div>
              <span className="font-montserrat mb-1 text-3xl font-black tracking-tight text-white md:text-4xl">
                {stat.value}
              </span>
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors group-hover:text-gray-300">
                {stat.label}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* === SPONSORZY GŁÓWNI (RANK 1) === */}
      {mainGroup && mainGroup.sponsors.length > 0 && (
        <section>
          <div className="mb-10 flex items-center gap-4">
            <h3 className="font-montserrat border-l-4 border-emerald-500 pl-4 text-2xl font-bold tracking-widest text-white uppercase">
              {mainGroup.tierName}
            </h3>
            <div className="h-[1px] flex-grow bg-white/10"></div>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.5fr]">
            {/* Lewa kolumna */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
              {mainGroup.sponsors.map((sponsor) => (
                <motion.div
                  key={sponsor._id}
                  onClick={() => setSelectedSponsor(sponsor)} // Podmieniono na nową f. stanu
                  className={`relative flex aspect-video cursor-pointer items-center justify-center rounded-xl border p-4 transition-all duration-300 ${
                    activeSponsor?._id === sponsor._id
                      ? 'border-emerald-500/50 bg-white/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                      : 'border-white/10 bg-[#121212] hover:border-white/30 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {sponsor.logoUrl ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-white">
                      {sponsor.name}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Prawa kolumna - Sticky Karta */}
            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                {activeSponsor && (
                  <motion.div
                    key={activeSponsor._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex min-h-[400px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-8 shadow-2xl md:p-10"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-transparent" />
                    {activeSponsor.backgroundImageUrl && (
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={activeSponsor.backgroundImageUrl}
                          alt="bg"
                          fill
                          className="object-cover opacity-10 mix-blend-overlay"
                        />
                      </div>
                    )}
                    <div className="relative z-10 mb-6 flex flex-col gap-4 border-b border-white/10 pb-6">
                      <div>
                        <span className="mb-2 inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-widest text-emerald-500 uppercase">
                          {activeSponsor.tier.name}
                        </span>
                        <h2 className="font-montserrat text-3xl font-black tracking-tight text-white md:text-4xl">
                          {activeSponsor.name}
                        </h2>
                      </div>
                    </div>
                    <div className="relative z-10 flex-grow">
                      <p className="text-lg leading-relaxed text-gray-300">
                        {activeSponsor.description ||
                          `Dumny ${activeSponsor.tier.name.toLowerCase()} Kujawianki Izbica Kujawska.`}
                      </p>
                    </div>
                    <div className="relative z-10 mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                      {activeSponsor.website ? (
                        <a
                          href={activeSponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:text-emerald-400"
                        >
                          Odwiedź stronę{' '}
                          <ExternalLink
                            size={16}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-600 uppercase">
                          <Globe size={16} /> Partner Lokalny
                        </div>
                      )}
                    </div>
                    {activeSponsor.logoUrl && (
                      <div className="pointer-events-none absolute -right-10 -bottom-10 h-[350px] w-[350px] rotate-[-15deg] opacity-5">
                        <Image
                          src={activeSponsor.logoUrl}
                          alt=""
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* === SPONSORZY STRATEGICZNI (RANK 2) === */}
      {strategicGroup && strategicGroup.sponsors.length > 0 && (
        <section>
          <div className="mb-10 flex items-center gap-4">
            <h3 className="font-montserrat border-l-4 border-white/30 pl-4 text-xl font-bold tracking-widest text-white uppercase">
              {strategicGroup.tierName}
            </h3>
            <div className="h-[1px] flex-grow bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {strategicGroup.sponsors.map((sponsor) => {
              const Wrapper = sponsor.website ? 'a' : 'div'
              const wrapperProps = sponsor.website
                ? {
                    href: sponsor.website,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {}

              return (
                <Wrapper key={sponsor._id} {...wrapperProps} className="block">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={`group relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-8 transition-all duration-300 ${sponsor.website ? 'cursor-pointer hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'hover:border-emerald-500/30'}`}
                  >
                    {sponsor.website && (
                      <div className="absolute top-4 right-4 text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100">
                        <ExternalLink size={18} />
                      </div>
                    )}
                    {sponsor.logoUrl ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={sponsor.logoUrl}
                          alt={sponsor.name}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-300">
                        {sponsor.name}
                      </span>
                    )}
                  </motion.div>
                </Wrapper>
              )
            })}
          </div>
        </section>
      )}

      {/* === POZOSTALI (RANK > 2) === */}
      {otherGroups.map((group) => (
        <section key={group.tierName}>
          <div className="mb-10 flex items-center gap-4">
            <h3 className="font-montserrat border-l-4 border-white/10 pl-4 text-lg font-bold tracking-widest text-gray-400 uppercase">
              {group.tierName}
            </h3>
            <div className="h-[1px] flex-grow bg-white/10"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {group.sponsors.map((sponsor) => {
              const Wrapper = sponsor.website ? 'a' : 'div'
              const wrapperProps = sponsor.website
                ? {
                    href: sponsor.website,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  }
                : {}

              return (
                <Wrapper
                  key={sponsor._id}
                  {...wrapperProps}
                  className={`group relative flex aspect-square items-center justify-center rounded-xl border border-white/5 bg-white/5 p-6 transition-colors hover:bg-white/10 ${sponsor.website ? 'cursor-pointer hover:border-white/30' : ''}`}
                >
                  {sponsor.website && (
                    <div className="absolute top-2 right-2 text-white/50 opacity-0 transition-all group-hover:text-white group-hover:opacity-100">
                      <ExternalLink size={14} />
                    </div>
                  )}
                  {sponsor.logoUrl ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        fill
                        className="object-contain transition-all duration-300 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <span className="text-center text-xs font-bold text-gray-500">
                      {sponsor.name}
                    </span>
                  )}
                </Wrapper>
              )
            })}
          </div>
        </section>
      ))}

      {/* === CTA / ZOSTAŃ SPONSOREM === */}
      <ContactSection
        title={pageData.ctaTitle || 'Dołącz do Rodziny Kujawianki'}
        description={
          pageData.ctaDescription ||
          'Budujmy razem silną markę i wspierajmy lokalny sport.'
        }
      />
    </div>
  )
}
