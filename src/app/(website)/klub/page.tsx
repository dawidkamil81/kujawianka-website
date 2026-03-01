import { sanityFetch } from '@/sanity/lib/live'
import { CLUB_PAGE_QUERY } from '@/sanity/lib/queries'
import ClubView from '@/components/club/ClubView'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  // Pobieramy dane strony z Sanity
  const { data } = await sanityFetch({ query: CLUB_PAGE_QUERY })

  // Zabezpieczenie na wypadek braku danych
  if (!data) {
    return {
      title: 'O Klubie | Kujawianka Izbica Kujawska',
    }
  }

  // Używamy danych z CMS do wygenerowania tagów
  const pageTitle = data.heroHeading || 'O Klubie | Kujawianka Izbica Kujawska'
  const pageDescription =
    data.heroDescription ||
    'Historia, tradycja i władze Kujawianki Izbica Kujawska.'

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      // Jeśli dodasz pole SEO w Sanity dla zdjęć, możesz je odkomentować:
      // images: data.seoImageUrl ? [{ url: data.seoImageUrl }] : [],
    },
  }
}

export default async function ClubPage() {
  const { data } = await sanityFetch({ query: CLUB_PAGE_QUERY })

  // Wyrzuca 404, jeśli strona jest ukryta w Sanity
  if (!data || data.isPageVisible === false) {
    notFound()
  }

  return <ClubView data={data} />
}
