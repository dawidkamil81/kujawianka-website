import { client } from "@/sanity/lib/client";
import {
  HOMEPAGE_PLAYERS_QUERY,
  HOMEPAGE_NEWS_QUERY,
  ALL_SPONSORS_QUERY // <--- Nowy import
} from "@/sanity/lib/queries";
import Home from "@/components/Home/Home";

export default async function Page() {
  // Pobieramy wszystko równolegle
  const [players, news, sponsors] = await Promise.all([
    client.fetch(HOMEPAGE_PLAYERS_QUERY),
    client.fetch(HOMEPAGE_NEWS_QUERY),
    client.fetch(ALL_SPONSORS_QUERY)
  ]);

  return <Home players={players} news={news} sponsors={sponsors} />;
}