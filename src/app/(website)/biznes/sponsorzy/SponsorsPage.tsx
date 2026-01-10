"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sponsor } from "@/types/index";
import { Handshake, TrendingUp, Users, Calendar, ExternalLink, Globe } from "lucide-react";
import ContactSection from "@/components/common/ContactSection";

// Helper type do grupowania
type GroupedSponsors = {
    tierName: string;
    rank: number;
    sponsors: Sponsor[];
};

export default function SponsorsPage({ sponsors }: { sponsors: Sponsor[] }) {

    // 1. Grupowanie sponsorów według rangi (tier)
    // Tworzymy mapę, gdzie kluczem jest nazwa rangi
    const groupsMap = sponsors.reduce((acc, sponsor) => {
        const tierName = sponsor.tier?.name || "Pozostali";
        const tierRank = sponsor.tier?.rank || 99;

        if (!acc[tierName]) {
            acc[tierName] = {
                tierName,
                rank: tierRank,
                sponsors: []
            };
        }
        acc[tierName].sponsors.push(sponsor);
        return acc;
    }, {} as Record<string, GroupedSponsors>);

    // Zamieniamy mapę na tablicę i sortujemy po randze (rank)
    const sortedGroups = Object.values(groupsMap).sort((a, b) => a.rank - b.rank);

    // Wyciągamy grupy specyficzne dla layoutów
    // Rank 1 -> Layout "Główny"
    const mainGroup = sortedGroups.find(g => g.rank === 1);

    // Rank 2 -> Layout "Strategiczny"
    const strategicGroup = sortedGroups.find(g => g.rank === 2);

    // Rank > 2 -> Layout "Partnerzy" (lista pozostałych grup)
    const otherGroups = sortedGroups.filter(g => g.rank > 2);


    // 2. Logika stanu dla Sponsora Głównego (Rank 1)
    const [activeSponsor, setActiveSponsor] = useState<Sponsor | null>(null);

    // Ustawiamy domyślnego aktywnego sponsora, jeśli istnieje grupa główna
    useEffect(() => {
        if (mainGroup && mainGroup.sponsors.length > 0 && !activeSponsor) {
            setActiveSponsor(mainGroup.sponsors[0]);
        }
    }, [mainGroup, activeSponsor]);


    // Statystyki (Statyczne, jak w oryginale)
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

            {/* === SPONSORZY GŁÓWNI (RANK 1) === */}
            {mainGroup && mainGroup.sponsors.length > 0 && (
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-2xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-emerald-500">
                            {mainGroup.tierName}
                        </h3>
                        <div className="h-[1px] flex-grow bg-white/10"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">

                        {/* LEWA KOLUMNA: Lista logotypów */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                            {mainGroup.sponsors.map((sponsor) => (
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

                        {/* PRAWA KOLUMNA: Karta informacyjna */}
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

                                        {/* Zdjęcie w tle (jeśli jest w CMS) */}
                                        {activeSponsor.backgroundImageUrl && (
                                            <div className="absolute inset-0 z-0">
                                                <Image
                                                    src={activeSponsor.backgroundImageUrl}
                                                    alt="bg"
                                                    fill
                                                    className="object-cover opacity-10 mix-blend-overlay"
                                                />
                                            </div>
                                        )}

                                        {/* Header Karty */}
                                        <div className="relative z-10 flex flex-col gap-4 mb-6 border-b border-white/10 pb-6">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="inline-block text-emerald-500 font-bold uppercase tracking-widest text-xs mb-2 bg-emerald-500/10 px-3 py-1 rounded-full">
                                                        {activeSponsor.tier.name}
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
                                                {activeSponsor.description || `Dumny ${activeSponsor.tier.name.toLowerCase()} Kujawianki Izbica Kujawska. Wspieramy rozwój lokalnego sportu.`}
                                            </p>
                                        </div>

                                        {/* Footer Karty */}
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

                                            {!activeSponsor.website && (
                                                <div className="text-gray-600 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                                                    <Globe size={16} /> Partner Lokalny
                                                </div>
                                            )}
                                        </div>

                                        {/* PRZEKRZYWIONE LOGO W TLE */}
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

            {/* === SPONSORZY STRATEGICZNI (RANK 2) === */}
            {strategicGroup && strategicGroup.sponsors.length > 0 && (
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-white/30">
                            {strategicGroup.tierName}
                        </h3>
                        <div className="h-[1px] flex-grow bg-white/10"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {strategicGroup.sponsors.map((sponsor) => (
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

            {/* === POZOSTAŁE GRUPY (RANK > 2) === */}
            {/* Iterujemy po każdej grupie osobno, zachowując nagłówek */}
            {otherGroups.map((group) => (
                <section key={group.tierName}>
                    <div className="flex items-center gap-4 mb-10">
                        <h3 className="text-lg font-bold text-gray-400 uppercase font-montserrat tracking-widest pl-4 border-l-4 border-white/10">
                            {group.tierName}
                        </h3>
                        <div className="h-[1px] flex-grow bg-white/10"></div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {group.sponsors.map((sponsor) => (
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
            ))}

            {/* === CTA / ZOSTAŃ SPONSOREM === */}
            <ContactSection
                title="Dołącz do Rodziny Kujawianki"
                description="Budujmy razem silną markę i wspierajmy lokalny sport. Sprawdź naszą ofertę sponsorską."
            />

        </div>
    );
}