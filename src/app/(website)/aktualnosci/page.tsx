import { client } from "@/sanity/lib/client";
import { ALL_NEWS_QUERY } from "@/sanity/lib/queries";
import { NewsItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/common/NewsCard";
import { Calendar, ArrowRight } from "lucide-react"; // Dodajemy ikonki dla lepszego stylu

// Funkcja pomocnicza do formatowania daty
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export default async function NewsPage() {
    // Pobieramy dane z Sanity
    const newsList = await client.fetch<NewsItem[]>(ALL_NEWS_QUERY);

    // Wyodrębniamy najnowszy news jako "Featured"
    const featured = newsList.length > 0 ? newsList[0] : null;
    // Reszta newsów
    const otherNews = newsList.length > 1 ? newsList.slice(1) : [];

    return (
        // === TŁO I GŁÓWNY WRAPPER (Identyczne jak w Home.tsx) ===
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
        bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]">

            {/* Ozdobny particle (opcjonalnie, dla spójności) */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
            bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]" />

            <div className="relative z-10 container mx-auto px-4 py-20">

                {/* === NAGŁÓWEK === */}
                <div className="flex flex-col items-center justify-center mb-16 space-y-4">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Co słychać w klubie?
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        Aktualności <span className="text-emerald-500">Klubowe</span>
                    </h1>
                </div>

                {/* --- FEATURED NEWS (Wyróżniony) --- */}
                {featured && (
                    <div className="mx-auto mb-20 max-w-6xl">
                        {/* Stylizacja karty nawiązuje do Hero/MatchCenter: Border + Glow on Hover */}
                        <Link
                            href={`/aktualnosci/${typeof featured.slug === 'object' && featured.slug !== null && 'current' in featured.slug ? (featured.slug as any).current : featured.slug}`}
                            className="group relative grid md:grid-cols-[1.2fr_1fr] overflow-hidden rounded-3xl bg-[#121212] border border-white/10 shadow-2xl hover:border-club-green/30 hover:shadow-[0_0_30px_rgba(23,65,53,0.2)] transition-all duration-500"
                        >

                            {/* Lewa: Obrazek */}
                            <div className="relative min-h-[300px] md:min-h-[450px] w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />
                                {featured.imageUrl ? (
                                    <Image
                                        src={featured.imageUrl}
                                        alt={featured.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        priority // Ważne dla LCP (Largest Contentful Paint)
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-club-green/10 text-4xl text-white/20">
                                        <Image src="/logo.png" width={100} height={100} alt="Logo" className="opacity-20 grayscale" />
                                    </div>
                                )}
                                {/* Badge na zdjęciu */}
                                <div className="absolute top-4 left-4 z-20 bg-club-red text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    WYRÓŻNIONE
                                </div>
                            </div>

                            {/* Prawa: Treść */}
                            <div className="relative flex flex-col justify-center p-8 md:p-12 z-20">
                                {/* Ozdobne tło gradientowe wewnątrz treści */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#121212] to-[#0a0a0a] -z-10" />

                                <div className="flex items-center gap-2 mb-4 text-club-green-light font-bold text-sm uppercase tracking-widest">
                                    <Calendar size={16} />
                                    {formatDate(featured.publishedAt)}
                                </div>

                                <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-black leading-[1.1] text-white font-montserrat group-hover:text-emerald-400 transition-colors">
                                    {featured.title}
                                </h2>

                                {featured.excerpt && (
                                    <p className="mb-8 text-gray-400 leading-relaxed line-clamp-3 md:line-clamp-4 text-base md:text-lg">
                                        {featured.excerpt}
                                    </p>
                                )}

                                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wide group-hover:gap-4 transition-all">
                                    Czytaj artykuł
                                    <ArrowRight className="text-club-green" size={18} />
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* --- DIVIDER --- */}
                {otherNews.length > 0 && (
                    <div className="relative flex items-center justify-center mb-12">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <span className="relative z-10 bg-[#0e0e0e] px-4 text-sm font-bold uppercase tracking-widest text-gray-500">
                            Poprzednie wpisy
                        </span>
                    </div>
                )}

                {/* --- GRID (Siatka kafelków) --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherNews.map((item) => (
                        <div key={item._id} className="h-full">
                            {/* Zakładam, że NewsCard przyjmuje propsy w stylu komponentów Home */}
                            <NewsCard
                                title={item.title}
                                slug={typeof item.slug === 'object' && item.slug !== null && 'current' in item.slug ? (item.slug as any).current : item.slug}
                                imageUrl={item.imageUrl || ""}
                                date={formatDate(item.publishedAt)}
                                compact={false}
                            />
                        </div>
                    ))}
                </div>

                {newsList.length === 0 && (
                    <div className="py-20 text-center border border-white/5 rounded-3xl bg-white/5">
                        <p className="text-gray-400 text-lg italic">
                            Brak aktualności w tej chwili.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}