import { sanityFetch } from '@/sanity/lib/live'
import { CLUB_PAGE_QUERY } from '@/sanity/lib/queries'
import ClubView from '@/components/club/ClubView'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'O Klubie | Kujawianka Izbica Kujawska',
  description: 'Historia, tradycja i władze Kujawianki Izbica Kujawska.',
}

export default async function ClubPage() {
  const { data } = await sanityFetch({ query: CLUB_PAGE_QUERY })

  if (!data || data.isPageVisible === false) {
    notFound()
  }

  return <ClubView data={data} />
}
