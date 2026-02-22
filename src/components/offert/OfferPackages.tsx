'use client'

import Link from 'next/link'
import { Gem, Target, Shirt, Crown, Handshake, ArrowRight } from 'lucide-react'

export interface PackageData {
  iconName?: string
  colorTheme?: string
  title?: string
  description?: string
  link?: string
}

interface ThemeStyles {
  iconColor: string
  borderColor: string
  shadowColor: string
  bgColor: string
  textColor: string
}

const iconMap: Record<string, React.ElementType> = {
  gem: Gem,
  target: Target,
  shirt: Shirt,
  crown: Crown,
  handshake: Handshake,
}

const colorThemes: Record<string, ThemeStyles> = {
  emerald: {
    iconColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-400/50',
    shadowColor: 'hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]',
    bgColor: 'bg-emerald-400/10',
    textColor: 'group-hover:text-emerald-400',
  },
  white: {
    iconColor: 'text-white',
    borderColor: 'hover:border-white/50',
    shadowColor: 'hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]',
    bgColor: 'bg-white/10',
    textColor: 'group-hover:text-white',
  },
  blue: {
    iconColor: 'text-blue-400',
    borderColor: 'hover:border-blue-400/50',
    shadowColor: 'hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]',
    bgColor: 'bg-blue-400/10',
    textColor: 'group-hover:text-blue-400',
  },
}

export default function OfferPackages({
  packages,
}: {
  packages: PackageData[]
}) {
  const scrollToContact = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
  ) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!packages || packages.length === 0) return null

  return (
    <div className="mb-32 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg, index) => {
        const theme =
          colorThemes[pkg.colorTheme || 'emerald'] || colorThemes.emerald
        const IconComponent = iconMap[pkg.iconName || 'gem'] || Gem

        return (
          <div
            key={index}
            className={`group relative flex flex-col rounded-3xl border border-white/10 bg-[#121212] p-8 transition-all duration-500 md:p-10 ${theme.borderColor} ${theme.shadowColor}`}
          >
            <div className="pointer-events-none absolute top-4 right-4 scale-150 opacity-5 grayscale transition-transform duration-700 group-hover:scale-125 group-hover:grayscale-0">
              <IconComponent size={40} className={theme.iconColor} />
            </div>
            <div
              className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300 ${theme.bgColor}`}
            >
              <IconComponent size={40} className={theme.iconColor} />
            </div>
            <div className="flex-grow">
              <h3
                className={`font-montserrat mb-4 text-2xl font-black text-white uppercase transition-colors duration-300 ${theme.textColor}`}
              >
                {pkg.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-400 md:text-base">
                {pkg.description}
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-8">
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors group-hover:text-white">
                Dowiedz się więcej
              </span>
              <div
                className={`rounded-full border border-white/10 p-2 transition-all duration-300 group-hover:bg-white group-hover:text-black`}
              >
                <ArrowRight size={16} />
              </div>
            </div>

            {pkg.link === '#contact' ? (
              <div
                onClick={scrollToContact}
                className="absolute inset-0 z-10 cursor-pointer"
                aria-label={`Wybierz ${pkg.title}`}
              />
            ) : (
              <Link
                href={pkg.link || '#'}
                className="absolute inset-0 z-10"
                aria-label={`Wybierz ${pkg.title}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
