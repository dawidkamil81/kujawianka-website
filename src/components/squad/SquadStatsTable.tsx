"use client";

import { useState } from "react";
import Image from "next/image";
import { Player } from "@/types/index";
// Importujemy konkretne strzałki
import { ArrowUp, ArrowDown, ArrowUpDown, User } from "lucide-react";

interface SquadStatsTableProps {
    players: Player[];
}

type SortField = 'name' | 'matches' | 'goals' | 'assists' | 'cleanSheets' | 'yellowCards';

export default function SquadStatsTable({ players }: SquadStatsTableProps) {
    const [sortField, setSortField] = useState<SortField>('goals');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const activePlayers = players.filter(p => p.position !== "Sztab");

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const sortedPlayers = [...activePlayers].sort((a, b) => {
        const statsA = a.stats || { matches: 0, goals: 0, assists: 0, cleanSheets: 0, yellowCards: 0 };
        const statsB = b.stats || { matches: 0, goals: 0, assists: 0, cleanSheets: 0, yellowCards: 0 };

        let valA: any = statsA[sortField as keyof typeof statsA];
        let valB: any = statsB[sortField as keyof typeof statsB];

        if (sortField === 'name') {
            valA = a.surname;
            valB = b.surname;
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const getRankStyle = (index: number) => {
        if (index === 0) return "text-yellow-500 font-bold scale-110";
        if (index === 1) return "text-gray-300 font-bold scale-105";
        if (index === 2) return "text-amber-700 font-bold";
        return "text-gray-600 font-medium";
    };

    // Komponent pomocniczy nagłówka
    const Th = ({ field, label, mobileHidden, alignRight }: { field: SortField, label: string, mobileHidden?: boolean, alignRight?: boolean }) => {
        // Logika wyboru ikony
        const isActive = sortField === field;
        const Icon = isActive
            ? (sortDirection === 'asc' ? ArrowUp : ArrowDown)
            : ArrowUpDown;

        return (
            <th
                className={`
                    px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest cursor-pointer group transition-colors hover:text-white 
                    ${mobileHidden ? 'hidden md:table-cell' : ''} 
                    ${alignRight ? 'text-right' : 'text-left'}
                    ${isActive ? 'text-white' : ''}
                `}
                onClick={() => handleSort(field)}
            >
                <div className={`flex items-center gap-2 ${alignRight ? 'justify-end' : 'justify-start'}`}>
                    {label}
                    <Icon
                        size={12}
                        className={`transition-all duration-300 ${isActive ? 'opacity-100 text-club-green' : 'opacity-20 group-hover:opacity-60'}`}
                    />
                </div>
            </th>
        );
    };

    return (
        <div className="w-full mt-24 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-white/10 pb-4 gap-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-2xl md:text-3xl font-black text-white font-montserrat uppercase tracking-tight">
                        Statystyki <span className="text-emerald-500">Drużyny</span>
                    </h3>
                </div>

            </div>

            <div className="bg-[#121212] rounded-xl border border-white/5 overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse">
                        <thead className="bg-white/[0.02] border-b border-white/5">
                            <tr>
                                <th className="px-4 py-4 text-center text-xs font-bold text-gray-500 uppercase w-16">Poz.</th>
                                <Th field="name" label="Zawodnik" />
                                <Th field="matches" label="Mecze" alignRight />
                                <Th field="goals" label="Bramki" alignRight />
                                <Th field="assists" label="Asysty" alignRight />
                                <Th field="cleanSheets" label="Czyste konta" mobileHidden alignRight />
                                <Th field="yellowCards" label="Kartki" mobileHidden alignRight />
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5">
                            {sortedPlayers.map((player, index) => {
                                const stats = player.stats || { matches: 0, goals: 0, assists: 0, cleanSheets: 0, yellowCards: 0, redCards: 0 };

                                return (
                                    <tr
                                        key={player._id}
                                        className="group hover:bg-white/[0.02] transition-colors duration-200"
                                    >
                                        <td className={`px-4 py-4 text-center font-mono text-sm ${getRankStyle(index)}`}>
                                            {index + 1}.
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-4">
                                                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-white/10 bg-neutral-900 hidden sm:block">
                                                    {player.imageUrl ? (
                                                        <Image src={player.imageUrl} alt={player.surname} fill className="object-cover" />
                                                    ) : (
                                                        <User className="text-gray-600 w-full h-full p-2" />
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-sm text-gray-200 block group-hover:text-white transition-colors">
                                                        {player.surname} {player.name}
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">
                                                        {player.position}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3 text-sm text-gray-400 font-mono text-right">
                                            {stats.matches}
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <span className={`font-mono text-sm font-bold ${stats.goals > 0 ? 'text-club-green' : 'text-gray-600'}`}>
                                                {stats.goals}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-sm text-gray-400 font-mono text-right">
                                            {stats.assists > 0 ? stats.assists : '-'}
                                        </td>

                                        <td className="px-4 py-3 text-sm text-gray-400 font-mono hidden md:table-cell text-right">
                                            {player.position === 'Bramkarz' && stats.cleanSheets ? (
                                                <span className="text-blue-400">{stats.cleanSheets}</span>
                                            ) : (
                                                '-'
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-sm font-mono hidden md:table-cell text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {stats.yellowCards > 0 && (
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-yellow-500 font-bold">{stats.yellowCards}</span>
                                                        <div className="w-2 h-3 bg-yellow-500 rounded-[1px]" />
                                                    </div>
                                                )}
                                                {stats.redCards > 0 && (
                                                    <div className="flex items-center gap-1 ml-1">
                                                        <span className="text-red-500 font-bold">{stats.redCards}</span>
                                                        <div className="w-2 h-3 bg-red-500 rounded-[1px]" />
                                                    </div>
                                                )}
                                                {stats.yellowCards === 0 && stats.redCards === 0 && (
                                                    <span className="text-gray-700">-</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}