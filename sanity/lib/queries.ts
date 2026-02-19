import { defineQuery } from "next-sanity";



const PAGE_BUILDER_FIELDS = `
  contentBuilder[] {
    _type,
    _key,
    
    // Pola wspólne (tekstowe)
    heading,
    title,
    description,
    content,
    isCentered,
    layout,
    columns,
    eyebrow, // <--- DODAJ TO
    design,

    // Specyficzne dla sekcji z obrazkiem (rozwiń asset)
    _type == "imageTextSection" => {
      image { asset-> }
    },

    // Specyficzne dla sekcji Features (rozwiń listę itemów)
    _type == "featuresSection" => {
      items[] {
        title,
        description,
        iconName
      }
    },

    _type == "tableSection" => {
        heading,
        layout,
        content,
        tableRows[] {
            _key,
            isHeader,
            cells
        }
    },
    _type == "gallerySection" => {
        heading,
        description,
        columns,
        images[] {
            _key,
            asset->,
            alt
        }
    },

    // Specyficzne dla sekcji Kontaktowej (jeśli ma unikalne pola)
    _type == "contactSection" => {
        title,
        description
    }
  }
`;

export const HOMEPAGE_PLAYERS_QUERY = defineQuery(`
  // Filtrujemy graczy, którzy należą do kadry o slugu "seniorzy"
  *[_type == "player" && squad->slug.current == "seniorzy"] | order(number asc)[0...4] {
    _id,
    name,
    surname,
    number,
    position,
    // Pobieramy nazwę roli ze zreferowanego dokumentu staffRole
    "staffRole": staffRole->name, 
    "imageUrl": image.asset->url,
    "slug": slug.current
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



export const HOMEPAGE_NEWS_QUERY = defineQuery(`
  *[_type == "news" && isHighlighted == true && publishedAt < now()] | order(publishedAt desc)[0...5] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    isHighlighted
  }
`);

// 4. WSZYSTKIE NEWSY (Dla strony /aktualnosci)
export const ALL_NEWS_QUERY = defineQuery(`
  *[_type == "news" && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    isHighlighted
  }
`);

// ... (poprzednie zapytania)





export const ALL_SPONSORS_QUERY = defineQuery(`
  *[_type in ["sponsor", "partner", "club100"]] {
    _id, name, "logoUrl": logo.asset->url, website,
    // Sprawdzamy typ dokumentu, żeby ustalić rangę
    _type == "sponsor" => {
      tier->{name, rank}
    },
    _type == "partner" => {
      "tier": { "name": "Klubowicz", "rank": 99 }
    },
    _type == "club100" => {
      "tier": { "name": "Klub 100", "rank": 100 }
    }
  } | order(tier.rank asc, name asc)
`);



export const ALL_SUPPORTERS_COUNT_QUERY = defineQuery(`
  count(*[_type in ["sponsor", "partner", "club100"]])
`);

export const SPONSORS_PAGE_QUERY = defineQuery(`
  {
    "pageData": *[_id == "sponsorsPage"][0] {
      title, description, ctaTitle, ctaDescription,
      stats[] { value, label, icon }
    },
    // Pobieramy tylko typ 'sponsor'
    "sponsors": *[_type == "sponsor"] | order(tier->rank asc, name asc) {
      _id, name, website, description,
      "logoUrl": logo.asset->url,
      "backgroundImageUrl": backgroundImage.asset->url,
      tier->{ name, rank }
    }
  }
`);

export const HOMEPAGE_SPONSORS_QUERY = defineQuery(`
  *[_type == "sponsor"] | order(tier->rank asc, name asc) {
    _id,
    name,
    "logoUrl": logo.asset->url,
    website,
    tier->{
      name,
      rank
    }
  }
`);

export const CLUB100_PAGE_QUERY = defineQuery(`
  {
    "pageData": *[_id == "club100Page"][0] {
      title,
      description,
      benefits[] {
        title,
        description,
        iconName
      },
      aboutTitle,   // <--- NOWE
      aboutContent, // <--- NOWE
      ctaTitle,
      ctaDescription
    },
    "members": *[_type == "club100"] | order(name asc) {
      _id,
      name,
      "logoUrl": logo.asset->url,
      website,
      description
    }
  }
