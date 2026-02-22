import { sanityFetch } from '@/sanity/lib/live'
import { CLUB_PAGE_QUERY } from '@/sanity/lib/queries'
import ClubView from '@/components/club/ClubView'

export const metadata = {
  title: 'O Klubie | Kujawianka Izbica Kujawska',
  description: 'Historia, tradycja i władze Kujawianki Izbica Kujawska.',
}

export default async function ClubPage() {
  const { data } = await sanityFetch({ query: CLUB_PAGE_QUERY })

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Brak danych o klubie.
      </div>
    )
  }

  return <ClubView data={data} />
}
