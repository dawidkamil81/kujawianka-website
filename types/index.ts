export type Player = {
    _id: string;
    name: string;
    surname: string;
    number: number;
    position: "Bramkarz" | "Obrońca" | "Pomocnik" | "Napastnik" | "Sztab";
    imageUrl: string;
};


export interface NewsItem {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    excerpt: string;
    imageUrl: string;
    isHighlighted?: boolean; // <--- Dodaj to pole (opcjonalne, bo stare artykuły mogą go nie mieć)
}



export type Sponsor = {
    _id: string;
    name: string;
    tier: "main" | "strategic" | "technical" | "partner" | "club100";
    logoUrl: string;
    website?: string;
    description?: string; // Tylko dla głównych
    backgroundImageUrl?: string; // Tylko dla głównych
};

// src/types/index.ts

// ... (Player, NewsItem, Sponsor, Match - upewnij się, że masz Match)

export type Team = {
    name: string;
    logoUrl: string;
};

// src/types/index.ts

// ... (Team, NewsItem, Sponsor itd. bez zmian)

// Typ dla wiersza tabeli
export type TableRow = {
    _key: string;
    position: number;
    teamName: string;
    matches: number;
    points: number;
    won: number;
    drawn: number;
    lost: number;
    goals: string;
};

// Typ dla całej tabeli
export type LeagueTable = {
    _id: string;
    season: string;
    rows: TableRow[];
};

// ZAKTUALIZOWANY TYP MECZU
// Musi pasować do tego, co zwraca zapytanie RESULTS_PAGE_QUERY
export type Match = {
    _id: string;
    round: number;        // To pole jest teraz kluczowe dla terminarza!
    date: string;         // Data meczu
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;   // Opcjonalne (może być null przed meczem)
    awayScore?: number;
    isFinished: boolean;  // To pole obliczamy w GROQ, więc tutaj musi być
};

export interface SiteSettings {
    title: string;
    logo?: any; // Sanity Image Object
    socialLinks?: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
        twitter?: string;
    };
    contact?: {
        email?: string;
        phone?: string;
        address?: string;
    };
    seo?: {
        description?: string;
        ogImage?: any;
    };
}