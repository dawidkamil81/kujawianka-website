"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NewsItem } from "@/types/index";

interface HeroNewsSliderProps {
    news: NewsItem[];
}

export default function HeroNewsSlider({ news }: HeroNewsSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    if (!news || news.length === 0) return null;

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % news.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [news.length, isPaused]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    };

    const currentNews = news[currentIndex];

    const formattedDate = new Date(currentNews.publishedAt).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div
            className="relative w-full flex flex-col gap-3"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* --- GÓRA: TYLKO NAGŁÓWEK (BEZ KROPKI) --- */}
            <div className="flex items-center gap-3 px-1 mb-1">
                <h3 className="text-white font-montserrat font-bold tracking-widest uppercase text-xs opacity-80">
                    WYRÓŻNIONE ARTYKUŁY
                </h3>
            </div>

            {/* --- ŚRODEK: KARTA NEWSA --- */}
            <div className="relative h-[380px] w-full rounded-2xl overflow-hidden group border border-white/10 shadow-2xl bg-[#0a0a0a] cursor-pointer">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentNews._id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 h-full w-full"
                    >
                        {/* Zdjęcie */}
                        <div className="absolute inset-0 overflow-hidden">
                            {currentNews.imageUrl ? (
                                <Image
                                    src={currentNews.imageUrl}
                                    alt={currentNews.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-white/20">Brak zdjęcia</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent opacity-90" />
                        </div>

                        {/* Treść */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end items-start z-10">

                            {/* Data */}
                            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-club-green-light font-bold text-[10px] uppercase tracking-wider">
                                <Calendar size={12} className="text-club-green" />
                                <span>{formattedDate}</span>
                            </div>

                            {/* Tytuł */}
                            <h2 className="text-xl md:text-2xl font-black text-white font-montserrat leading-tight mb-3 line-clamp-2 drop-shadow-lg group-hover:text-club-green transition-colors duration-300">
                                <Link href={`/aktualnosci/${currentNews.slug}`}>
                                    {currentNews.title}
                                </Link>
                            </h2>

                            {/* Kontener: Opis -> Przycisk */}
                            <div className="relative w-full min-h-[60px]">
                                {/* Opis */}
                                <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-2 absolute top-0 left-0 w-full">
                                    {currentNews.excerpt}
                                </p>

                                {/* Przycisk */}
                                <div className="absolute top-0 left-0 pt-0.5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75 ease-out">
                                    <Link
                                        href={`/aktualnosci/${currentNews.slug}`}
                                        className="inline-flex items-center gap-2 bg-club-green text-white font-bold text-xs md:text-sm uppercase tracking-wider px-5 py-2.5 rounded-lg hover:bg-club-green-light hover:shadow-[0_0_15px_rgba(218,24,24,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                                    >
                                        Czytaj więcej <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Pasek postępu - ZIELONY Z CZERWONĄ POŚWIATĄ (zgodnie z życzeniem) */}
                {!isPaused && (
                    <motion.div
                        key={currentIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        // ZMIANA: Zastąpiłem 'bg-club-green' kolorem 'bg-[#22c55e]' (żywy zielony)
                        // Cień 'shadow-[0_0_15px_#da1818]' odpowiada za czerwoną poświatę
                        className="absolute bottom-0 left-0 h-2 bg-[#174135] z-20 shadow-[0_0_15px_#da1818]"
                    />
                )}
            </div>

            {/* --- DÓŁ: NAWIGACJA (STRZAŁKI + KROPKI) --- */}
            <div className="flex items-center justify-between px-1 mt-1">

                {/* Kropki (po lewej) */}
                <div className="flex items-center gap-3">
                    {news.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={cn(
                                "h-3 rounded-full transition-all duration-500 ease-out cursor-pointer",
                                idx === currentIndex
                                    ? "w-12 bg-club-green shadow-[0_0_12px_#da1818]" // Zielona z czerwoną poświatą
                                    : "w-3 bg-white/40 hover:bg-white/60 hover:scale-125"
                            )}
                            aria-label={`Przejdź do newsa ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Strzałki (po prawej) */}
                <div className="flex gap-2">
                    <button
                        onClick={prevSlide}
                        className="group p-2 rounded-full bg-white/5 hover:bg-club-green hover:shadow-[0_0_10px_#da1818] transition-all duration-300 border border-white/10 text-gray-300 hover:text-white hover:-translate-x-0.5 cursor-pointer"
                        aria-label="Poprzedni"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="group p-2 rounded-full bg-white/5 hover:bg-club-green hover:shadow-[0_0_10px_#da1818] transition-all duration-300 border border-white/10 text-gray-300 hover:text-white hover:translate-x-0.5 cursor-pointer"
                        aria-label="Następny"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
}