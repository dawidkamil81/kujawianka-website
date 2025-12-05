import { client } from "@/sanity/lib/client";
import { ALL_SPONSORS_QUERY } from "@/sanity/lib/queries";
import { Sponsor } from "@/types/index";
import SponsorsPage from "./SponsorsPage"; // Importujemy komponent stworzony przed chwilą

export default async function Sponsors() {
    // 1. Pobieramy dane z bazy (na serwerze)
    const sponsors = await client.fetch<Sponsor[]>(ALL_SPONSORS_QUERY);

    // 2. Przekazujemy je do komponentu klienckiego
    return <SponsorsPage sponsors={sponsors} />;
}