import { defineQuery } from "next-sanity";


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

// ... poprzednie importy i zapytania

// 3. Zapytanie do NEWSÓW NA STRONĘ GŁÓWNĄ
// Pobiera 3 najnowsze wpisy
// ... (poprzednie importy i zapytania do zawodników)

// 3. NEWSY NA STRONĘ GŁÓWNĄ (Teaser - 3 najnowsze)
export const HOMEPAGE_NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(publishedAt desc)[0...2] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url
  }
`);

// 4. WSZYSTKIE NEWSY (Dla strony /aktualnosci)
export const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url
  }
`);