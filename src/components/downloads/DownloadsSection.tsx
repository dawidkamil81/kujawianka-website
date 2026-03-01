import Link from 'next/link'
import { FileText, Download, HardDrive, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import SectionHeader from '@/components/ui/SectionHeader'

export interface DownloadFile {
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

interface DownloadsSectionProps {
  title: string
  files: DownloadFile[]
}

// Helper do formatowania rozmiaru bajtów na KB/MB (z Twojego oryginału)
const formatBytes = (bytes: number, decimals = 2) => {
  if (!bytes) return '0 B'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export default function DownloadsSection({
  title,
  files,
}: DownloadsSectionProps) {
  if (!files || files.length === 0) return null

  return (
    <section>
      {/* Używamy zunifikowanego nagłówka sekcji */}
      <SectionHeader title={title} />

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
