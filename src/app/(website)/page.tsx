export const revalidate = 60 // Odświeżanie Route Cache (HTML) co 60s

import { client } from '@/sanity/lib/client' // Klient standardowy (do planowania newsów)
import { sanityFetch } from '@/sanity/lib/live' // Klient Live (do wyników na żywo)
import {
  HOMEPAGE_PLAYERS_QUERY,
  HOMEPAGE_NEWS_QUERY,
  HOMEPAGE_SPONSORS_QUERY, // <--- ZMIANA: Używamy nowego zapytania
  HOMEPAGE_RESULTS_QUERY,
  MATCH_CENTER_QUERY,
} from '@/sanity/lib/queries'
import Home from '@/components/Home/HomePage'

export default async function Page() {
  const [players, news, sponsors, resultsData, matchCenterData] =
    await Promise.all([
      // 1. ZAWODNICY: Live
      sanityFetch({ query: HOMEPAGE_PLAYERS_QUERY }),

      // 2. NEWSY: Standardowy klient (dla revalidate i planowania postów)
      client.fetch(HOMEPAGE_NEWS_QUERY, {}, { next: { revalidate: 60 } }),

      // 3. SPONSORZY: Live (Nowe zapytanie dzielące na main/carousel)
      sanityFetch({ query: HOMEPAGE_SPONSORS_QUERY }),

      // 4. WYNIKI i TABELA: Live
      sanityFetch({ query: HOMEPAGE_RESULTS_QUERY }),

      // 5. CENTRUM MECZOWE: Live
      sanityFetch({ query: MATCH_CENTER_QUERY }),
    ])

  return (
    <Home
      players={players.data}
      news={news}
      sponsors={sponsors.data} // To teraz jest tablica Sponsor[], co pasuje do HomePage
      resultsData={resultsData.data}
      matchCenterData={matchCenterData.data}
    />
  )
}
