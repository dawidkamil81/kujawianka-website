"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

interface ContactSectionProps {
    title?: string;
    description?: string;
}

export default function ContactSection({
    title = "Skontaktuj się",
    description = "Masz pytania lub propozycję współpracy? Jesteśmy do Twojej dyspozycji."
}: ContactSectionProps) {
    return (
        <section id="contact" className="py-24 bg-[radial-gradient(circle_at_bottom,rgba(23,65,53,0.3),transparent_70%)] border-t border-white/5">
            <div className="mx-auto max-w-[1200px] px-8">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >

                    {/* Lewa kolumna: Tekst i lista */}
                    <div>
                        <h2 className="text-[2.25rem] font-bold text-[var(--text-main)] uppercase mb-6">
                            {title}
                        </h2>
                        <p className="text-[1.1rem] text-[#a0a0a0] leading-[1.7] mb-10">
                            {description}
                        </p>

                        <ul className="flex flex-col gap-8">
                            <li className="flex items-center gap-5">
                                <MapPin className="text-[1.75rem] text-[#174135]" />
                                <div className="flex flex-col">
                                    <strong className="text-[0.9rem] text-[#a0a0a0] uppercase font-medium tracking-wide mb-1">Adres</strong>
                                    <span className="text-[1.1rem] font-medium text-[var(--text-main)]">ul. Sportowa 1, Izbica Kujawska</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-5">
                                <Mail className="text-[1.75rem] text-[#174135]" />
                                <div className="flex flex-col">
                                    <strong className="text-[0.9rem] text-[#a0a0a0] uppercase font-medium tracking-wide mb-1">E-mail</strong>
                                    <a href="mailto:biznes@kujawianka.pl" className="text-[1.1rem] font-medium text-[var(--text-main)] hover:text-[#174135] transition-colors">biznes@kujawianka.pl</a>
                                </div>
                            </li>
                            <li className="flex items-center gap-5">
                                <Phone className="text-[1.75rem] text-[#174135]" />
                                <div className="flex flex-col">
                                    <strong className="text-[0.9rem] text-[#a0a0a0] uppercase font-medium tracking-wide mb-1">Telefon</strong>
                                    <a href="tel:+48123456789" className="text-[1.1rem] font-medium text-[var(--text-main)] hover:text-[#174135] transition-colors">+48 123 456 789</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Prawa kolumna: Mapa */}
                    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2448.86813291583!2d18.76104961579331!3d52.41703297980208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471b48325a7a5c5d%3A0x6b7713437194f8e6!2sStadion%20Miejski!5e0!3m2!1spl!2spl!4v1668160000000!5m2!1spl!2spl" // Pamiętaj, aby podmienić to na poprawny link embed z Google Maps
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full grayscale-[0.6] invert-[0.9]"
                        />
                    </div>

                </motion.div>
            </div>
        </section>
    );
}