import { client } from "@/sanity/lib/client";
import { RESULTS_PAGE_QUERY } from "@/sanity/lib/queries";
import WynikiClient from "./Results";

export default async function WynikiPage() {
    // Pobieramy "paczkę" danych: tabelę, mecze i zespoły
    const data = await client.fetch(RESULTS_PAGE_QUERY);

    return (
        <WynikiClient
            table={data.table}
            matches={data.matches}
            teams={data.teams}
        />
    );
}