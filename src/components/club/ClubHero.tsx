'use client'

import { motion } from 'framer-motion'
import SplitColorTitle from '@/components/ui/SplitColorTitle'
import SectionBadge from '@/components/ui/SectionBadge'

interface ClubHeroProps {
  heading: string
  description: string
}

export default function ClubHero({ heading, description }: ClubHeroProps) {
  return (
    <motion.div
      className="mb-20 flex flex-col items-center justify-center space-y-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SectionBadge>Tradycja • Pasja • Wspólnota</SectionBadge>
      <h1 className="font-montserrat text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
        <SplitColorTitle text={heading || 'Kujawianka Izbica Kujawska'} />
      </h1>
      <p className="max-w-2xl text-center text-sm font-medium text-gray-400 md:text-base">
        {description}
      </p>
    </motion.div>
  )
}
