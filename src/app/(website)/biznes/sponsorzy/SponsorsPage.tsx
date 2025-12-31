"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sponsor } from "@/types/index";
import { Handshake, TrendingUp, Users, Calendar, ExternalLink, Globe } from "lucide-react";

export default function SponsorsPage({ sponsors }: { sponsors: Sponsor[] }) {

    // Filtrowanie danych
    const sponsorsMain = sponsors.filter((s) => s.tier === "main");
    const sponsorsStrategic = sponsors.filter((s) => s.tier === "strategic");
    const sponsorsTech = sponsors.filter((s) => s.tier === "technical");
    const sponsorsPartners = sponsors.filter((s) => s.tier === "partner" || !s.tier);

    // Ustawiamy pierwszego głównego sponsora jako aktywnego
    const [activeSponsor, setActiveSponsor] = useState(
        sponsorsMain.length > 0 ? sponsorsMain[0] : null
    );

    // Statystyki
    const stats = [
        { value: `${sponsors.length}`, label: "Partnerów", icon: <Handshake className="text-emerald-500" size={24} /> },
        { value: "1200+", label: "Kibiców", icon: <Users className="text-emerald-500" size={24} /> },
        { value: "25k+", label: "Zasięgi", icon: <TrendingUp className="text-emerald-500" size={24} /> },
        { value: "1949", label: "Rok założenia", icon: <Calendar className="text-emerald-500" size={24} /> },
    ];

    return (
        <div className="flex flex-col gap-24">

            {/* === STATYSTYKI === */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#121212] border border-white/10 hover:border-club-green/30 transition-all duration-300 group"
                    >
                        <div className="mb-3 p-3 bg-white/5 rounded-full group-hover:bg-club-green/10 transition-colors">
                            {stat.icon}
                        </div>
                        <span className="text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight mb-1">
                            {stat.value}
                        </span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </section>

            {/* === SPONSORZY GŁÓWNI (UKŁAD DZIELONY) === */}
            {sponsorsMain.length > 0 && (
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-2xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-emerald-500">
                            Główni Partnerzy
                        </h3>
                        <div className="h-[1px] flex-grow bg-white/10"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">

                        {/* LEWA KOLUMNA: Lista logotypów do wyboru */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                            {sponsorsMain.map((sponsor) => (
                                <motion.div
                                    key={sponsor._id}
                                    onClick={() => setActiveSponsor(sponsor)}
                                    className={`cursor-pointer relative aspect-video rounded-xl border flex items-center justify-center p-4 transition-all duration-300
                                        ${activeSponsor?._id === sponsor._id
                                            ? "bg-white/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                                            : "bg-[#121212] border-white/10 hover:border-white/30 hover:bg-white/5"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {sponsor.logoUrl ? (
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={sponsor.logoUrl}
                                                alt={sponsor.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <span className="text-sm font-bold text-white">{sponsor.name}</span>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* PRAWA KOLUMNA: Karta informacyjna (Sticky) */}
                        <div className="lg:sticky lg:top-24">
                            <AnimatePresence mode="wait">
                                {activeSponsor && (
                                    <motion.div
                                        key={activeSponsor._id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative bg-[#121212] border border-white/10 rounded-3xl p-8 md:p-10 overflow-hidden shadow-2xl min-h-[400px] flex flex-col"
                                    >
                                        {/* Tło Gradientowe */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 to-transparent pointer-events-none" />

                                        {/* Header Karty */}
                                        <div className="relative z-10 flex flex-col gap-4 mb-6 border-b border-white/10 pb-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="inline-block text-emerald-500 font-bold uppercase tracking-widest text-xs mb-2 bg-emerald-500/10 px-3 py-1 rounded-full">
                                                        Sponsor Główny
                                                    </span>
                                                    <h2 className="text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight">
                                                        {activeSponsor.name}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Treść */}
                                        <div className="relative z-10 flex-grow">
                                            <p className="text-gray-300 text-lg leading-relaxed">
                                                {activeSponsor.description || "Dumny partner Kujawianki Izbica Kujawska. Wspieramy rozwój lokalnego sportu i promujemy zdrowy tryb życia wśród młodzieży."}
                                            </p>
                                        </div>

                                        {/* Footer Karty (Przycisk) */}
                                        <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                            {activeSponsor.website && (
                                                <a
                                                    href={activeSponsor.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-sm hover:text-emerald-400 transition-colors group"
                                                >
                                                    Odwiedź stronę
                                                    <ExternalLink size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                                </a>
                                            )}

                                            {/* Ozdobna ikona globu jeśli brak www */}
                                            {!activeSponsor.website && (
                                                <div className="text-gray-600 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                                                    <Globe size={16} /> Partner Lokalny
                                                </div>
                                            )}
                                        </div>

                                        {/* PRZEKRZYWIONE LOGO W TLE (Prawy dolny róg) */}
                                        {activeSponsor.logoUrl && (
                                            <div className="absolute -bottom-10 -right-10 w-[350px] h-[350px] opacity-5 rotate-[-15deg] pointer-events-none">
                                                <Image
                                                    src={activeSponsor.logoUrl}
                                                    alt=""
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </section>
            )}

            {/* === SPONSORZY STRATEGICZNI (BEZ SZAROŚCI) === */}
            {sponsorsStrategic.length > 0 && (
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-white/30">
                            Partnerzy Strategiczni
                        </h3>
                        <div className="h-[1px] flex-grow bg-white/10"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sponsorsStrategic.map((sponsor) => (
                            <motion.div
                                key={sponsor._id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="group aspect-[3/2] bg-[#121212] border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center p-8 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300"
                            >
                                {sponsor.logoUrl ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={sponsor.logoUrl}
                                            alt={sponsor.name}
                                            fill
                                            // Usunięto grayscale
                                            className="object-contain transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-lg font-bold text-gray-300">{sponsor.name}</span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* === POZOSTALI PARTNERZY (BEZ SZAROŚCI) === */}
            {(sponsorsTech.length > 0 || sponsorsPartners.length > 0) && (
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-lg font-bold text-gray-400 uppercase font-montserrat tracking-widest pl-4 border-l-4 border-white/10">
                            Partnerzy i Wsparcie
                        </h3>
                        <div className="h-[1px] flex-grow bg-white/10"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...sponsorsTech, ...sponsorsPartners].map((sponsor) => (
                            <div
                                key={sponsor._id}
                                className="bg-white/5 hover:bg-white/10 rounded-xl aspect-square flex items-center justify-center p-6 transition-colors group border border-white/5"
                            >
                                {sponsor.logoUrl ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={sponsor.logoUrl}
                                            alt={sponsor.name}
                                            fill
                                            // Usunięto filtry (opacity/grayscale), teraz jest pełny kolor od razu
                                            className="object-contain transition-all duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-xs font-bold text-gray-500 text-center">{sponsor.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* === CTA / ZOSTAŃ SPONSOREM === */}
            <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121212] flex flex-col items-center justify-center py-20 px-6 text-center">
                {/* Tło CTA */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(23,65,53,0.3),transparent_70%)] pointer-events-none" />

                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase font-montserrat mb-6">
                        Dołącz do <span className="text-emerald-500">Rodziny</span> Kujawianki
                    </h2>
                    <p className="text-gray-400 mb-10 text-lg">
                        Budujmy razem silną markę i wspierajmy lokalny sport. Sprawdź naszą ofertę sponsorską.
                    </p>
                    <Link
                        href="/biznes/oferta"
                        className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                        Zobacz Ofertę
                    </Link>
                </div>
            </section>

        </div>
    );
}