import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

interface NewsCardProps {
  title: string
  slug: string
  imageUrl: string
  date: string
  compact?: boolean
}

export default function NewsCard({
  title,
  slug,
  imageUrl,
  date,
  compact = false,
}: NewsCardProps) {
  return (
    <Link
      href={`/aktualnosci/${slug}`}
      // Zmiany w klasach wrappera:
      // - bg-white -> bg-[#121212] (ciemne tło)
      // - border-transparent -> border-white/10 (subtelny jasny border)
      // - shadow-lg -> shadow-xl (głębszy cień na ciemnym tle)
      // - group/card (dla wewnętrznych animacji)
      className={`group/card hover:border-club-green/30 hover:shadow-club-green/10 relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        compact ? 'md:h-auto md:flex-row md:items-center' : ''
      }`}
    >
      {/* === OBRAZEK === */}
      <div
        className={`relative overflow-hidden ${
          compact ? 'h-48 w-full md:h-full md:w-2/5' : 'aspect-[4/3] w-full'
        }`}
      >
        {/* Overlay na obrazku (opcjonalnie, dla lepszego kontrastu tekstu) */}
        <div className="absolute inset-0 z-10 bg-black/20 transition-opacity group-hover/card:opacity-0" />

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover/card:scale-110"
          />
        ) : (
          // Placeholder dla braku obrazka w ciemnym stylu
          <div className="flex h-full w-full items-center justify-center bg-white/5 text-white/20">
            <Image
              src="/logo.png"
              width={60}
              height={60}
              alt="Placeholder"
              className="opacity-30 grayscale"
            />
          </div>
        )}
      </div>

      {/* === TREŚĆ === */}
      {/* Zmiany w klasach: text-gray-800 -> text-white */}
      <div
        className={`relative z-20 flex flex-1 flex-col justify-between p-6 ${compact ? 'md:w-3/5 md:py-8' : ''}`}
      >
        <div>
          {/* Data: text-club-green zamiast szarego */}
          <div className="text-club-green-light mb-3 flex items-center gap-2 text-xs font-bold tracking-widest uppercase opacity-80">
            <Calendar size={14} />
            <span>{date}</span>
          </div>

          {/* Tytuł: text-white i zmiana koloru na zielony przy hoverze */}
          <h3 className="font-montserrat group-hover/card:text-club-green line-clamp-3 text-xl leading-tight font-black text-white transition-colors">
            {title}
          </h3>
        </div>

        {/* Stopka karty z linkiem "Czytaj" */}
        <div
          className={`mt-6 flex items-center gap-2 text-sm font-bold tracking-wider text-white/80 uppercase transition-all group-hover/card:gap-4 group-hover/card:text-white ${compact ? 'md:mt-4' : ''}`}
        >
          Czytaj
          <ArrowRight size={16} className="text-club-green" />
        </div>
      </div>
    </Link>
  )
}
