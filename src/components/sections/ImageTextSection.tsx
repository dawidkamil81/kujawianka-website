'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PortableText } from 'next-sanity'
import { urlFor } from '@/sanity/lib/image'

export default function ImageTextSection({ data }: { data: any }) {
  // Sprawdzamy układ wybrany w CMS (lewo/prawo)
  const isImageRight = data.layout === 'right'

  return (
    <motion.section
      className="relative z-10 grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      {/* --- KOLUMNA Z TEKSTEM --- */}
      {/* items-center centruje elementy w pionie (stack), ale tekst wewnątrz formatujemy osobno */}
      <div
        className={`flex flex-col items-center gap-6 ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}
      >
        {/* Nagłówek - wyśrodkowany */}
        {data.heading && (
          <h2 className="font-montserrat text-center text-3xl font-black tracking-tight text-white uppercase drop-shadow-xl md:text-4xl">
            {data.heading}
          </h2>
        )}

        {/* Treść - wyjustowana (text-justify) */}
        <div className="prose prose-invert max-w-none text-justify text-base leading-relaxed hyphens-auto text-gray-400 md:text-lg">
          <PortableText value={data.content} />
        </div>
      </div>

      {/* --- KOLUMNA ZE ZDJĘCIEM --- */}
      <div
        className={`group relative w-full ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}
      >
        {/* Ozdobna poświata pod zdjęciem */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />

        {/* Kontener zdjęcia */}
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl lg:aspect-[4/3]">
          {data.image && (
            <Image
              src={urlFor(data.image).url()}
              alt={data.heading || 'Zdjęcie sekcji'}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={95}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* Ciemny gradient na dole zdjęcia */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        </div>
      </div>
    </motion.section>
  )
}
