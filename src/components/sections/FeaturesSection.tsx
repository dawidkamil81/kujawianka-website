'use client'

import React from 'react'
import {
  Trophy,
  Star,
  Users,
  Shield,
  Ticket,
  Handshake,
  Megaphone,
  Briefcase,
  Heart,
  Calendar,
  Shirt,
  Target,
  Gem,
  LayoutGrid,
} from 'lucide-react'
import { motion } from 'framer-motion'

// 1. Mapa ikon (musi pokrywać się z tymi w Sanity)
const iconMap: Record<string, React.ElementType> = {
  trophy: Trophy,
  star: Star,
  users: Users,
  shield: Shield,
  ticket: Ticket,
  handshake: Handshake,
  megaphone: Megaphone,
  briefcase: Briefcase,
  heart: Heart,
  calendar: Calendar,
  shirt: Shirt,
  target: Target,
  gem: Gem,
  default: LayoutGrid,
}

// 2. Mapa kolumn (CMS zwraca string "2", "3", "4")
const gridColsMap: Record<string, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
  '5': 'md:grid-cols-3 lg:grid-cols-5',
}

// 3. Tworzymy interfejsy zamiast "any"
interface FeatureItem {
  _key?: string
  iconName: string
  title: string
  description?: string
}

interface FeaturesSectionProps {
  data: {
    columns?: string
    heading?: string
    items?: FeatureItem[]
  }
}

export default function FeaturesSection({ data }: FeaturesSectionProps) {
  // Domyślnie 3 kolumny, jeśli nic nie wybrano
  const gridClass = gridColsMap[data.columns || '3'] || gridColsMap['3']
  const items = data.items || []

  return (
    <section className="relative z-10 container mx-auto px-4 py-20">
      {/* --- NAGŁÓWEK SEKCJI --- */}
      {data.heading && (
        <div className="mb-12 flex items-center gap-4">
          <h3 className="font-montserrat border-l-4 border-emerald-500 pl-4 text-2xl font-bold tracking-widest text-white uppercase">
            {data.heading}
          </h3>
          <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>
      )}

      {/* --- GRID --- */}
      <div className={`grid grid-cols-1 gap-6 ${gridClass}`}>
        {items.map((item: FeatureItem, index: number) => {
          const IconComponent = iconMap[item.iconName] || iconMap.default

          return (
            <motion.div
              key={item._key || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/5"
            >
              {/* Ikona */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-emerald-500 shadow-lg transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                <IconComponent size={32} />
              </div>

              {/* Tytuł */}
              <h4 className="font-montserrat mb-3 text-xl font-bold text-white uppercase transition-colors group-hover:text-emerald-400">
                {item.title}
              </h4>

              {/* Opis */}
              {item.description && (
                <p className="text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
