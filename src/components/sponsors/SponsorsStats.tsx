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
  // Przeliczanie statystyk (Obsługa "AUTO")
  const calculatedStats = stats.map((stat) => ({
    ...stat,
    value:
      stat.value.toUpperCase() === 'AUTO'
        ? `${totalSponsorsCount}`
        : stat.value,
  }))

  if (calculatedStats.length === 0) return null

  return (
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
  )
}
