"use client";
import Image from "next/image";
import Link from "next/link";
import "./NewsTeaser.css";

interface NewsTeaserProps {
    title: string;
    excerpt?: string;
    date?: string;
    imageUrl: string;
    slug: string;
}

export default function NewsTeaser({ title, excerpt, date, imageUrl, slug }: NewsTeaserProps) {
    return (
        <Link href={`/aktualnosci/${slug}`} className="news-teaser-card">
            <div className="news-teaser-image-wrapper">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="news-teaser-image"
                />
            </div>
            <div className="news-teaser-content">
                {date && <p className="news-date">{date}</p>}
                <h3>{title}</h3>
                {excerpt && <p className="news-excerpt">{excerpt}</p>}
                <span className="see-more">Czytaj więcej →</span>
            </div>
        </Link>
    );
}
