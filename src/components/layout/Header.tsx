"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
// Importujemy funkcję pomocniczą do obrazów Sanity oraz typ ustawień
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings } from "@/types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Definiujemy propsy, które komponent otrzymuje z Layoutu
interface HeaderProps {
    settings?: SiteSettings | null;
    squads?: { name: string; slug: string }[]; // <--- Nowy prop (Lista drużyn z CMS)
}

export default function Header({ settings, squads }: HeaderProps) { // <--- Dodano squads tutaj
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Ustawiamy interwał na 60 sekund (60000 ms)
        const interval = setInterval(() => {
            router.refresh();
        }, 60000);

        return () => clearInterval(interval);
    }, [router]);

    // --- LOGIKA DANYCH Z SANITY ---
    const logoSrc = settings?.logo ? urlFor(settings.logo).url() : "/logo.png";
    const siteTitle = settings?.title || "Kujawianka Izbica Kujawska";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    };

    const toggleDropdown = (menu: string) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname?.startsWith(path);
    };

    const getVisualClasses = (path: string) => {
        const active = isActive(path);

        const visualState = active
            ? "opacity-100"
            : "opacity-60 hover:opacity-100";

        const baseClasses = `
            relative flex items-center justify-center gap-1 w-full py-4 font-semibold lg:w-auto lg:py-2 
            text-white transition-all duration-300 ${visualState}
        `;

        const underlineClasses = `
            after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] 
            after:bg-white after:transition-transform after:duration-300 after:origin-bottom-right 
            ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left"}
        `;

        return `${baseClasses} ${underlineClasses}`;
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[linear-gradient(135deg,#174135f2_30%,#8d1010e6_100%)] backdrop-blur-md shadow-lg text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">

                {/* Logo i Tytuł */}
                <Link href="/" className="group flex items-center gap-3" onClick={closeMenu}>
                    <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
                        <Image
                            src={logoSrc}
                            alt={siteTitle}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-sm font-bold uppercase tracking-wide md:text-lg lg:text-xl text-white drop-shadow-sm">
                        Kujawianka Izbica Kujawska
                    </h1>
                </Link>

                {/* Hamburger (Mobilny) */}
                <button
                    className="flex p-2 text-white/80 hover:text-white lg:hidden hover:bg-white/10 rounded-lg transition-colors"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Nawigacja */}
                <nav
                    className={`
                        absolute left-0 top-full w-full flex-col bg-[#174135] lg:bg-transparent border-b border-white/10 lg:border-none transition-all duration-300 lg:static lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-6 lg:p-0
                        ${isMenuOpen ? "flex opacity-100 visible shadow-xl" : "hidden opacity-0 invisible lg:flex lg:opacity-100 lg:visible lg:shadow-none"}
                    `}
                >
                    {/* Aktualności */}
                    <Link href="/aktualnosci" className={getVisualClasses("/aktualnosci")} onClick={closeMenu}>
                        Aktualności
                    </Link>

                    {/* Dropdown: Drużyny (DYNAMICZNY) */}
                    <div
                        className="relative w-full lg:w-auto text-center group"
                        onMouseEnter={() => window.innerWidth >= 1024 && setOpenDropdown("teams")}
                        onMouseLeave={() => window.innerWidth >= 1024 && setOpenDropdown(null)}
                    >
                        <button
                            className={getVisualClasses("/druzyny")}
                            onClick={() => toggleDropdown("teams")}
                        >
                            Drużyny
                            <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "teams" ? "rotate-180" : ""}`} />
                        </button>

                        <div className={`
                            bg-[#141414] w-full overflow-hidden transition-all duration-200
                            lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-full lg:mt-2 lg:w-48 lg:rounded-lg lg:border lg:border-white/10 lg:shadow-xl
                            ${openDropdown === "teams" ? "max-h-60 opacity-100 py-2" : "max-h-0 opacity-0 lg:invisible py-0"}
                        `}>
                            {/* Renderowanie dynamicznej listy drużyn z CMS */}
                            {squads && squads.length > 0 ? (
                                squads.map((squad) => (
                                    <Link
                                        key={squad.slug}
                                        href={`/druzyny/${squad.slug}`}
                                        className="block px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                                        onClick={closeMenu}
                                    >
                                        {squad.name}
                                    </Link>
                                ))
                            ) : (
                                <span className="block px-4 py-3 text-xs text-white/30">Brak drużyn</span>
                            )}
                        </div>
                    </div>

                    {/* Dropdown: Wyniki (Na razie statyczny) */}
                    <div
                        className="relative w-full lg:w-auto text-center group"
                        onMouseEnter={() => window.innerWidth >= 1024 && setOpenDropdown("results")}
                        onMouseLeave={() => window.innerWidth >= 1024 && setOpenDropdown(null)}
                    >
                        <button
                            className={getVisualClasses("/wyniki")}
                            onClick={() => toggleDropdown("results")}
                        >
                            Wyniki
                            <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "results" ? "rotate-180" : ""}`} />
                        </button>

                        <div className={`
                            bg-[#141414] w-full overflow-hidden transition-all duration-200
                            lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-full lg:mt-2 lg:w-48 lg:rounded-lg lg:border lg:border-white/10 lg:shadow-xl
                            ${openDropdown === "results" ? "max-h-60 opacity-100 py-2" : "max-h-0 opacity-0 lg:invisible py-0"}
                        `}>
                            <Link href="/wyniki/seniorzy" className="block px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors" onClick={closeMenu}>Seniorzy</Link>
                            <Link href="/wyniki/juniorzy" className="block px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors" onClick={closeMenu}>Juniorzy</Link>
                            <Link href="/wyniki/trampkarze" className="block px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors" onClick={closeMenu}>Trampkarze</Link>
                        </div>
                    </div>

                    {/* Klub */}
                    <Link href="/klub" className={getVisualClasses("/klub")} onClick={closeMenu}>
                        Klub
                    </Link>

                    {/* Dropdown: Biznes */}
                    <div
                        className="relative w-full lg:w-auto text-center group"
                        onMouseEnter={() => window.innerWidth >= 1024 && setOpenDropdown("biznes")}
                        onMouseLeave={() => window.innerWidth >= 1024 && setOpenDropdown(null)}
                    >
                        <button
                            className={getVisualClasses("/biznes")}
                            onClick={() => toggleDropdown("biznes")}
                        >
                            Biznes
                            <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "biznes" ? "rotate-180" : ""}`} />
                        </button>

                        <div className={`
                            bg-[#141414] w-full overflow-hidden transition-all duration-200
                            lg:absolute lg:right-0 lg:top-full lg:mt-2 lg:w-48 lg:rounded-lg lg:border lg:border-white/10 lg:shadow-xl
                            ${openDropdown === "biznes" ? "max-h-60 opacity-100 py-2" : "max-h-0 opacity-0 lg:invisible py-0"}
                        `}>
                            <Link href="/biznes/oferta" className="block px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors" onClick={closeMenu}>Współpraca</Link>
                            <Link href="/biznes/sponsorzy" className="block px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors" onClick={closeMenu}>Sponsorzy</Link>
                            <Link href="/biznes/klubowicze" className="block px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors" onClick={closeMenu}>Klubowicze</Link>
                            <Link href="/biznes/klub-100" className="block px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors" onClick={closeMenu}>Klub 100</Link>
                        </div>
                    </div>
                    <Link href="/do-pobrania" className={getVisualClasses("/do-pobrania")} onClick={closeMenu}>
                        Do pobrania
                    </Link>
                    <Link href="/wesprzyj" className={getVisualClasses("/wesprzyj")} onClick={closeMenu}>
                        Przekaż 1.5%
                    </Link>
                </nav>
            </div>
        </header>
    );
}