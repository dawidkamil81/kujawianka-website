export const revalidate = 60

import { notFound } from 'next/navigation'
import { Phone, Mail, User, CalendarRange } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/live'
import { SQUAD_PAGE_QUERY } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import SquadTabsView from '@/components/squad/SquadTabsView'

// Konfiguracja stylów dla tekstu z Sanity (bez zmian)
const portableTextComponents = {
  block: {
    h3: ({ children }: any) => (
      <h3 className="font-montserrat mt-4 mb-2 text-lg font-bold text-white uppercase">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-3 mb-1 text-base font-bold text-emerald-400">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-2 text-sm leading-relaxed text-gray-400 md:text-base">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="mb-3 list-disc space-y-1 pl-5 text-gray-400 marker:text-emerald-500">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mb-3 list-decimal space-y-1 pl-5 text-gray-400 marker:text-emerald-500">
        {children}
      </ol>
    ),
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicSquadPage({ params }: PageProps) {
  const { slug } = await params

  const { data: squadData } = await sanityFetch({
    query: SQUAD_PAGE_QUERY,
    params: { slug },
  })

  if (!squadData) {
    return notFound()
  }

  const players = squadData.players || []

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* --- NAGŁÓWEK (Usunięto przycisk powrotu) --- */}
        <div className="mb-16 flex flex-col items-center justify-center space-y-4">
          <span className="bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            Sezon 2025/2026
          </span>
          <h1 className="font-montserrat mx-auto text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
            Kadra <span className="text-emerald-500">{squadData.name}</span>
          </h1>
        </div>

        {/* --- SEKCJA: INFO I KONTAKT (STATYCZNE) --- */}
        {(squadData.description || squadData.coachName) && (
          <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            {/* 1. INFO */}
            {squadData.description && (
              <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:border-emerald-500/30 md:p-8">
                <div className="mb-6 flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-emerald-500 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                    <CalendarRange size={24} />
                  </div>
                  <div>
                    <h2 className="font-montserrat text-xl font-bold text-white uppercase">
                      Informacje & Treningi
                    </h2>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none flex-grow">
                  <PortableText
                    value={squadData.description}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            )}

            {/* 2. TRENER */}
            {squadData.coachName && (
              <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:border-emerald-500/30 md:p-8">
                <div className="mb-6 flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-emerald-500 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                    <User size={24} />
                  </div>
                  <div>
                    <h2 className="font-montserrat text-xl font-bold text-white uppercase">
                      {squadData.coachName}
                    </h2>
                    <p className="mt-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                      Trener
                    </p>
                  </div>
                </div>

                <div className="flex flex-grow flex-col justify-center space-y-4">
                  {squadData.coachPhone && (
                    <div className="group/item flex items-start gap-4">
                      <div className="mt-1 rounded-xl bg-white/5 p-3 text-emerald-500 transition-colors duration-300 group-hover/item:bg-emerald-500 group-hover/item:text-white">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                          Telefon
                        </p>
                        <a
                          href={`tel:${squadData.coachPhone}`}
                          className="text-xl font-bold text-white transition-colors group-hover/item:text-emerald-400"
                        >
                          {squadData.coachPhone}
                        </a>
                      </div>
                    </div>
                  )}
                  {squadData.coachEmail && (
                    <div className="group/item flex items-start gap-4">
                      <div className="mt-1 rounded-xl bg-white/5 p-3 text-emerald-500 transition-colors duration-300 group-hover/item:bg-emerald-500 group-hover/item:text-white">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                          Email
                        </p>
                        <a
                          href={`mailto:${squadData.coachEmail}`}
                          className="text-lg font-bold break-all text-white transition-colors group-hover/item:text-emerald-400"
                        >
                          {squadData.coachEmail}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- PRZEŁĄCZANY WIDOK (KADRA / STATYSTYKI) --- */}
        <SquadTabsView players={players} />
      </div>
    </main>
  )
}
