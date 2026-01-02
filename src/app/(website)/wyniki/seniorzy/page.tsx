import { sanityFetch } from "@/sanity/lib/live"; // <--- 1. ZMIANA IMPORTU
import { RESULTS_PAGE_QUERY } from "@/sanity/lib/queries";
import WynikiClient from "./Results";

export default async function WynikiPage() {
    // 1. Pobieramy dane z Live API
    // Destrukturyzujemy { data }, aby zmienna 'data' zawierała wynik zapytania (obiekt z polami table, matches, teams)
    const { data } = await sanityFetch({ query: RESULTS_PAGE_QUERY });

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]">

            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            {/* ZWIĘKSZONY KONTENER DO 1600px dla układu side-by-side */}
            <div className="relative z-10 container mx-auto px-4 py-16 md:py-20 max-w-[1600px]">

                <div className="flex flex-col items-center justify-center mb-16 space-y-4">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Sezon 2025/2026
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        Wyniki i <span className="text-emerald-500">Tabela</span>
                    </h1>
                </div>

                <WynikiClient
                    // Używamy "optional chaining" (data?.table), aby strona nie wyrzuciła błędu, 
                    // gdyby dane nie zdążyły się jeszcze załadować.
                    table={data?.table || []}
                    matches={data?.matches || []}
                    teams={data?.teams || []}
                />
            </div>
        </main>
    );
}