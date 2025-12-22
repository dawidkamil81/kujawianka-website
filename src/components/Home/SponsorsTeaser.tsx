"use client";

import { Sponsor } from "@/types/index";

export default function SponsorsTeaser({ sponsors }: { sponsors: Sponsor[] }) {
    const mainSponsors = sponsors.filter((s) => s.tier === "main");
    const otherSponsors = sponsors.filter((s) => s.tier !== "main");

    if (!sponsors || sponsors.length === 0) return null;

    return (
        <section className="relative overflow-hidden py-16 px-8 border-y border-white/5 bg-gradient-to-b from-[#121915]/0 to-[#174135]/10 text-[var(--text-main)]">

            <div className="mx-auto max-w-[1200px]">

                {/* Nagłówek Sekcji */}
                <header className="text-center mb-10">
                    <h2 className="text-[2rem] font-bold text-[var(--club-green)] uppercase">
                        Nasi Sponsorzy
                    </h2>
                </header>

                {/* === Sponsorzy Główni === */}
                {mainSponsors.length > 0 && (
                    <>
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-semibold tracking-[0.5px] uppercase opacity-85">
                                Sponsorzy Główni
                            </h3>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-12 mb-12">
                            {mainSponsors.map((sponsor) => (
                                <div
                                    key={sponsor._id}
                                    className="transition-all duration-400 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 hover:scale-105"
                                >
                                    {/* Pamiętaj o podmianie <img> na <Image /> z next/image w przyszłości dla optymalizacji */}
                                    <img
                                        src={sponsor.logoUrl}
                                        alt={sponsor.name}
                                        className="max-h-[90px] w-[150px] md:w-[200px] object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* === Karuzela (Pozostali) === */}
                {otherSponsors.length > 0 && (
                    <>
                        <div className="text-center mb-6 mt-12">
                            <h3 className="text-base md:text-xl font-semibold tracking-[0.5px] uppercase opacity-85">
                                Pozostali Sponsorzy
                            </h3>
                        </div>

                        <div className="relative w-full overflow-hidden py-6">

                            {/* Lewy Gradient (maska) */}
                            <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-[50px] md:w-[100px] bg-gradient-to-r from-[#121915] to-transparent" />

                            {/* Prawy Gradient (maska) */}
                            <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-[50px] md:w-[100px] bg-gradient-to-l from-[#121915] to-transparent" />

                            {/* Kontener Karuzeli */}
                            {/* animate-[scroll_25s...] używa keyframes zdefiniowanych w globals.css */}
                            <div className="flex w-max gap-8 md:gap-16 animate-[scroll_25s_linear_infinite] md:animate-scroll hover:[animation-play-state:paused]">
                                {/* Podwajamy elementy dla efektu pętli */}
                                {[...otherSponsors, ...otherSponsors].map((sponsor, i) => (
                                    <div
                                        key={`${sponsor._id}-${i}`}
                                        className="flex shrink-0 items-center justify-center opacity-70 transition-all duration-300 hover:opacity-100 hover:scale-110"
                                    >
                                        <img
                                            src={sponsor.logoUrl}
                                            alt={sponsor.name}
                                            className="max-h-[50px] md:max-h-[60px] max-w-[150px] object-contain grayscale transition-all duration-300 hover:grayscale-0"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}