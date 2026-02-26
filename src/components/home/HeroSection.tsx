// src/components/home/HeroSection.tsx

import { NewsItem } from '@/types/index'
import HeroNewsSlider from './HeroNewsSlider'
import Image from 'next/image'

// Dodajemy typ dla danych ze strony głównej
export interface HomePageData {
  heroOvertitle?: string
  heroTitle?: string
  heroDescription?: string
  heroImageUrl?: string
}

interface HeroSectionProps {
  news: NewsItem[]
  data?: HomePageData // Dane z CMS
}

export default function HeroSection({ news, data }: HeroSectionProps) {
  // Wartości domyślne (fallback) – pojawią się, jeśli pola w Sanity będą puste
  const overtitle = data?.heroOvertitle || 'Oficjalny serwis klubu'
  const title = data?.heroTitle || 'Kujawianka Izbica Kujawska'
  const description =
    data?.heroDescription ||
    'Duma, pasja i tradycja od pokoleń. Bądź na bieżąco z wynikami, relacjami meczowymi i życiem klubu.'
  const bgImage = data?.heroImageUrl || '/hero.jpg'

  return (
    <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden">
      {/* === TŁO (Background) === */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage} // <--- Podmiana zdjęcia
            alt="Tło stadionu"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#174135]/90 via-black/20 to-[#8d1010]/50 opacity-90 mix-blend-overlay" />
        <div className="from-club-dark absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
      </div>

      <div className="relative z-20 grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-[1fr_1fr] md:gap-20 md:px-8 lg:px-12">
        {/* === Lewa strona: Tekst z CMS === */}
        <div className="animate-in slide-in-from-left-8 fade-in flex flex-col justify-center space-y-8 duration-700">
          <div>
            <span className="bg-club-green/30 border-club-green/40 text-club-green-light mb-6 inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
              {overtitle} {/* <--- Podmiana nadtytułu */}
            </span>

            {/* <--- Podmiana Tytułu Głównego */}
            <h1 className="text-5xl leading-[0.95] font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
          </div>

          <p className="max-w-lg text-lg leading-relaxed font-normal text-gray-300 drop-shadow-lg">
            {description} {/* <--- Podmiana opisu */}
          </p>
        </div>

        {/* === Prawa strona: Karuzela (BEZ ZMIAN) === */}
        <div className="animate-in slide-in-from-right-8 fade-in fill-mode-forwards relative flex flex-col duration-1000">
          <HeroNewsSlider news={news} />
        </div>
      </div>
    </section>
  )
}
