"use client";
import "./News.css";
import Image from "next/image";
import Link from "next/link";

export default function News() {
    const featured = {
        id: 1,
        title: "Kujawianka wygrywa derby 3:1 z LKS Brześć!",
        date: "25 października 2025",
        excerpt:
            "Nasi seniorzy pokazali charakter w derbowym meczu, zdobywając ważne 3 punkty! Sprawdź relację z tego emocjonującego spotkania.",
        image: "/art3.jpg",
        slug: "kujawianka-wygrywa-derby",
    };

    const newsList = [
        {
            id: 2,
            title: "Trampkarze kończą sezon na podium!",
            date: "22 października 2025",
            image: "/art2.jpg",
            slug: "trampkarze-na-podium",
        },
        {
            id: 3,
            title: "Nowe stroje meczowe dla seniorów",
            date: "18 października 2025",
            image: "/art1.jpg",
            slug: "nowe-stroje-dla-seniorow",
        },
        {
            id: 4,
            title: "Kujawianka II wygrywa na wyjeździe!",
            date: "15 października 2025",
            image: "/art4.jpg",
            slug: "kujawianka-ii-wyjazdowe-zwyciestwo",
        },
        {
            id: 5,
            title: "Kujawianka U13 melduje się w półfinale turnieju!",
            date: "12 października 2025",
            image: "/art5.jpg",
            slug: "kujawianka-u13-polfinal",
        },
        {
            id: 6,
            title: "Nowy partner klubu – witamy sponsora!",
            date: "8 października 2025",
            image: "/art6.jpg",
            slug: "nowy-partner-klubu",
        },
        {
            id: 7,
            title: "Plan sparingów przed rundą wiosenną",
            date: "2 października 2025",
            image: "/art7.jpg",
            slug: "plan-sparingow-wiosna",
        },
    ];

    return (
        <section className="news-page">
            <h1 className="news-title">Aktualności</h1>

            {/* --- FEATURED NEWS --- */}
            <div className="featured-news">
                <div className="featured-image-wrapper">
                    <Image
                        src={featured.image}
                        alt={featured.title}
                        fill
                        className="featured-image"
                    />
                </div>
                <div className="featured-content">
                    <p className="news-date">{featured.date}</p>
                    <h2>{featured.title}</h2>
                    <p className="news-excerpt">{featured.excerpt}</p>
                    <Link href={`/aktualnosci/${featured.slug}`} className="see-more-btn">
                        Zobacz więcej →
                    </Link>
                </div>
            </div>

            {/* --- DIVIDER --- */}
            <div className="news-divider">
                <span>Więcej aktualności</span>
            </div>

            {/* --- GRID OF SMALL NEWS --- */}
            <div className="news-grid">
                {newsList.map((item) => (
                    <Link
                        href={`/aktualnosci/${item.slug}`}
                        key={item.id}
                        className="small-news-card"
                    >
                        <div className="small-image-wrapper">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="small-image"
                            />
                        </div>
                        <div className="small-news-content">
                            <p className="news-date">{item.date}</p>
                            <h3>{item.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
