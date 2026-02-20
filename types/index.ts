import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export type Player = {
  _id: string
  name: string
  surname: string
  number: number
  position: 'Bramkarz' | 'Obrońca' | 'Pomocnik' | 'Napastnik' | 'Sztab'
  imageUrl: string
  staffRole?: string
  // NOWE POLE: Statystyki
  stats?: {
    matches: number
    goals: number
    assists: number
    cleanSheets?: number // Tylko dla bramkarzy
    yellowCards: number
    redCards: number
  }
}

export interface NewsItem {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  imageUrl: string
  isHighlighted?: boolean // <--- Dodaj to pole (opcjonalne, bo stare artykuły mogą go nie mieć)
}

// export type Sponsor = {
//     _id: string;
//     name: string;
//     tier: "main" | "strategic" | "technical" | "partner" | "club100";
//     logoUrl: string;
//     website?: string;
//     description?: string; // Tylko dla głównych
//     backgroundImageUrl?: string; // Tylko dla głównych
// };

export type Sponsor = {
  _id: string
  name: string
  // ZMIANA: tier jest teraz obiektem pobranym z CMS
  tier: {
    name: string
    rank: number
  }
  logoUrl: string
  website?: string
  description?: string
  backgroundImageUrl?: string
}

export type SponsorsPageData = {
  title: string
  description: string
  stats?: {
    value: string
    label: string
    icon: 'handshake' | 'users' | 'trending' | 'calendar' | 'trophy' | 'star'
  }[]
  ctaTitle?: string
  ctaDescription?: string
}

// src/types/index.ts

// ... (Player, NewsItem, Sponsor, Match - upewnij się, że masz Match)

// export type Team = {
//     name: string;
//     logoUrl: string;
// };

// src/types/index.ts

// ... (Team, NewsItem, Sponsor itd. bez zmian)

// Typ dla wiersza tabeli
// export type TableRow = {
//     _key: string;
//     position: number;
//     teamName: string;
//     matches: number;
//     points: number;
//     won: number;
//     drawn: number;
//     lost: number;
//     goals: string;
// };

// // Typ dla całej tabeli
// export type LeagueTable = {
//     _id: string;
//     season: string;
//     rows: TableRow[];
// };

// // ZAKTUALIZOWANY TYP MECZU
// // Musi pasować do tego, co zwraca zapytanie RESULTS_PAGE_QUERY
// export type Match = {
//     _id: string;
//     round: number;        // To pole jest teraz kluczowe dla terminarza!
//     date: string;         // Data meczu
//     homeTeam: string;
//     awayTeam: string;
//     homeScore?: number;   // Opcjonalne (może być null przed meczem)
//     awayScore?: number;
//     isFinished: boolean;  // To pole obliczamy w GROQ, więc tutaj musi być
// };

export type SocialLink = {
  url?: string
  isVisible: boolean
}

export interface SiteSettings {
  title: string
  logo?: SanityImageSource // Sanity Image Object

  // Teraz każdy serwis ma typ SocialLink zamiast string
  socialLinks?: {
    facebook?: SocialLink
    instagram?: SocialLink
    youtube?: SocialLink
    twitter?: SocialLink
    tiktok?: SocialLink // <--- Dodane
  }

  contact?: {
    email?: string
    phone?: string
    address?: string
  }
  seo?: {
    description?: string
    ogImage?: SanityImageSource
  }
}

// ... inne typy

export type OfferPageData = {
  title: string
  description: string
  packages?: {
    title: string
    description: string
    iconName: string
    colorTheme: 'emerald' | 'white' | 'blue'
    link: string
  }[]
  stats?: {
    value: string
    label: string
    iconName: string
  }[]
  ctaTitle?: string
  ctaDescription?: string
}

export type PartnersPageData = {
  title: string
  description: string
  benefitsTitle?: string
  benefits?: {
    title: string
    description: string
    iconName: string
  }[]
  ctaTitle?: string
  ctaDescription?: string
}

export type Club100PageData = {
  title: string
  description: string
  benefits?: {
    title: string
    description: string
    iconName: string
  }[]
  aboutTitle?: string // <--- NOWE
  aboutContent?: string // <--- NOWE
  ctaTitle?: string
  ctaDescription?: string
}

export type Team = {
  _id?: string
  name: string
  logoUrl?: string
}

// Zaktualizowany wiersz tabeli
export type TableRow = {
  _key: string
  position: number
  teamName: string
  teamLogo?: string // Nowe pole na logo z referencji
  matches: number
  points: number
  won: number
  drawn: number
  lost: number
  goals: string
}

export type LeagueTable = {
  _id: string
  season: string
  rows: TableRow[]
}

// Nowy format Meczu (zagnieżdżony w kolejce)
export type Match = {
  _key: string
  dataSource: 'scraper' | 'manual'
  date?: string
  homeTeam: Team
  awayTeam: Team
  homeScore?: number
  awayScore?: number
  isFinished: boolean
}

// Typ Kolejki (Fixture)
export type Fixture = {
  roundNumber: number
  matches: Match[]
}

// Typ Korekty Punktowej
export type PointCorrection = {
  team: Team
  points: number
  reason?: string
}

// NOWY GŁÓWNY TYP: Rozgrywki (Competition)
export type CompetitionData = {
  _id: string
  name: string
  season: string
  pointCorrections?: PointCorrection[]
  standing?: LeagueTable // Tabela ze scrapera (będzie istniała tylko dla seniorów)
  fixtures?: Fixture[] // Kolejki z meczami
}