`);

export const PARTNERS_PAGE_QUERY = defineQuery(`
  {
    "pageData": *[_id == "partnersPage"][0] {
      title, description, benefitsTitle, ctaTitle, ctaDescription,
      benefits[] { title, description, iconName }
    },
    // Pobieramy typ 'partner' i udajemy, że mają tier "Klubowicz" (dla spójności frontendu)
    "members": *[_type == "partner"] | order(name asc) {
      _id, name, website, description,
      "logoUrl": logo.asset->url,
      // Symulujemy obiekt tier, żeby TypeScript na frontendzie nie krzyczał
      "tier": { "name": "Klubowicz", "rank": 99 }
    }
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


export const DOWNLOADS_QUERY = defineQuery(`
  *[_type == "download"] | order(publishedAt desc) {
    _id,
    title,
    description,
    category,
    "fileUrl": file.asset->url,
    "fileName": file.asset->originalFilename,
    "extension": file.asset->extension,
    "size": file.asset->size,
    publishedAt
  }
`);

export const SINGLE_NEWS_QUERY = defineQuery(`
  *[_type == "news" && slug.current == $slug && publishedAt < now()][0] {
    _id,
    title,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    content,
    "slug": slug.current
  }
`);

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    title,
    logo,
    socialLinks {
      facebook { url, isVisible },
      instagram { url, isVisible },
      youtube { url, isVisible },
      tiktok { url, isVisible },
      twitter { url, isVisible }
    },
    contact,
    seo,

    // --- POPRAWKA TUTAJ ---
    
    // ZMIANA: Usuwamy nawiasy [] (tablica) i zmieniamy nazwę na liczbę pojedynczą
    footerCertificate {
      "imageUrl": asset->url,
      alt,
      url
    },

    // 2. Pliki: (bez zmian)
    footerDownloads[] {
      "fileUrl": asset->url,
      title
    }
  }
`);

export const CLUB_PAGE_QUERY = defineQuery(`
  *[_id == "clubPage"][0] {
    heroHeading,
    heroDescription,
    historyTitle,
    historyContent,
    "historyImageUrl": historyImage.asset->url,
    achievements[] {
      title,
      description,
      iconType
    },
    stadiumDescription,
    "stadiumImageUrl": stadiumImage.asset->url,
    stadiumAddress,
    stadiumCapacity,
    stadiumBuilt,
    // ZMIANA TUTAJ:
    clubAuthorities[] {
      name,
      group,
      role,
      isVisible
    }
  }
`);

export const NEWS_PAGE_QUERY = defineQuery(`
  *[_type == "news" && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    isHighlighted
  }
`);

// sanity/lib/queries.ts

export const DONATE_PAGE_QUERY = defineQuery(`
  *[_id == "donatePage"][0] {
    heroHeading,
    krsNumber,
    specificGoal,
    steps[] {
        title,
        description
    },
    goalsList,
    socialProof {
        "imageUrl": image.asset->url,
        quote,
        author
    }
  }
`);

export const SQUADS_NAVIGATION_QUERY = defineQuery(`
  *[_type == "squad"] | order(order asc) {
    name,
    "slug": slug.current,
    // Sprawdzamy, czy istnieje tabela przypisana do tej kadry
    "hasTable": count(*[_type == "table" && squad._ref == ^._id]) > 0
  }
`);

// 2. Do strony dynamicznej kadry (np. /druzyny/seniorzy)
export const SQUAD_PAGE_QUERY = defineQuery(`
  *[_type == "squad" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    coachName,
    coachPhone,
    coachEmail,
    description,
    // Pobieramy zawodników przypisanych do TEJ KONKRETNEJ kadry
    "players": *[_type == "player" && references(^._id)] | order(number asc) {
       _id,
       name,
       surname,
       number,
       position,
       "staffRole": staffRole-> name,
       "imageUrl": image.asset->url,
       
       // NOWE: Pobieramy statystyki
       "stats": {
         "matches": coalesce(matches, 0),
         "goals": coalesce(goals, 0),
         "assists": coalesce(assists, 0),
         "cleanSheets": coalesce(cleanSheets, 0),
         "yellowCards": coalesce(yellowCards, 0),
         "redCards": coalesce(redCards, 0)
       }
    }
  }
`);


export const OFFER_PAGE_QUERY = defineQuery(`
  *[_id == "offerPage"][0] {
    title,
    description,
    packages[] {
      title,
      description,
      iconName,
      colorTheme,
      link
    },
    stats[] {
      value,
      label,
      iconName
    },
    ctaTitle,
    ctaDescription,
    ${PAGE_BUILDER_FIELDS}
  }
`);


export const NEWS_SLIDER_QUERY = defineQuery(`
  *[_type == "news" && isHighlighted == true && publishedAt < now()] | order(publishedAt desc)[0...5] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    isHighlighted
  }
`);

// 2. Grid z paginacją (wyklucza newsy ze slidera, żeby się nie powtarzały)
export const NEWS_PAGINATED_QUERY = defineQuery(`
  *[_type == "news" && !(_id in $excludeIds) && publishedAt < now()] | order(publishedAt desc)[$start...$end] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    isHighlighted
  }
`);

// 3. Licznik newsów (do obliczenia liczby stron)
export const NEWS_COUNT_QUERY = defineQuery(`
  count(*[_type == "news" && !(_id in $excludeIds) && publishedAt < now()])
`);


export const YOUTH_SQUADS_LIST_QUERY = defineQuery(`
  *[_type == "squad" && slug.current != "seniorzy"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    // Możemy pobrać np. zdjęcie trenera lub pierwsze zdjęcie z galerii jako tło
    coachName
  }
