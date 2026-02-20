export const revalidate = 60

import { sanityFetch } from '@/sanity/lib/live'
import { PARTNERS_PAGE_QUERY } from '@/sanity/lib/queries'
import PartnersPage from './PartnersPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Klubowicze | Kujawianka Izbica Kujawska',
  description:
    'Poznaj lokalnych przedsiębiorców i osoby wspierające nasz klub.',
}

export default async function KlubowiczePage() {
  // Pobieramy dane z dedykowanego zapytania (które już filtruje typ 'partner')
  const { data } = await sanityFetch({ query: PARTNERS_PAGE_QUERY })

  const pageData = data?.pageData
  const members = data?.members || []

  // Helper do kolorowania tytułu (zachowujemy styl: Klub <span green>Biznesu</span>)
  const renderColoredTitle = (title: string) => {
    const words = title.trim().split(/\s+/)
    if (words.length < 2) return <span className="text-white">{title}</span>

    const halfIndex = Math.ceil(words.length / 2)

    return (
      <>
        <span className="text-white">
          {words.slice(0, halfIndex).join(' ')}{' '}
        </span>
        <span className="text-emerald-500">
          {words.slice(halfIndex).join(' ')}
        </span>
      </>
    )
  }

  const titleContent = pageData?.title ? (
    renderColoredTitle(pageData.title)
  ) : (
    <>
      Klub <span className="text-emerald-500">Biznesu</span>
    </>
  )

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* === NAGŁÓWEK STRONY === */}
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 text-center">
          <span className="bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            Lokalny Biznes
          </span>
          <h1 className="font-montserrat text-center text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-5xl">
            {titleContent}
          </h1>
          <p className="max-w-2xl text-center text-sm leading-relaxed font-medium text-gray-400 md:text-base">
            {pageData?.description ||
              'Elitarne grono przedsiębiorców wspierających Kujawiankę. Łączymy pasję do sportu z możliwościami biznesowymi i networkingiem.'}
          </p>
        </div>

        <PartnersPage members={members} pageData={pageData} />
      </div>
    </main>
  )
}
