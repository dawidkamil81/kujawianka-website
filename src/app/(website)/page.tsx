export const revalidate = 60 // Odświeżanie Route Cache (HTML) co 60s

import { client } from '@/sanity/lib/client'
import { sanityFetch } from '@/sanity/lib/live'
import {
  HOMEPAGE_PLAYERS_QUERY,
  HOMEPAGE_NEWS_QUERY,
  HOMEPAGE_SPONSORS_QUERY,
  HOMEPAGE_RESULTS_QUERY,
  MATCH_CENTER_QUERY,
  HOME_PAGE_QUERY, // <--- ZMIANA 1: Dodany import zapytania
} from '@/sanity/lib/queries'
import Home from '@/components/home/HomePage'

export default async function Page() {
  // ZMIANA 2: Dodanie homePageData do destrukturyzacji
  const [homePageData, players, news, sponsors, resultsData, matchCenterData] =
    await Promise.all([
      // 0. DANE STRONY GŁÓWNEJ (HERO)
      sanityFetch({ query: HOME_PAGE_QUERY }),

      // 1. ZAWODNICY: Live
      sanityFetch({ query: HOMEPAGE_PLAYERS_QUERY }),

      // 2. NEWSY: Standardowy klient
      client.fetch(HOMEPAGE_NEWS_QUERY, {}, { next: { revalidate: 60 } }),

      // 3. SPONSORZY: Live
      sanityFetch({ query: HOMEPAGE_SPONSORS_QUERY }),

      // 4. WYNIKI i TABELA: Live
      sanityFetch({ query: HOMEPAGE_RESULTS_QUERY }),

      // 5. CENTRUM MECZOWE: Live
      sanityFetch({ query: MATCH_CENTER_QUERY }),
    ])

  return (
    <Home
      homePageData={homePageData.data} // <--- ZMIANA 3: Przekazanie danych do komponentu Home
      players={players.data}
      news={news}
      sponsors={sponsors.data}
      resultsData={resultsData.data}
      matchCenterData={matchCenterData.data}
    />
  )
}
