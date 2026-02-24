'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Maximize2, ImageIcon, X } from 'lucide-react'

// Mapa kolumn
const gridColsMap: Record<string, string> = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-2 lg:grid-cols-3',
  '4': 'md:grid-cols-2 lg:grid-cols-4',
}

// Tworzymy interfejs obrazu z Sanity
interface GalleryImage {
  _key?: string
  alt?: string
  asset?: {
    _ref: string
  }
}

interface GallerySectionProps {
  data: {
    heading?: string
    description?: string
    columns?: string
    images?: GalleryImage[]
  }
}

export default function GallerySection({ data }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const gridClass = gridColsMap[data.columns || '3']
  const images = (data.images || []).filter((image) => image.asset)

  if (images.length === 0) return null

  return (
    <>
      <section className="relative z-10 container mx-auto px-4 py-20">
        {/* Nagłówek i Opis */}
        {(data.heading || data.description) && (
          <div className="mb-12 flex flex-col gap-4">
            {data.heading && (
              <div className="flex items-center gap-4">
                <h3 className="font-montserrat border-l-4 border-emerald-500 pl-4 text-2xl font-bold tracking-widest text-white uppercase">
                  {data.heading}
                </h3>
                <div className="h-[1px] flex-grow bg-white/10"></div>
              </div>
            )}
            {data.description && (
              <p className="max-w-2xl text-sm text-gray-400 md:text-base">
                {data.description}
              </p>
            )}
          </div>
        )}

        {/* Siatka Zdjęć */}
        <div className={`grid grid-cols-1 gap-6 md:gap-8 ${gridClass}`}>
          {images.map((image: GalleryImage, index: number) => (
            <motion.div
              key={image._key || index}
              onClick={() => setSelectedImage(urlFor(image).url())}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-lg transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
            >
              <Image
                src={urlFor(image).url()}
                alt={image.alt || 'Zdjęcie z galerii'}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Ikona Lupy */}
              <div className="absolute inset-0 flex scale-50 transform items-center justify-center opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/20 text-white shadow-xl backdrop-blur-sm">
                  <Maximize2 size={24} />
                </div>
              </div>

              {/* Podpis */}
              {image.alt && (
                <div className="absolute bottom-0 left-0 w-full translate-y-4 p-6 opacity-0 transition-all delay-100 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mb-1 flex items-center gap-2">
                    <ImageIcon size={14} className="text-emerald-400" />
                    <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                      Galeria
                    </span>
                  </div>
                  <p className="font-montserrat text-lg leading-tight font-bold text-white">
                    {image.alt}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- PORTAL LIGHTBOX --- */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] flex cursor-zoom-out items-center justify-center bg-black/95 p-4 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
              >
                <button className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
                  <X size={32} />
                </button>

                {/* Obrazek - Zastąpiono <img> na komponent <Image> */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative flex h-[90vh] w-[90vw] items-center justify-center p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={selectedImage}
                    alt="Powiększenie"
                    fill
                    sizes="100vw"
                    className="object-contain shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  )
}
