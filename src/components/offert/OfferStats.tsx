import { Users, TrendingUp, Calendar, Trophy, Handshake } from 'lucide-react'

export interface StatData {
  iconName?: string
  value?: string
  label?: string
}

interface OfferStatsProps {
  stats: StatData[]
  sponsorsCount: number
}

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  trending: TrendingUp,
  calendar: Calendar,
  trophy: Trophy,
  handshake: Handshake,
}

export default function OfferStats({ stats, sponsorsCount }: OfferStatsProps) {
  if (!stats || stats.length === 0) return null

  const calculatedStats = stats.map((stat) => ({
    ...stat,
    value:
      stat.value?.toUpperCase() === 'AUTO' ? `${sponsorsCount}` : stat.value,
  }))

  return (
    <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {calculatedStats.map((stat, index) => {
        const IconComponent = iconMap[stat.iconName || 'handshake'] || Handshake
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
  )
}
