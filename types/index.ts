export type Player = {
    _id: string;
    name: string;
    surname: string;
    number: number;
    position: "Bramkarz" | "Obrońca" | "Pomocnik" | "Napastnik" | "Sztab";
    imageUrl: string;
};


export type NewsItem = {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    excerpt?: string;
    imageUrl?: string; // <--- Dodaj tę linię!
};



export type Sponsor = {
    _id: string;
    name: string;
    tier: "main" | "strategic" | "technical" | "partner";
    logoUrl: string;
    website?: string;
    description?: string; // Tylko dla głównych
    backgroundImageUrl?: string; // Tylko dla głównych
};