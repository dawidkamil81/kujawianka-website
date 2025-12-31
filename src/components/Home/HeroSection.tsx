// src/components/Home/HeroSection.tsx
import { NewsItem } from "@/types/index";
import HeroNewsSlider from "./HeroNewsSlider"; // Importujemy nowy slider
import Image from 'next/image';

export default function HeroSection({ news }: { news: NewsItem[] }) {
    return (
        <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden">

            {/* === TŁO (Background) - Twoje oryginalne style === */}
            <div className="absolute inset-0 z-0">
                {/* 1. Zdjęcie tła */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero.jpg"
                        alt="Tło stadionu"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* 2. Baza przyciemniająca */}
                <div className="absolute inset-0 bg-black/70" />

                {/* 3. Twój gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#174135]/90 via-black/20 to-[#8d1010]/50 mix-blend-overlay opacity-90" />

                {/* 4. Gradient od dołu */}
                <div className="absolute inset-0 bg-gradient-to-t from-club-dark via-transparent to-transparent" />
            </div>

            <div className="relative z-20 grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[1fr_1fr] md:gap-20 md:px-8 lg:px-12 items-center">

                {/* === Lewa strona: Tekst (BEZ ZMIAN) === */}
                <div className="flex flex-col justify-center animate-in slide-in-from-left-8 fade-in duration-700 space-y-8">
                    <div>
                        <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/30 border border-club-green/40 text-club-green-light font-bold text-xs uppercase tracking-widest mb-6 backdrop-blur-sm">
                            Oficjalny serwis klubu
                        </span>

                        <h1 className="text-5xl font-black uppercase tracking-tight leading-[0.95] text-white md:text-6xl lg:text-7xl drop-shadow-2xl">
                            Kujawianka <br />
                            <span className="text-white">Izbica Kujawska</span>
                        </h1>
                    </div>

                    <p className="text-lg text-gray-300 font-normal max-w-lg leading-relaxed drop-shadow-lg">
                        Duma, pasja i tradycja od pokoleń. Bądź na bieżąco z wynikami, relacjami meczowymi i życiem klubu.
                    </p>
                </div>

                {/* === Prawa strona: Karuzela (PODMIENIONA) === */}
                {/* Zachowałem Twój kontener z animacją wjazdu */}
                <div className="flex flex-col animate-in slide-in-from-right-8 fade-in duration-1000 fill-mode-forwards relative">
                    <HeroNewsSlider news={news} />
                </div>
            </div>
        </section>
    );
}