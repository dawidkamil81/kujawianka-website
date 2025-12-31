"use client";

import { motion } from "framer-motion";
import {
    MapPin,
    Users,
    Calendar,
    Trees,
    Shield,
    Trophy,
    Star,
    Medal,
    Phone,
    Mail,
    User,
    Briefcase
} from "lucide-react";

export default function ClubPage() {
    return (
        // === GŁÓWNY WRAPPER (Spójny z Home/News/Results) ===
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]">

            {/* Ozdobny particle */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]" />

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">

                {/* === NAGŁÓWEK STRONY === */}
                <motion.div
                    className="flex flex-col items-center justify-center mb-20 space-y-5"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Tradycja • Pasja • Wspólnota
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        Kujawianka <span className="text-emerald-500">Izbica Kujawska</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-center text-sm md:text-base font-medium">
                        Duma regionu, serce miasta. Poznaj historię i dom naszego klubu.
                    </p>
                </motion.div>

                {/* === SEKCJA 1: O KLUBIE === */}
                <motion.section
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 border-b border-white/5 pb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    {/* Tekst */}
                    <div className="order-2 lg:order-1 flex flex-col gap-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-club-green/10 rounded-lg border border-club-green/20">
                                <Shield className="text-club-green" size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase font-montserrat tracking-tight">
                                Historia i <span className="text-emerald-500">Misja</span>
                            </h2>
                        </div>

                        <div className="space-y-4 text-gray-400 text-base md:text-lg leading-relaxed">
                            <p>
                                <strong className="text-white">Kujawianka</strong> to nie tylko klub piłkarski, to wieloletnia tradycja, która od lat stanowi serce naszej lokalnej społeczności. Naszym celem jest nieustanny rozwój młodych talentów, promocja zdrowego ducha rywalizacji oraz integracja mieszkańców poprzez wspólną, nierozerwalną pasję do futbolu.
                            </p>
                            <p>
                                W miejscowości działa Miejsko-Gminny Klub Sportowy "Kujawianka", założony w 1949 r. Klub w sezonie 2015/16 występował w III lidze, gr. kujawsko-pomorsko-wielkopolskiej. Aktualnie (sezon 2023/2024) występuje w IV lidze, gr. kujawsko-pomorskiej.
                            </p>
                        </div>
                    </div>

                    {/* Zdjęcie */}
                    <div className="order-1 lg:order-2 relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-club-green/20 to-transparent rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl aspect-video lg:aspect-[4/3]">
                            <img
                                src="/hero.jpg"
                                alt="Drużyna Kujawianki"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                </motion.section>

                {/* === SEKCJA 2: OSIĄGNIĘCIA (Nowa) === */}
                <motion.section
                    className="mb-32"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="p-3 bg-yellow-500/10 rounded-full mb-4 border border-yellow-500/20">
                            <Trophy className="text-yellow-500" size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase font-montserrat tracking-tight mb-2">
                            Sukcesy i <span className="text-yellow-500">Osiągnięcia</span>
                        </h2>
                        <div className="h-1 w-20 bg-yellow-500 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Karta 1 */}
                        <div className="p-8 rounded-3xl bg-[#121212] border border-white/5 hover:border-yellow-500/30 transition-all group text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-[40px] rounded-full group-hover:bg-yellow-500/10 transition-colors" />
                            <Star className="text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-xl font-bold text-white mb-2">III Liga Polska</h3>
                            <p className="text-gray-400 text-sm">
                                Historyczny awans i występy w sezonie 2015/2016 (gr. kujawsko-pomorsko-wielkopolska).
                            </p>
                        </div>

                        {/* Karta 2 */}
                        <div className="p-8 rounded-3xl bg-[#121212] border border-white/5 hover:border-yellow-500/30 transition-all group text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-[40px] rounded-full group-hover:bg-yellow-500/10 transition-colors" />
                            <Medal className="text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-xl font-bold text-white mb-2">75 Lat Tradycji</h3>
                            <p className="text-gray-400 text-sm">
                                Nieprzerwana działalność sportowa od 1949 roku, kształtująca pokolenia sportowców.
                            </p>
                        </div>

                        {/* Karta 3 */}
                        <div className="p-8 rounded-3xl bg-[#121212] border border-white/5 hover:border-yellow-500/30 transition-all group text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 blur-[40px] rounded-full group-hover:bg-yellow-500/10 transition-colors" />
                            <Trophy className="text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform" size={40} />
                            <h3 className="text-xl font-bold text-white mb-2">Puchar Polski</h3>
                            <p className="text-gray-400 text-sm">
                                Wielokrotny zdobywca Pucharu Polski na szczeblu okręgowym i wojewódzkim.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* === SEKCJA 3: STADION === */}
                <motion.section
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 border-b border-white/5 pb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    {/* Zdjęcie (Lewa strona na desktopie) */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-bl from-[#8d1010]/20 to-transparent rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl aspect-video lg:aspect-[4/3]">
                            <img
                                src="/stadium.jpg"
                                alt="Stadion Miejski w Izbicy Kujawskiej"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60" />

                            {/* Badge na zdjęciu */}
                            <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                                <MapPin className="text-red-500" size={18} />
                                <span className="text-white font-bold text-sm uppercase tracking-wide">ul. Sportowa 12</span>
                            </div>
                        </div>
                    </div>

                    {/* Tekst i Detale */}
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#8d1010]/10 rounded-lg border border-[#8d1010]/20">
                                <MapPin className="text-[#8d1010]" size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white uppercase font-montserrat tracking-tight">
                                Nasz <span className="text-red-500">Stadion</span>
                            </h2>
                        </div>

                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            Nasz obiekt położony jest w samym sercu miasta i od lat stanowi arenę niezapomnianych emocji. To tutaj bije serce Izbicy Kujawskiej podczas dni meczowych. Stadion jest miejscem spotkań całych pokoleń kibiców.
                        </p>

                        {/* Grid Detali (Kafelki) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 group-hover:text-emerald-500 transition-colors">
                                    <Users size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Pojemność</span>
                                </div>
                                <span className="text-xl font-bold text-white">800 Miejsc</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 group-hover:text-emerald-500 transition-colors">
                                    <Calendar size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Otwarcie</span>
                                </div>
                                <span className="text-xl font-bold text-white">1984 Rok</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 group-hover:text-emerald-500 transition-colors">
                                    <Trees size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Murawa</span>
                                </div>
                                <span className="text-xl font-bold text-white">Naturalna</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-[#121212] border border-white/5 hover:border-white/10 transition-colors group">
                                <div className="flex items-center gap-3 mb-2 text-gray-500 group-hover:text-emerald-500 transition-colors">
                                    <MapPin size={20} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Lokalizacja</span>
                                </div>
                                <span className="text-xl font-bold text-white">Centrum</span>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* === SEKCJA 4: ZARZĄD (Nowa) === */}
                <motion.section
                    className="mb-32"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="p-3 bg-blue-500/10 rounded-full mb-4 border border-blue-500/20">
                            <Briefcase className="text-blue-500" size={32} />
                        </div>
                        <h2 className="text-3xl font-black text-white uppercase font-montserrat tracking-tight mb-2">
                            Władze <span className="text-blue-500">Klubu</span>
                        </h2>
                        <div className="h-1 w-20 bg-blue-500 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Członek Zarządu 1 */}
                        {['Prezes Zarządu', 'Wiceprezes', 'Skarbnik', 'Sekretarz'].map((role, idx) => (
                            <div key={idx} className="p-6 rounded-2xl bg-[#121212] border border-white/5 hover:border-blue-500/30 transition-colors group flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <User className="text-gray-400 group-hover:text-blue-500 transition-colors" size={40} />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-1">Jan Kowalski</h4>
                                <p className="text-sm font-bold uppercase tracking-wider text-blue-500">{role}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* === SEKCJA 5: KONTAKT (Nowa) === */}


            </div>
        </main>
    );
}