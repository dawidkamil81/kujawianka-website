'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Sponsor } from '@/types/index'
import SectionHeader from '@/components/ui/SectionHeader'

interface StrategicSponsorsProps {
  group: {
    tierName: string
    sponsors: Sponsor[]
  }
}

export default function StrategicSponsors({ group }: StrategicSponsorsProps) {
  if (!group || group.sponsors.length === 0) return null

  return (
    <section>
      <SectionHeader title={group.tierName} lineColorClass="border-white/30" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <Wrapper key={sponsor._id} {...wrapperProps} className="block">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`group relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-8 transition-all duration-300 ${
                  sponsor.website
                    ? 'cursor-pointer hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                    : 'hover:border-emerald-500/30'
                }`}
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
  )
}
