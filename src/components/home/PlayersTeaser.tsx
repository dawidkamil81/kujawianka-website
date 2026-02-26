'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Player } from '@/types/index'
import PlayerCard from '@/components/common/PlayerCard' // Upewnij się, że ścieżka jest poprawna

interface PlayersTeaserProps {
  players: Player[]
  defaultSquadSlug?: string
}

export default function PlayersTeaser({
  players,
  defaultSquadSlug, // <--- Odbieramy prop
}: PlayersTeaserProps) {
  const squadUrl = defaultSquadSlug
    ? `/druzyny/${defaultSquadSlug}`
    : '/druzyny/seniorzy'

  return (
    <section className="relative w-full overflow-hidden border-t border-white/5 bg-[#0e0e0e] py-16">
      {/* Tło gradientowe (Glow) */}
      <div className="bg-club-green/5 pointer-events-none absolute top-0 left-0 h-[600px] w-[600px] rounded-full blur-[150px]" />

      <div className="relative z-10 container mx-auto px-4">
        {/* --- NAGŁÓWEK --- */}
        <div className="mb-10 flex flex-col items-end justify-between gap-4 border-b border-white/10 pb-4 md:flex-row">
          <div className="flex items-center gap-3">
            <h2 className="font-montserrat text-3xl font-black tracking-tight text-white uppercase md:text-4xl">
              Kadra <span className="text-emerald-500">Kujawianki</span>
            </h2>
          </div>

          <Link
            href={squadUrl}
            className="group flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-white"
          >
            Zobacz pełną kadrę
            <ArrowRight
              size={16}
              className="text-club-green transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* --- GRID ZAWODNIKÓW --- */}
        {/* Zachowano responsywny grid z oryginału */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {players && players.length > 0 ? (
            players.map((player, i) => (
              <motion.div
                key={player._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                // motion.div jest teraz tylko wrapperem animacji,
                // stylizację samej karty przejmuje PlayerCard
              >
                <PlayerCard player={player} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-white/5 bg-[#121212] py-12 text-center text-gray-500">
              Trwa ładowanie kadry zawodników...
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
