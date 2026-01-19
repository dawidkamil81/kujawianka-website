"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Handshake } from "lucide-react";
import { Sponsor } from "@/types/index";

export default function SponsorsTeaser({ sponsors }: { sponsors: Sponsor[] }) {
    // 1. Zabezpieczenie danych
    const validSponsors = sponsors?.filter(s => s.logoUrl && s.logoUrl.trim() !== "") || [];

    // --- LOGIKA FILTROWANIA ---

    // A. Sponsorzy Główni (Tylko ranga 1)
    const mainSponsors = validSponsors.filter((s) => s.tier?.rank === 1);

    // B. Karuzela (Wszyscy, którzy mają rangę większą niż 1)
    const otherSponsors = validSponsors.filter((s) => (s.tier?.rank || 0) > 1);

    // Jeśli brak sponsorów, nie wyświetlamy sekcji
    if (validSponsors.length === 0) return null;

    // 2. LOGIKA NIESKOŃCZONEJ PĘTLI
    const multiplier = otherSponsors.length > 0 && otherSponsors.length < 6 ? 6 : 2;
    const carouselSponsors = otherSponsors.length > 0
        ? Array(multiplier).fill(otherSponsors).flat()
        : [];

    return (
        <section className="relative w-full py-16 bg-[#0e0e0e] border-t border-white/5 overflow-hidden">
            {/* Tło gradientowe */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-club-green/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* --- NAGŁÓWEK --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl md:text-4xl font-black text-white font-montserrat uppercase tracking-tight">
                            Nasi <span className="text-emerald-500">Sponsorzy</span>
                        </h2>
                    </div>

                    <Link
                        href="/biznes/sponsorzy"
                        className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                    >
                        Zostań sponsorem
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-club-green" />
                    </Link>
                </div>

                {/* --- 1. SPONSORZY GŁÓWNI (NOWY STYL: Bez kafelków, czyste loga) --- */}
                {mainSponsors.length > 0 && (
                    <div className="mb-20">
                        <div className="flex items-center justify-center gap-2 mb-10">
                            <Handshake size={20} className="text-club-green" />
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                Partnerzy Główni
                            </h3>
                        </div>

                        {/* ZMIANA: Zmniejszono gap z 20 na 10, aby zmieścić 4 elementy */}
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10">
                            {mainSponsors.map((sponsor) => (
                                <Link
                                    key={sponsor._id}
                                    href={sponsor.website || "#"}
                                    target={sponsor.website ? "_blank" : "_self"}
                                    // ZMIANA: Zmniejszono szerokość z w-64 na w-56, aby zmieściło się 4 w rzędzie
                                    className="relative group w-44 h-22 md:w-56 md:h-28 transition-transform duration-300 hover:scale-105"
                                >
                                    <div className="relative w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-500">
                                        <Image
                                            src={sponsor.logoUrl}
                                            alt={sponsor.name}
                                            fill
                                            className="object-contain drop-shadow-xl"
                                        />

                                        {/* Subtelna poświata po najechaniu */}
                                        <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- 2. POZOSTALI SPONSORZY (Karuzela - Tier > 1) --- */}
                {otherSponsors.length > 0 && (
                    <div className="relative w-full overflow-hidden pt-8 border-t border-white/5">
                        <div className="text-center mb-8">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Pozostali Partnerzy
                            </span>
                        </div>

                        {/* Maski gradientowe */}
                        <div className="absolute top-0 left-0 z-20 h-full w-16 md:w-32 bg-gradient-to-r from-[#0e0e0e] to-transparent pointer-events-none" />
                        <div className="absolute top-0 right-0 z-20 h-full w-16 md:w-32 bg-gradient-to-l from-[#0e0e0e] to-transparent pointer-events-none" />

                        {/* Pasek przewijania */}
                        <div className="flex w-max gap-12 md:gap-24 animate-scroll hover:[animation-play-state:paused] items-center">
                            {carouselSponsors.map((sponsor, i) => (
                                <Link
                                    // Index w kluczu dla duplikatów
                                    key={`${sponsor._id}-${i}`}
                                    href={sponsor.website || "#"}
                                    target={sponsor.website ? "_blank" : "_self"}
                                    className="relative w-[130px] h-[60px] opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 flex-shrink-0"
                                >
                                    <Image
                                        src={sponsor.logoUrl}
                                        alt={sponsor.name}
                                        fill
                                        className="object-contain"
                                        sizes="150px"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}