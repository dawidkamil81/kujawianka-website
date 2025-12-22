"use client";

import { useState, useEffect } from "react";
import NewsCard from "@/components/common/NewsCard";
import { NewsItem } from "@/types/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_DURATION_MS = 5000;

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
        <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden bg-[url('/hero.jpg')] bg-cover bg-fixed bg-center text-white">
            {/* === Overlay (Gradient) === */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(115deg,rgba(23,65,53,0.9)_20%,rgba(0,0,0,0.5)_50%,rgba(218,24,24,0.35)_100%)] backdrop-blur-[2px]" />

            <div className="relative z-20 grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-12">

                {/* === Lewa strona: Tekst === */}
                <div className="flex flex-col justify-center border-l-4 border-[#da1818] pl-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
                    <h1 className="mb-3 text-4xl font-extrabold uppercase tracking-wide leading-tight text-white md:text-5xl lg:text-6xl">
                        Kujawianka <br className="hidden md:block" /> Izbica Kujawska
                    </h1>
                    <p className="text-lg text-gray-200 opacity-90 md:text-xl">
                        Oficjalna strona internetowa
                    </p>
                </div>

                {/* === Prawa strona: Karuzela (Glassmorphism) === */}
                <div className="flex flex-col animate-in slide-in-from-right-8 fade-in duration-1000 fill-mode-forwards">

                    {/* Kontener slajdów */}
                    <div className="relative w-full">
                        {/* Wrapper GLASSMORPHISM: Półprzezroczyste tło, rozmycie, subtelna ramka */}
                        <div className="grid grid-cols-1 grid-rows-1 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md transition-colors hover:bg-white/15">
                            {news.map((item, index) => (
                                <div
                                    key={item.slug}
                                    className={`
                                        col-start-1 row-start-1 w-full transition-all duration-700 ease-in-out
                                        ${index === activeIndex ? "opacity-100 visible z-10 scale-100" : "opacity-0 invisible z-0 scale-95"}
                                    `}
                                >
                                    <NewsCard
                                        title={item.title}
                                        excerpt={item.excerpt}
                                        imageUrl={item.imageUrl || "/placeholder-image.jpg"}
                                        slug={item.slug}
                                        date={new Date(item.publishedAt).toLocaleDateString('pl-PL')}
                                        // WAŻNE: Nadpisujemy tło karty na przezroczyste, aby używała tła rodzica (Glass)
                                        className="bg-transparent hover:bg-transparent shadow-none hover:shadow-none"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Przyciski Nawigacyjne (Minimalistyczne) */}
                        <div className="absolute -bottom-14 right-0 z-20 flex gap-4 md:top-1/2 md:bottom-auto md:-right-6 md:-translate-y-1/2 md:flex-col md:gap-3">
                            <button
                                onClick={goToPrev}
                                aria-label="Poprzedni news"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-[#00c897] hover:border-[#00c897] hover:text-black hover:shadow-[0_0_15px_rgba(0,200,151,0.5)]"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <button
                                onClick={goToNext}
                                aria-label="Następny news"
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-[#00c897] hover:border-[#00c897] hover:text-black hover:shadow-[0_0_15px_rgba(0,200,151,0.5)]"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Wskaźniki (Kropki) */}
                    <div className="mt-6 flex justify-center gap-3 md:justify-start md:mt-6 md:pl-2">
                        {news.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                aria-label={`Przejdź do newsa ${index + 1}`}
                                className={`h-2 w-2 rounded-full transition-all duration-500 ${index === activeIndex
                                    ? "bg-[#00c897] w-8 shadow-[0_0_10px_#00c897]"
                                    : "bg-white/30 hover:bg-white/60"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}