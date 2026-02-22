'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Medal } from 'lucide-react'

const ICON_MAP: Record<string, React.ElementType> = {
  star: Star,
  medal: Medal,
  trophy: Trophy,
}

interface Achievement {
  title: string
  description: string
  iconType: string
}

interface ClubAchievementsProps {
  achievements: Achievement[]
}

export default function ClubAchievements({
  achievements,
}: ClubAchievementsProps) {
  if (!achievements || achievements.length === 0) return null

  return (
    <motion.section
      className="mb-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="mb-12 flex flex-col items-center text-center">
        <div className="mb-4 rounded-full border border-yellow-500/20 bg-yellow-500/10 p-3">
          <Trophy className="text-yellow-500" size={32} />
        </div>
        <h2 className="font-montserrat mb-2 text-3xl font-black tracking-tight text-white uppercase">
          Sukcesy i <span className="text-yellow-500">Osiągnięcia</span>
        </h2>
        <div className="h-1 w-20 rounded-full bg-yellow-500" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {achievements.map((item, idx) => {
          const IconComponent = ICON_MAP[item.iconType] || Star
          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#121212] p-8 text-center transition-all hover:border-yellow-500/30"
            >
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-yellow-500/5 blur-[40px] transition-colors group-hover:bg-yellow-500/10" />
              <IconComponent
                className="mx-auto mb-4 text-yellow-500 transition-transform group-hover:scale-110"
                size={40}
              />
              <h3 className="mb-2 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          )
        })}
      </div>
    </motion.section>
  )
}
