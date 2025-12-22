"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import ContactSection from "@/components/common/ContactSection"; // Importujemy nowy komponent

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

    // Statystyki
    const stats = [
        { value: "15+", label: "Sponsorów i Partnerów" },
        { value: "1200+", label: "Kibiców w sezonie" },
        { value: "25k+", label: "Zasięgi miesięcznie" },
        { value: "100%", label: "Pasji i zaangażowania" },
    ];

    return (
        <main className="overflow-x-hidden min-h-screen bg-gradient-to-b from-[#121915]/0 to-[#174135]/15 text-[var(--text-main)]">

            {/* === HERO === */}
            <motion.section
                className="text-center py-24 px-6 bg-[radial-gradient(circle_at_top,rgba(23,65,53,0.3),transparent_70%)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="mx-auto max-w-[800px]">
                    <h1 className="text-[2.75rem] font-extrabold text-[var(--text-main)] uppercase leading-tight mb-4">
                        Oferta Sponsorska
                    </h1>
                    <p className="text-[1.15rem] text-white/75 leading-relaxed mt-4">
                        Zostań częścią sukcesu Kujawianki. Oferujemy elastyczne pakiety współpracy,
                        dopasowane do potrzeb Twojego biznesu.
                    </p>
                </div>
            </motion.section>

            {/* === WARTOŚCI === */}
            <section className="py-20">
                <div className="mx-auto max-w-[1200px] px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                        <motion.div
                            className="text-center md:text-left order-1 md:order-1"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-[2.25rem] font-bold text-[var(--text-main)] uppercase mb-6">
                                Dlaczego My?
                            </h2>
                            <div className="text-[1.1rem] text-[#a0a0a0] leading-[1.7] space-y-4">
                                <p>
                                    Kujawianka to nie tylko klub piłkarski, to społeczność. Wspierając nas,
                                    docierasz do tysięcy zaangażowanych kibiców w regionie i budujesz
                                    pozytywny wizerunek swojej marki jako mecenasa sportu.
                                </p>
                                <p>
                                    Nasz stadion tętni życiem, a nasze media społecznościowe generują
                                    dziesiątki tysięcy zasięgu miesięcznie. To idealne miejsce na reklamę
                                    Twoich usług i produktów.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="order-2 md:order-2"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <img
                                src="/hero.jpg"
                                alt="Mecz Kujawianki"
                                className="w-full h-[400px] object-cover rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* === PAKIETY === */}
            <section className="py-20 bg-[#121915]/20 border-y border-white/10">
                <div className="mx-auto max-w-[1200px] px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-[2.25rem] font-bold text-[var(--text-main)] uppercase mb-6">
                            Pakiety Współpracy
                        </h2>
                        <p className="text-[1.1rem] text-[#a0a0a0] leading-[1.7] max-w-[600px] mx-auto">
                            Wybierz poziom zaangażowania, który najlepiej odpowiada celom Twojej firmy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        {sponsorPackages.map((pkg, i) => (
                            <motion.div
                                key={i}
                                className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 border-t-4 border-t-[#174135] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(23,65,53,0.3)] flex flex-col"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="border-b border-white/10 pb-4 mb-4">
                                    <h3 className="text-[1.5rem] font-bold text-[var(--text-main)] uppercase m-0">
                                        {pkg.title}
                                    </h3>
                                    <div className="text-[0.9rem] text-[#a0a0a0] mt-1">
                                        {pkg.price}
                                    </div>
                                </div>

                                <p className="text-[0.95rem] text-[#a0a0a0] leading-[1.6] mb-6">
                                    {pkg.description}
                                </p>

                                <ul className="flex-grow space-y-3 mb-8">
                                    {pkg.benefits.map((benefit, idx) => (
                                        <li key={idx} className="relative pl-7 text-[0.9rem] text-[var(--text-main)]">
                                            <span className="absolute left-0 top-0 text-[1rem] font-bold text-white">✔</span>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-center mt-auto">
                                    <Link
                                        href="#contact"
                                        className="inline-block w-full py-3 px-6 rounded-lg font-bold uppercase tracking-wide bg-white/5 text-white border border-white/10 transition-all duration-300 hover:bg-[#174135] hover:border-[#174135]"
                                    >
                                        Zapytaj o pakiet
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === STATYSTYKI === */}
            <section className="py-24 px-8 text-center">
                <div className="mx-auto max-w-[1200px]">
                    <h2 className="text-[2.25rem] font-bold text-[var(--text-main)] uppercase mb-12">
                        Kujawianka w liczbach
                    </h2>

                    <div className="flex flex-wrap justify-center gap-16 max-w-[1000px] mx-auto border-y border-white/10 py-10">
                        {stats.map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex flex-col items-center gap-1.5"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="text-[3rem] font-extrabold text-white tracking-wide">
                                    {item.value}
                                </span>
                                <span className="text-[1rem] font-medium text-white/80 uppercase tracking-wide">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === KONTAKT (Używamy komponentu) === */}
            <ContactSection
                title="Skontaktuj się"
                description="Zainteresowała Cię nasza oferta? Masz pytania lub własny pomysł na współpracę? Jesteśmy do Twojej dyspozycji."
            />

        </main>
    );
}