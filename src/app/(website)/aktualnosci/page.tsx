import { client } from "@/sanity/lib/client";
import { NewsItem } from "@/types";
import NewsCard from "@/components/common/NewsCard";
import HeroNewsSlider from "@/components/Home/HeroNewsSlider";
import Pagination from "@/components/common/Pagination";
import {
    NEWS_SLIDER_QUERY,
    NEWS_PAGINATED_QUERY,
    NEWS_COUNT_QUERY
} from "@/sanity/lib/queries";

// Helper do daty
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const ITEMS_PER_PAGE = 9;

interface PageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function NewsPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;

    const sliderNews: NewsItem[] = await client.fetch(NEWS_SLIDER_QUERY, {}, {
        next: { revalidate: 60 }
    });

    const sliderIds = sliderNews.map((item) => item._id);

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    const [paginatedNews, totalCount] = await Promise.all([
        client.fetch(NEWS_PAGINATED_QUERY,
            { excludeIds: sliderIds, start, end },
            { next: { revalidate: 60 } }
        ),
        client.fetch(NEWS_COUNT_QUERY,
            { excludeIds: sliderIds },
            { next: { revalidate: 60 } }
        )
    ]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
        <main className="flex flex-col min-h-screen w-full text-white bg-[#0e0e0e] 
      bg-[radial-gradient(circle_at_20%_20%,rgba(23,65,53,0.25),transparent_40%),linear-gradient(135deg,#0e0e0e_0%,rgba(141,16,16,0.05))]"
        >
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

                {currentPage === 1 && sliderNews.length > 0 && (
                    <div className="mx-auto mb-20 max-w-5xl">
                        <HeroNewsSlider news={sliderNews} />
                    </div>
                )}

                {/* NAGŁÓWEK LISTY (PEŁNA SZEROKOŚĆ) */}
                {(paginatedNews.length > 0 || currentPage > 1) && (
                    <div className="flex items-center justify-center mb-12 gap-4 w-full">
                        {/* Lewa linia (usunęliśmy max-w-[200px]) */}
                        <div className="h-px bg-white/10 flex-1"></div>

                        {/* Tekst */}
                        <span className="text-sm font-bold uppercase tracking-widest text-gray-500 whitespace-nowrap px-4">
                            {currentPage === 1 && sliderNews.length > 0
                                ? "Pozostałe wpisy"
                                : `Wpisy - Strona ${currentPage}`}
                        </span>

                        {/* Prawa linia (usunęliśmy max-w-[200px]) */}
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {paginatedNews.map((item: NewsItem) => (
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

                {paginatedNews.length === 0 && currentPage === 1 && sliderNews.length === 0 && (
                    <div className="py-20 text-center border border-white/5 rounded-3xl bg-white/5">
                        <p className="text-gray-400 text-lg italic">
                            Brak aktualności w tej chwili.
                        </p>
                    </div>
                )}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </main>
    );
}