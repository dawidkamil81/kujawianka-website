import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { COMPETITION_BY_SQUAD_QUERY } from "@/sanity/lib/queries";
import WynikiClient from "@/app/(website)/wyniki/[slug]/Results";
import { calculateTableFromMatches } from "@/lib/tableCalculator";
import { Match } from "@/types";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function DynamicResultsPage({ params }: PageProps) {
    const { slug } = await params;

    const { data: competition } = await sanityFetch({
        query: COMPETITION_BY_SQUAD_QUERY,
        params: { slug }
    });

    if (!competition) {
        return notFound();
    }

    const allMatches: (Match & { round: number })[] = (competition.fixtures || []).flatMap((fixture: any) =>
        fixture.matches.map((match: any) => ({
            ...match,
            round: fixture.roundNumber
        }))
    );

    let tableRows = [];
    if (competition.standing?.rows && competition.standing.rows.length > 0) {
        tableRows = competition.standing.rows;
    } else {
        tableRows = calculateTableFromMatches(allMatches, competition.pointCorrections || []);
    }

    const table = { rows: tableRows };

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]">

            <div className="relative z-10 container mx-auto px-4 py-16">

                <div className="flex flex-col items-center justify-center mb-16 space-y-4">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Sezon {competition.season || "Brak informacji o sezonie"}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl mx-auto">
                        Wyniki i <span className="text-emerald-500">Tabela</span>
                    </h1>
                </div>

                {tableRows.length > 0 || allMatches.length > 0 ? (
                    <WynikiClient
                        table={table}
                        matches={allMatches}
                        competitionName={competition.name}
                        config={competition.config} // <--- PRZEKAZUJEMY KONFIGURACJĘ LIGI
                    />
                ) : (
                    <div className="text-center py-20 border border-white/10 rounded-2xl bg-[#121212] flex flex-col items-center justify-center gap-4 max-w-4xl mx-auto">
                        <div className="p-4 bg-white/5 rounded-full text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 15.5v2.5h-18v-2.5c0-6.5 3-8.5 3-15.5Z" /><path d="M2 12h20" /><path d="M22 7v-3a2 2 0 0 0-2-2h-3.9a2 2 0 0 0-1.6.9l-2.5 3.5" /></svg>
                        </div>
                        <p className="text-gray-400 text-lg font-medium">
                            Rozgrywki dla tej drużyny nie zostały jeszcze uzupełnione.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}