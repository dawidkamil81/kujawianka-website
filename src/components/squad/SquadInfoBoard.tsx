'use client'

import { Phone, Mail, User, CalendarRange } from 'lucide-react'
import { PortableText } from '@portabletext/react'

// Konfiguracja stylów dla tekstu z Sanity (przeniesiona z page.tsx)
const portableTextComponents = {
  block: {
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="font-montserrat mt-4 mb-2 text-lg font-bold text-white uppercase">
        {children}
      </h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-3 mb-1 text-base font-bold text-emerald-400">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-2 text-sm leading-relaxed text-gray-400 md:text-base">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mb-3 list-disc space-y-1 pl-5 text-gray-400 marker:text-emerald-500">
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="mb-3 list-decimal space-y-1 pl-5 text-gray-400 marker:text-emerald-500">
        {children}
      </ol>
    ),
  },
}

interface SquadInfoBoardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  description?: any
  coachName?: string
  coachPhone?: string
  coachEmail?: string
}

export default function SquadInfoBoard({
  description,
  coachName,
  coachPhone,
  coachEmail,
}: SquadInfoBoardProps) {
  if (!description && !coachName) return null

  return (
    <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
      {/* 1. INFO */}
      {description && (
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
              value={description}
              components={portableTextComponents}
            />
          </div>
        </div>
      )}

      {/* 2. TRENER */}
      {coachName && (
        <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:border-emerald-500/30 md:p-8">
          <div className="mb-6 flex items-center gap-4 border-b border-white/5 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 text-emerald-500 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-white">
              <User size={24} />
            </div>
            <div>
              <h2 className="font-montserrat text-xl font-bold text-white uppercase">
                {coachName}
              </h2>
              <p className="mt-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                Trener
              </p>
            </div>
          </div>

          <div className="flex flex-grow flex-col justify-center space-y-4">
            {coachPhone && (
              <div className="group/item flex items-start gap-4">
                <div className="mt-1 rounded-xl bg-white/5 p-3 text-emerald-500 transition-colors duration-300 group-hover/item:bg-emerald-500 group-hover/item:text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                    Telefon
                  </p>
                  <a
                    href={`tel:${coachPhone}`}
                    className="text-xl font-bold text-white transition-colors group-hover/item:text-emerald-400"
                  >
                    {coachPhone}
                  </a>
                </div>
              </div>
            )}
            {coachEmail && (
              <div className="group/item flex items-start gap-4">
                <div className="mt-1 rounded-xl bg-white/5 p-3 text-emerald-500 transition-colors duration-300 group-hover/item:bg-emerald-500 group-hover/item:text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                    Email
                  </p>
                  <a
                    href={`mailto:${coachEmail}`}
                    className="text-lg font-bold break-all text-white transition-colors group-hover/item:text-emerald-400"
                  >
                    {coachEmail}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
