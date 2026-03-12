// sanity/lib/queries/pages.ts
import { defineQuery } from 'next-sanity'

export const PAGE_BUILDER_FIELDS = defineQuery(`
  contentBuilder[] {
    _type,
    _key,
    heading,
    title,
    description,
    content,
    isCentered,
    layout,
    columns,
    eyebrow,
    design,
    _type == "imageTextSection" => {
      image { asset-> }
    },
    _type == "featuresSection" => {
      items[] { title, description, iconName }
    },
    _type == "tableSection" => {
        heading, layout, content,
        tableRows[] { _key, isHeader, cells }
    },
    _type == "gallerySection" => {
        heading, description, columns,
        images[] { _key, asset->, alt }
    },
    _type == "contactSection" => { 
        title, 
        description,
        "contact": *[_type == "siteSettings"][0].contact 
    }
  }
`)

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    title, logo, contact, seo,
    "faviconUrl": favicon.asset->url,
    "ogImageUrl": seo.ogImage.asset->url, 
    socialLinks {
      facebook { url, isVisible }, instagram { url, isVisible },
      youtube { url, isVisible }, tiktok { url, isVisible }, twitter { url, isVisible }
    },
    footerCertificate { "imageUrl": asset->url, alt, url },
    footerDownloads[] { "fileUrl": asset->url, title }
  }
`)

export const CLUB_PAGE_QUERY = defineQuery(`
  *[_id == "clubPage"][0] {
    isPageVisible, navTitle, title, description,
    heroHeading, heroDescription, historyTitle, historyContent, "historyImageUrl": historyImage.asset->url,
    achievements[] { title, description, iconType },
    stadiumDescription, "stadiumImageUrl": stadiumImage.asset->url, stadiumAddress, stadiumCapacity, stadiumBuilt,
    clubAuthorities[] { name, group, role, isVisible, "imageUrl": image.asset->url },
    
    
    contentBuilder[] {
      _type, _key, heading, title, description, content, isCentered, layout, columns, eyebrow, design,
      _type == "imageTextSection" => { image { asset-> } },
      _type == "featuresSection" => { items[] { title, description, iconName } },
      _type == "tableSection" => { heading, layout, content, tableRows[] { _key, isHeader, cells } },
      _type == "gallerySection" => { heading, description, columns, images[] { _key, asset->, alt } },
       _type == "contactSection" => { 
        title, 
        description,
        "contact": *[_type == "siteSettings"][0].contact 
    }
    }
  }
`)

export const DONATE_PAGE_QUERY = defineQuery(`
  *[_id == "donatePage"][0] {
    isPageVisible, navTitle, title, description,
    heroHeading, krsNumber, specificGoal, goalsList,
    steps[] { title, description },
    socialProof { "imageUrl": image.asset->url, quote, author },
    
    // POBIERANIE SEKCJI DYNAMICZNYCH
    contentBuilder[] {
      _type, _key, heading, title, description, content, isCentered, layout, columns, eyebrow, design,
      _type == "imageTextSection" => { image { asset-> } },
      _type == "featuresSection" => { items[] { title, description, iconName } },
      _type == "tableSection" => { heading, layout, content, tableRows[] { _key, isHeader, cells } },
      _type == "gallerySection" => { heading, description, columns, images[] { _key, asset->, alt } },
       _type == "contactSection" => { 
        title, 
        description,
        "contact": *[_type == "siteSettings"][0].contact 
    }
    }
  }
`)

export const DOWNLOADS_QUERY = defineQuery(`
  *[_type == "download"] | order(publishedAt desc) {
    _id, title, description, category,
    "fileUrl": file.asset->url, "fileName": file.asset->originalFilename,
    "extension": file.asset->extension, "size": file.asset->size,
    publishedAt
  }
