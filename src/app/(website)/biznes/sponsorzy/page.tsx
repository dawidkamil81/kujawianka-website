import { sanityFetch } from '@/sanity/lib/live'
import { SPONSORS_PAGE_QUERY } from '@/sanity/lib/queries'
import SponsorsView from '@/components/sponsors/SponsorsView'

export const metadata = {
  title: 'Sponsorzy | Kujawianka Izbica Kujawska',
  description: 'Poznaj firmy wspierające nasz klub.',
}

export default async function SponsorsPage() {
  const { data } = await sanityFetch({ query: SPONSORS_PAGE_QUERY })

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Brak danych o sponsorach.
      </div>
    )
  }

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))] text-white">
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <SponsorsView sponsors={data.sponsors} pageData={data.pageData} />
      </div>
    </main>
  )
}
