import { client } from "@/sanity/lib/client";
import { ALL_PLAYERS_QUERY } from "@/sanity/lib/queries";
import { Player } from "@/types";
import Image from "next/image";
import { Users } from "lucide-react";

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
    const players = await client.fetch<Player[]>(ALL_PLAYERS_QUERY);

    // 2. Grupujemy ich wg pozycji
    const squad = groupPlayersByPosition(players);

    // 3. Renderujemy
    return (
        // === TŁO I GŁÓWNY WRAPPER ===
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

                            {/* Grid Kart - Zmiana na grid-cols-2 na mobile i mniejszy gap */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                                {groupPlayers.map((player) => (
                                    <div
                                        key={player._id}
                                        className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-white/5 bg-[#121212] hover:border-club-green/40 hover:shadow-[0_0_15px_rgba(23,65,53,0.2)] transition-all duration-300"
                                    >
                                        {/* ZDJĘCIE */}
                                        <div className="absolute inset-0 z-0 bg-neutral-900">
                                            {player.imageUrl ? (
                                                <Image
                                                    src={player.imageUrl}
                                                    alt={`${player.name} ${player.surname}`}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-all duration-500"
                                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-white/10">
                                                    <Users size={40} />
                                                </div>
                                            )}
                                        </div>

                                        {/* POZYCJA (Badge mniejszy i dopasowany) */}
                                        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
                                            <span className="px-2 py-0.5 md:px-2.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                                                {player.position}
                                            </span>
                                        </div>

                                        {/* PASEK DOLNY */}
                                        <div className="absolute bottom-0 left-0 w-full z-20">
                                            <div className="absolute inset-0 bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] backdrop-blur-md border-t border-white/10" />

                                            {/* Zmniejszony padding na mobile (p-2 vs p-3) */}
                                            <div className="relative p-2 md:p-3 flex items-center justify-between">
                                                <div className="flex flex-col">
                                                    {/* Nazwisko - mniejsza czcionka na mobile */}
                                                    <h3 className="text-sm md:text-base font-bold text-white uppercase font-montserrat leading-none group-hover:text-gray-300 transition-all duration-300 group-hover:translate-x-1 truncate max-w-[80px] sm:max-w-none">
                                                        {player.surname}
                                                    </h3>
                                                    {/* Imię */}
                                                    <p className="text-[9px] md:text-[10px] font-medium text-gray-200 uppercase tracking-wide mt-0.5 transition-all duration-300 group-hover:translate-x-1 truncate">
                                                        {player.name}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-center">
                                                    {/* Numer - mniejsza czcionka na mobile */}
                                                    <span className="text-xl md:text-2xl font-black text-white/30 font-montserrat group-hover:text-white transition-colors duration-300">
                                                        {player.number}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}