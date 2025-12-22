"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import ContactSection from "@/components/common/ContactSection";
// Importujemy nasze nowe komponenty UI
import { Button } from "@/components/ui/button";
import { GlassCard, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/glass-card";

export default function OfferPage() {
    const sponsorPackages = [
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
            isPopular: true,
        },
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
            isPopular: false,
        },
    ];

    const stats = [
        { value: "15+", label: "Sponsorów i Partnerów" },
        { value: "1200+", label: "Kibiców w sezonie" },
        { value: "25k+", label: "Zasięgi miesięcznie" },
        { value: "100%", label: "Pasji i zaangażowania" },
    ];

    return (
        <main className="min-h-screen">

            {/* === HERO === */}
            <section className="relative py-32 px-6 text-center overflow-hidden">
                {/* Tło gradientowe */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(23,65,53,0.4),transparent_70%)] -z-10" />

                <div className="container mx-auto max-w-4xl">
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Oferta <span className="text-club-green">Sponsorska</span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Zostań częścią sukcesu Kujawianki. Oferujemy elastyczne pakiety współpracy,
                        dopasowane do potrzeb Twojego biznesu.
                    </motion.p>
                </div>
            </section>

            {/* === DLACZEGO MY (Bento Grid Style) === */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                        {/* Tekst */}
                        <GlassCard className="p-8 flex flex-col justify-center" hoverEffect={false}>
                            <h2 className="text-3xl font-bold text-white uppercase mb-6">
                                Dlaczego My?
                            </h2>
                            <div className="space-y-4 text-gray-400 text-lg">
                                <p>
                                    Kujawianka to nie tylko klub piłkarski, to społeczność. Wspierając nas,
                                    docierasz do tysięcy zaangażowanych kibiców w regionie i budujesz
                                    pozytywny wizerunek swojej marki jako mecenasa sportu.
                                </p>
                                <p>
                                    Nasz stadion tętni życiem, a nasze media społecznościowe generują
                                    dziesiątki tysięcy zasięgu miesięcznie.
                                </p>
                            </div>
                        </GlassCard>

                        {/* Zdjęcie w karcie */}
                        <GlassCard className="relative h-[100] lg:h-auto p-0 border-0" hoverEffect={false}>
                            <img
                                src="/hero.jpg"
                                alt="Mecz Kujawianki"
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#0e0e0e] to-transparent" />
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* === PAKIETY === */}
            <section className="py-20 bg-white/2">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-4">
                            Pakiety Współpracy
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Wybierz poziom zaangażowania odpowiedni dla Twojej firmy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {sponsorPackages.map((pkg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="h-full"
                            >
                                <GlassCard className={`h-full flex flex-col ${pkg.isPopular ? "border-club-green/50 shadow-[0_0_30px_rgba(23,65,53,0.15)]" : ""}`}>
                                    <CardHeader>
                                        {pkg.isPopular && (
                                            <span className="bg-club-green text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2 uppercase tracking-wide">
                                                Polecany
                                            </span>
                                        )}
                                        <CardTitle className="text-2xl uppercase mb-1">{pkg.title}</CardTitle>
                                        <p className="text-club-green font-bold text-xl">{pkg.price}</p>
                                    </CardHeader>

                                    <CardContent className="grow">
                                        <p className="text-gray-400 mb-6 text-sm">{pkg.description}</p>
                                        <ul className="space-y-3">
                                            {pkg.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                    <CheckCircle className="w-5 h-5 text-club-green shrink-0" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>

                                    <CardFooter>
                                        <Link href="#contact" className="w-full">
                                            <Button
                                                variant={pkg.isPopular ? "club" : "outline"}
                                                size="lg"
                                                className="w-full"
                                            >
                                                Wybieram
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === STATYSTYKI === */}
            <section className="py-24 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((item, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <span className="text-5xl md:text-6xl font-black text-white/90 tracking-tighter">
                                    {item.value}
                                </span>
                                <span className="text-sm font-bold text-club-green uppercase tracking-widest">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === KONTAKT === */}
            <ContactSection
                title="Dołącz do gry"
                description="Zainteresowała Cię nasza oferta? Skontaktuj się z nami i omówmy szczegóły."
            />
        </main>
    );
}