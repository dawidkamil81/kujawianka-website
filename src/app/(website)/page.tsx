import { client } from "@/sanity/lib/client";
import {
  HOMEPAGE_PLAYERS_QUERY,
  HOMEPAGE_NEWS_QUERY,
  ALL_SPONSORS_QUERY,
  HOMEPAGE_RESULTS_QUERY // <--- Nowy import
} from "@/sanity/lib/queries";
import Home from "@/components/home/Home";

export default async function Page() {
  // Pobieramy wszystko równolegle (szybciej)
  const [players, news, sponsors, resultsData] = await Promise.all([
    client.fetch(HOMEPAGE_PLAYERS_QUERY),
    client.fetch(HOMEPAGE_NEWS_QUERY),
    client.fetch(ALL_SPONSORS_QUERY),
    client.fetch(HOMEPAGE_RESULTS_QUERY) // <--- Pobieramy wyniki
  ]);

  return (
    <Home
      players={players}
      news={news}
      sponsors={sponsors}
      // Przekazujemy paczkę wyników (tabela + mecze + zespoły)
      resultsData={resultsData}
    />
  );
}