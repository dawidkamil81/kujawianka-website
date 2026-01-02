import { sanityFetch } from "@/sanity/lib/live"; // <--- 1. ZMIANA IMPORTU
import { ALL_SPONSORS_QUERY } from "@/sanity/lib/queries";
import { Sponsor } from "@/types/index";
import Club100List from "./Club100List";

// export const dynamic = 'force-dynamic'; // <--- Można usunąć przy użyciu sanityFetch

export default async function Club100Page() {
    // 1. Pobieramy WSZYSTKICH (Sponsorzy + Klubowicze) przy użyciu Live API
    // Destrukturyzujemy 'data' i zmieniamy nazwę na 'allEntities'
    const { data: allEntities } = await sanityFetch({ query: ALL_SPONSORS_QUERY });

    // 2. Filtrujemy: Wybieramy tylko tych z rangą "club100"
    // Dodajemy zabezpieczenie (allEntities || []) na wypadek braku danych
    const clubMembers = (allEntities || []).filter(
        (entity: Sponsor) => entity.tier === "club100"
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