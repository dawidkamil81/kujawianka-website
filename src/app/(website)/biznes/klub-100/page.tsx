import { client } from "@/sanity/lib/client";
import { ALL_SPONSORS_QUERY } from "@/sanity/lib/queries";
import { Sponsor } from "@/types/index";
import Club100List from "./Club100List";

export const dynamic = 'force-dynamic'; // Opcjonalnie: wymusza świeże dane przy każdym wejściu

export default async function Club100Page() {
    // 1. Pobieramy WSZYSTKICH (Sponsorzy + Klubowicze)
    const allEntities = await client.fetch<Sponsor[]>(ALL_SPONSORS_QUERY);

    // 2. Filtrujemy: Wybieramy tylko tych z rangą "club100"
    const clubMembers = allEntities.filter(
        (entity) => entity.tier === "club100"
    );

    return (
        // === GŁÓWNY WRAPPER ===
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)] font-montserrat">

            {/* Ozdobny particle */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            {/* Przekazujemy pobrane dane do komponentu klienckiego */}
            <Club100List members={clubMembers} />

        </main>
    );
}