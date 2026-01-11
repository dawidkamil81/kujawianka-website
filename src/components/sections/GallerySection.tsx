"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom"; // Importujemy Portal
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Maximize2, ImageIcon, X } from "lucide-react";

// Mapa kolumn
const gridColsMap: Record<string, string> = {
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-2 lg:grid-cols-3",
    "4": "md:grid-cols-2 lg:grid-cols-4"
};

interface GallerySectionProps {
    data: {
        heading?: string;
        description?: string;
        columns?: string;
        images?: any[];
    };
}

export default function GallerySection({ data }: GallerySectionProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false); // Stan do obsługi Portalu

    // Upewniamy się, że kod uruchamia się tylko w przeglądarce (Client Side)
    useEffect(() => {
        setMounted(true);
    }, []);

    const gridClass = gridColsMap[data.columns || "3"];
    const images = data.images || [];

    if (images.length === 0) return null;

    return (
        <>
            <section className="py-20 container mx-auto px-4 relative z-10">
                {/* Nagłówek i Opis */}
                {(data.heading || data.description) && (
                    <div className="flex flex-col gap-4 mb-12">
                        {data.heading && (
                            <div className="flex items-center gap-4">
                                <h3 className="text-2xl font-bold text-white uppercase font-montserrat tracking-widest pl-4 border-l-4 border-emerald-500">
                                    {data.heading}
                                </h3>
                                <div className="h-[1px] flex-grow bg-white/10"></div>
                            </div>
                        )}
                        {data.description && (
                            <p className="text-gray-400 text-sm md:text-base max-w-2xl">
                                {data.description}
                            </p>
                        )}
                    </div>
                )}

                {/* Siatka Zdjęć */}
                <div className={`grid grid-cols-1 gap-6 md:gap-8 ${gridClass}`}>
                    {images.map((image: any, index: number) => (
                        <motion.div
                            key={image._key || index}
                            onClick={() => setSelectedImage(urlFor(image).url())}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            // DODANO: cursor-pointer tutaj
                            className="group relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#121212] shadow-lg hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 cursor-pointer"
                        >
                            <Image
                                src={urlFor(image).url()}
                                alt={image.alt || "Zdjęcie z galerii"}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Ikona Lupy */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                                <div className="w-14 h-14 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/50 flex items-center justify-center text-white shadow-xl">
                                    <Maximize2 size={24} />
                                </div>
                            </div>

                            {/* Podpis */}
                            {image.alt && (
                                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <ImageIcon size={14} className="text-emerald-400" />
                                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                            Galeria
                                        </span>
                                    </div>
                                    <p className="text-white font-bold font-montserrat text-lg leading-tight">
                                        {image.alt}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- PORTAL LIGHTBOX --- */}
            {/* Renderujemy to tylko gdy komponent jest zamontowany w przeglądarce */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            // Bardzo wysoki Z-index, aby przykryć Header (zazwyczaj z-50)
                            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md cursor-zoom-out"
                            onClick={() => setSelectedImage(null)}
                        >
                            {/* Przycisk zamknięcia */}
                            <button className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50">
                                <X size={32} />
                            </button>

                            {/* Obrazek */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative w-full h-full flex items-center justify-center p-4"
                                onClick={(e) => e.stopPropagation()} // Kliknięcie w zdjęcie nie zamyka
                            >
                                <img
                                    src={selectedImage}
                                    alt="Powiększenie"
                                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body // Wstrzykujemy bezpośrednio do <body>
            )}
        </>
    );
}