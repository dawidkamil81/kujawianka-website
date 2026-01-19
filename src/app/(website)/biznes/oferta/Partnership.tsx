"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Gem,
    Trophy,
    Target,
    Users,
    Calendar,
    Shirt,
    Crown,
    Handshake,
    ArrowRight,
    TrendingUp
} from "lucide-react";

// IMPORTUJEMY RENDERER SEKCJI
import SectionsRenderer from "@/components/sections/SectionsRenderer";

// 1. Mapowanie ikon
const iconMap: Record<string, React.ElementType> = {
    gem: Gem,
    target: Target,
    shirt: Shirt,
    crown: Crown,
    handshake: Handshake,
    users: Users,
    trending: TrendingUp,
    calendar: Calendar,
    trophy: Trophy
};

// 2. Mapowanie Twoich klas stylów (Theme)
const colorThemes: Record<string, any> = {
    emerald: {
        iconColor: "text-emerald-400",
        borderColor: "hover:border-emerald-400/50",
        shadowColor: "hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]",
        bgColor: "bg-emerald-400/10",
        textColor: "group-hover:text-emerald-400"
    },
    white: {
        iconColor: "text-white",
        borderColor: "hover:border-white/50",
        shadowColor: "hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]",
        bgColor: "bg-white/10",
        textColor: "group-hover:text-white"
    },
    blue: {
        iconColor: "text-blue-400",
        borderColor: "hover:border-blue-400/50",
        shadowColor: "hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]",
        bgColor: "bg-blue-400/10",
        textColor: "group-hover:text-blue-400"
    }
};

interface PartnershipProps {
    sponsorsCount: number;
    pageData?: any; // Tymczasowo any lub zaktualizowany OfferPageData zawierający contentBuilder
}

export default function Partnership({ sponsorsCount, pageData }: PartnershipProps) {
    const router = useRouter();

    const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const renderColoredTitle = (title: string) => {
        const words = title.trim().split(/\s+/);
        if (words.length < 2) return <span className="text-white">{title}</span>;

        const lastWord = words.pop();
        return (
            <>
                {words.join(" ")} <span className="text-emerald-500">{lastWord}</span>
            </>
        );
    };

    const packages = pageData?.packages || [];

    const stats = pageData?.stats?.map((stat: any) => ({
        ...stat,
        value: stat.value?.toUpperCase() === 'AUTO' ? `${sponsorsCount}` : stat.value,
    })) || [];

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
      bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]"
        >

            {/* Ozdobny particle */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">

                {/* === NAGŁÓWEK STRONY === */}
                <div className="flex flex-col items-center justify-center mb-20 space-y-5 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Współpraca Biznesowa
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        {pageData?.title ? renderColoredTitle(pageData.title) : <>Oferta <span className="text-emerald-500">Sponsorska</span></>}
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base font-medium leading-relaxed">
                        {pageData?.description || "Dołącz do grona partnerów Kujawianki Izbica Kujawska."}
                    </p>
                </div>

                {/* === PAKIETY SPONSORSKIE === */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
                    {packages.map((pkg: any, index: number) => {
                        const theme = colorThemes[pkg.colorTheme] || colorThemes.emerald;
                        const IconComponent = iconMap[pkg.iconName] || Gem;

                        return (
                            <div
                                key={index}
                                className={`group relative flex flex-col p-8 md:p-10 rounded-3xl bg-[#121212] border border-white/10 transition-all duration-500 ${theme.borderColor} ${theme.shadowColor}`}
                            >
                                <div className="absolute top-4 right-4 opacity-5 scale-150 grayscale group-hover:grayscale-0 group-hover:scale-125 transition-transform duration-700 pointer-events-none">
                                    <IconComponent size={40} className={theme.iconColor} />
                                </div>
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300 ${theme.bgColor}`}>
                                    <IconComponent size={40} className={theme.iconColor} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className={`text-2xl font-black text-white uppercase font-montserrat mb-4 transition-colors duration-300 ${theme.textColor}`}>
                                        {pkg.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                        {pkg.description}
                                    </p>
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                                        Dowiedz się więcej
                                    </span>
                                    <div className={`p-2 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300`}>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                                {pkg.link === "#contact" ? (
                                    <div
                                        onClick={scrollToContact}
                                        className="absolute inset-0 z-10 cursor-pointer"
                                        aria-label={`Wybierz ${pkg.title}`}
                                    />
                                ) : (
                                    <Link href={pkg.link || "#"} className="absolute inset-0 z-10" aria-label={`Wybierz ${pkg.title}`} />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* === STATYSTYKI === */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat: any, index: number) => {
                        const IconComponent = iconMap[stat.iconName] || Handshake;
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#121212] border border-white/10 hover:border-club-green/30 transition-all duration-300 group"
                            >
                                <div className="mb-3 p-3 bg-white/5 rounded-full group-hover:bg-club-green/10 transition-colors">
                                    <IconComponent className="text-emerald-500" size={24} />
                                </div>
                                <span className="text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight mb-1">
                                    {stat.value}
                                </span>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">
                                    {stat.label}
                                </span>
                            </div>
                        );
                    })}
                </section>

                {/* === SEKCJE DYNAMICZNE (Z CMS) === */}
                {/* Wstawiamy je tutaj, aby były wewnątrz kontenera i na tym samym tle */}
                {pageData?.contentBuilder && pageData.contentBuilder.length > 0 && (
                    <div className="mt-24 md:mt-32">
                        <SectionsRenderer sections={pageData.contentBuilder} />
                    </div>
                )}

            </div>
        </main>
    );
}