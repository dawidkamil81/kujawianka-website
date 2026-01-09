export const revalidate = 60; // Odświeżanie Route Cache (HTML) co 60s

import { client } from "@/sanity/lib/client"; // Klient standardowy (do planowania newsów)
import { sanityFetch } from "@/sanity/lib/live"; // Klient Live (do wyników na żywo)
import {
  HOMEPAGE_PLAYERS_QUERY,
  HOMEPAGE_NEWS_QUERY,
  ALL_SPONSORS_QUERY,
  HOMEPAGE_RESULTS_QUERY,
  MATCH_CENTER_QUERY
} from "@/sanity/lib/queries";
import Home from "@/components/Home/HomePage";

export default async function Page() {
  const [players, news, sponsors, resultsData, matchCenterData] = await Promise.all([
    // 1. ZAWODNICY: Mogą być Live (rzadko się zmieniają, ale nie zaszkodzi)
    sanityFetch({ query: HOMEPAGE_PLAYERS_QUERY }),

    // 2. NEWSY: Muszą być przez client.fetch z revalidate, żeby działało planowanie postów!
    client.fetch(HOMEPAGE_NEWS_QUERY, {}, { next: { revalidate: 60 } }),

    // 3. SPONSORZY: Live
    sanityFetch({ query: ALL_SPONSORS_QUERY }),

    // 4. WYNIKI i TABELA: Koniecznie Live (natychmiastowa aktualizacja po gwizdku)
    sanityFetch({ query: HOMEPAGE_RESULTS_QUERY }),

    // 5. CENTRUM MECZOWE: Koniecznie Live
    sanityFetch({ query: MATCH_CENTER_QUERY })
  ]);

  return (
    <Home
      // UWAGA: Tu musimy pamiętać, co z czego pochodzi:

      players={players.data}       // z sanityFetch -> ma .data
      news={news}                  // z client.fetch -> NIE ma .data (czyste dane)
      sponsors={sponsors.data}     // z sanityFetch -> ma .data
      resultsData={resultsData.data} // z sanityFetch -> ma .data
      matchCenterData={matchCenterData.data} // z sanityFetch -> ma .data
    />
  );
}