'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react'

interface ContactSectionProps {
  title?: string
  description?: string
  contact?: {
    address?: string
    email?: string
    phone?: string
  }
}

export default function ContactSection({
  title = 'Skontaktuj się',
  description = 'Masz pytania lub propozycję współpracy? Jesteśmy do Twojej dyspozycji.',
  contact,
}: ContactSectionProps) {
  const address = contact?.address || 'ul. Sportowa 1a, Izbica Kujawska, 87-865'
  const email = contact?.email || 'kujawiankaizbicakujawska@gmail.com'
  const phone = contact?.phone || '+48 665 426 757'
  const [isMapActive, setIsMapActive] = useState(false)

  return (
    <section id="contact" className="relative overflow-hidden py-24">
      {/* Tło usunięte - sekcja przyjmuje tło strony macierzystej */}

      <div className="relative z-10 mx-auto max-w-[1200px] px-4">
        <motion.div
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Lewa kolumna: Tekst i lista */}
          <div>
            <div className="mb-10">
              <span className="bg-club-green/10 border-club-green/20 text-club-green-light mb-4 inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                Kontakt
              </span>
              <h2 className="font-montserrat mb-6 text-3xl font-black tracking-tight text-white uppercase md:text-5xl">
                {title}
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-gray-400">
                {description}
              </p>
            </div>

            <ul className="flex flex-col gap-6">
              {/* Adres */}
              <li className="group flex items-start gap-5 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-white/5 hover:bg-white/5">
                <div className="rounded-xl border border-white/10 bg-[#121212] p-3 text-emerald-500 shadow-lg transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <MapPin size={24} />
                </div>
                <div className="flex flex-col">
                  <strong className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors group-hover:text-gray-300">
                    Adres Klubu
                  </strong>
                  <span className="font-montserrat text-lg font-bold text-white">
                    {address}
                  </span>
                </div>
              </li>

              {/* E-mail */}
              <li className="group flex items-start gap-5 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-white/5 hover:bg-white/5">
                <div className="rounded-xl border border-white/10 bg-[#121212] p-3 text-emerald-500 shadow-lg transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <Mail size={24} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <strong className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors group-hover:text-gray-300">
                    E-mail
                  </strong>
                  <a
                    href={`mailto:${email}`}
                    className="font-montserrat flex items-center gap-2 text-sm font-bold break-all text-white transition-colors hover:text-emerald-400 md:text-lg md:break-normal"
                  >
                    {email}
                    <ArrowRight
                      size={16}
                      className="hidden shrink-0 -translate-x-2 opacity-0 transition-opacity group-hover:translate-x-0 group-hover:opacity-100 md:block"
                    />
                  </a>
                </div>
              </li>

              {/* Telefon */}
              <li className="group flex items-start gap-5 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-white/5 hover:bg-white/5">
                <div className="rounded-xl border border-white/10 bg-[#121212] p-3 text-emerald-500 shadow-lg transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <Phone size={24} />
                </div>
                <div className="flex flex-col">
                  <strong className="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors group-hover:text-gray-300">
                    Telefon
                  </strong>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="font-montserrat text-lg font-bold text-white transition-colors hover:text-emerald-400"
                  >
                    {phone}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Prawa kolumna: Mapa */}
          <div
            className="relative h-[450px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-2xl"
            onMouseLeave={() => setIsMapActive(false)}
          >
            {/* Efekt poświaty pod mapą */}
            <div className="pointer-events-none absolute inset-0 bg-emerald-500/20 opacity-20 blur-[100px]" />

            <iframe
              src="https://maps.google.com/maps?q=ul.+Sportowa+12,+87-865+Izbica+Kujawska&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={`h-full w-full transition-all duration-500 ${
                isMapActive
                  ? 'opacity-100 grayscale-0 invert-0'
                  : 'opacity-80 contrast-[1.2] grayscale-[0.8] invert-[0.85]'
              }`}
            />

            {/* Overlay "Interaktywny" obsługujący kliknięcia na mobile i hover na desktopie */}
            <div
              className={`absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 transition-opacity duration-500 ${
                isMapActive ? 'pointer-events-none opacity-0' : 'opacity-100'
              }`}
              onClick={() => setIsMapActive(true)}
              onMouseEnter={() => setIsMapActive(true)}
            >
              <span className="rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md transition-transform hover:scale-105">
                Zobacz na mapie
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
