// src/app/(website)/biznes/klub-100/page.tsx
import { client } from "@/sanity/lib/client";
import { ALL_SPONSORS_QUERY } from "@/sanity/lib/queries";
import { Sponsor } from "@/types/index";
import Club100Page from "./Club100Page";

export const metadata = {
    title: "Klub 100 | Kujawianka Izbica",
    description: "Dołącz do elitarnego grona wspierającego rozwój klubu. Zostań członkiem Klubu 100.",
};

export default async function Page() {
    // 1. Pobieramy WSZYSTKICH
    const allEntities = await client.fetch<Sponsor[]>(ALL_SPONSORS_QUERY);

    // 2. Filtrujemy tylko członków Klubu 100
    // Upewnij się, że w Sanity dodałeś sponsorów z tierem 'club100'
    const clubMembers = allEntities.filter(
        (entity) => entity.tier === "club100"
    );

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e]">
            {/* Tło identyczne jak w sekcji Klubowicze dla spójności */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.15),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16 space-y-6 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Prestiż i Wsparcie
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-montserrat drop-shadow-2xl">
                        Klub <span className="text-amber-500">100</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base font-medium leading-relaxed">
                        Elitarne grono osób i firm, które regularnie wspierają rozwój Kujawianki Izbica.
                        Twój wkład buduje przyszłość naszego klubu.
                    </p>
                </div>

                {/* Komponent Prezentacyjny */}
                <Club100Page members={clubMembers} />
            </div>
        </main>
    );
}