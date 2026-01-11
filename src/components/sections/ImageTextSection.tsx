"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export default function ImageTextSection({ data }: { data: any }) {
    // Sprawdzamy układ wybrany w CMS (lewo/prawo)
    const isImageRight = data.layout === 'right';

    return (
        <motion.section
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
        >
            {/* --- KOLUMNA Z TEKSTEM --- */}
            {/* items-center centruje elementy w pionie (stack), ale tekst wewnątrz formatujemy osobno */}
            <div className={`flex flex-col gap-6 items-center ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>

                {/* Nagłówek - wyśrodkowany */}
                {data.heading && (
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase font-montserrat tracking-tight drop-shadow-xl text-center">
                        {data.heading}
                    </h2>
                )}

                {/* Treść - wyjustowana (text-justify) */}
                <div className="prose prose-invert max-w-none text-gray-400 text-base md:text-lg leading-relaxed text-justify hyphens-auto">
                    <PortableText value={data.content} />
                </div>
            </div>

            {/* --- KOLUMNA ZE ZDJĘCIEM --- */}
            <div className={`relative group w-full ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>

                {/* Ozdobna poświata pod zdjęciem */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Kontener zdjęcia */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-video lg:aspect-[4/3] bg-white/5">
                    {data.image && (
                        <Image
                            src={urlFor(data.image).url()}
                            alt={data.heading || "Zdjęcie sekcji"}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={95}
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    )}

                    {/* Ciemny gradient na dole zdjęcia */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>
            </div>

        </motion.section>
    );
}