'use client'

import PageHero from '@/components/common/PageHero'
import DownloadsSection, { DownloadFile } from './DownloadsSection'

interface DownloadsViewProps {
  files: DownloadFile[]
}

export default function DownloadsView({ files }: DownloadsViewProps) {
  // Przenosimy logikę kategoryzacji plików
  const categories = {
    club: files.filter((f) => f.category === 'club' || f.category === 'docs'),
    players: files.filter(
      (f) => f.category === 'players' || f.category === 'parents',
    ),
    other: files.filter(
      (f) => !['club', 'docs', 'players', 'parents'].includes(f.category || ''),
    ),
  }

  return (
    // ZMIANA 1: Dodano klasę 'relative' do kontenera <main>
    <main className="relative flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <PageHero
          animated
          badgeText="Strefa Klubowa"
          title="Do Pobrania"
          description="Znajdziesz tutaj wszystkie niezbędne dokumenty, regulaminy oraz materiały dla rodziców i zawodników Kujawianki."
        />

        {/* Kontener na sekcje */}
        <div className="flex flex-col gap-24">
          <DownloadsSection title="Dokumenty Klubowe" files={categories.club} />

          <DownloadsSection
            title="Dla Rodziców i Zawodników"
            files={categories.players}
          />

          <DownloadsSection title="Inne Materiały" files={categories.other} />

          {/* Stan pusty - gdy brak plików całkowicie */}
          {files.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] py-20 text-center">
              <p className="font-montserrat text-sm tracking-widest text-gray-500 uppercase">
                Brak plików do pobrania.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
