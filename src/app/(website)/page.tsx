export const revalidate = 60;

import { sanityFetch } from "@/sanity/lib/live"; // <--- 1. ZMIANA IMPORTU (zamiast client)
import {
  HOMEPAGE_PLAYERS_QUERY,
  HOMEPAGE_NEWS_QUERY,
  ALL_SPONSORS_QUERY,
  HOMEPAGE_RESULTS_QUERY,
  MATCH_CENTER_QUERY
} from "@/sanity/lib/queries";
import Home from "@/components/Home/HomePage";

export default async function Page() {
  // 2. ZMIANA POBIERANIA DANYCH na sanityFetch
  // Zwróć uwagę, że sanityFetch zwraca obiekt { data: ... }
  const [players, news, sponsors, resultsData, matchCenterData] = await Promise.all([
    sanityFetch({ query: HOMEPAGE_PLAYERS_QUERY }),
    sanityFetch({ query: HOMEPAGE_NEWS_QUERY }),
    sanityFetch({ query: ALL_SPONSORS_QUERY }),
    sanityFetch({ query: HOMEPAGE_RESULTS_QUERY }),
    sanityFetch({ query: MATCH_CENTER_QUERY })
  ]);

  return (
    <Home
      // 3. PRZEKAZANIE DANYCH Z .data
      // Musisz dopisać .data, ponieważ sanityFetch zwraca opakowany wynik
      players={players.data}
      news={news.data}
      sponsors={sponsors.data}
      resultsData={resultsData.data}
      matchCenterData={matchCenterData.data}
    />
  );
}