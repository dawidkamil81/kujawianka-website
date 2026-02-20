'use client'

// 1. ZMIANA: Dodajemy import Image z Next.js
import Image from 'next/image'
import {
  Ticket,
  Handshake,
  Megaphone,
  Trophy,
  Users,
  Briefcase,
  Star,
  Heart,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Sponsor, PartnersPageData } from '@/types/index'
import ContactSection from '@/components/sections/ContactSection'

// Mapowanie nazw ikon z CMS na komponenty
const iconMap: Record<string, React.ElementType> = {
  ticket: Ticket,
  handshake: Handshake,
  megaphone: Megaphone,
  trophy: Trophy,
  users: Users,
  briefcase: Briefcase,
  star: Star,
  heart: Heart,
}

interface PartnersPageProps {
  members: Sponsor[]
  pageData?: PartnersPageData
}

export default function PartnersPage({ members, pageData }: PartnersPageProps) {
  // Domyślne korzyści (Twój oryginał) - używane jako fallback, jeśli CMS jest pusty
  const defaultBenefits = [
    {
      iconName: 'ticket',
      title: 'Bilety na mecze',
      description:
        'Otrzymaj stałą pulę biletów na każdy mecz domowy dla pracowników lub kontrahentów.',
    },
    {
      iconName: 'handshake',
      title: 'Spotkania biznesowe',
      description:
        'Dostęp do zamkniętych spotkań Klubu Biznesu, śniadań i wydarzeń networkingowych.',
    },
    {
      iconName: 'megaphone',
      title: 'Lokalna Promocja',
      description:
        'Możliwość reklamy na stadionie i wzmianki w naszych mediach społecznościowych.',
    },
    {
      iconName: 'trophy',
      title: 'Status VIP',
      description:
        'Specjalne miejsce na trybunie honorowej i zaproszenia na wydarzenia klubowe.',
    },
    {
      iconName: 'users',
      title: 'Networking',
      description:
        'Budowanie relacji z innymi przedsiębiorcami z regionu w sportowej atmosferze.',
    },
    {
      iconName: 'briefcase',
      title: 'Wsparcie Klubu',
      description:
        'Realny wpływ na rozwój Kujawianki i szkolenie młodzieży w Izbicy Kujawskiej.',
    },
  ]

  // Wybieramy dane z CMS lub domyślne
  const benefits =
    pageData?.benefits && pageData.benefits.length > 0
      ? pageData.benefits
      : defaultBenefits

  return (
    <div className="flex flex-col gap-24">
      {/* === KORZYŚCI (BENEFITS) === */}
      <section>
        <div className="mb-12 flex items-center gap-4">
          <h3 className="font-montserrat border-l-4 border-emerald-500 pl-4 text-2xl font-bold tracking-widest text-white uppercase">
            {pageData?.benefitsTitle || 'Dlaczego warto?'}
          </h3>
          <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.iconName] || Briefcase

            return (
              <div
                key={index}
                className="group flex flex-col rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all duration-300 hover:border-emerald-500/30 hover:bg-white/5"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-emerald-500 shadow-lg transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                  <IconComponent size={32} />
                </div>
                <h4 className="font-montserrat mb-3 text-xl font-bold text-white uppercase transition-colors group-hover:text-emerald-400">
                  {benefit.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-400">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* === LISTA CZŁONKÓW (MEMBERS) === */}
      <section>
        <div className="mb-12 flex items-center gap-4">
          <h3 className="font-montserrat border-l-4 border-white/30 pl-4 text-2xl font-bold tracking-widest text-white uppercase">
            Aktualni Klubowicze
          </h3>
          <div className="h-[1px] flex-grow bg-white/10"></div>
        </div>

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
                    {/* 2. ZMIANA: Zastąpienie img komponentem Next Image */}
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

      {/* === KONTAKT === */}
      <ContactSection
        title={pageData?.ctaTitle || 'Dołącz do Klubu Biznesu'}
        description={
          pageData?.ctaDescription ||
          'Chcesz dołączyć do elitarnego grona wspierającego Kujawiankę? Skontaktuj się z nami.'
        }
      />
    </div>
  )
}
