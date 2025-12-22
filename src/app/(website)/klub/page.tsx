"use client";

import { motion } from "framer-motion";

export default function ClubPage() {
    return (
        // .club
        <section className="relative overflow-hidden py-16 px-6 md:px-8 min-h-screen text-white bg-[#0e0e0e] 
      bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.2),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,#1a1a1a_100%)]"
        >

            {/* .club::before - Efekt świetlny w tle */}
            <div className="pointer-events-none absolute inset-0 z-0 
        bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(141,16,16,0.05),transparent_40%)]"
            />

            {/* .club-container */}
            <div className="relative z-10 mx-auto max-w-[1100px]">

                {/* .club-header */}
                <motion.header
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* .club-title */}
                    <h1 className="text-3xl md:text-[2.5rem] font-extrabold uppercase tracking-tight text-white mb-2">
                        Kujawianka Izbica Kujawska
                    </h1>
                    {/* .club-subtitle */}
                    <p className="text-lg md:text-[1.1rem] font-medium text-[#8d1010] tracking-[1px] opacity-90">
                        Tradycja • Pasja • Wspólnota
                    </p>
                </motion.header>

                {/* === SEKCJA O KLUBIE === */}
                {/* .club-section */}
                <motion.section
                    className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* .club-info */}
                    <div className="order-2 md:order-1">
                        {/* .club-heading */}
                        <h2 className="text-2xl md:text-[1.6rem] font-bold text-[#174135] uppercase mb-6 border-l-4 border-[#8d1010] pl-4">
                            O klubie
                        </h2>

                        <div className="space-y-4 text-gray-300 leading-[1.7] text-[1rem]">
                            <p>
                                Kujawianka to lokalny klub piłkarski z wieloletnią tradycją, który od lat stanowi serce
                                naszej społeczności. Naszym celem jest rozwój młodych talentów, promocja sportowego ducha
                                oraz integracja mieszkańców poprzez wspólną pasję do futbolu.
                            </p>
                            <p>
                                Klub został założony z miłości do piłki nożnej i z ideą, że sport to nie tylko rywalizacja,
                                ale przede wszystkim przyjaźń, szacunek i praca zespołowa. Dziś Kujawianka to nie tylko drużyna,
                                ale cała społeczność — zawodnicy, trenerzy, kibice i wolontariusze, którzy tworzą wyjątkową atmosferę.
                            </p>
                        </div>
                    </div>

                    {/* .club-image-wrapper */}
                    <div className="order-1 md:order-2 relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.3)] group aspect-video md:aspect-auto h-full min-h-[300px]">
                        <img
                            src="/hero.jpg"
                            alt="Zdjęcie drużyny Kujawianka"
                            // .club-image
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </motion.section>

                {/* === SEKCJA O STADIONIE === */}
                {/* .stadium-section */}
                <motion.section
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {/* .club-heading */}
                    <h2 className="text-2xl md:text-[1.6rem] font-bold text-[#174135] uppercase mb-8 border-l-4 border-[#8d1010] pl-4">
                        Stadion
                    </h2>

                    {/* .stadium-grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                        {/* .stadium-info */}
                        <div className="text-gray-300 leading-[1.7] text-[1rem]">
                            <p className="mb-6">
                                Nasz stadion położony jest w samym sercu miasta i od lat stanowi miejsce emocjonujących
                                meczów, rodzinnych spotkań oraz sportowych wydarzeń. Posiada trybunę dla 800 widzów, zaplecze
                                treningowe oraz boisko ze sztuczną nawierzchnią.
                            </p>

                            {/* .stadium-details */}
                            <ul className="space-y-3 bg-white/5 p-6 rounded-xl border border-white/5">
                                <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                    <span className="font-bold text-white min-w-[120px]">Adres:</span>
                                    <span className="text-gray-400">ul. Sportowa 12, Izbica Kujawska</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="font-bold text-white min-w-[120px]">Pojemność:</span>
                                    <span className="text-gray-400">800 miejsc</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="font-bold text-white min-w-[120px]">Rok otwarcia:</span>
                                    <span className="text-gray-400">1984</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="font-bold text-white min-w-[120px]">Nawierzchnia:</span>
                                    <span className="text-gray-400">trawa naturalna</span>
                                </li>
                            </ul>
                        </div>

                        {/* .stadium-map */}
                        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.3)] aspect-video md:h-full min-h-[300px]">
                            <img
                                src="/stadium.jpg"
                                alt="Stadion Kujawianki"
                                // .stadium-image
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </motion.section>

            </div>
        </section>
    );
}