"use client";

import { useState, useEffect } from "react";
import NewsCard from "@/components/common/NewsCard";
import { GlassCard } from "@/components/ui/glass-card";
import { NewsItem } from "@/types/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_DURATION_MS = 6000;

export default function HeroSection({ news }: { news: NewsItem[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Automatyczne przewijanie
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % news.length);
        }, SLIDE_DURATION_MS);
        return () => clearInterval(interval);
    }, [news.length]);

    const goToSlide = (index: number) => {
        setActiveIndex(index);
    };

    const goToNext = () => {
        setActiveIndex((current) => (current + 1) % news.length);
    };

    const goToPrev = () => {
        setActiveIndex((current) => (current - 1 + news.length) % news.length);
    };

    return (
        <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden">

            {/* === TŁO (Background) === */}
            <div className="absolute inset-0 z-0">
                {/* 1. Zdjęcie tła */}
                <div className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-fixed bg-center" />

                {/* 2. Baza przyciemniająca */}
                <div className="absolute inset-0 bg-black/70" />

                {/* 3. SUBTELNY GRADIENT KLUBOWY (Poprawiony) 
                    - ZMIANA: from-[#174135]/90 (Było /50) -> Mocniejsza zieleń w lewym górnym rogu
                    - via-black/20: Środek neutralny
                    - to-[#8d1010]/50: Czerwień bez zmian (taka jak chciałeś)
                */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#174135]/90 via-black/20 to-[#8d1010]/50 mix-blend-overlay opacity-90" />

                {/* 4. Gradient od dołu */}
                <div className="absolute inset-0 bg-gradient-to-t from-club-dark via-transparent to-transparent" />
            </div>

            <div className="relative z-20 grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[1fr_1fr] md:gap-20 md:px-8 lg:px-12 items-center">

                {/* === Lewa strona: Tekst === */}
                <div className="flex flex-col justify-center animate-in slide-in-from-left-8 fade-in duration-700 space-y-8">

                    <div>
                        {/* Badge */}
                        <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/30 border border-club-green/40 text-club-green-light font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-sm">
                            Oficjalny serwis klubu
                        </span>

                        {/* Nagłówek */}
                        <h1 className="text-5xl font-black uppercase tracking-tight leading-[0.95] text-white md:text-6xl lg:text-7xl drop-shadow-2xl">
                            Kujawianka <br />
                            <span className="text-white">Izbica Kujawska</span>
                        </h1>
                    </div>

                    {/* Opis */}
                    <p className="text-lg text-gray-300 font-normal max-w-lg leading-relaxed drop-shadow-lg">
                        Duma, pasja i tradycja od pokoleń. Bądź na bieżąco z wynikami, relacjami meczowymi i życiem klubu.
                    </p>

                </div>

                {/* === Prawa strona: Karuzela === */}
                <div className="flex flex-col animate-in slide-in-from-right-8 fade-in duration-1000 fill-mode-forwards relative">

                    <GlassCard className="relative w-full aspect-[16/10] md:aspect-[16/11] p-0 border-white/10 shadow-2xl bg-black/40 hover:bg-black/50 backdrop-blur-lg">
                        {news.map((item, index) => (
                            <div
                                key={item.slug}
                                className={`
                                    absolute inset-0 w-full h-full transition-all duration-700 ease-in-out
                                    ${index === activeIndex ? "opacity-100 visible z-10" : "opacity-0 invisible z-0"}
                                `}
                            >
                                <NewsCard
                                    title={item.title}
                                    excerpt={item.excerpt}
                                    imageUrl={item.imageUrl || "/placeholder-image.jpg"}
                                    slug={item.slug}
                                    date={new Date(item.publishedAt).toLocaleDateString('pl-PL')}
                                    className="bg-transparent hover:bg-transparent shadow-none hover:shadow-none h-full rounded-none"
                                />
                            </div>
                        ))}

                        {/* Nawigacja */}
                        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                            <button
                                onClick={goToPrev}
                                aria-label="Poprzedni"
                                className="p-2 rounded-full bg-black/60 text-white hover:bg-club-red transition-colors border border-white/10"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={goToNext}
                                aria-label="Następny"
                                className="p-2 rounded-full bg-black/60 text-white hover:bg-club-red transition-colors border border-white/10"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </GlassCard>

                    {/* Wskaźniki */}
                    <div className="mt-6 flex justify-center gap-2 md:justify-start">
                        {news.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${index === activeIndex
                                    ? "bg-club-red w-8"
                                    : "bg-white/20 w-2 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}