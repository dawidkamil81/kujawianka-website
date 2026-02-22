'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Globe } from 'lucide-react'
import { Sponsor } from '@/types/index'
import SectionHeader from '@/components/ui/SectionHeader'

interface MainSponsorsProps {
  group: {
    tierName: string
    sponsors: Sponsor[]
  }
}

export default function MainSponsors({ group }: MainSponsorsProps) {
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null)
  const activeSponsor = selectedSponsor || group.sponsors[0]

  if (!group || group.sponsors.length === 0) return null

  return (
    <section>
      <SectionHeader title={group.tierName} />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_1.5fr]">
        {/* Lewa kolumna - Grid sponsorów */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
          {group.sponsors.map((sponsor) => (
            <motion.div
              key={sponsor._id}
              onClick={() => setSelectedSponsor(sponsor)}
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

        {/* Prawa kolumna - Sticky Karta Aktywnego Sponsora */}
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
  )
}
