"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Handshake } from "lucide-react";
import { Sponsor } from "@/types/index";

export default function SponsorsTeaser({ sponsors }: { sponsors: Sponsor[] }) {
    // 1. Filtrowanie i zabezpieczenie przed błędami (brak logo)
    const validSponsors = sponsors?.filter(s => s.logoUrl && s.logoUrl.trim() !== "") || [];

    const mainSponsors = validSponsors.filter((s) => s.tier === "main");
    const otherSponsors = validSponsors.filter((s) => s.tier !== "main");

    // Jeśli brak sponsorów, nie wyświetlamy sekcji
    if (validSponsors.length === 0) return null;

    // 2. LOGIKA NIESKOŃCZONEJ PĘTLI
    // Aby pętla była płynna, musimy mieć wystarczająco dużo elementów, aby wypełnić ekran.
    // Jeśli sponsorów jest mało (< 6), powielamy ich 4 razy. W przeciwnym razie 2 razy wystarczy.
    // Dzięki temu animacja translateX(-50%) zawsze ma "co pokazać" przed przeskokiem.
    const multiplier = otherSponsors.length > 6 ? 2 : 4;
    const carouselSponsors = Array(multiplier).fill(otherSponsors).flat();

    return (
        <section className="relative w-full py-16 bg-[#0e0e0e] border-t border-white/5 overflow-hidden">
            {/* Tło gradientowe (Glow) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-club-green/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* --- NAGŁÓWEK SEKCJI --- */}
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

                {/* --- SPONSORZY GŁÓWNI (Statyczni) --- */}
                {mainSponsors.length > 0 && (
                    <div className="mb-16">
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <Handshake size={20} className="text-club-green" />
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                Partnerzy Główni
                            </h3>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                            {mainSponsors.map((sponsor) => (
                                <Link
                                    key={sponsor._id}
                                    href={sponsor.website || "#"}
                                    target={sponsor.website ? "_blank" : "_self"}
                                    className="group relative flex items-center justify-center p-6 bg-[#121212] rounded-2xl border border-white/5 hover:bg-white/5 hover:border-club-green/40 hover:shadow-[0_0_20px_rgba(23,65,53,0.15)] transition-all duration-300 w-[240px] h-[130px]"
                                >
                                    <div className="relative w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                                        <Image
                                            src={sponsor.logoUrl}
                                            alt={sponsor.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- POZOSTALI SPONSORZY (PŁYNNA KARUZELA) --- */}
                {otherSponsors.length > 0 && (
                    <div className="relative w-full overflow-hidden pt-8 border-t border-white/5">
                        <div className="text-center mb-8">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                Pozostali Partnerzy
                            </span>
                        </div>

                        {/* Maski gradientowe po bokach (Dają efekt zanikania) */}
                        <div className="absolute top-0 left-0 z-20 h-full w-16 md:w-32 bg-gradient-to-r from-[#0e0e0e] to-transparent pointer-events-none" />
                        <div className="absolute top-0 right-0 z-20 h-full w-16 md:w-32 bg-gradient-to-l from-[#0e0e0e] to-transparent pointer-events-none" />

                        {/* Kontener paska przewijania */}
                        {/* animate-scroll jest zdefiniowany w globals.css */}
                        {/* pause on hover pozwala użytkownikowi kliknąć logo */}
                        <div className="flex w-max gap-12 md:gap-24 animate-scroll hover:[animation-play-state:paused] items-center">

                            {carouselSponsors.map((sponsor, i) => (
                                <Link
                                    // Używamy indexu w kluczu, bo sponsorzy się powtarzają
                                    key={`${sponsor._id}-${i}`}
                                    href={sponsor.websiteUrl || "#"}
                                    target={sponsor.websiteUrl ? "_blank" : "_self"}
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