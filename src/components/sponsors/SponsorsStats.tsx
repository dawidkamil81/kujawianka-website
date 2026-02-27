'use client'

import {
  Handshake,
  TrendingUp,
  Users,
  Calendar,
  Trophy,
  Star,
} from 'lucide-react'

// ZMIANA: Dokładnie określony typ ikony zgodny z tym co zwraca CMS
interface StatItem {
  value: string
  label: string
  icon:
    | 'handshake'
    | 'users'
    | 'trending'
    | 'calendar'
    | 'trophy'
    | 'star'
    | string
}

interface SponsorsStatsProps {
  stats: StatItem[]
  totalSponsorsCount: number
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

export default function SponsorsStats({
  stats,
  totalSponsorsCount,
}: SponsorsStatsProps) {
  // Przeliczanie statystyk (Obsługa "AUTO") z dodatkowym sprawdzeniem
  const calculatedStats = stats
    ?.filter((stat) => stat.label) // Wyświetlamy tylko te, które mają etykietę
    .map((stat) => ({
      ...stat,
      value:
        stat.value?.toUpperCase() === 'AUTO'
          ? `${totalSponsorsCount}`
          : stat.value || '0',
    }))

  if (!calculatedStats || calculatedStats.length === 0) return null

  return (
    // ZMIANA: Zmniejszono gap z gap-6 na gap-3 dla małych ekranów (sm:gap-6 dla większych)
    <section className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
      {calculatedStats.map((stat, index) => (
        <div
          key={index}
          // ZMIANA: Zmniejszono padding p-6 na p-4 na mobile, aby zyskać przestrzeń wewnątrz kafelka
          className="group flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#121212] p-4 text-center transition-all duration-300 hover:border-emerald-500/30 sm:p-6"
        >
          {/* ZMIANA: Delikatnie zmniejszono margines pod ikoną na mobile */}
          <div className="mb-2 rounded-full bg-white/5 p-3 transition-colors group-hover:bg-emerald-500/10 sm:mb-3">
            {iconMap[stat.icon] || iconMap['handshake']}
          </div>
          {/* KLUCZOWA ZMIANA: Dodano whitespace-nowrap oraz dopasowano rozmiary fontów (text-2xl na najmniejszych ekranach) */}
          <span className="font-montserrat mb-1 text-2xl font-black tracking-tight whitespace-nowrap text-white sm:text-3xl md:text-4xl">
            {stat.value}
          </span>
          {/* ZMIANA: Zmniejszono font etykiety dla mobile (text-[10px]), żeby nie dominowała na małym ekranie */}
          <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase transition-colors group-hover:text-gray-300 sm:text-xs">
            {stat.label}
          </span>
        </div>
      ))}
    </section>
  )
}
