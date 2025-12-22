"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Sponsor } from "@/types/index";

export default function SponsorsPage({ sponsors }: { sponsors: Sponsor[] }) {

    // Filtrowanie danych
    const sponsorsMain = sponsors.filter((s) => s.tier === "main");
    const sponsorsStrategic = sponsors.filter((s) => s.tier === "strategic");
    const sponsorsTech = sponsors.filter((s) => s.tier === "technical");

    // Ustawiamy pierwszego głównego sponsora jako aktywnego
    const [activeSponsor, setActiveSponsor] = useState(
        sponsorsMain.length > 0 ? sponsorsMain[0] : null
    );

    // Statystyki
    const stats = [
        { value: `${sponsors.length}`, label: "Partnerów" },
        { value: "1200+", label: "Kibiców" },
        { value: "25k+", label: "Zasięgi" },
        { value: "1949", label: "Rok założenia" },
    ];

    return (
        // .sponsors-page
        <main className="overflow-x-hidden min-h-screen bg-gradient-to-b from-[#121915]/0 to-[#174135]/15 text-[var(--text-main)]">

            {/* === WPROWADZENIE (HERO) === */}
            {/* .sponsors-hero */}
            <section className="text-center pt-24 pb-16 px-6 bg-[radial-gradient(circle_at_top,rgba(23,65,53,0.3),transparent_70%)]">
                <div className="mx-auto max-w-[800px]">
                    <motion.h1
                        className="text-[2.5rem] font-extrabold text-[#174135] uppercase leading-tight"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Nasi Partnerzy
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-[1.1rem] text-[#a0a0a0] leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Dziękujemy wszystkim firmom i instytucjom, które wspierają rozwój
                        Kujawianki Izbica Kujawska. To dzięki Wam możemy walczyć o najwyższe cele!
                    </motion.p>
                </div>
            </section>

            {/* === SPONSORZY GŁÓWNI (INTERAKTYWNA SEKCJA) === */}
            {sponsorsMain.length > 0 && (
                <section className="py-16 px-4 md:px-8">
                    <div className="mx-auto max-w-[1200px]">
                        <h2 className="text-center text-[2rem] font-bold text-white uppercase mb-12 tracking-wide">
                            Sponsorzy Główni
                        </h2>

                        {/* .sponsors-main-section */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">

                            {/* LEWA KOLUMNA: LISTA LOGO */}
                            {/* .main-logo-list */}
                            <div className="flex flex-row flex-wrap lg:flex-col justify-center gap-4">
                                {sponsorsMain.map((sponsor) => (
                                    <motion.div
                                        key={sponsor._id}
                                        onClick={() => setActiveSponsor(sponsor)}
                                        // .logo-item
                                        className={`cursor-pointer transition-all duration-300 p-6 rounded-xl border flex items-center justify-center bg-white/5 
                                            ${activeSponsor?._id === sponsor._id
                                                ? "grayscale-0 opacity-100 border-white/20 shadow-[0_0_20px_rgba(23,65,53,0.4)] bg-white/10 scale-105"
                                                : "grayscale opacity-50 border-transparent hover:opacity-80 hover:bg-white/10"
                                            }`}
                                        whileHover={{ x: 5 }}
                                    >
                                        <img
                                            src={sponsor.logoUrl}
                                            alt={sponsor.name}
                                            className="max-h-[60px] md:max-h-[80px] w-auto object-contain"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* PRAWA KOLUMNA: KARTA INFO (STICKY) */}
                            <div className="relative min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    {activeSponsor && (
                                        <motion.div
                                            key={activeSponsor._id}
                                            // .sponsor-info
                                            className="lg:sticky lg:top-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col gap-6"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <div className="border-b border-white/10 pb-6 mb-2">
                                                <h3 className="text-[2rem] font-bold text-white mb-2">
                                                    {activeSponsor.name}
                                                </h3>
                                                <span className="text-[#174135] font-bold uppercase tracking-wider text-sm bg-[#174135]/10 px-3 py-1 rounded-full">
                                                    Sponsor Główny
                                                </span>
                                            </div>

                                            <p className="text-[#d0d0d0] leading-[1.8] text-lg">
                                                {activeSponsor.description || "Dumny partner naszego klubu, wspierający rozwój sportu w regionie."}
                                            </p>

                                            <div className="mt-auto pt-6 flex flex-wrap gap-4">
                                                {activeSponsor.website && (
                                                    <a
                                                        href={activeSponsor.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center px-6 py-3 bg-[#174135] text-white font-semibold rounded-lg transition-all duration-300 hover:bg-[#13352b] hover:-translate-y-1 shadow-lg hover:shadow-[#174135]/40"
                                                    >
                                                        Odwiedź stronę &rarr;
                                                    </a>
                                                )}
                                            </div>

                                            {/* Tło loga w tle karty (ozdobne) */}
                                            <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] rotate-[-15deg] pointer-events-none">
                                                <img
                                                    src={activeSponsor.logoUrl}
                                                    alt=""
                                                    className="w-[300px] h-auto grayscale"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* === SPONSORZY STRATEGICZNI === */}
            {sponsorsStrategic.length > 0 && (
                // .sponsors-grid-section
                <section className="py-20 px-4 border-t border-white/5 bg-black/20">
                    <div className="mx-auto max-w-[1200px]">
                        <h2 className="text-center text-[1.75rem] font-bold text-white uppercase mb-12 tracking-wide opacity-90">
                            Partnerzy Strategiczni
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {sponsorsStrategic.map((sponsor, i) => (
                                <motion.div
                                    key={sponsor._id}
                                    className="bg-white/5 rounded-xl p-6 flex items-center justify-center h-[140px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:bg-white/10 transition-all duration-300 group"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 0.6, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <a href={sponsor.website || "#"} target={sponsor.website ? "_blank" : "_self"} className="w-full h-full flex items-center justify-center">
                                        <img
                                            src={sponsor.logoUrl}
                                            alt={sponsor.name}
                                            className="max-h-[70%] max-w-[80%] object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* === PARTNERZY TECHNICZNI I INNI === */}
            {sponsorsTech.length > 0 && (
                <section className="py-20 px-4 border-t border-white/5">
                    <div className="mx-auto max-w-[1000px]">
                        <h2 className="text-center text-[1.5rem] font-bold text-gray-400 uppercase mb-10 tracking-wide">
                            Partnerzy Techniczni i Wspierający
                        </h2>

                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
                            {sponsorsTech.map((sponsor) => (
                                <div key={sponsor._id} className="w-[120px] md:w-[150px] h-[80px] flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                    <img
                                        src={sponsor.logoUrl}
                                        alt={sponsor.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* === STATYSTYKI === */}
            {/* .sponsors-stats */}
            <section className="py-20 border-y border-white/5 bg-[#0e0e0e]">
                <div className="mx-auto max-w-[1200px] text-center">
                    <h2 className="text-[1.5rem] font-bold text-white uppercase mb-12 tracking-wide">
                        Kujawianka w liczbach
                    </h2>

                    <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                        {stats.map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center gap-2"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {/* .stat-line-value */}
                                <span className="text-4xl md:text-5xl font-black text-[#174135]">
                                    {item.value}
                                </span>
                                {/* .stat-line-label */}
                                <span className="text-sm uppercase tracking-widest text-gray-500 font-semibold">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === CTA === */}
            {/* .sponsors-cta */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                {/* .cta-bg */}
                <div className="absolute inset-0 z-0">
                    <img src="/hero.jpg" alt="Drużyna" className="w-full h-full object-cover" />
                    {/* .cta-overlay */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
                </div>

                {/* .cta-content */}
                <div className="relative z-10 text-center px-4">
                    <h2 className="text-[2.5rem] md:text-[3.5rem] font-extrabold text-white uppercase mb-8 drop-shadow-lg">
                        Zostań Sponsorem
                    </h2>
                    <Link
                        href="/biznes/oferta"
                        // .cta-button
                        className="inline-block bg-[#174135] text-white text-[1.1rem] font-bold py-4 px-10 rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-[#13352b] hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(23,65,53,0.7)]"
                    >
                        Sprawdź ofertę
                    </Link>
                </div>
            </section>
        </main>
    );
}