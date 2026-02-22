'use client'

import { Crown } from 'lucide-react'
import { Club100PageData } from '@/types/index'

export default function Club100About({
  pageData,
}: {
  pageData?: Club100PageData
}) {
  return (
    <section className="border-y border-white/5 bg-[#0a0a0a]/30 py-20 backdrop-blur-sm">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
        {/* Lewa strona - Tekst (Dynamiczny z CMS) */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black tracking-tight uppercase md:text-4xl">
            {pageData?.aboutTitle ? (
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
  )
}
