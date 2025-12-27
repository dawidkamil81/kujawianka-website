"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ArrowRight } from "lucide-react";

interface ContactSectionProps {
    title?: string;
    description?: string;
}

export default function ContactSection({
    title = "Skontaktuj się",
    description = "Masz pytania lub propozycję współpracy? Jesteśmy do Twojej dyspozycji."
}: ContactSectionProps) {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Tło sekcji (gradient od dołu) */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(23,65,53,0.2),transparent_70%)] pointer-events-none" />

            <div className="mx-auto max-w-[1200px] px-4 relative z-10">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >

                    {/* Lewa kolumna: Tekst i lista */}
                    <div>
                        <div className="mb-10">
                            <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md mb-4">
                                Kontakt
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase font-montserrat tracking-tight mb-6">
                                {title}
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
                                {description}
                            </p>
                        </div>

                        <ul className="flex flex-col gap-6">
                            {/* Adres */}
                            <li className="group flex items-start gap-5 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/5">
                                <div className="p-3 rounded-xl bg-[#121212] border border-white/10 text-emerald-500 group-hover:text-white group-hover:bg-emerald-600 transition-colors shadow-lg">
                                    <MapPin size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <strong className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1 group-hover:text-gray-300 transition-colors">
                                        Adres Klubu
                                    </strong>
                                    <span className="text-lg font-bold text-white font-montserrat">
                                        ul. Sportowa 1, Izbica Kujawska
                                    </span>
                                </div>
                            </li>

                            {/* E-mail */}
                            <li className="group flex items-start gap-5 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/5">
                                <div className="p-3 rounded-xl bg-[#121212] border border-white/10 text-emerald-500 group-hover:text-white group-hover:bg-emerald-600 transition-colors shadow-lg">
                                    <Mail size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <strong className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1 group-hover:text-gray-300 transition-colors">
                                        E-mail
                                    </strong>
                                    <a href="mailto:biznes@kujawianka.pl" className="text-lg font-bold text-white font-montserrat hover:text-emerald-400 transition-colors flex items-center gap-2">
                                        biznes@kujawianka.pl
                                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                                    </a>
                                </div>
                            </li>

                            {/* Telefon */}
                            <li className="group flex items-start gap-5 p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/5">
                                <div className="p-3 rounded-xl bg-[#121212] border border-white/10 text-emerald-500 group-hover:text-white group-hover:bg-emerald-600 transition-colors shadow-lg">
                                    <Phone size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <strong className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1 group-hover:text-gray-300 transition-colors">
                                        Telefon
                                    </strong>
                                    <a href="tel:+48123456789" className="text-lg font-bold text-white font-montserrat hover:text-emerald-400 transition-colors">
                                        +48 123 456 789
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Prawa kolumna: Mapa */}
                    <div className="relative w-full h-[450px] rounded-3xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl group">
                        {/* Efekt poświaty pod mapą */}
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] opacity-20 pointer-events-none" />

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2282.963350705614!2d18.745801926966166!3d52.42295737045069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471b5d480c17d867%3A0x31ec658c911624ee!2sStadion%20miejski%20w%20Izbicy%20Kujawskiej!5e0!3m2!1spl!2spl!4v1766778734852!5m2!1spl!2spl"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            // Filtr dla "Dark Mode Map" - odwraca kolory i zmniejsza nasycenie
                            className="w-full h-full grayscale-[0.8] invert-[0.85] contrast-[1.2] opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100"
                        />

                        {/* Overlay "Interaktywny" znikający po najechaniu */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                                Zobacz na mapie
                            </span>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}