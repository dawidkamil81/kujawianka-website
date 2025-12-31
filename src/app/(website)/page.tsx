// src/app/(website)/page.tsx
import { client } from "@/sanity/lib/client";
import {
  HOMEPAGE_PLAYERS_QUERY,
  HOMEPAGE_NEWS_QUERY,
  ALL_SPONSORS_QUERY,
  HOMEPAGE_RESULTS_QUERY,
  MATCH_CENTER_QUERY // <--- Importujemy nowe zapytanie
} from "@/sanity/lib/queries";
import Home from "@/components/Home/HomePage";

export default async function Page() {
  // Dodajemy MATCH_CENTER_QUERY do Promise.all
  //tests
  const [players, news, sponsors, resultsData, matchCenterData] = await Promise.all([
    client.fetch(HOMEPAGE_PLAYERS_QUERY),
    client.fetch(HOMEPAGE_NEWS_QUERY),
    client.fetch(ALL_SPONSORS_QUERY),
    client.fetch(HOMEPAGE_RESULTS_QUERY),
    client.fetch(MATCH_CENTER_QUERY) // <--- Pobieramy dane
  ]);

  return (
    <Home
      players={players}
      news={news}
      sponsors={sponsors}
      resultsData={resultsData}
      matchCenterData={matchCenterData} // <--- Przekazujemy do Home
    />
  );
}