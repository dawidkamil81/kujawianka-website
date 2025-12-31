import { client } from "@/sanity/lib/client";
import { ALL_SPONSORS_QUERY } from "@/sanity/lib/queries";
import Partnership from "./Partnership";
import { Sponsor } from "@/types/index";

// Funkcja pomocnicza do pobierania danych (symulacja)
// W prawdziwej aplikacji tutaj nastąpiłoby zapytanie do bazy danych lub CMS
async function getSponsors(): Promise<Sponsor[]> {
    // Tutaj zwróć rzeczywiste dane. Dla przykładu pusta tablica lub mock danych:
    return [
        // { id: 1, name: "Przykładowy Sponsor", ... }
    ];
}

export default async function OfferPage() {
    const sponsors = await client.fetch<Sponsor[]>(ALL_SPONSORS_QUERY);

    return <Partnership sponsors={sponsors} />;
}