"use client";

import Image from "next/image";
import { useState } from "react";
import { Copy, Check, Heart, Trophy, Bus, Shirt, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// KONFIGURACJA DANYCH
const KRS_NUMBER = "0000123456";
const SPECIFIC_GOAL = "Kujawianka Izbica Kujawska";

export default function DonateTaxPage() {
    // Osobne stany dla kopiowania KRS i Celu
    const [copiedKrs, setCopiedKrs] = useState(false);
    const [copiedGoal, setCopiedGoal] = useState(false);

    // Funkcja pomocnicza do kopiowania
    const handleCopy = (text: string, setCopied: (val: boolean) => void) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]">

            {/* TŁO DEKORACYJNE (bez zmian) */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-20">

                {/* --- 1. HERO SECTION --- */}
                <section className="space-y-12">
                    {/* Nagłówek */}
                    <div className="flex flex-col items-center justify-center mb-16 space-y-4">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                            Wesprzyj Nasz Klub
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl mx-auto">
                            Gramy <span className="text-emerald-500">Razem</span>
                        </h1>
                    </div>

                    {/* KARTY DANYCH (GRID) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

                        {/* KARTA 1: KRS */}
                        <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-between gap-6 hover:border-[#2ecc71]/50 transition-all duration-300 hover:bg-white/[0.07] hover:shadow-[0_0_40px_-10px_rgba(46,204,113,0.3)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2ecc71] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="text-center space-y-2">
                                <p className="text-[#2ecc71] text-xs font-bold tracking-[0.2em] uppercase">Wpisz w PIT</p>
                                <p className="text-5xl md:text-6xl font-mono font-bold text-white tracking-widest tabular-nums">
                                    {KRS_NUMBER}
                                </p>
                                <p className="text-white/40 text-sm">Numer KRS</p>
                            </div>

                            <button
                                onClick={() => handleCopy(KRS_NUMBER, setCopiedKrs)}
                                className={cn(
                                    "w-full py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-95",
                                    copiedKrs
                                        ? "bg-[#2ecc71] text-black shadow-[0_0_20px_rgba(46,204,113,0.4)]"
                                        : "bg-white/10 hover:bg-white/20 text-white"
                                )}
                            >
                                {copiedKrs ? <Check size={20} /> : <Copy size={20} />}
                                {copiedKrs ? "Skopiowano" : "Skopiuj KRS"}
                            </button>
                        </div>

                        {/* KARTA 2: CEL SZCZEGÓŁOWY */}
                        <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-between gap-6 hover:border-[#e74c3c]/50 transition-all duration-300 hover:bg-white/[0.07] hover:shadow-[0_0_40px_-10px_rgba(231,76,60,0.3)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e74c3c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="text-center space-y-2 w-full">
                                <p className="text-[#e74c3c] text-xs font-bold tracking-[0.2em] uppercase">Cel Szczegółowy</p>
                                <p className="text-2xl md:text-3xl font-bold text-white leading-tight min-h-[3.75rem] flex items-center justify-center">
                                    {SPECIFIC_GOAL}
                                </p>
                                <p className="text-white/40 text-sm">Wymagane pole w deklaracji</p>
                            </div>

                            <button
                                onClick={() => handleCopy(SPECIFIC_GOAL, setCopiedGoal)}
                                className={cn(
                                    "w-full py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-95",
                                    copiedGoal
                                        ? "bg-[#e74c3c] text-white shadow-[0_0_20px_rgba(231,76,60,0.4)]"
                                        : "bg-white/10 hover:bg-white/20 text-white"
                                )}
                            >
                                {copiedGoal ? <Check size={20} /> : <Copy size={20} />}
                                {copiedGoal ? "Skopiowano" : "Skopiuj Cel"}
                            </button>
                        </div>

                    </div>
                </section>

                {/* --- 2. INSTRUKCJA (Uproszczona wizualnie) --- */}
                <section className="border-t border-white/10 pt-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                        <h2 className="text-3xl font-bold uppercase">Jak przekazać podatek?</h2>
                        <div className="hidden md:block h-px flex-1 bg-white/10 mx-8" />
                        <p className="text-white/50 text-sm uppercase tracking-widest">Tylko 3 kroki</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StepCard
                            num="01"
                            title="Wpisz KRS"
                            desc={`W sekcji "Wniosek o przekazanie 1,5% podatku" wpisz numer: ${KRS_NUMBER}`}
                        />
                        <div className="hidden md:flex items-center justify-center text-white/20">
                            <ArrowRight size={32} />
                        </div>
                        <StepCard
                            num="02"
                            title="Cel szczegółowy"
                            desc={`W rubryce "Cel szczegółowy 1,5%" wpisz: "${SPECIFIC_GOAL}"`}
                            highlight
                        />
                        <div className="hidden md:flex items-center justify-center text-white/20">
                            <ArrowRight size={32} />
                        </div>
                        <StepCard
                            num="03"
                            title="Wyślij PIT"
                            desc="Złóż deklarację online (e-PIT) lub w urzędzie. To wszystko!"
                        />
                    </div>
                </section>

                {/* --- 3. NA CO ZBIERAMY & SOCIAL PROOF --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Lewa kolumna: Lista celów */}
                    <section className="bg-gradient-to-br from-[#174135]/40 to-[#0e0e0e] rounded-3xl p-8 md:p-10 border border-white/10">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Trophy className="text-[#2ecc71]" />
                            Cele zbiórki
                        </h3>
                        <div className="space-y-6">
                            <GoalRow icon={<Users size={20} />} text="Szkolenie ponad 100 dzieci w akademii" />
                            <GoalRow icon={<Shirt size={20} />} text="Zakup profesjonalnego sprzętu treningowego" />
                            <GoalRow icon={<Bus size={20} />} text="Transport na mecze wyjazdowe i turnieje" />
                            <GoalRow icon={<Heart size={20} />} text="Modernizacja boiska i zaplecza sanitarnego" />
                        </div>
                    </section>

                    {/* Prawa kolumna: Social Proof (Zdjęcie) */}
                    <section className="relative overflow-hidden rounded-3xl border border-white/10 min-h-[300px] group">
                        {/* ZMIEŃ src NA WŁAŚCIWE ZDJĘCIE */}
                        <Image
                            src="/public/s2b.jpg"
                            alt="Akademia Kujawianki"
                            fill
                            className="object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500 group-hover:scale-105 transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 md:p-10">
                            <blockquote className="text-lg md:text-xl font-medium italic text-white/90 mb-4 border-l-4 border-[#8d1010] pl-4">
                                "Twoje 1.5% to realne wsparcie dla tych dzieciaków. Budujemy razem coś więcej niż klub."
                            </blockquote>
                            <p className="font-bold text-white">Zarząd Klubu</p>
                        </div>
                    </section>
                </div>

            </div>
        </main>
    );
}

// --- KOMPONENTY POMOCNICZE ---

function StepCard({ num, title, desc, highlight }: { num: string, title: string, desc: string, highlight?: boolean }) {
    return (
        <div className={cn(
            "p-6 rounded-xl border transition-all duration-300 bg-[#121212]",
            highlight ? "border-[#e74c3c]/50 shadow-[0_0_20px_-5px_rgba(231,76,60,0.2)]" : "border-white/10 hover:border-white/20"
        )}>
            <div className="text-4xl font-black text-white/10 mb-4">{num}</div>
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
        </div>
    )
}

function GoalRow({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
            <div className="text-[#2ecc71]">{icon}</div>
            <span className="font-medium text-white/90">{text}</span>
        </div>
    )
}