import { defineQuery } from "next-sanity";

// 1. Zawodnicy (pobranie 4 do strony głównej)
export const HOMEPAGE_PLAYERS_QUERY = defineQuery(`
  *[_type == "player"] | order(number asc)[0...4] {
    _id,
    name,
    surname,
    number,
    position,
    "imageUrl": image.asset->url
  }
`);

// 2. Wszyscy zawodnicy (do podstrony Kadra)
export const ALL_PLAYERS_QUERY = defineQuery(`
  *[_type == "player"] | order(number asc) {
    _id,
    name,
    surname,
    number,
    position,
    "imageUrl": image.asset->url
  }
`);

// 3. Mecze (ostatnie i nadchodzące - np. 5 sztuk)
export const MATCHES_QUERY = defineQuery(`
  *[_type == "match"] | order(date desc)[0...5] {
    _id,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    date,
    isFinished,
    competition
  }
`);

// 4. Aktualności (do sekcji News)
export const HOMEPAGE_NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url
  }
`);