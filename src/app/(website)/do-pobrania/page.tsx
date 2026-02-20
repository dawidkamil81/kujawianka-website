export const revalidate = 60

import { sanityFetch } from '@/sanity/lib/live'
import { DOWNLOADS_QUERY } from '@/sanity/lib/queries'
import { FileText, Download, HardDrive, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

// 1. ZMIANA: Tworzymy interfejs opisujący strukturę pliku z Sanity
interface DownloadFile {
  _id: string
  title: string
  description?: string
  category?: string
  fileUrl: string
  fileName: string
  extension?: string
  size: number
  publishedAt?: string
}

// Helper do formatowania rozmiaru
const formatBytes = (bytes: number, decimals = 2) => {
  if (!bytes) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const metadata = {
  title: 'Do pobrania | Kujawianka Izbica Kujawska',
  description: 'Dokumenty i pliki do pobrania.',
}

export default async function DownloadsPage() {
  const { data: files } = await sanityFetch({ query: DOWNLOADS_QUERY })

  // 2. ZMIANA: Zastępujemy `any` stworzonym typem `DownloadFile`
  const categories = {
    club: files.filter(
      (f: DownloadFile) => f.category === 'club' || f.category === 'docs',
    ),
    players: files.filter(
      (f: DownloadFile) => f.category === 'players' || f.category === 'parents',
    ),
    other: files.filter(
      (f: DownloadFile) =>
        !['club', 'docs', 'players', 'parents'].includes(f.category || ''),
    ),
  }

  return (
    // === GŁÓWNY WRAPPER ===
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* === NAGŁÓWEK STRONY === */}
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 text-center">
          <span className="bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            Strefa Klubowa
          </span>
          <h1 className="font-montserrat text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
            Do <span className="text-emerald-500">Pobrania</span>
          </h1>

          <p className="max-w-2xl text-center text-sm font-medium text-gray-400 md:text-base">
            Znajdziesz tutaj wszystkie niezbędne dokumenty, regulaminy oraz
            materiały dla rodziców i zawodników Kujawianki.
          </p>
        </div>

        {/* === KONTENER NA SEKCJE === */}
        <div className="flex flex-col gap-24">
          {/* SEKCJA 1: DOKUMENTY KLUBOWE */}
          {categories.club.length > 0 && (
            <FileSection title="Dokumenty Klubowe" files={categories.club} />
          )}

          {/* SEKCJA 2: DLA RODZICÓW I ZAWODNIKÓW */}
          {categories.players.length > 0 && (
            <FileSection
              title="Dla Rodziców i Zawodników"
              files={categories.players}
            />
          )}

          {/* SEKCJA 3: POZOSTAŁE */}
          {categories.other.length > 0 && (
            <FileSection title="Inne Materiały" files={categories.other} />
          )}

          {/* Stan pusty */}
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

// === KOMPONENT POMOCNICZY: SEKCJA PLIKÓW ===
// 3. ZMIANA: Zastępujemy `any[]` typem `DownloadFile[]`
function FileSection({
  title,
  files,
}: {
  title: string
  files: DownloadFile[]
}) {
  return (
    <section>
      <div className="mb-10 flex items-center gap-4">
        <h3 className="font-montserrat border-l-4 border-emerald-500 pl-4 text-2xl font-bold tracking-widest text-white uppercase">
          {title}
        </h3>
        <div className="h-[1px] flex-grow bg-white/10"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => (
          <div
            key={file._id}
            className="group relative flex min-h-[280px] flex-col justify-between rounded-2xl border border-white/10 bg-[#121212] p-8 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
          >
            <div>
              <div className="mb-6 flex items-start justify-between">
                <div className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold tracking-wider text-emerald-500 uppercase transition-colors group-hover:bg-emerald-500/10">
                  <FileText size={14} />
                  {file.extension?.toUpperCase() || 'PLIK'}
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-gray-500 transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-500">
                  <Download size={16} />
                </div>
              </div>

              <h3 className="font-montserrat mb-3 text-xl leading-tight font-bold text-white transition-colors group-hover:text-emerald-400">
                {file.title}
              </h3>

              {file.description && (
                <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-400">
                  {file.description}
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
              <div className="flex flex-col space-y-1.5 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-2 font-bold tracking-wider uppercase transition-colors group-hover:text-gray-400">
                  <HardDrive className="h-3.5 w-3.5 text-emerald-600/70" />{' '}
                  {formatBytes(file.size)}
                </span>
                <span className="flex items-center gap-2 font-bold tracking-wider uppercase transition-colors group-hover:text-gray-400">
                  <Calendar className="h-3.5 w-3.5 text-emerald-600/70" />
                  {file.publishedAt
                    ? format(new Date(file.publishedAt), 'dd.MM.yyyy')
                    : '-'}
                </span>
              </div>

              <Link
                href={`${file.fileUrl}?dl=${file.fileName}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 hover:bg-emerald-700 active:scale-95 sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" />
                Pobierz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
