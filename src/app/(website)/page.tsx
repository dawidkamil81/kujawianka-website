// export const revalidate = 300 //5minutes

// src/app/(website)/page.tsx
import { client } from '@/sanity/lib/client'
// Importujemy nasze nowe połączone zapytanie
import { HOMEPAGE_COMBINED_QUERY } from '@/sanity/lib/queries'
import Home from '@/components/home/HomePage'
import NotFoundVAR from './not-found'

export default async function Page() {
  // Wykonujemy tylko JEDNO zapytanie do Sanity
  // Dodajemy tag 'sanity', który zrobiliśmy w Webhooku!
  const data = await client.fetch(
    HOMEPAGE_COMBINED_QUERY,
    {},
    { next: { tags: ['sanity'] } },
  )

  // Sprawdzamy, czy w pobranych danych w ogóle istnieje strona główna
  if (!data || !data.homePageData) {
    return <NotFoundVAR />
  }

  return (
    <Home
      // Możesz zostawić klucz oparty np. o zmianę slugów lub usunąć, jeśli nie jest potrzebny
      key={data.homePageData._updatedAt || 'home-initial'}
      homePageData={data.homePageData}
      players={data.players}
      news={data.news}
      sponsors={data.sponsors}
      resultsData={data.resultsData}
      matchCenterData={data.matchCenterData}
      defaultResultSlug={data.mainSquadSlug}
      sponsorsSlug={data.sponsorsPageSlug}
    />
  )
}
