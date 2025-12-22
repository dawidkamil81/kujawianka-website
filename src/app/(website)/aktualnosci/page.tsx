import { client } from "@/sanity/lib/client";
import { ALL_NEWS_QUERY } from "@/sanity/lib/queries";
import { NewsItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/common/NewsCard"; // Importujemy Twój nowy komponent

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

    // Wyodrębniamy najnowszy news jako "Featured" (jeśli istnieje)
    const featured = newsList.length > 0 ? newsList[0] : null;
    // Reszta newsów (od drugiego w dół)
    const otherNews = newsList.length > 1 ? newsList.slice(1) : [];

    return (
        <section className="min-h-screen bg-gradient-to-b from-[#0f1916] to-[#182822] px-4 py-20 text-white">
            <h1 className="mb-12 text-center text-4xl font-bold uppercase tracking-widest text-[#00c897] md:text-5xl">
                Aktualności
            </h1>

            {/* --- FEATURED NEWS (Wyróżniony - duży) --- */}
            {featured && (
                <div className="mx-auto mb-16 max-w-6xl">
                    <div className="group relative grid overflow-hidden rounded-2xl bg-white/5 shadow-2xl transition-all hover:bg-white/10 md:grid-cols-2">
                        {/* Obrazek Wyróżniony */}
                        <div className="relative min-h-[300px] w-full overflow-hidden">
                            {featured.imageUrl ? (
                                <Image
                                    src={featured.imageUrl}
                                    alt={featured.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gray-800 text-4xl">
                                    ⚽
                                </div>
                            )}
                        </div>

                        {/* Treść Wyróżniona */}
                        <div className="flex flex-col justify-center p-8 md:p-12">
                            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#00c897]">
                                {formatDate(featured.publishedAt)}
                            </p>
                            <h2 className="mb-4 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
                                {featured.title}
                            </h2>
                            {featured.excerpt && (
                                <p className="mb-6 text-gray-300 opacity-90 leading-relaxed line-clamp-3">
                                    {featured.excerpt}
                                </p>
                            )}
                            <Link
                                href={`/aktualnosci/${featured.slug}`}
                                className="self-start rounded-lg border border-[#00c897] px-6 py-2 text-sm font-bold uppercase tracking-wide text-[#00c897] transition-colors hover:bg-[#00c897] hover:text-[#0e1916]"
                            >
                                Czytaj dalej →
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* --- DIVIDER --- */}
            {otherNews.length > 0 && (
                <div className="relative mx-auto mb-12 mt-16 max-w-4xl text-center">
                    <span className="relative z-10 bg-[#14201d] px-6 text-sm font-bold uppercase tracking-widest text-gray-400">
                        Więcej aktualności
                    </span>
                    <div className="absolute top-1/2 left-0 -z-0 h-px w-full bg-white/10"></div>
                </div>
            )}

            {/* --- GRID (Siatka kafelków) --- */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {otherNews.map((item) => (
                    // Używamy tutaj Twojego nowego komponentu NewsCard
                    <div key={item._id} className="h-full">
                        <NewsCard
                            title={item.title}
                            // UWAGA: Sprawdź czy item.slug to string, czy obiekt {current: string}. 
                            // Jeśli w Sanity slug jest obiektem, użyj item.slug.current
                            slug={typeof item.slug === 'object' && item.slug !== null && 'current' in item.slug ? (item.slug as any).current : item.slug}
                            imageUrl={item.imageUrl || ""}
                            date={formatDate(item.publishedAt)}
                            compact={true} // Włączamy tryb kompaktowy na liście
                        />
                    </div>
                ))}
            </div>

            {newsList.length === 0 && (
                <p className="text-center text-gray-400 py-20 text-lg">
                    Brak aktualności w tej chwili.
                </p>
            )}
        </section>
    );
}