import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { SQUAD_RESULTS_QUERY } from "@/sanity/lib/queries";
// Upewnij się, że ścieżka do komponentu Results jest poprawna. 
// Jeśli przeniosłeś go do folderu common, zaktualizuj import.
// Zakładam, że plik Results.tsx przenieśliśmy np. do src/components/Results/Results.tsx lub zostawiliśmy w starym miejscu.
// Dla porządku sugeruję przenieść Results.tsx do folderu components.
import WynikiClient from "@/app/(website)/wyniki/[slug]/Results";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function DynamicResultsPage({ params }: PageProps) {
    const { slug } = await params;

    // Pobieramy dane dla konkretnego sluga (np. 'seniorzy', 'juniorzy-mlodsi')
    const { data } = await sanityFetch({
        query: SQUAD_RESULTS_QUERY,
        params: { slug }
    });

    // Jeśli nie znaleziono informacji o kadrze, zwracamy 404
    if (!data?.squadInfo) {
        return notFound();
    }

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]">

            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-20 max-w-[1600px]">

                <div className="flex flex-col items-center justify-center mb-16 space-y-4">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        {data.squadInfo.name}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        Wyniki i <span className="text-emerald-500">Tabela</span>
                    </h1>
                </div>

                {/* Wyświetlamy tabelę tylko jeśli istnieje */}
                {data.table ? (
                    <WynikiClient
                        table={data.table}
                        matches={data.matches || []}
                        teams={data.teams || []}
                    />
                ) : (
                    <div className="text-center py-20 border border-white/10 rounded-2xl bg-[#121212] flex flex-col items-center justify-center gap-4">
                        <div className="p-4 bg-white/5 rounded-full text-gray-500">
                            {/* Ikona Trophy lub Table */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 15.5v2.5h-18v-2.5c0-6.5 3-8.5 3-15.5Z" /><path d="M2 12h20" /><path d="M22 7v-3a2 2 0 0 0-2-2h-3.9a2 2 0 0 0-1.6.9l-2.5 3.5" /></svg>
                        </div>
                        <p className="text-gray-400 text-lg font-medium">
                            Tabela dla drużyny <span className="text-white">{data.squadInfo.name}</span> nie została jeszcze dodana.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}