'use client'

import { motion } from 'framer-motion'
import { User, ArrowRight } from 'lucide-react'
import { Sponsor } from '@/types/index'

export default function Club100Members({ members }: { members: Sponsor[] }) {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative border-t border-white/5 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
            Aktualni Członkowie
          </h2>
          <p className="mt-2 font-medium text-gray-400">
            Dziękujemy za zaufanie i wsparcie
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.length > 0 ? (
            members.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group hover:border-club-green/40 relative overflow-hidden rounded-2xl border border-white/10 bg-[#121212] p-6 transition-all duration-300"
              >
                <div className="bg-club-green/10 group-hover:bg-club-green/20 absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 blur-[50px] transition-colors" />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="text-club-green shrink-0 rounded-xl border border-white/5 bg-white/5 p-3 transition-transform duration-300 group-hover:scale-110">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="font-montserrat mb-1 line-clamp-1 text-lg font-bold tracking-wide text-white uppercase transition-colors group-hover:text-emerald-400">
                      {member.name}
                    </h4>
                    {member.description && (
                      <p className="line-clamp-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
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

          {/* Karta "Twoje Miejsce" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onClick={scrollToContact}
            className="hover:border-club-green/50 hover:bg-club-green/5 group relative flex min-h-[100px] cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/10 p-6 transition-all"
          >
            <div className="group-hover:text-club-green flex items-center gap-3 text-gray-500 transition-colors">
              <span className="text-sm font-bold tracking-widest uppercase">
                Twoje Miejsce
              </span>
              <ArrowRight size={18} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
