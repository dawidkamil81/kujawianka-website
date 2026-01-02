"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Player } from "@/types/index";
import PlayerCard from "@/components/common/PlayerCard"; // Upewnij się, że ścieżka jest poprawna

export default function PlayersTeaser({ players }: { players: Player[] }) {
    return (
        <section className="relative w-full py-16 bg-[#0e0e0e] border-t border-white/5 overflow-hidden">
            {/* Tło gradientowe (Glow) */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-club-green/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* --- NAGŁÓWEK --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl md:text-4xl font-black text-white font-montserrat uppercase tracking-tight">
                            Kadra <span className="text-emerald-500">Kujawianki</span>
                        </h2>
                    </div>

                    <Link
                        href="/druzyny/seniorzy"
                        className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        Zobacz pełną kadrę
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-club-green" />
                    </Link>
                </div>

                {/* --- GRID ZAWODNIKÓW --- */}
                {/* Zachowano responsywny grid z oryginału */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    {players && players.length > 0 ? (
                        players.map((player, i) => (
                            <motion.div
                                key={player._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            // motion.div jest teraz tylko wrapperem animacji,
                            // stylizację samej karty przejmuje PlayerCard
                            >
                                <PlayerCard player={player} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-gray-500 bg-[#121212] rounded-2xl border border-white/5">
                            Trwa ładowanie kadry zawodników...
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}