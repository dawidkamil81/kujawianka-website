import { client } from "@/sanity/lib/client";
import { ALL_PLAYERS_QUERY } from "@/sanity/lib/queries";
import { Player } from "@/types";

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
        // .squad-section
        <section className="min-h-screen py-16 px-4 md:px-8 border-y border-white/5 bg-[#0e0e0e] bg-gradient-to-b from-[#121915]/0 to-[#174135]/15 text-white">

            {/* .squad-container */}
            <div className="mx-auto max-w-[1200px]">

                {/* .squad-header */}
                <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-3">
                    {/* .squad-title */}
                    <h2 className="text-2xl md:text-[2rem] font-extrabold text-[#174135] uppercase tracking-widest">
                        Kadra Kujawianki
                    </h2>
                </header>

                {/* Mapujemy grupy (bramkarze, obrońcy...) */}
                {Object.entries(squad).map(([groupKey, groupPlayers]) => {
                    // Jeśli w danej grupie nie ma nikogo, nie wyświetlaj jej
                    if (groupPlayers.length === 0) return null;

                    return (
                        // .squad-group
                        <div key={groupKey} className="mt-12 first:mt-0">
                            {/* .squad-group-title */}
                            <h3 className="text-[1.5rem] font-bold text-[#174135] mb-6 uppercase border-l-4 border-[#8d1010] pl-3">
                                {groupKey.toUpperCase()}
                            </h3>

                            {/* .squad-grid */}
                            {/* Używamy grid-cols z minmax, aby idealnie odwzorować Twoje 230px */}
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] justify-center gap-6">
                                {groupPlayers.map((player) => (
                                    <div
                                        key={player._id}
                                        // .squad-card (group pozwala na sterowanie dziećmi przy hoverze)
                                        className="group relative w-full bg-white/5 rounded-[1.25rem] border border-white/10 overflow-hidden backdrop-blur-md transition-all duration-350 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,128,0.15)]"
                                    >
                                        {/* .squad-image-wrapper */}
                                        <div className="relative aspect-[3/3.5] overflow-hidden">
                                            {player.imageUrl ? (
                                                <img
                                                    src={player.imageUrl}
                                                    alt={`${player.name} ${player.surname}`}
                                                    // .squad-image
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-4xl">
                                                    ⚽
                                                </div>
                                            )}

                                            {/* .squad-banner */}
                                            <div className="absolute bottom-0 left-0 right-0 flex items-end gap-2.5 px-3 py-2 min-h-[45px]
                        bg-[linear-gradient(135deg,rgba(23,65,53,0.95)_0%,rgba(141,16,16,0.9)_60%)]"
                                            >
                                                {/* .squad-number */}
                                                <span className="text-[2.2rem] md:text-[2.2rem] font-extrabold text-white leading-none drop-shadow-md">
                                                    {player.number}
                                                </span>

                                                {/* .squad-name-block */}
                                                <div className="flex flex-col leading-[1.1]">
                                                    {/* .squad-surname */}
                                                    <span className="text-[1.05rem] font-bold text-white uppercase tracking-[0.5px]">
                                                        {player.surname}
                                                    </span>
                                                    {/* .squad-name */}
                                                    <span className="text-[0.75rem] text-white/80 uppercase tracking-[0.5px]">
                                                        {player.name}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* .squad-overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-start justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                {/* .squad-position */}
                                                <span className="text-[0.75rem] font-medium text-white bg-white/10 px-2.5 py-1 rounded-full uppercase backdrop-blur-sm border border-white/5">
                                                    {player.position}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}