import { client } from "@/sanity/lib/client";
import { ALL_SPONSORS_QUERY } from "@/sanity/lib/queries";
import { Sponsor } from "@/types/index";
import SponsorsPage from "./SponsorsPage";

export default async function Sponsors() {
    // 1. Pobieramy dane z bazy
    const sponsors = await client.fetch<Sponsor[]>(ALL_SPONSORS_QUERY);

    return (
        // === GŁÓWNY WRAPPER (Identyczne tło jak wszędzie) ===
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]">

            {/* Ozdobny particle */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">

                {/* === NAGŁÓWEK STRONY === */}
                <div className="flex flex-col items-center justify-center mb-20 space-y-5 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Wsparcie i Rozwój
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        Nasi <span className="text-emerald-500">Partnerzy</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base font-medium">
                        Dzięki wsparciu tych firm możemy rozwijać pasję, szkolić młodzież i walczyć o najwyższe cele. Dziękujemy, że gracie z nami w jednej drużynie!
                    </p>
                </div>

                {/* === KOMPONENT KLIENTSKI === */}
                <SponsorsPage sponsors={sponsors} />

            </div>
        </main>
    );
}