'use client'

import Image from 'next/image'
import { Trophy, Bus, Shirt, Users, Heart, Star, Quote } from 'lucide-react'

const ICONS = [Users, Shirt, Bus, Heart, Star]

interface DonateGoalsProps {
  goalsList: string[]
  socialProof: {
    imageUrl?: string
    quote: string
    author: string
  }
}

export default function DonateGoals({
  goalsList,
  socialProof,
}: DonateGoalsProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Lewa kolumna: Lista celów */}
      <section className="from-club-green/20 to-club-dark flex flex-col justify-center rounded-3xl border border-white/10 bg-gradient-to-br p-6 md:p-10">
        <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold md:mb-8 md:text-3xl">
          <Trophy className="h-8 w-8 text-[#2ecc71] drop-shadow-[0_0_10px_rgba(46,204,113,0.3)]" />
          Cele zbiórki
        </h3>
        <div className="space-y-4 md:space-y-5">
          {goalsList &&
            goalsList.map((goalText, idx) => {
              const IconComp = ICONS[idx % ICONS.length]
              return (
                <GoalRow
                  key={idx}
                  icon={<IconComp size={22} className="text-[#2ecc71]" />}
                  text={goalText}
                />
              )
            })}
        </div>
      </section>

      {/* Prawa kolumna: Social Proof (Zdjęcie i cytat) */}
      <section className="group bg-club-dark relative flex flex-col overflow-hidden rounded-3xl border border-white/10 lg:min-h-[450px] lg:justify-end">
        {/* Kontener zdjęcia */}
        {/* ZMIANA: Użyto aspect-video/aspect-square zamiast sztywnego h-64, aby na mobilce zapewnić miejscu zdjęciu z object-contain */}
        <div className="relative aspect-[4/3] w-full shrink-0 sm:aspect-video lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
          {socialProof?.imageUrl && (
            <Image
              src={socialProof.imageUrl}
              alt="Akademia Kujawianki"
              fill
              // ZMIANA: object-contain na mobile (nie przycina), object-cover na desktopie.
              // ZMIANA: opacity-90 na mobile (bardzo jasne), lg:group-hover:opacity-100 na desktopie (efekt podświetlenia).
              className="object-contain opacity-90 transition-all duration-700 ease-out lg:object-cover lg:opacity-50 lg:group-hover:scale-105 lg:group-hover:opacity-100"
            />
          )}
          {/* ZMIANA: Gradient sam w sobie blednie przy hover (lg:group-hover:opacity-30), co potęguje efekt jasności zdjęcia */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent transition-opacity duration-700 lg:via-[#0e0e0e]/80 lg:to-black/50 lg:group-hover:opacity-30" />
        </div>

        {/* Treść cytatu */}
        <div className="bg-club-dark/95 lg:group-hover:bg-club-dark/40 relative z-10 mt-auto flex flex-col p-6 transition-all duration-700 md:p-8 lg:bg-transparent lg:p-10">
          <Quote className="text-club-red mb-4 h-10 w-10 opacity-90 drop-shadow-md" />

          <blockquote className="border-club-red border-l-4 pl-5 text-lg leading-relaxed font-medium text-white md:text-xl lg:text-2xl lg:leading-snug">
            &quot;{socialProof?.quote}&quot;
          </blockquote>

          <div className="mt-6 flex items-center gap-4">
            <div className="bg-club-red h-[2px] w-12"></div>
            <p className="text-sm font-bold tracking-widest text-white/90 uppercase md:text-base">
              {socialProof?.author}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function GoalRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="group/row bg-club-gray/80 flex items-center gap-5 rounded-xl border border-l-4 border-white/10 border-l-[#2ecc71] p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#1f1f1f] hover:shadow-xl hover:shadow-[#2ecc71]/10 md:p-5">
      <div className="bg-club-dark/80 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/5 shadow-inner transition-transform duration-300 group-hover/row:scale-110 md:h-14 md:w-14">
        {icon}
      </div>
      <p className="text-base font-medium text-white/95 md:text-lg">{text}</p>
    </div>
  )
}
