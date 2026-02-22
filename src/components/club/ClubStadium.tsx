'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Users, Calendar } from 'lucide-react'

interface ClubStadiumProps {
  description: string
  imageUrl?: string
  address: string
  capacity: string
  built: string
}

export default function ClubStadium({
  description,
  imageUrl,
  address,
  capacity,
  built,
}: ClubStadiumProps) {
  return (
    <motion.section
      className="mb-32 grid grid-cols-1 items-center gap-12 border-b border-white/5 pb-20 lg:grid-cols-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <div className="group relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-bl from-[#8d1010]/20 to-transparent opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl lg:aspect-[4/3]">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Stadion Miejski"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-md">
            <MapPin className="text-red-500" size={18} />
            <span className="text-sm font-bold tracking-wide text-white uppercase">
              {address}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-[#8d1010]/20 bg-[#8d1010]/10 p-2">
            <MapPin className="text-[#8d1010]" size={24} />
          </div>
          <h2 className="font-montserrat text-2xl font-black tracking-tight text-white uppercase">
            Nasz <span className="text-red-500">Stadion</span>
          </h2>
        </div>
        <p className="text-base leading-relaxed text-gray-400 md:text-lg">
          {description}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="group rounded-2xl border border-white/5 bg-[#121212] p-4 transition-colors hover:border-white/10">
            <div className="mb-2 flex items-center gap-3 text-gray-500 transition-colors group-hover:text-emerald-500">
              <Users size={20} />
              <span className="text-xs font-bold tracking-widest uppercase">
                Pojemność
              </span>
            </div>
            <span className="text-xl font-bold text-white">{capacity}</span>
          </div>
          <div className="group rounded-2xl border border-white/5 bg-[#121212] p-4 transition-colors hover:border-white/10">
            <div className="mb-2 flex items-center gap-3 text-gray-500 transition-colors group-hover:text-emerald-500">
              <Calendar size={20} />
              <span className="text-xs font-bold tracking-widest uppercase">
                Otwarcie
              </span>
            </div>
            <span className="text-xl font-bold text-white">{built}</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
