import { client } from "@/sanity/lib/client";
import { ALL_SPONSORS_QUERY } from "@/sanity/lib/queries"; // Wspólne zapytanie
import { Sponsor } from "@/types/index";
import PartnersPage from "./PartnersPage"; // Importujemy komponent wyświetlający klubowiczów

export default async function KlubowiczePage() {
    // 1. Pobieramy WSZYSTKICH (Sponsorzy + Klubowicze)
    const allEntities = await client.fetch<Sponsor[]>(ALL_SPONSORS_QUERY);

    // 2. Filtrujemy: Wybieramy tylko tych, którzy są "Klubowiczami" (tier == 'partner')
    const clubMembers = allEntities.filter(
        (entity) => entity.tier === "partner"
    );

    // 3. Przekazujemy gotową listę do wyświetlenia
    return <PartnersPage members={clubMembers} />;
}