import { sanityFetch } from '@/sanity/lib/live'
import {
  SPONSORS_PAGE_QUERY,
  ALL_SUPPORTERS_COUNT_QUERY,
} from '@/sanity/lib/queries'
import SponsorsView from '@/components/sponsors/SponsorsView'
import { notFound } from 'next/navigation' // <--- DODANY IMPORT

export const metadata = {
  title: 'Sponsorzy | Kujawianka Izbica Kujawska',
  description: 'Poznaj firmy wspierające nasz klub.',
}

export default async function SponsorsPage() {
  // 1. Pobieramy łączną liczbę wszystkich wspierających z CMS
  const { data: count } = await sanityFetch({
    query: ALL_SUPPORTERS_COUNT_QUERY,
  })

  // 2. Pobieramy dane strony Sponsorów
  const { data } = await sanityFetch({ query: SPONSORS_PAGE_QUERY })

  // 3. Wyciągamy pageData z pobranego obiektu
  const pageData = data?.pageData

  // 4. Logika blokowania widoczności - rzuca 404 jeśli brak danych lub strona ukryta
  if (!pageData || pageData.isPageVisible === false) {
    notFound()
  }

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <SponsorsView
          sponsors={data?.sponsors || []}
          pageData={pageData}
          totalSupportersCount={count || 0}
        />
      </div>
    </main>
  )
}
