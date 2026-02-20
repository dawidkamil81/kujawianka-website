export const revalidate = 60;

import { sanityFetch } from "@/sanity/lib/live";
import { SINGLE_NEWS_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { PortableText, PortableTextComponents } from "next-sanity";

// Konfiguracja stylów dla treści (Portable Text)
const components: PortableTextComponents = {
    block: {
        // Zwiększamy interlinię (leading-relaxed) i jasność tekstu dla lepszej czytelności
        normal: ({ children }) => <p className="mb-6 text-gray-300 text-lg leading-relaxed">{children}</p>,
        h2: ({ children }) => <h2 className="text-3xl font-bold text-white mt-12 mb-6 font-montserrat">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold text-emerald-400 mt-8 mb-4 font-montserrat">{children}</h3>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-club-green pl-6 italic text-xl text-gray-400 my-10 bg-white/5 p-6 rounded-r-xl">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 text-gray-300 text-lg space-y-3">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-6 text-gray-300 text-lg space-y-3">{children}</ol>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
        link: ({ value, children }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined} className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors">
                    {children}
                </a>
            )
        },
    },
}

// Helper do daty
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function NewsArticlePage({ params }: Props) {
    const { slug } = await params;
    const { data: news } = await sanityFetch({
        query: SINGLE_NEWS_QUERY,
        params: { slug }
    });

    if (!news) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-[#0e0e0e] text-white pb-20">

            {/* === HERO SECTION === */}
            <div className="relative w-full h-[60vh] min-h-[500px]">
                {/* Zdjęcie w tle */}
                {news.imageUrl ? (
                    <Image
                        src={news.imageUrl}
                        alt={news.title}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50" />
                )}

                {/* Gradient od dołu */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />

                {/* Treść nagłówka */}
                <div className="absolute bottom-0 left-0 w-full p-4 pb-16">
                    <div className="container mx-auto max-w-4xl">
                        <Link
                            href="/aktualnosci"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 mb-8 transition-colors bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm"
                        >
                            <ArrowLeft size={16} />
                            Wróć do aktualności
                        </Link>

                        <div className="flex items-center gap-2 text-base text-gray-300 mb-6 font-medium">
                            <Calendar size={18} className="text-club-green" />
                            {formatDate(news.publishedAt)}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black uppercase font-montserrat leading-tight drop-shadow-2xl">
                            {news.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* === TREŚĆ ARTYKUŁU === */}
            <div className="container mx-auto px-4 mt-12">
                {/* Kontener wyśrodkowany, bez paska bocznego */}
                <div className="max-w-4xl mx-auto">

                    {/* Usunięto news.excerpt (krótki opis) zgodnie z życzeniem */}

                    {/* Właściwa treść z Portable Text */}
                    {/* Dodano klasy md:prose-xl dla większego tekstu na desktopie */}
                    <div className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-montserrat prose-headings:uppercase prose-p:text-gray-300 prose-strong:text-white prose-a:text-club-green">
                        {news.content && <PortableText value={news.content} components={components} />}
                    </div>

                    {/* Sekcja końcowa / Podpis / Powrót */}
                    <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                        <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                            Kujawianka Izbica
                        </span>
                        <Link
                            href="/aktualnosci"
                            className="text-white hover:text-club-green font-bold transition-colors"
                        >
                            Wszystkie aktualności
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}