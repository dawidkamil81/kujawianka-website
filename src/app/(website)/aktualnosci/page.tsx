import { client } from "@/sanity/lib/client";
import { ALL_NEWS_QUERY } from "@/sanity/lib/queries";
import { NewsItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import "./News.css";

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
        <section className="news-page">
            <h1 className="news-title">Aktualności</h1>

            {/* --- FEATURED NEWS --- */}
            {featured && (
                <div className="featured-news">
                    <div className="featured-image-wrapper">
                        {featured.imageUrl ? (
                            <Image
                                src={featured.imageUrl}
                                alt={featured.title}
                                fill
                                className="featured-image"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                ⚽
                            </div>
                        )}
                    </div>
                    <div className="featured-content">
                        <p className="news-date">{formatDate(featured.publishedAt)}</p>
                        <h2>{featured.title}</h2>
                        {featured.excerpt && <p className="news-excerpt">{featured.excerpt}</p>}
                        <Link
                            href={`/aktualnosci/${featured.slug}`}
                            className="see-more-btn"
                        >
                            Zobacz więcej →
                        </Link>
                    </div>
                </div>
            )}

            {/* --- DIVIDER --- */}
            {otherNews.length > 0 && (
                <div className="news-divider">
                    <span>Więcej aktualności</span>
                </div>
            )}

            {/* --- GRID OF SMALL NEWS --- */}
            <div className="news-grid">
                {otherNews.map((item) => (
                    <Link
                        href={`/aktualnosci/${item.slug}`}
                        key={item._id}
                        className="small-news-card"
                    >
                        <div className="small-image-wrapper">
                            {item.imageUrl ? (
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    fill
                                    className="small-image"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                    ⚽
                                </div>
                            )}
                        </div>
                        <div className="small-news-content">
                            <p className="news-date">{formatDate(item.publishedAt)}</p>
                            <h3>{item.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>

            {newsList.length === 0 && (
                <p className="text-center text-gray-400 py-10">Brak aktualności.</p>
            )}
        </section>
    );
}