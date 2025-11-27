import { client } from "@/sanity/lib/client";
import {
  HOMEPAGE_PLAYERS_QUERY,
  HOMEPAGE_NEWS_QUERY // <--- Import nowego zapytania
} from "@/sanity/lib/queries";
import Home from "@/components/Home/Home";

export default async function Page() {
  // Pobieramy zawodników i newsy równolegle (Promise.all dla szybkości)
  const [players, news] = await Promise.all([
    client.fetch(HOMEPAGE_PLAYERS_QUERY),
    client.fetch(HOMEPAGE_NEWS_QUERY)
  ]);

  // Przekazujemy oba zestawy danych do Home
  return <Home players={players} news={news} />;
}