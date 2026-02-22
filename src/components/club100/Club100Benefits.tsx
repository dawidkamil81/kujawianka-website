'use client'

import { motion } from 'framer-motion'
import { Crown, ShieldCheck, Users, Star, Ticket } from 'lucide-react'
import { Club100PageData } from '@/types/index'

const iconMap: Record<string, React.ElementType> = {
  crown: Crown,
  shield: ShieldCheck,
  users: Users,
  star: Star,
  ticket: Ticket,
}

export default function Club100Benefits({
  pageData,
}: {
  pageData?: Club100PageData
}) {
  const defaultBenefits = [
    {
      iconName: 'crown',
      title: 'Status VIP',
      description:
        'Dożywotni karnet na mecze domowe oraz wstęp do strefy hospitality podczas wydarzeń specjalnych.',
    },
    {
      iconName: 'shield',
      title: 'Dedykowany Gadżet',
      description:
        'Unikalna, numerowana odznaka lub szalik dostępny wyłącznie dla członków Klubu 100.',
    },
    {
      iconName: 'users',
      title: 'Spotkania z Zarządem',
      description:
        'Realny wpływ na rozwój klubu poprzez udział w zamkniętych spotkaniach podsumowujących sezon.',
    },
  ]

  const benefits =
    pageData?.benefits && pageData.benefits.length > 0
      ? pageData.benefits
      : defaultBenefits

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-black tracking-tight uppercase md:text-4xl">
          Przywileje Członkowskie
        </h2>
        <div className="bg-club-green mx-auto h-1.5 w-20 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {benefits.map((benefit, idx) => {
          const IconComponent = iconMap[benefit.iconName] || Crown

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="hover:border-club-green/30 group flex flex-col rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all duration-300 hover:bg-white/5"
            >
              <div className="text-club-green group-hover:bg-club-green mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 shadow-lg transition-colors group-hover:text-white">
                <IconComponent size={32} />
              </div>
              <h4 className="font-montserrat mb-3 text-xl font-bold text-white uppercase transition-colors group-hover:text-emerald-400">
                {benefit.title}
              </h4>
              <p className="text-sm leading-relaxed text-gray-400">
                {benefit.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
