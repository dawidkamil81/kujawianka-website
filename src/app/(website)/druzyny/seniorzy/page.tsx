import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PLAYERS_QUERY } from "@/sanity/lib/queries";
import { Player } from "@/types";
import PlayerCard from "@/components/common/PlayerCard"; // <-- Upewnij się co do ścieżki

// Funkcja pomocnicza do grupowania zawodników
function groupPlayersByPosition(players: Player[]) {
    return {
        bramkarze: players.filter((p) => p.position === "Bramkarz"),
        obroncy: players.filter((p) => p.position === "Obrońca"),
        pomocnicy: players.filter((p) => p.position === "Pomocnik"),
        napastnicy: players.filter((p) => p.position === "Napastnik"),
        sztab: players.filter((p) => p.position === "Sztab"),
    };
}

export default async function KadraPage() {
    // 1. Pobieramy wszystkich z Sanity
    const { data: players } = await sanityFetch({ query: ALL_PLAYERS_QUERY });

    // 2. Grupujemy ich wg pozycji
    const squad = groupPlayersByPosition(players);

    // 3. Renderujemy
    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]">

            {/* Ozdobny particle */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]" />

            <div className="relative z-10 container mx-auto px-4 py-16">

                {/* --- NAGŁÓWEK STRONY --- */}
                <div className="flex flex-col items-center justify-center mb-16 space-y-4">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Sezon 2025/2026
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl mx-auto">
                        Kadra <span className="text-emerald-500">Kujawianki</span>
                    </h1>
                </div>

                {/* --- GRUPY ZAWODNIKÓW --- */}
                {Object.entries(squad).map(([groupKey, groupPlayers]) => {
                    if (groupPlayers.length === 0) return null;

                    return (
                        <div key={groupKey} className="mb-16 last:mb-0">
                            {/* Nagłówek Grupy */}
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-club-red">
                                    {groupKey}
                                </h3>
                                <div className="h-[1px] flex-grow bg-white/10"></div>
                            </div>

                            {/* Grid Kart */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                {groupPlayers.map((player) => (
                                    // Użycie nowego komponentu
                                    <PlayerCard key={player._id} player={player} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}