"use client";

import { useState } from "react";
import { Player } from "@/types";
import PlayerCard from "@/components/common/PlayerCard";
import SquadStatsTable from "@/components/squad/SquadStatsTable";
import { Users, BarChart3 } from "lucide-react";

interface SquadTabsViewProps {
    players: Player[];
}

// Helper do grupowania (bez zmian)
function groupPlayersByPosition(players: Player[]) {
    return {
        "Bramkarze": players.filter((p) => p.position === "Bramkarz"),
        "Obrońcy": players.filter((p) => p.position === "Obrońca"),
        "Pomocnicy": players.filter((p) => p.position === "Pomocnik"),
        "Napastnicy": players.filter((p) => p.position === "Napastnik"),
        "Sztab": players.filter((p) => p.position === "Sztab"),
    };
}

export default function SquadTabsView({ players }: SquadTabsViewProps) {
    const [activeTab, setActiveTab] = useState<'squad' | 'stats'>('squad');

    const squadGroups = groupPlayersByPosition(players);
    const sectionsOrder = ["Bramkarze", "Obrońcy", "Pomocnicy", "Napastnicy", "Sztab"];

    // Zmieniony styl przycisków (mniejsze, oddzielne)
    const getTabButtonClass = (tabName: 'squad' | 'stats') => `
         flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border
        ${activeTab === tabName
            ? "cursor-pointer bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20 transform scale-105"
            : "cursor-pointer bg-[#121212] text-gray-400 border-white/10 hover:border-emerald-500/50 hover:text-white"}
    `;

    return (
        <div className="w-full">

            {/* --- PRZEŁĄCZNIK ZAKŁADEK (TABS) --- */}
            {/* Usunięto wrapper z tłem, dodano gap-4 */}
            <div className="flex justify-center gap-4 mb-12">
                <button
                    onClick={() => setActiveTab('squad')}
                    className={getTabButtonClass('squad')}
                >
                    <Users size={16} />
                    Kadra
                </button>
                <button
                    onClick={() => setActiveTab('stats')}
                    className={getTabButtonClass('stats')}
                >
                    <BarChart3 size={16} />
                    Statystyki
                </button>
            </div>

            {/* --- TREŚĆ ZAKŁADKI --- */}
            <div className="min-h-[400px]">

                {/* WIDOK KADRY (KARTY) */}
                {activeTab === 'squad' && (
                    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {sectionsOrder.map((sectionName) => {
                            const groupPlayers = squadGroups[sectionName as keyof typeof squadGroups];
                            if (!groupPlayers || groupPlayers.length === 0) return null;

                            return (
                                <section key={sectionName}>
                                    {/* Nagłówek Sekcji */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <h3 className="text-xl md:text-2xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-emerald-500">
                                            {sectionName}
                                        </h3>
                                        <div className="h-[1px] flex-grow bg-white/10"></div>
                                    </div>

                                    {/* Grid Kart */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                                        {groupPlayers.map((player) => (
                                            <PlayerCard key={player._id} player={player} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}

                {/* WIDOK STATYSTYK (TABELA) */}
                {activeTab === 'stats' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {players.some(p => p.position !== "Sztab") ? (
                            <SquadStatsTable players={players} />
                        ) : (
                            <div className="text-center py-20 text-gray-500 border border-white/5 rounded-xl bg-[#121212]">
                                Brak danych statystycznych dla tej grupy.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}