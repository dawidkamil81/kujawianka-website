export type Player = {
    _id: string;
    name: string;
    surname: string;
    number: number;
    position: "Bramkarz" | "Obrońca" | "Pomocnik" | "Napastnik" | "Sztab";
    imageUrl: string;
};
// src/types/index.ts

// ... (Player i inne typy)

// src/types/index.ts

export type NewsItem = {
    _id: string;
    title: string;
    slug: string;
    publishedAt: string;
    excerpt?: string;
    imageUrl?: string; // <--- Dodaj tę linię!
};

// (Reszta typów bez zmian)