"use client";

import Image from "next/image";
import { useState } from "react";
import { Users, RotateCw } from "lucide-react";
import { Player } from "@/types";

interface PlayerCardProps {
    player: Player;
}

// Komponent pomocniczy do wiersza statystyk na tyle karty
const StatRow = ({ label, value }: { label: string; value: number }) => (
    <div className="flex justify-between items-center w-full py-1.5 border-b border-white/5 last:border-0">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-bold text-white font-mono">{value}</span>
    </div>
);

export default function PlayerCard({ player }: PlayerCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const isStaff = player.position === "Sztab";
    const displayPosition = isStaff && player.staffRole ? player.staffRole : player.position;

    // Zabezpieczenie przed brakiem statystyk
    const stats = player.stats || { matches: 0, goals: 0, assists: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 };

    const canFlip = !isStaff;

    return (
        <div
            // 1. GŁÓWNY KONTENER
            className={`group relative aspect-[3/4] w-full [perspective:1000px] ${canFlip ? 'cursor-pointer' : ''}`}
            onClick={() => canFlip && setIsFlipped(!isFlipped)}
        >
            {/* 2. KONTENER OBROTOWY */}
            <div
                className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            >
                {/* === PRZÓD KARTY === */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
                    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/5 bg-[#121212] 
                    group-hover:border-club-green/40 group-hover:shadow-[0_0_15px_rgba(23,65,53,0.2)] 
                    transition-all duration-300">

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

                        {/* POZYCJA (Badge) */}
                        <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
                            <span className="px-2 py-0.5 md:px-2.5 text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-white bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                                {displayPosition}
                            </span>
                        </div>

                        {/* IKONA OBRÓTU */}
                        {canFlip && (
                            <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-black/40 p-1.5 rounded-full backdrop-blur-md border border-white/10">
                                    <RotateCw size={14} className="text-white" />
                                </div>
                            </div>
                        )}

                        {/* PASEK DOLNY */}
                        <div className="absolute bottom-0 left-0 w-full z-20">
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] backdrop-blur-md border-t border-white/10" />

                            <div className="relative p-2 md:p-3 flex items-center justify-between">
                                <div className="flex flex-col overflow-hidden pr-2">
                                    {/* Nazwisko */}
                                    <h3 className="text-sm md:text-base font-bold text-white uppercase font-montserrat leading-none group-hover:text-gray-300 transition-all duration-300 group-hover:translate-x-1 truncate">
                                        {player.surname}
                                    </h3>
                                    {/* Imię */}
                                    <p className="text-[9px] md:text-[10px] font-medium text-gray-200 uppercase tracking-wide mt-0.5 transition-all duration-300 group-hover:translate-x-1 truncate">
                                        {player.name}
                                    </p>
                                </div>

                                <div className="flex items-center justify-center">
                                    {/* Numer */}
                                    {!isStaff && (
                                        <span className="text-xl md:text-2xl font-black text-white/30 font-montserrat group-hover:text-white transition-colors duration-300">
                                            {player.number}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === TYŁ KARTY (STATYSTYKI) === */}
                {/* ZMIANA: Dodano [transform:rotateY(180deg)], aby tył był odwrócony na starcie */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="relative h-full w-full overflow-hidden rounded-xl bg-[#141414] border border-club-green/40 shadow-2xl flex flex-col p-5">

                        {/* Nagłówek tyłu */}
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-white">{player.number}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs font-bold text-white leading-none mb-0.5">{player.name}</span>
                                <span className="block text-sm font-black text-club-green leading-none uppercase">{player.surname}</span>
                            </div>
                        </div>

                        {/* Lista Statystyk */}
                        <div className="flex-1 flex flex-col gap-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            <StatRow label="Mecze" value={stats.matches} />

                            {player.position === "Bramkarz" ? (
                                <StatRow label="Czyste konta" value={stats.cleanSheets || 0} />
                            ) : (
                                <>
                                    <StatRow label="Bramki" value={stats.goals} />
                                    <StatRow label="Asysty" value={stats.assists} />
                                </>
                            )}

                            {/* Kartki */}
                            <div className="mt-auto pt-3 flex items-center justify-center gap-6 border-t border-white/10">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-3 h-4 bg-yellow-500 rounded-sm shadow-sm" />
                                    <span className="text-xs font-mono font-bold">{stats.yellowCards}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-3 h-4 bg-red-600 rounded-sm shadow-sm" />
                                    <span className="text-xs font-mono font-bold">{stats.redCards}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}