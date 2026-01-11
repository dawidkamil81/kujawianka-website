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



// export const ALL_SPONSORS_QUERY = defineQuery(`
//   *[_type == "sponsor"] | order(tier->rank asc, name asc) {
//     _id,
//     name,
//     "logoUrl": logo.asset->url,
//     website,
//     description,
//     "backgroundImageUrl": backgroundImage.asset->url,
//     // Pobieramy dane z relacji tier
//     tier->{
//       name,
//       rank
//     }
//   }
// `);

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

// export const SPONSORS_PAGE_QUERY = defineQuery(`
//   {
//     "pageData": *[_id == "sponsorsPage"][0] {
//       title,
//       description,
//       stats[] {
//         value,
//         label,
//         icon
//       },
//       ctaTitle,
//       ctaDescription
//     },
//     "sponsors": *[_type == "sponsor"] | order(tier->rank asc, name asc) {
//       _id,
//       name,
//       "logoUrl": logo.asset->url,
//       website,
//       description,
//       "backgroundImageUrl": backgroundImage.asset->url,
//       tier->{
//         name,
//         rank
//       }
//     }
//   }
// `);

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
    // ZMIANA: Zwiększono limit z [0...5] na [0...9] (pobierze 10 meczów)
    "lastMatches": *[_type == "result" && defined(homeScore)] | order(date desc)[0...8] {
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
    seo
  }
`)

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
    "slug": slug.current
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
       "imageUrl": image.asset->url
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

