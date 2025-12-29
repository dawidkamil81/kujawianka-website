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

// ... (poprzednie zapytania)

export const ALL_SPONSORS_QUERY = defineQuery(`
  *[_type == "sponsor"] {
    _id,
    name,
    tier,
    "logoUrl": logo.asset->url,
    website,
    description,
    "backgroundImageUrl": backgroundImage.asset->url
  }
`);

// ... inne zapytania

export const RESULTS_PAGE_QUERY = defineQuery(`
  {
    "table": *[_id == "tabela-ligowa-glowna"][0] {
      season,
      rows[] {
        "_key": _key,
        position,
        teamName,
        matches,
        points,
        won,
        drawn,
        lost,
        goals
      }
    },
    "matches": *[_type == "result"] | order(round asc) {
      _id,
      round,
      date,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      "isFinished": defined(homeScore)
    },
    // Pobieramy bazę zespołów, żeby dopasować loga
    "teams": *[_type == "team"] {
      name,
      "logoUrl": logo.asset->url
    }
  }
`);

// 8. DANE DO SEKCJI WYNIKÓW NA STRONIE GŁÓWNEJ
export const HOMEPAGE_RESULTS_QUERY = defineQuery(`
  {
    "table": *[_id == "tabela-ligowa-glowna"][0] {
      rows[] {
        "_key": _key,
        position,
        teamName,
        matches,
        points
      }
    },
    "lastMatches": *[_type == "result" && defined(homeScore)] | order(date desc)[0...5] {
      _id,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      date
    },
    "teams": *[_type == "team"] {
      name,
      "logoUrl": logo.asset->url
    }
  }
`);

export const MATCH_CENTER_QUERY = defineQuery(`
  {
    "nextMatch": *[_type == "result" && (homeTeam match "Kujawianka Izbica*" || awayTeam match "Kujawianka Izbica*") && !defined(homeScore)] | order(date asc)[0] {
      _id,
      homeTeam,
      awayTeam,
      date, // Może być null/undefined
      round,
      "stadium": "Stadion Miejski"
    },
    "lastMatches": *[_type == "result" && (homeTeam match "Kujawianka Izbica*" || awayTeam match "Kujawianka Izbica*") && defined(homeScore)] | order(date desc)[0...2] {
      _id,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      date,
      round
    },
    "teams": *[_type == "team"] {
      name,
      "logoUrl": logo.asset->url
    }
  }
`);