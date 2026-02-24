'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Shield,
  Youtube,
  Download,
} from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { PageVisibility } from './Header' // <-- DODANY IMPORT

// 1. TikTok
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

// 2. X (Twitter)
const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width="22"
    height="22"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

// --- INTERFEJSY TYPÓW (Zamiast "any") ---

interface SocialLink {
  url?: string
  isVisible?: boolean
}

interface FooterDownload {
  fileUrl?: string
  title?: string
}

interface FooterCertificate {
  url?: string
  imageUrl?: string
  alt?: string
}

interface FooterSettings {
  logo?: unknown
  contact?: {
    address?: string
    phone?: string
    email?: string
  }
  socialLinks?: {
    facebook?: SocialLink
    instagram?: SocialLink
    youtube?: SocialLink
    tiktok?: SocialLink
    twitter?: SocialLink
  }
  footerCertificate?: FooterCertificate
  footerDownloads?: FooterDownload[]
}

interface FooterProps {
  settings?: FooterSettings
  pageVisibility?: PageVisibility // <-- DODANE
}

export default function Footer({ settings, pageVisibility = {} }: FooterProps) {
  // Rozpakowanie ustawień
  const { contact, socialLinks, footerCertificate, footerDownloads } =
    settings || {}

  const logoSrc = settings?.logo ? urlFor(settings.logo).url() : '/logo.png'
  const address = contact?.address || 'ul. Sportowa 1a\n87-865 Izbica Kujawska'
  const phone = contact?.phone || '+48 665 426 757'
  const email = contact?.email || 'kujawiankaizbicakujawska@gmail.com'

  const socials = [
    {
      key: 'facebook',
      label: 'Facebook',
      data: socialLinks?.facebook,
      icon: Facebook,
      hoverClass:
        'hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_4px_20px_-5px_rgba(24,119,242,0.5)]',
    },
    {
      key: 'instagram',
      label: 'Instagram',
      data: socialLinks?.instagram,
      icon: Instagram,
      hoverClass:
        'hover:border-transparent hover:bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] hover:shadow-[0_4px_20px_-5px_rgba(220,39,67,0.5)]',
    },
    {
      key: 'youtube',
      label: 'YouTube',
      data: socialLinks?.youtube,
      icon: Youtube,
      hoverClass:
        'hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-[0_4px_20px_-5px_rgba(255,0,0,0.5)]',
    },
    {
      key: 'tiktok',
      label: 'TikTok',
      data: socialLinks?.tiktok,
      icon: TikTokIcon,
      hoverClass:
        'hover:bg-black hover:border-white/20 hover:shadow-[0_4px_20px_-5px_rgba(255,255,255,0.2)]',
    },
    {
      key: 'twitter',
      label: 'X (Twitter)',
      data: socialLinks?.twitter,
      icon: XIcon,
      hoverClass:
        'hover:bg-black hover:border-white/20 hover:shadow-[0_4px_20px_-5px_rgba(255,255,255,0.2)]',
    },
  ]

  // Bezpieczne pobranie sluga oferty (fallback 'oferta', jeśli z CMS przyjdzie pusto)
  const offerSlug = pageVisibility?.oferta?.slug || 'oferta'

  const navItems = [
    { name: 'Aktualności', href: '/aktualnosci' },
    { name: 'Wyniki i tabela', href: '/wyniki/seniorzy' },
    { name: 'Kadra zespołu', href: '/druzyny/seniorzy' },
    { name: 'Współpraca', href: `/biznes/${offerSlug}` }, // <-- ZMIENIONE NA DYNAMICZNE
    { name: 'Przekaż 1.5%', href: '/wesprzyj' },
  ]

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/5 bg-[#0e0e0e] font-sans text-white">
      {/* === TŁO I DEKORACJE === */}
      <div className="absolute top-0 left-0 z-20 h-1 w-full bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] shadow-[0_0_20px_rgba(218,24,24,0.3)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:4rem_4rem]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-1/2 z-0 h-[400px] w-[800px] -translate-x-1/2 bg-[#174135] opacity-20 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-8">
          {/* === Kolumna 1: Logo + Certyfikat === */}
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
            <Link
              href="/"
              className="group relative h-24 w-24 shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#174135] to-[#da1818] opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
              <Image
                src={logoSrc}
                alt="Herb Kujawianka Izbica Kujawska"
                fill
                sizes="96px"
                className="object-contain drop-shadow-2xl"
              />
            </Link>

            {/* Obsługa pojedynczego certyfikatu */}
            {footerCertificate && footerCertificate.imageUrl && (
              <div className="relative h-24 w-24 opacity-80 transition-all duration-300 hover:opacity-100">
                {footerCertificate.url ? (
                  <a
                    href={footerCertificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block h-full w-full"
                  >
                    <Image
                      src={footerCertificate.imageUrl}
                      alt={footerCertificate.alt || 'Certyfikat'}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </a>
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={footerCertificate.imageUrl}
                      alt={footerCertificate.alt || 'Certyfikat'}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* === Kolumna 2: Nawigacja === */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="mb-6 flex items-center gap-2 text-sm font-bold tracking-widest text-[#da1818] uppercase">
              <span className="inline-block h-[2px] w-8 bg-[#da1818]"></span>
              Na skróty
            </h4>
            <ul className="w-full space-y-3 text-center lg:text-left">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="group flex items-center justify-center gap-3 text-white/60 transition-all duration-300 hover:text-white lg:justify-start"
                  >
                    <ArrowRight
                      size={14}
                      className="-translate-x-2 text-[#da1818] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                    <span className="font-medium transition-transform duration-300 group-hover:translate-x-1">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === Kolumna 3: Kontakt === */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="mb-6 flex items-center gap-2 text-sm font-bold tracking-widest text-[#da1818] uppercase">
              <span className="inline-block h-[2px] w-8 bg-[#da1818]"></span>
              Kontakt
            </h4>
            <ul className="space-y-4 text-center lg:text-left">
              <li className="group flex flex-col items-center gap-4 lg:flex-row lg:items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                  <MapPin size={18} />
                </div>
                <span className="text-sm leading-relaxed whitespace-pre-line text-white/70">
                  {address}
                </span>
              </li>
              <li className="group flex flex-col items-center gap-4 lg:flex-row lg:items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                  <Phone size={18} />
                </div>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="mt-2 text-sm font-medium tracking-wide text-white/70 transition-colors hover:text-white lg:mt-0"
                >
                  {phone}
                </a>
              </li>
              <li className="group flex flex-col items-center gap-4 lg:flex-row lg:items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                  <Mail size={18} />
                </div>
                <a
                  href={`mailto:${email}`}
                  className="mt-2 text-sm break-all text-white/70 transition-colors hover:text-white lg:mt-0"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* === Kolumna 4: Social Media === */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="mb-6 flex items-center gap-2 text-sm font-bold tracking-widest text-[#da1818] uppercase">
              <span className="inline-block h-[2px] w-8 bg-[#da1818]"></span>
              Społeczność
            </h4>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              {socials.map((social) => {
                const linkData = social.data
                if (!linkData || !linkData.url || !linkData.isVisible) {
                  return null
                }
                const Icon = social.icon

                return (
                  <a
                    key={social.key}
                    href={linkData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 ${social.hoverClass}`}
                  >
                    <Icon
                      className="transition-transform group-hover:scale-110"
                      size={18}
                    />
                  </a>
                )
              })}
            </div>
          </div>

          {/* === Kolumna 5: Pliki do pobrania === */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="mb-6 flex items-center gap-2 text-sm font-bold tracking-widest text-[#da1818] uppercase">
              <span className="inline-block h-[2px] w-8 bg-[#da1818]"></span>
              Do pobrania
            </h4>

            {footerDownloads && footerDownloads.length > 0 ? (
              <div className="flex w-full flex-col gap-4">
                {footerDownloads.map((file: FooterDownload, idx: number) => (
                  <a
                    key={idx}
                    href={`${file.fileUrl}?dl=`}
                    className="group flex w-full items-center justify-center gap-4 lg:w-auto lg:justify-start"
                  >
                    {/* Ikona */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                      <Download size={18} />
                    </div>
                    {/* Tekst */}
                    <span className="truncate text-sm font-medium text-white/70 transition-colors duration-300 group-hover:text-white">
                      {file.title}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40">Brak plików do pobrania.</p>
            )}
          </div>
        </div>

        {/* === Dolny pasek (Copyright) === */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} MKS Kujawianka Izbica Kujawska.
            Wszelkie prawa zastrzeżone.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/polityka-prywatnosci"
              className="transition-colors hover:text-white"
            >
              Polityka Prywatności
            </Link>
            <a
              href="https://dawidkamil.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-[#da1818]"
            >
              <Shield size={10} /> Realizacja
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
