'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { Sponsor } from '@/types/index'
import SectionHeader from '@/components/ui/SectionHeader'

export default function PartnersList({ members }: { members: Sponsor[] }) {
  return (
    <section>
      <SectionHeader
        title="Aktualni Klubowicze"
        lineColorClass="border-white/30"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.length > 0 ? (
          members.map((member, i) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:border-emerald-500/40"
            >
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 bg-emerald-500/10 blur-[50px] transition-colors group-hover:bg-emerald-500/20" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="rounded-xl border border-white/5 bg-white/5 p-3 text-emerald-500 transition-transform duration-300 group-hover:scale-110">
                  {member.logoUrl ? (
                    <Image
                      src={member.logoUrl}
                      alt={member.name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  ) : (
                    <Briefcase size={24} />
                  )}
                </div>
                <div>
                  <h4 className="font-montserrat mb-1 text-lg font-bold tracking-wide text-white uppercase transition-colors group-hover:text-emerald-400">
                    {member.name}
                  </h4>
                  {member.description && (
                    <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      {member.description}
                    </p>
                  )}
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block text-xs font-bold tracking-widest text-emerald-600 uppercase transition-colors hover:text-emerald-400"
                    >
                      Odwiedź stronę &rarr;
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full rounded-3xl border border-white/5 bg-[#121212] py-20 text-center">
            <p className="text-lg text-gray-500 italic">
              Lista klubowiczów jest aktualizowana. Dołącz jako pierwszy!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
