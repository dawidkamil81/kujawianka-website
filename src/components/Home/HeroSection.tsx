// src/components/Home/HeroSection.tsx
import { NewsItem } from '@/types/index'
import HeroNewsSlider from './HeroNewsSlider' // Importujemy nowy slider
import Image from 'next/image'

export default function HeroSection({ news }: { news: NewsItem[] }) {
  return (
    <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden">
      {/* === TŁO (Background) - Twoje oryginalne style === */}
      <div className="absolute inset-0 z-0">
        {/* 1. Zdjęcie tła */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpg"
            alt="Tło stadionu"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 2. Baza przyciemniająca */}
        <div className="absolute inset-0 bg-black/70" />

        {/* 3. Twój gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#174135]/90 via-black/20 to-[#8d1010]/50 opacity-90 mix-blend-overlay" />

        {/* 4. Gradient od dołu */}
        <div className="from-club-dark absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
      </div>

      <div className="relative z-20 grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-[1fr_1fr] md:gap-20 md:px-8 lg:px-12">
        {/* === Lewa strona: Tekst (BEZ ZMIAN) === */}
        <div className="animate-in slide-in-from-left-8 fade-in flex flex-col justify-center space-y-8 duration-700">
          <div>
            <span className="bg-club-green/30 border-club-green/40 text-club-green-light mb-6 inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
              Oficjalny serwis klubu
            </span>

            <h1 className="text-5xl leading-[0.95] font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-6xl lg:text-7xl">
              Kujawianka <br />
              <span className="text-white">Izbica Kujawska</span>
            </h1>
          </div>

          <p className="max-w-lg text-lg leading-relaxed font-normal text-gray-300 drop-shadow-lg">
            Duma, pasja i tradycja od pokoleń. Bądź na bieżąco z wynikami,
            relacjami meczowymi i życiem klubu.
          </p>
        </div>

        {/* === Prawa strona: Karuzela (PODMIENIONA) === */}
        {/* Zachowałem Twój kontener z animacją wjazdu */}
        <div className="animate-in slide-in-from-right-8 fade-in fill-mode-forwards relative flex flex-col duration-1000">
          <HeroNewsSlider news={news} />
        </div>
      </div>
    </section>
  )
}
