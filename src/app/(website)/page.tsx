// ZMIEŃ IMPORT: zamiast z client.ts, importuj z live.ts
import { sanityFetch } from "@/sanity/lib/live";
import {
  HOMEPAGE_PLAYERS_QUERY,
  HOMEPAGE_NEWS_QUERY,
  ALL_SPONSORS_QUERY,
  HOMEPAGE_RESULTS_QUERY,
  MATCH_CENTER_QUERY
} from "@/sanity/lib/queries";
import Home from "@/components/Home/HomePage";

export default async function Page() {
  // ZMIEŃ SPOSÓB POBIERANIA DANYCH
  // sanityFetch zwraca obiekt { data: ... }, więc musimy się do niego dostać
  const [players, news, sponsors, resultsData, matchCenterData] = await Promise.all([
    sanityFetch({ query: HOMEPAGE_PLAYERS_QUERY }),
    sanityFetch({ query: HOMEPAGE_NEWS_QUERY }),
    sanityFetch({ query: ALL_SPONSORS_QUERY }),
    sanityFetch({ query: HOMEPAGE_RESULTS_QUERY }),
    sanityFetch({ query: MATCH_CENTER_QUERY })
  ]);

  return (
    <Home
      players={players.data}       // <-- Dodaj .data
      news={news.data}             // <-- Dodaj .data
      sponsors={sponsors.data}     // <-- Dodaj .data
      resultsData={resultsData.data} // <-- Dodaj .data
      matchCenterData={matchCenterData.data} // <-- Dodaj .data
    />
  );
}