`);

// 2. Pobiera tabelę i mecze dla KONKRETNEJ kadry (na podstawie sluga)
export const SQUAD_RESULTS_QUERY = defineQuery(`
  {
    // Pobieramy tabelę przypisaną do danej kadry
    "table": *[_type == "table" && squad->slug.current == $slug][0] {
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
    // Pobieramy mecze przypisane do danej kadry
    "matches": *[_type == "result" && squad->slug.current == $slug] | order(round asc) {
      _id,
      round,
      date,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      "isFinished": defined(homeScore)
    },
    // Zespoły (loga) pobieramy wszystkie, bo mogą się powtarzać
    "teams": *[_type == "team"] {
      name,
      "logoUrl": logo.asset->url
    },
    // Dane o samej kadrze (nazwa)
    "squadInfo": *[_type == "squad" && slug.current == $slug][0] {
        name,
        coachName
    }
  }
`);

export const COMPETITION_BY_SQUAD_QUERY = defineQuery(`
  *[_type == "competition" && squad->slug.current == $slug][0] {
    _id,
    name,
    season,
    // NOWE: Pobieramy konfigurację awansów/spadków
    config {
      promotionSpots,
      promotionPlayoffSpots,
      relegationPlayoffSpots,
      relegationSpots
    },
    // Pobieranie korekt punktowych
    pointCorrections[] {
      points,
      reason,
      "team": team->{_id, name, "logoUrl": logo.asset->url}
    },
    // Pobieranie gotowej tabeli
    "standing": *[_type == "standing" && competition._ref == ^._id][0] {
      _id,
      season,
      rows[] {
        _key, position, matches, points, won, drawn, lost, goals,
        "teamName": team->name,
        "teamLogo": team->logo.asset->url
      }
    },
    // Pobieranie wszystkich kolejek
    "fixtures": *[_type == "fixture" && competition._ref == ^._id] | order(roundNumber asc) {
      roundNumber,
      matches[] {
        _key, 
        dataSource, 
        date, 
        homeScore, 
        awayScore, 
        isFinished,
        "homeTeam": homeTeam->{_id, name, "logoUrl": logo.asset->url},
        "awayTeam": awayTeam->{_id, name, "logoUrl": logo.asset->url}
      }
    }
  }
`);

// 8. DANE DO SEKCJI WYNIKÓW NA STRONIE GŁÓWNEJ
export const HOMEPAGE_RESULTS_QUERY = defineQuery(`
  {
    "table": *[_type == "standing" && competition->squad->slug.current == "seniorzy"][0] {
      rows[] {
        "_key": _key,
        position,
        "teamName": team->name,
        "teamLogo": team->logo.asset->url,
        matches,
        points
      }
    },
    // Pobieramy zasady awansów/spadków do pokolorowania tabeli
    "config": *[_type == "competition" && squad->slug.current == "seniorzy"][0].config,
    // Spłaszczamy tablicę, ale za pomocą ^ zachowujemy numer kolejki z rodzica!
    "lastMatches": *[_type == "fixture" && competition->squad->slug.current == "seniorzy"] {
      "expandedMatches": matches[defined(homeScore)] {
        "_id": _key,
        "homeTeam": homeTeam->{ "name": name, "logoUrl": logo.asset->url },
        "awayTeam": awayTeam->{ "name": name, "logoUrl": logo.asset->url },
        homeScore,
        awayScore,
        date,
        "round": ^.roundNumber
      }
    }.expandedMatches[] | order(date desc)[0...8],
    "teams": *[_type == "team"] {
      name,
      "logoUrl": logo.asset->url
    }
  }
`);

export const MATCH_CENTER_QUERY = defineQuery(`
  {
    "nextMatch": *[_type == "fixture" && competition->squad->slug.current == "seniorzy"] {
      "expandedMatches": matches[!defined(homeScore) && (homeTeam->name match "Kujawianka*" || awayTeam->name match "Kujawianka*")] {
        "_id": _key,
        "homeTeam": homeTeam->{ "name": name, "logoUrl": logo.asset->url },
        "awayTeam": awayTeam->{ "name": name, "logoUrl": logo.asset->url },
        date,
        "round": ^.roundNumber,
        "stadium": "Stadion Miejski"
      }
    }.expandedMatches[] | order(date asc)[0],
    "lastMatches": *[_type == "fixture" && competition->squad->slug.current == "seniorzy"] {
      "expandedMatches": matches[defined(homeScore) && (homeTeam->name match "Kujawianka*" || awayTeam->name match "Kujawianka*")] {
        "_id": _key,
        "homeTeam": homeTeam->{ "name": name, "logoUrl": logo.asset->url },
        "awayTeam": awayTeam->{ "name": name, "logoUrl": logo.asset->url },
        homeScore,
        awayScore,
        date,
        "round": ^.roundNumber
      }
    }.expandedMatches[] | order(date desc)[0...2],
    "teams": *[_type == "team"] {
      name,
      "logoUrl": logo.asset->url
    },
    "clubLogo": *[_type == "siteSettings"][0].logo.asset->url
  }
`);