`)

export const PAGE_VISIBILITY_QUERY = `*[_type == "siteSettings"][0]{
  "klub": {
    "isVisible": defined(*[_type == "clubPage"][0]) && coalesce(*[_type == "clubPage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "clubPage"][0].navTitle, "Klub")
  },
  "oferta": {
    "isVisible": defined(*[_type == "offerPage"][0]) && coalesce(*[_type == "offerPage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "offerPage"][0].navTitle, "Współpraca"),
    "slug": coalesce(*[_type == "offerPage"][0].slug.current, "oferta")
  },
  "sponsorzy": {
    "isVisible": defined(*[_type == "sponsorsPage"][0]) && coalesce(*[_type == "sponsorsPage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "sponsorsPage"][0].navTitle, "Sponsorzy"),
    "slug": coalesce(*[_type == "sponsorsPage"][0].slug.current, "sponsorzy")
  },
  "klubowicze": {
    "isVisible": defined(*[_type == "partnersPage"][0]) && coalesce(*[_type == "partnersPage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "partnersPage"][0].navTitle, "Klubowicze"),
    "slug": coalesce(*[_type == "partnersPage"][0].slug.current, "klubowicze")
  },
  "klub100": {
    "isVisible": defined(*[_type == "club100Page"][0]) && coalesce(*[_type == "club100Page"][0].isPageVisible, true),
    "title": coalesce(*[_type == "club100Page"][0].navTitle, "Klub 100"),
    "slug": coalesce(*[_type == "club100Page"][0].slug.current, "klub-100")
  },
  "wesprzyj": {
    "isVisible": defined(*[_type == "donatePage"][0]) && coalesce(*[_type == "donatePage"][0].isPageVisible, true),
    "title": coalesce(*[_type == "donatePage"][0].navTitle, "Przekaż 1.5%")
  }
}`

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage"][0] {
    heroOvertitle,
    heroTitle,
    heroDescription,
    "heroImageUrl": heroImage.asset->url
  }
`)

export const HOMEPAGE_COMBINED_QUERY = defineQuery(`
  {
    "homePageData": *[_type == "homePage"][0] {
      heroOvertitle,
      heroTitle,
      heroDescription,
      "heroImageUrl": heroImage.asset->url
    },
    
    "players": *[_type == "player" && squad->slug.current == "seniorzy"] | order(number asc)[0...4] {
      _id, name, surname, number, position,
      "staffRole": staffRole->name, 
      "imageUrl": image.asset->url,
      "slug": slug.current
    },
    
    "news": *[_type == "news" && isHighlighted == true && publishedAt < now()] | order(publishedAt desc)[0...5] {
      _id, title, "slug": slug.current, publishedAt, excerpt, "imageUrl": mainImage.asset->url, isHighlighted
    },
    
    "sponsors": *[_type == "sponsor"] | order(tier->rank asc, name asc) {
      _id, name, "logoUrl": logo.asset->url, website, tier->{ name, rank }
    },
    
    "resultsData": {
      "table": *[_type == "standing" && competition->squad->slug.current == "seniorzy"][0] {
        rows[] { _key, position, "teamName": team->name, "teamLogo": team->logo.asset->url, matches, points }
      },
      "config": *[_type == "competition" && squad->slug.current == "seniorzy"][0].config,
      "lastMatches": *[_type == "fixture" && competition->squad->slug.current == "seniorzy"] {
        "expandedMatches": matches[defined(homeScore)] {
          "_id": _key, "homeTeam": homeTeam->{ "name": name, "logoUrl": logo.asset->url },
          "awayTeam": awayTeam->{ "name": name, "logoUrl": logo.asset->url },
          homeScore, awayScore, date, "round": ^.roundNumber
        }
      }.expandedMatches[] | order(date desc)[0...8],
      "teams": *[_type == "team"] { name, "logoUrl": logo.asset->url }
    },
    
    "matchCenterData": {
      "nextMatch": *[_type == "fixture" && competition->squad->slug.current == "seniorzy"] {
        "expandedMatches": matches[!defined(homeScore) && (homeTeam->name match "Kujawianka*" || awayTeam->name match "Kujawianka*")] {
          "_id": _key, "homeTeam": homeTeam->{ "name": name, "logoUrl": logo.asset->url },
          "awayTeam": awayTeam->{ "name": name, "logoUrl": logo.asset->url },
          date, "round": ^.roundNumber, "stadium": "Stadion Miejski"
        }
      }.expandedMatches[] | order(date asc)[0],
      "lastMatches": *[_type == "fixture" && competition->squad->slug.current == "seniorzy"] {
        "expandedMatches": matches[defined(homeScore) && (homeTeam->name match "Kujawianka*" || awayTeam->name match "Kujawianka*")] {
          "_id": _key, "homeTeam": homeTeam->{ "name": name, "logoUrl": logo.asset->url },
          "awayTeam": awayTeam->{ "name": name, "logoUrl": logo.asset->url },
          homeScore, awayScore, date, "round": ^.roundNumber
        }
      }.expandedMatches[] | order(date desc)[0...2],
      "teams": *[_type == "team"] { name, "logoUrl": logo.asset->url },
      "clubLogo": *[_type == "siteSettings"][0].logo.asset->url
    },
    
    "mainSquadSlug": *[_type == "squad"] | order(order asc)[0].slug.current,
    "sponsorsPageSlug": *[_type == "sponsorsPage"][0].slug.current
  }
`)
