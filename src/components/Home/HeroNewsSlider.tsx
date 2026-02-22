'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { NewsItem } from '@/types/index'

interface HeroNewsSliderProps {
  news: NewsItem[]
}

export default function HeroNewsSlider({ news }: HeroNewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  if (!news || news.length === 0) return null

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % news.length)
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length)
  const goToSlide = (idx: number) => setCurrentIndex(idx)

  const currentNews = news[currentIndex]

  const formattedDate = new Date(currentNews.publishedAt).toLocaleDateString(
    'pl-PL',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  )

  return (
    <div
      className="relative flex w-full flex-col gap-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-1 flex items-center gap-3 px-1">
        <h3 className="font-montserrat text-xs font-bold tracking-widest text-white uppercase opacity-80">
          WYRÓŻNIONE ARTYKUŁY
        </h3>
      </div>

      {/* Główny kontener slajdera - dodano klasę 'group' */}
      <div className="group relative h-[380px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentNews._id}
            // 1. GŁÓWNA ANIMACJA KONTENERA (Tylko płynne przenikanie Alpha)
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full"
          >
            {/* --- NOWOŚĆ: LINK ROZCIĄGNIĘTY NA CAŁY SLAJD --- */}
            {/* Ten link jest niewidoczny, ale przykrywa wszystko (z-30) i łapie kliknięcia */}
            <Link
              href={`/aktualnosci/${currentNews.slug}`}
              className="absolute inset-0 z-30"
              aria-label={`Czytaj więcej: ${currentNews.title}`}
            />

            {/* 2. EFEKT KENA BURNSA DLA ZDJĘCIA */}
            <div className="absolute inset-0 overflow-hidden">
              {currentNews.imageUrl ? (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 7, ease: 'linear' }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={currentNews.imageUrl}
                    alt={currentNews.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-white/20">
                  Brak zdjęcia
                </div>
              )}
              {/* Gradient zaciemniający pod teksty */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/70 to-transparent opacity-90" />
            </div>

            {/* 3. ANIMACJA TREŚCI (Wjazd od dołu z opóźnieniem) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 1, 0.5, 1],
              }}
              // Zmniejszono z-index do 20, żeby link (z-30) był nad nim
              className="absolute inset-0 z-20 flex flex-col items-start justify-end p-6 md:p-8"
            >
              <div className="text-club-green-light mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                <Calendar size={12} className="text-club-green" />
                <span>{formattedDate}</span>
              </div>

              {/* Usunięto wewnętrzny <Link> z tytułu */}
              <h2 className="font-montserrat group-hover:text-club-green mb-4 line-clamp-2 text-2xl leading-tight font-black text-white drop-shadow-xl transition-colors duration-300 md:text-3xl">
                {currentNews.title}
              </h2>

              <p className="line-clamp-2 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
                {currentNews.excerpt}
              </p>

              {/* Przycisk "Czytaj więcej" - teraz to tylko element wizualny, bo cały kafel jest linkiem */}
              <div className="mt-6 flex items-center text-xs font-bold tracking-widest text-emerald-500 uppercase transition-colors group-hover:text-emerald-400">
                Czytaj więcej{' '}
                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* 4. PASEK POSTĘPU Z GRADIENTEM */}
        {!isPaused && (
          <motion.div
            key={`progress-${currentIndex}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
            onAnimationComplete={nextSlide}
            // --- NOWOŚĆ: ZMIANA KOLORU NA GRADIENT ---
            // Używamy gradientu od ciemniejszego szmaragdu do jaśniejszego i z powrotem,
            // co daje efekt "świecącego środka".
            className="absolute bottom-0 left-0 z-40 h-1.5 bg-gradient-to-r from-[#0e3a2b] via-[#10b981] to-[#0e3a2b] shadow-[0_0_15px_rgba(16,185,129,0.5)]"
          />
        )}
      </div>

      {/* Nawigacja dolna */}
      <div className="mt-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          {news.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                'h-2.5 cursor-pointer rounded-full transition-all duration-500 ease-out',
                idx === currentIndex
                  ? 'w-10 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                  : 'w-2.5 bg-white/30 hover:scale-110 hover:bg-white/60',
              )}
              aria-label={`Przejdź do newsa ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="group cursor-pointer rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            aria-label="Poprzedni"
          >
            <ChevronLeft
              size={20}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          </button>
          <button
            onClick={nextSlide}
            className="group cursor-pointer rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 transition-all duration-300 hover:bg-emerald-500 hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            aria-label="Następny"
          >
            <ChevronRight
              size={20}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
