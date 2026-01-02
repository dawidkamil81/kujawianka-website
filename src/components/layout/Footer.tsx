"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone, ArrowRight, Shield } from "lucide-react";

export default function Footer() {
    const navItems = [
        { name: "Aktualności", href: "/aktualnosci" },
        { name: "Wyniki i tabela", href: "/wyniki/seniorzy" },
        { name: "Kadra zespołu", href: "/druzyny/seniorzy" },
        { name: "Dokumenty do pobrania", href: "/do-pobrania" },
        { name: "Współpraca", href: "/biznes/oferta" },
        { name: "Przekaż 1.5%", href: "/wesprzyj" },
    ];

    return (
        <footer className="relative mt-auto bg-[#0e0e0e] text-white overflow-hidden font-sans border-t border-white/5">

            {/* === TŁO I DEKORACJE === */}

            {/* 1. Główny pasek gradientowy - TERAZ TAKI SAM JAK W HEADERZE */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] shadow-[0_0_20px_rgba(218,24,24,0.3)] z-20" />

            {/* 2. Subtelna siatka w tle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

            {/* 3. Zielona poświata (Glow) od dołu */}
            <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#174135] opacity-20 blur-[100px] pointer-events-none z-0" />


            <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-10">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">

                    {/* === Kolumna 1: Tylko Logo (bez napisów pod spodem) === */}
                    <div className="flex flex-col items-center lg:items-start space-y-6">
                        <Link href="/" className="group relative h-32 w-32 transition-transform duration-300 hover:scale-105">
                            {/* Efekt "Spotlight" za logiem */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#174135] to-[#da1818] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <Image
                                src="/logo.png"
                                alt="Herb Kujawianka Izbica Kujawska"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </Link>
                    </div>

                    {/* === Kolumna 2: Nawigacja === */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#da1818] flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#da1818] inline-block"></span>
                            Na skróty
                        </h4>
                        <ul className="space-y-3 text-center lg:text-left w-full">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="group flex items-center justify-center lg:justify-start gap-3 text-white/60 hover:text-white transition-all duration-300"
                                    >
                                        <ArrowRight size={14} className="text-[#da1818] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* === Kolumna 3: Kontakt === */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#da1818] flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#da1818] inline-block"></span>
                            Kontakt
                        </h4>
                        <ul className="space-y-4 text-center lg:text-left">
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-white/70 text-sm leading-relaxed">
                                    ul. Sportowa 1a<br />
                                    87-865 Izbica Kujawska
                                </span>
                            </li>
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                                    <Phone size={18} />
                                </div>
                                <span className="text-white/70 text-sm mt-2 lg:mt-0 font-medium tracking-wide">
                                    +48 665 426 757
                                </span>
                            </li>
                            <li className="flex flex-col lg:flex-row items-center lg:items-start gap-4 group">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#2ea07b] backdrop-blur-sm transition-colors duration-300 group-hover:border-[#da1818]/50 group-hover:bg-[#da1818]/10 group-hover:text-[#da1818]">
                                    <Mail size={18} />
                                </div>
                                <a href="mailto:kujawiankaizbicakujawska@gmail.com" className="text-white/70 text-sm mt-2 lg:mt-0 break-all hover:text-white transition-colors">
                                    kujawiankaizbicakujawska@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* === Kolumna 4: Social Media (bez "Wspierają nas") === */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#da1818] flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#da1818] inline-block"></span>
                            Społeczność
                        </h4>

                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/kujawiankaizbica"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#1877F2] hover:border-[#1877F2] hover:shadow-[0_4px_20px_-5px_rgba(24,119,242,0.5)]"
                            >
                                <Facebook size={22} className="group-hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href="https://www.instagram.com/mgks_kujawianka/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="group flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-[linear-gradient(45deg,#f09433_0%,#e6683c_25%,#dc2743_50%,#cc2366_75%,#bc1888_100%)] hover:shadow-[0_4px_20px_-5px_rgba(220,39,67,0.5)]"
                            >
                                <Instagram size={22} className="group-hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* === Dolny pasek (Copyright) === */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>© {new Date().getFullYear()} MKS Kujawianka Izbica Kujawska. Wszelkie prawa zastrzeżone.</p>

                    <div className="flex items-center gap-6">
                        <Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">
                            Polityka Prywatności
                        </Link>
                        {/* <Link href="/statut" className="hover:text-white transition-colors">
                            Statut Klubu
                        </Link> */}
                        <a
                            href="https://dawidkamil.pl"
                            target="_blank"
                            className="flex items-center gap-1 hover:text-[#da1818] transition-colors"
                        >
                            <Shield size={10} /> Realizacja
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}