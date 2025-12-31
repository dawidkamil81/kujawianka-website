"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Player } from "@/types/index";
import { cn } from "@/lib/utils";

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
                {/* ZMIANA: grid-cols-2 na mobile, mniejszy gap na mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                    {players && players.length > 0 ? (
                        players.map((player, i) => (
                            <motion.div
                                key={player._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-[#121212] hover:border-club-green/40 hover:shadow-[0_0_20px_rgba(23,65,53,0.2)] transition-all duration-300"
                            >
                                {/* ZDJĘCIE (Kolorowe) */}
                                <div className="absolute inset-0 z-0 bg-neutral-900">
                                    {player.imageUrl ? (
                                        <Image
                                            src={player.imageUrl}
                                            alt={`${player.name} ${player.surname}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-all duration-500"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/10">
                                            <Users size={48} />
                                        </div>
                                    )}
                                </div>

                                {/* POZYCJA (Badge na górze) - ZMIANA: mniejszy padding i pozycja na mobile */}
                                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                                    <span className="px-2 py-0.5 md:px-3 md:py-1 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                                        {player.position}
                                    </span>
                                </div>

                                {/* PASEK Z GRADIENTEM NA DOLE (KLUBOWY) */}
                                <div className="absolute bottom-0 left-0 w-full z-20">
                                    {/* Tło paska: Gradient klubowy */}
                                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] backdrop-blur-md border-t border-white/10" />

                                    {/* Zawartość paska - ZMIANA: mniejszy padding na mobile */}
                                    <div className="relative p-3 md:p-4 flex items-center justify-between">

                                        {/* Imię i Nazwisko */}
                                        <div className="flex flex-col">
                                            {/* ZMIANA: mniejsze czcionki na mobile */}
                                            <h3 className="text-sm md:text-lg font-bold text-white uppercase font-montserrat leading-none group-hover:text-gray-300 transition-all duration-300 group-hover:translate-x-1 md:group-hover:translate-x-2 truncate max-w-[80px] sm:max-w-none">
                                                {player.surname}
                                            </h3>
                                            <p className="text-[10px] md:text-xs font-medium text-gray-200 uppercase tracking-wide mt-0.5 md:mt-1 transition-all duration-300 group-hover:translate-x-1 md:group-hover:translate-x-2 truncate">
                                                {player.name}
                                            </p>
                                        </div>

                                        {/* Numer - ZMIANA: mniejszy rozmiar na mobile */}
                                        <div className="flex items-center justify-center pl-2">
                                            <span className="text-xl md:text-3xl font-black text-white/30 font-montserrat group-hover:text-white transition-colors duration-300">
                                                {player.number}
                                            </span>
                                        </div>
                                    </div>
                                </div>
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