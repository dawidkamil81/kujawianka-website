'use client'

import Image from 'next/image'
import { Trophy, Bus, Shirt, Users, Heart, Star } from 'lucide-react'

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
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#174135]/40 to-[#0e0e0e] p-8 md:p-10">
        <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold">
          <Trophy className="text-[#2ecc71]" />
          Cele zbiórki
        </h3>
        <div className="space-y-6">
          {goalsList &&
            goalsList.map((goalText, idx) => {
              const IconComp = ICONS[idx % ICONS.length]
              return (
                <GoalRow
                  key={idx}
                  icon={<IconComp size={20} />}
                  text={goalText}
                />
              )
            })}
        </div>
      </section>

      {/* Prawa kolumna: Social Proof (Zdjęcie) */}
      <section className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10">
        {socialProof?.imageUrl && (
          <Image
            src={socialProof.imageUrl}
            alt="Akademia Kujawianki"
            fill
            className="transform object-cover opacity-60 transition-opacity duration-500 group-hover:scale-105 group-hover:opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 md:p-10">
          <blockquote className="mb-4 border-l-4 border-[#8d1010] pl-4 text-lg font-medium text-white/90 italic md:text-xl">
            &quot;{socialProof?.quote}&quot;
          </blockquote>
          <p className="font-bold text-white">{socialProof?.author}</p>
        </div>
      </section>
    </div>
  )
}

function GoalRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/5 p-4 transition-colors hover:border-white/10">
      <div className="text-[#2ecc71]">{icon}</div>
      <span className="font-medium text-white/90">{text}</span>
    </div>
  )
}
