"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Player } from "@/types/index";

// 1. Usuwamy import "./PlayersTeaser.css"; - style są teraz w klasach

export default function PlayersTeaser({ players }: { players: Player[] }) {
    return (
        // .players-section -> bg-gradient..., border-y...
        <section className="relative overflow-hidden py-16 px-4 md:px-8 border-y border-white/5 bg-gradient-to-b from-[#121915]/0 to-[#174135]/15 text-[var(--text-main)]">

            {/* .container */}
            <div className="mx-auto max-w-[1200px]">

                {/* .section-header */}
                <header className="flex items-center justify-between mb-8 border-b border-white/10 pb-3">
                    {/* .section-title */}
                    <h2 className="text-2xl md:text-[2rem] font-extrabold text-[var(--club-green)] uppercase tracking-wider">
                        Kadra Kujawianki
                    </h2>

                    {/* .section-link */}
                    <Link
                        href="/druzyny/seniorzy"
                        className="text-sm font-semibold text-[var(--club-red)] transition-all duration-200 hover:text-white hover:translate-x-1"
                    >
                        Zobacz kadrę &rarr;
                    </Link>
                </header>

                {/* .players-grid */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6">
                    {players && players.length > 0 ? (
                        players.map((player, i) => (
                            <motion.div
                                key={player._id}
                                // .player-card - Dodajemy 'group', aby dzieci mogły reagować na hover rodzica
                                className="group relative rounded-[1.25rem] border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden transition-all duration-350 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,128,0.15)]"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                {/* .player-image-wrapper */}
                                <div className="relative aspect-[3/3.5] overflow-hidden">
                                    {player.imageUrl ? (
                                        <img
                                            src={player.imageUrl}
                                            alt={`${player.name} ${player.surname}`}
                                            // .player-image - group-hover:scale-110 obsługuje zoom
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white text-4xl">
                                            ⚽
                                        </div>
                                    )}

                                    {/* .player-banner */}
                                    {/* Używamy arbitrary values dla skomplikowanego gradientu tła */}
                                    <div className="absolute bottom-0 left-0 right-0 flex items-end gap-2 px-3 py-2 
                    bg-[radial-gradient(600px_200px_at_10%_10%,rgba(255,255,255,0.06),transparent_20%),linear-gradient(135deg,rgba(23,65,53,0.95)_0%,rgba(141,16,16,0.9)_60%)]
                    transition-colors duration-300 group-hover:bg-black/85"
                                    >
                                        {/* .player-number */}
                                        <span className="text-[2.2rem] md:text-[2.8rem] font-black text-white leading-none">
                                            {player.number}
                                        </span>

                                        {/* .player-name-block */}
                                        <div className="flex flex-col leading-[1.1]">
                                            {/* .player-surname */}
                                            <span className="text-[1.05rem] md:text-[1.2rem] font-bold text-white uppercase tracking-[0.5px]">
                                                {player.surname}
                                            </span>
                                            {/* .player-name */}
                                            <span className="text-[0.75rem] md:text-[0.8rem] text-white/70 uppercase">
                                                {player.name}
                                            </span>
                                        </div>
                                    </div>

                                    {/* .player-overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent 
                    flex items-start justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    >
                                        {/* .overlay-position */}
                                        <span className="text-[0.8rem] text-white bg-white/10 px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                                            {player.position}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 w-full col-span-full">
                            Ładowanie zawodników...
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}