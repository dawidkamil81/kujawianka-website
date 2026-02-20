'use client'

import React from 'react'
import {
  Crown,
  ShieldCheck,
  Users,
  ArrowRight,
  User,
  Star,
  Ticket,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ContactSection from '@/components/sections/ContactSection'
import { Sponsor, Club100PageData } from '@/types/index'

// Mapa ikon dostępnych w CMS
const iconMap: Record<string, React.ElementType> = {
  crown: Crown,
  shield: ShieldCheck,
  users: Users,
  star: Star,
  ticket: Ticket,
}

interface Club100ListProps {
  members: Sponsor[]
  pageData?: Club100PageData
}

export default function Club100List({ members, pageData }: Club100ListProps) {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Domyślne korzyści (fallback, jeśli CMS pusty)
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
    <div className="relative z-10 w-full">
      {/* --- 1. HERO SECTION (TYTUŁ STRONY) --- */}
      {/* W Twoim page.tsx tytuł jest renderowany wyżej, ale zachowuję strukturę wrappera jeśli potrzebna */}

      {/* --- 2. DLACZEGO MY? (SEKCJA ŚRODKOWA) --- */}
      <section className="border-y border-white/5 bg-[#0a0a0a]/30 py-20 backdrop-blur-sm">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
          {/* Lewa strona - Tekst (Dynamiczny z CMS) */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
              {pageData?.aboutTitle ? (
                // Prosta logika kolorowania ostatniego słowa, jeśli tytuł z CMS
                <>
                  {pageData.aboutTitle.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-club-green">
                    {pageData.aboutTitle.split(' ').slice(-1)}
                  </span>
                </>
              ) : (
                <>
                  Więcej niż <span className="text-club-green">wsparcie</span>
                </>
              )}
            </h2>
            <div className="space-y-4 leading-relaxed text-gray-400">
              {/* Renderujemy treść "O inicjatywie" z CMS lub domyślną */}
              {(
                pageData?.aboutContent ||
                `
                                Klub 100 to inicjatywa skierowana do osób prywatnych i lokalnych przedsiębiorców,
                                dla których rozwój sportu w naszym regionie jest sprawą priorytetową.
                                
                                Środki pozyskane ze składek członkowskich są w 100% transparentne i przeznaczane na celowy rozwój:
                                infrastrukturę treningową, sprzęt dla akademii oraz transport na mecze wyjazdowe.
                            `
              )
                .split('\n')
                .map(
                  (paragraph, idx) =>
                    paragraph.trim() && <p key={idx}>{paragraph.trim()}</p>,
                )}
            </div>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="bg-club-green/10 border-club-green/20 flex h-12 w-12 items-center justify-center rounded-full border">
                  <span className="text-club-green font-black">100</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-300 uppercase">
                    Limit Miejsc
                  </span>
                  <span className="text-xs text-gray-500">Elitarna grupa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Prawa strona - Karta Wizualna (Statyczna) */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="group hover:border-club-green/30 relative flex aspect-[4/3] w-full max-w-md flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 shadow-2xl backdrop-blur-xl transition-colors duration-500">
              <div className="bg-club-green/20 absolute top-0 right-0 h-32 w-32 rounded-full blur-[60px]" />
              <div className="relative z-10 flex items-start justify-between">
                <Crown className="text-club-green h-12 w-12" />
                <span className="font-montserrat text-6xl font-black opacity-10">
                  100
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="mb-2 text-2xl font-bold uppercase">
                  Członek Klubu 100
                </h3>
                <p className="text-sm text-gray-400">Sezon 2025/2026</p>
              </div>
              <div className="from-club-green to-club-green-light absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r" />
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. PRZYWILEJE CZŁONKOWSKIE (KORZYŚCI) --- */}
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

      {/* --- 4. AKTUALNI CZŁONKOWIE --- */}
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
                      {/* Zawsze ikona User (zgodnie z oryginałem), chyba że dodasz logikę zdjęć */}
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

      {/* --- 5. KONTAKT --- */}
      <div id="contact">
        <ContactSection
          title={pageData?.ctaTitle || 'Dołącz do elity'}
          description={
            pageData?.ctaDescription ||
            'Zostań częścią Klubu 100 i miej realny wpływ na przyszłość naszego zespołu. Skontaktuj się z nami, aby omówić szczegóły.'
          }
        />
      </div>
    </div>
  )
}
