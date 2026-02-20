'use client'

import Link from 'next/link'
import {
  Gem,
  Trophy,
  Target,
  Users,
  Calendar,
  Shirt,
  Crown,
  Handshake,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'

// IMPORTUJEMY RENDERER SEKCJI
import SectionsRenderer from '@/components/sections/SectionsRenderer'

// 1. Mapowanie ikon
const iconMap: Record<string, React.ElementType> = {
  gem: Gem,
  target: Target,
  shirt: Shirt,
  crown: Crown,
  handshake: Handshake,
  users: Users,
  trending: TrendingUp,
  calendar: Calendar,
  trophy: Trophy,
}

// 2. Mapowanie Twoich klas stylów (Theme)
const colorThemes: Record<string, any> = {
  emerald: {
    iconColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-400/50',
    shadowColor: 'hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]',
    bgColor: 'bg-emerald-400/10',
    textColor: 'group-hover:text-emerald-400',
  },
  white: {
    iconColor: 'text-white',
    borderColor: 'hover:border-white/50',
    shadowColor: 'hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]',
    bgColor: 'bg-white/10',
    textColor: 'group-hover:text-white',
  },
  blue: {
    iconColor: 'text-blue-400',
    borderColor: 'hover:border-blue-400/50',
    shadowColor: 'hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]',
    bgColor: 'bg-blue-400/10',
    textColor: 'group-hover:text-blue-400',
  },
}

interface PartnershipProps {
  sponsorsCount: number
  pageData?: any // Tymczasowo any lub zaktualizowany OfferPageData zawierający contentBuilder
}

export default function Partnership({
  sponsorsCount,
  pageData,
}: PartnershipProps) {
  const scrollToContact = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
  ) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderColoredTitle = (title: string) => {
    const words = title.trim().split(/\s+/)
    if (words.length < 2) return <span className="text-white">{title}</span>

    const lastWord = words.pop()
    return (
      <>
        {words.join(' ')} <span className="text-emerald-500">{lastWord}</span>
      </>
    )
  }

  const packages = pageData?.packages || []

  const stats =
    pageData?.stats?.map((stat: any) => ({
      ...stat,
      value:
        stat.value?.toUpperCase() === 'AUTO' ? `${sponsorsCount}` : stat.value,
    })) || []

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* === NAGŁÓWEK STRONY === */}
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 text-center">
          <span className="bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            Współpraca Biznesowa
          </span>
          <h1 className="font-montserrat text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
            {pageData?.title ? (
              renderColoredTitle(pageData.title)
            ) : (
              <>
                Oferta <span className="text-emerald-500">Sponsorska</span>
              </>
            )}
          </h1>
          <p className="max-w-2xl text-center text-sm leading-relaxed font-medium text-gray-400 md:text-base">
            {pageData?.description ||
              'Dołącz do grona partnerów Kujawianki Izbica Kujawska.'}
          </p>
        </div>

        {/* === PAKIETY SPONSORSKIE === */}
        <div className="mb-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg: any, index: number) => {
            const theme = colorThemes[pkg.colorTheme] || colorThemes.emerald
            const IconComponent = iconMap[pkg.iconName] || Gem

            return (
              <div
                key={index}
                className={`group relative flex flex-col rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all duration-500 md:p-10 ${theme.borderColor} ${theme.shadowColor}`}
              >
                <div className="pointer-events-none absolute top-4 right-4 scale-150 opacity-5 grayscale transition-transform duration-700 group-hover:scale-125 group-hover:grayscale-0">
                  <IconComponent size={40} className={theme.iconColor} />
                </div>
                <div
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300 ${theme.bgColor}`}
                >
                  <IconComponent size={40} className={theme.iconColor} />
                </div>
                <div className="flex-grow">
                  <h3
                    className={`font-montserrat mb-4 text-2xl font-black text-white uppercase transition-colors duration-300 ${theme.textColor}`}
                  >
                    {pkg.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400 md:text-base">
                    {pkg.description}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
                  <span className="text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors group-hover:text-white">
                    Dowiedz się więcej
                  </span>
                  <div
                    className={`rounded-full border border-white/10 p-2 transition-all duration-300 group-hover:bg-white group-hover:text-black`}
                  >
                    <ArrowRight size={16} />
                  </div>
                </div>
                {pkg.link === '#contact' ? (
                  <div
                    onClick={scrollToContact}
                    className="absolute inset-0 z-10 cursor-pointer"
                    aria-label={`Wybierz ${pkg.title}`}
                  />
                ) : (
                  <Link
                    href={pkg.link || '#'}
                    className="absolute inset-0 z-10"
                    aria-label={`Wybierz ${pkg.title}`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* === STATYSTYKI === */}
        <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat: any, index: number) => {
            const IconComponent = iconMap[stat.iconName] || Handshake
            return (
              <div
                key={index}
                className="hover:border-club-green/30 group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#121212] p-6 transition-all duration-300"
              >
                <div className="group-hover:bg-club-green/10 mb-3 rounded-full bg-white/5 p-3 transition-colors">
                  <IconComponent className="text-emerald-500" size={24} />
                </div>
                <span className="font-montserrat mb-1 text-3xl font-black tracking-tight text-white md:text-4xl">
                  {stat.value}
                </span>
                <span className="text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors group-hover:text-gray-300">
                  {stat.label}
                </span>
              </div>
            )
          })}
        </section>

        {/* === SEKCJE DYNAMICZNE (Z CMS) === */}
        {/* Wstawiamy je tutaj, aby były wewnątrz kontenera i na tym samym tle */}
        {pageData?.contentBuilder && pageData.contentBuilder.length > 0 && (
          <div className="mt-24 md:mt-32">
            <SectionsRenderer sections={pageData.contentBuilder} />
          </div>
        )}
      </div>
    </main>
  )
}
