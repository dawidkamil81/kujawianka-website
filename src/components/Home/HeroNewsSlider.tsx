'use client'

import { useState, useEffect } from 'react'
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

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [news.length, isPaused])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length)
  }

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
      {/* --- GÓRA: TYLKO NAGŁÓWEK (BEZ KROPKI) --- */}
      <div className="mb-1 flex items-center gap-3 px-1">
        <h3 className="font-montserrat text-xs font-bold tracking-widest text-white uppercase opacity-80">
          WYRÓŻNIONE ARTYKUŁY
        </h3>
      </div>

      {/* --- ŚRODEK: KARTA NEWSA --- */}
      <div className="group relative h-[380px] w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNews._id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full"
          >
            {/* Zdjęcie */}
            <div className="absolute inset-0 overflow-hidden">
              {currentNews.imageUrl ? (
                <Image
                  src={currentNews.imageUrl}
                  alt={currentNews.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-white/20">
                  Brak zdjęcia
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent opacity-90" />
            </div>

            {/* Treść */}
            <div className="absolute inset-0 z-10 flex flex-col items-start justify-end p-6">
              {/* Data */}
              <div className="text-club-green-light mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-md">
                <Calendar size={12} className="text-club-green" />
                <span>{formattedDate}</span>
              </div>

              {/* Tytuł */}
              <h2 className="font-montserrat group-hover:text-club-green mb-3 line-clamp-2 text-xl leading-tight font-black text-white drop-shadow-lg transition-colors duration-300 md:text-2xl">
                <Link href={`/aktualnosci/${currentNews.slug}`}>
                  {currentNews.title}
                </Link>
              </h2>

              {/* Kontener: Opis -> Przycisk */}
              <div className="relative min-h-[60px] w-full">
                {/* Opis */}
                <p className="absolute top-0 left-0 line-clamp-2 w-full text-sm leading-relaxed text-gray-300 transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
                  {currentNews.excerpt}
                </p>

                {/* Przycisk */}
                <div className="absolute top-0 left-0 translate-y-4 pt-0.5 opacity-0 transition-all delay-75 duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    href={`/aktualnosci/${currentNews.slug}`}
                    className="bg-club-green hover:bg-club-green-light inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(218,24,24,0.6)] active:scale-95 md:text-sm"
                  >
                    Czytaj więcej <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pasek postępu - ZIELONY Z CZERWONĄ POŚWIATĄ (zgodnie z życzeniem) */}
        {!isPaused && (
          <motion.div
            key={currentIndex}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
            // ZMIANA: Zastąpiłem 'bg-club-green' kolorem 'bg-[#22c55e]' (żywy zielony)
            // Cień 'shadow-[0_0_15px_#da1818]' odpowiada za czerwoną poświatę
            className="absolute bottom-0 left-0 z-20 h-2 bg-[#174135] shadow-[0_0_15px_#da1818]"
          />
        )}
      </div>

      {/* --- DÓŁ: NAWIGACJA (STRZAŁKI + KROPKI) --- */}
      <div className="mt-1 flex items-center justify-between px-1">
        {/* Kropki (po lewej) */}
        <div className="flex items-center gap-3">
          {news.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                'h-3 cursor-pointer rounded-full transition-all duration-500 ease-out',
                idx === currentIndex
                  ? 'bg-club-green w-12 shadow-[0_0_12px_#da1818]' // Zielona z czerwoną poświatą
                  : 'w-3 bg-white/40 hover:scale-125 hover:bg-white/60',
              )}
              aria-label={`Przejdź do newsa ${idx + 1}`}
            />
          ))}
        </div>

        {/* Strzałki (po prawej) */}
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="group hover:bg-club-green cursor-pointer rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition-all duration-300 hover:-translate-x-0.5 hover:text-white hover:shadow-[0_0_10px_#da1818]"
            aria-label="Poprzedni"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="group hover:bg-club-green cursor-pointer rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition-all duration-300 hover:translate-x-0.5 hover:text-white hover:shadow-[0_0_10px_#da1818]"
            aria-label="Następny"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
