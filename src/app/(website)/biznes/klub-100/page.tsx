export const revalidate = 60

import { sanityFetch } from '@/sanity/lib/live'
import { CLUB100_PAGE_QUERY } from '@/sanity/lib/queries'
import Club100List from './Club100List'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Klub 100 | Kujawianka Izbica Kujawska',
  description:
    'Elitarne grono 100 najbardziej zaangażowanych firm i osób prywatnych wspierających nasz klub.',
}

export default async function Club100Page() {
  const { data } = await sanityFetch({ query: CLUB100_PAGE_QUERY })

  const pageData = data?.pageData
  const members = data?.members || []

  const renderColoredTitle = (title: string) => {
    const words = title.trim().split(/\s+/)
    if (words.length < 2) return <span className="text-white">{title}</span>
    const lastWord = words.pop()
    return (
      <>
        {words.join(' ')} <span className="text-emerald-500">{lastWord}</span>
      </>
    )
  }

  const titleContent = pageData?.title ? (
    renderColoredTitle(pageData.title)
  ) : (
    <>
      Klub <span className="text-emerald-500">100</span>
    </>
  )

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      {/* Ozdobny particle */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      {/* --- 1. NAGŁÓWEK STRONY (ZAMKNIĘTY W KONTENERZE) --- */}
      <div className="relative z-10 pt-16 pb-12 md:pt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-5 text-center">
            <span className="bg-club-green/10 border-club-green/20 text-club-green-light inline-block rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
              Prestiż i Wsparcie
            </span>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase drop-shadow-2xl md:text-6xl">
              {titleContent}
            </h1>
            <p className="max-w-2xl text-center text-sm leading-relaxed font-medium text-gray-400 md:text-base">
              {pageData?.description ||
                'Elitarne grono 100 najbardziej zaangażowanych firm i osób prywatnych. To prestiżowy klub biznesu, który poprzez regularne wsparcie ma realny wpływ na stabilność i rozwój Kujawianki.'}
            </p>
          </div>
        </div>
      </div>

      {/* --- 2. LISTA I KORZYŚCI (BEZ KONTENERA ZEWNĘTRZNEGO, BO MA SEKCJĘ FULL-WIDTH) --- */}
      <Club100List members={members} pageData={pageData} />
    </main>
  )
}
