"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Trophy, Target, Users, Star, ArrowRight, Handshake, Heart } from "lucide-react";
import ContactSection from "@/components/common/ContactSection";

export default function OfferPage() {
    // Dane pakietów (na podstawie Twojego pliku)
    const sponsorPackages = [
        {
            title: "Partner Klubu",
            description: "Wsparcie dla klubu i widoczność dla Twojej firmy w lokalnej społeczności.",
            price: "od 1 500 PLN / sezon",
            benefits: [
                "Baner reklamowy na stadionie (1 baner)",
                "Logo w sekcji Partnerzy na stronie www",
                "Możliwość dystrybucji ulotek podczas meczów",
                "Certyfikat Partnera Klubu",
                "Podziękowanie w social media",
            ],
            icon: <Users size={32} className="text-gray-400" />,
            isPopular: false,
        },
        {
            title: "Sponsor Strategiczny",
            description: "Silna obecność na stadionie i w działaniach marketingowych.",
            price: "od 5 000 PLN / sezon",
            benefits: [
                "Logo na rękawku lub spodenkach meczowych",
                "Ekspozycja banerowa na stadionie (2 banery)",
                "Logo w stopce strony internetowej",
                "Wzmianki w relacjach meczowych",
                "Karnety na mecze domowe",
            ],
            icon: <Target size={32} className="text-white" />,
            isPopular: true, // Wyróżniony
        },
        {
            title: "Sponsor Główny",
            description: "Maksymalna ekspozycja i centralne miejsce w wizerunku klubu.",
            price: "Indywidualne negocjacje",
            benefits: [
                "Logo na centralnym miejscu koszulek meczowych",
                "Stała ekspozycja banerowa na stadionie (4 banery)",
                "Logo na ściankach prasowych i materiałach wideo",
                "Dedykowane posty w mediach społecznościowych",
                "Karnety VIP i zaproszenia na bankiety",
            ],
            icon: <Trophy size={32} className="text-amber-400" />,
            isPopular: false,
        },
    ];

    // Dane statystyk (dodałem ikony dla spójności z SponsorsPage)
    const stats = [
        { value: "15+", label: "Sponsorów", icon: <Handshake className="text-emerald-500" size={24} /> },
        { value: "1200+", label: "Kibiców", icon: <Users className="text-emerald-500" size={24} /> },
        { value: "25k+", label: "Zasięgi", icon: <Target className="text-emerald-500" size={24} /> },
        { value: "100%", label: "Pasji", icon: <Heart className="text-emerald-500" size={24} /> },
    ];

    return (
        // === GŁÓWNY WRAPPER (Spójny z Home/News/Results/Sponsors) ===
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]">

            {/* Ozdobny particle */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">

                {/* === NAGŁÓWEK STRONY === */}
                <div className="flex flex-col items-center justify-center mb-20 space-y-5 text-center">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Współpraca Biznesowa
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white font-montserrat drop-shadow-2xl">
                        Oferta <span className="text-emerald-500">Sponsorska</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base font-medium leading-relaxed">
                        Dołącz do grona partnerów Kujawianki Izbica Kujawska. Wybierz pakiet dopasowany do Twoich potrzeb i buduj z nami silną markę poprzez sport.
                    </p>
                </div>

                {/* === PAKIETY SPONSORSKIE === */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 items-start">
                    {sponsorPackages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 h-full
                                ${pkg.isPopular
                                    ? "bg-[#174135]/20 border-emerald-500/50 shadow-[0_0_40px_rgba(23,65,53,0.3)] transform md:-translate-y-4 z-10"
                                    : "bg-[#121212] border-white/10 hover:border-white/20 hover:bg-white/5"
                                }
                            `}
                        >
                            {/* Badge "Polecany" */}
                            {pkg.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                                    <Star size={12} fill="currentColor" /> Polecany Wybór
                                </div>
                            )}

                            {/* Header Karty */}
                            <div className="mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                                    ${pkg.isPopular ? "bg-emerald-500 text-white" : "bg-white/10 text-gray-400"}
                                `}>
                                    {pkg.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase font-montserrat mb-2">
                                    {pkg.title}
                                </h3>
                                <p className="text-gray-400 text-sm min-h-[40px]">
                                    {pkg.description}
                                </p>
                            </div>

                            {/* Cena */}
                            <div className="mb-8 pb-8 border-b border-white/10">
                                <span className={`text-lg font-bold block ${pkg.isPopular ? "text-emerald-400" : "text-white"}`}>
                                    {pkg.price}
                                </span>
                            </div>

                            {/* Lista benefitów */}
                            <ul className="space-y-4 mb-8 flex-grow">
                                {pkg.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <CheckCircle className={`flex-shrink-0 mt-0.5 ${pkg.isPopular ? "text-emerald-500" : "text-gray-500"}`} size={16} />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Przycisk */}
                            <Link
                                href="#contact"
                                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all
                                    ${pkg.isPopular
                                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/20"
                                        : "bg-white/10 hover:bg-white/20 text-white"
                                    }
                                `}
                            >
                                Wybierz Pakiet <ArrowRight size={14} />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* === STATYSTYKI === */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center justify-center p-6 rounded-3xl bg-[#121212] border border-white/10 hover:border-club-green/30 transition-all duration-300 group text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="mb-3 p-3 bg-white/5 rounded-full group-hover:bg-club-green/10 transition-colors">
                                {stat.icon}
                            </div>
                            <span className="text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight mb-2 group-hover:text-emerald-500 transition-colors">
                                {stat.value}
                            </span>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* === KONTAKT (Zaimportowany komponent) === */}
                <div id="contact">
                    <ContactSection
                        title="Dołącz do gry"
                        description="Zainteresowała Cię nasza oferta? Skontaktuj się z nami i omówmy szczegóły."
                    />
                </div>

            </div>
        </main>
    );
}