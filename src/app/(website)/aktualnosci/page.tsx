import { client } from "@/sanity/lib/client"; // <--- ZMIANA 1: Importujemy 'client'
import { NewsItem } from "@/types";
import NewsCard from "@/components/common/NewsCard";
import HeroNewsSlider from "@/components/Home/HeroNewsSlider";
import { NEWS_PAGE_QUERY } from "@/sanity/lib/queries";

// Helper do daty
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export default async function NewsPage() {
    // === ZMIANA 2 i 3: Używamy client.fetch zamiast sanityFetch ===
    // Dzięki temu możemy przekazać { next: { revalidate: 60 } }
    const newsList = await client.fetch(NEWS_PAGE_QUERY, {}, {
        next: { revalidate: 60 }
    });

    // === DALSZA CZĘŚĆ KODU BEZ ZMIAN ===

    // 1. Wybieramy wszystkie wyróżnione artykuły
    const allHighlighted = newsList.filter((item: NewsItem) => item.isHighlighted === true);

    // 2. Do slidera bierzemy tylko 5 najnowszych wyróżnionych (zgodnie z limitem)
    const sliderNews = allHighlighted.slice(0, 5);

    // ... reszta logiki (otherNews, return JSX) pozostaje identyczna ...
    const sliderIds = new Set(sliderNews.map((item: NewsItem) => item._id));
    const otherNews = newsList.filter((item: NewsItem) => !sliderIds.has(item._id));

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
      bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]"
        >
            {/* ... reszta kodu JSX bez zmian ... */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-0 
        bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.03),transparent_30%)]"
            />

            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="flex flex-col items-center justify-center mb-12 space-y-4">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-club-green/10 border border-club-green/20 text-club-green-light font-bold text-xs uppercase tracking-widest backdrop-blur-md">
                        Co słychać w klubie?
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-montserrat text-center drop-shadow-2xl">
                        Aktualności <span className="text-emerald-500">Klubowe</span>
                    </h1>
                </div>

                {/* SLIDER - TYLKO TOP 5 WYRÓŻNIONYCH */}
                {sliderNews.length > 0 && (
                    <div className="mx-auto mb-20 max-w-5xl">
                        <HeroNewsSlider news={sliderNews} />
                    </div>
                )}

                {/* POZOSTAŁE WPISY (W TYM WYRÓŻNIONE POWYŻEJ LIMITU) */}
                {otherNews.length > 0 && (
                    <div className="relative flex items-center justify-center mb-12">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <span className="relative z-10 bg-[#0e0e0e] px-4 text-sm font-bold uppercase tracking-widest text-gray-500">
                            {sliderNews.length > 0 ? "Pozostałe wpisy" : "Najnowsze wpisy"}
                        </span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherNews.map((item: NewsItem) => (
                        <div key={item._id} className="h-full">
                            <NewsCard
                                title={item.title}
                                slug={typeof item.slug === 'string' ? item.slug : (item.slug as any)?.current || ""}
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