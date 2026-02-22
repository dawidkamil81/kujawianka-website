'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Handshake } from 'lucide-react'
import { Sponsor } from '@/types/index'

export default function SponsorsTeaser({ sponsors }: { sponsors: Sponsor[] }) {
  // 1. Zabezpieczenie danych
  const validSponsors =
    sponsors?.filter((s) => s.logoUrl && s.logoUrl.trim() !== '') || []

  // --- LOGIKA FILTROWANIA ---

  // A. Sponsorzy Główni (Tylko ranga 1)
  const mainSponsors = validSponsors.filter((s) => s.tier?.rank === 1)

  // B. Karuzela (Wszyscy, którzy mają rangę większą niż 1)
  const otherSponsors = validSponsors.filter((s) => (s.tier?.rank || 0) > 1)

  // Jeśli brak sponsorów, nie wyświetlamy sekcji
  if (validSponsors.length === 0) return null

  // 2. LOGIKA NIESKOŃCZONEJ PĘTLI
  const multiplier =
    otherSponsors.length > 0 && otherSponsors.length < 6 ? 6 : 2
  const carouselSponsors =
    otherSponsors.length > 0 ? Array(multiplier).fill(otherSponsors).flat() : []

  return (
    <section className="relative w-full overflow-hidden border-t border-white/5 bg-[#0e0e0e] py-16">
      {/* Tło gradientowe */}
      <div className="bg-club-green/5 pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4">
        {/* --- NAGŁÓWEK --- */}
        <div className="mb-12 flex flex-col items-end justify-between gap-4 border-b border-white/10 pb-4 md:flex-row">
          <div className="flex items-center gap-3">
            <h2 className="font-montserrat text-3xl font-black tracking-tight text-white uppercase md:text-4xl">
              Nasi <span className="text-emerald-500">Sponsorzy</span>
            </h2>
          </div>

          <Link
            href="/biznes/sponsorzy"
            className="group flex items-center gap-2 text-sm font-bold text-gray-400 transition-colors hover:text-white"
          >
            Zostań sponsorem
            <ArrowRight
              size={16}
              className="text-club-green transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* --- 1. SPONSORZY GŁÓWNI (NOWY STYL: Bez kafelków, czyste loga) --- */}
        {mainSponsors.length > 0 && (
          <div className="mb-20">
            <div className="mb-10 flex items-center justify-center gap-2">
              <Handshake size={20} className="text-club-green" />
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                Partnerzy Główni
              </h3>
            </div>

            {/* ZMIANA: Zmniejszono gap z 20 na 10, aby zmieścić 4 elementy */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
              {mainSponsors.map((sponsor) => (
                <Link
                  key={sponsor._id}
                  href={sponsor.website || '#'}
                  target={sponsor.website ? '_blank' : '_self'}
                  // ZMIANA: Zmniejszono szerokość z w-64 na w-56, aby zmieściło się 4 w rzędzie
                  className="group relative h-22 w-44 transition-transform duration-300 hover:scale-105 md:h-28 md:w-56"
                >
                  <div className="relative h-full w-full opacity-80 transition-all duration-500 group-hover:opacity-100">
                    <Image
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      fill
                      className="object-contain drop-shadow-xl"
                    />

                    {/* Subtelna poświata po najechaniu */}
                    <div className="absolute inset-0 -z-10 rounded-full bg-white/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* --- 2. POZOSTALI SPONSORZY (Karuzela - Tier > 1) --- */}
        {otherSponsors.length > 0 && (
          <div className="relative w-full overflow-hidden border-t border-white/5 pt-8">
            <div className="mb-8 text-center">
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Pozostali Partnerzy
              </span>
            </div>

            {/* Maski gradientowe */}
            <div className="pointer-events-none absolute top-0 left-0 z-20 h-full w-16 bg-gradient-to-r from-[#0e0e0e] to-transparent md:w-32" />
            <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-16 bg-gradient-to-l from-[#0e0e0e] to-transparent md:w-32" />

            {/* Pasek przewijania */}
            <div className="animate-scroll flex w-max items-center gap-12 hover:[animation-play-state:paused] md:gap-24">
              {carouselSponsors.map((sponsor, i) => (
                <Link
                  // Index w kluczu dla duplikatów
                  key={`${sponsor._id}-${i}`}
                  href={sponsor.website || '#'}
                  target={sponsor.website ? '_blank' : '_self'}
                  className="relative h-[60px] w-[130px] flex-shrink-0 opacity-60 transition-all duration-300 hover:scale-110 hover:opacity-100"
                >
                  <Image
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                    sizes="150px"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
