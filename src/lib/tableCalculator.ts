// src/lib/tableCalculator.ts

// Typy wejściowe (to co dostaniemy z Sanity)
export type MatchInput = {
    homeTeamName: string;
    awayTeamName: string;
    homeScore: number | null;
    awayScore: number | null;
};

// Typ wiersza tabeli (zgodny z Twoim frontendem)
export type TableRow = {
    _key: string;
    position: number;
    teamName: string;
    matches: number;
    points: number;
    won: number;
    drawn: number;
    lost: number;
    goals: string; // Format "strzelone-stracone"
    // Pola pomocnicze do sortowania
    goalsScored: number;
    goalsLost: number;
    goalsDiff: number;
};

export function calculateTableFromMatches(matches: MatchInput[]): TableRow[] {
    const teamsMap = new Map<string, Omit<TableRow, 'position' | 'goals'>>();

    const getTeam = (name: string) => {
        if (!teamsMap.has(name)) {
            teamsMap.set(name, {
                _key: name, // tymczasowy klucz
                teamName: name,
                matches: 0, points: 0, won: 0, drawn: 0, lost: 0,
                goalsScored: 0, goalsLost: 0, goalsDiff: 0
            });
        }
        return teamsMap.get(name)!;
    };

    matches.forEach(match => {
        // Jeśli mecz nie ma wyniku, pomijamy go w tabeli
        if (match.homeScore === null || match.awayScore === null || match.homeScore === undefined) return;

        // Zabezpieczenie przed brakiem nazwy
        if (!match.homeTeamName || !match.awayTeamName) return;

        const home = getTeam(match.homeTeamName);
        const away = getTeam(match.awayTeamName);

        home.matches++;
        away.matches++;

        home.goalsScored += match.homeScore;
        home.goalsLost += match.awayScore;
        home.goalsDiff = home.goalsScored - home.goalsLost;

        away.goalsScored += match.awayScore;
        away.goalsLost += match.homeScore;
        away.goalsDiff = away.goalsScored - away.goalsLost;

        if (match.homeScore > match.awayScore) {
            home.points += 3;
            home.won++;
            away.lost++;
        } else if (match.homeScore < match.awayScore) {
            away.points += 3;
            away.won++;
            home.lost++;
        } else {
            home.points += 1;
            home.drawn++;
            away.points += 1;
            away.drawn++;
        }
    });

    // Sortowanie tabeli
    return Array.from(teamsMap.values())
        .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalsDiff !== a.goalsDiff) return b.goalsDiff - a.goalsDiff;
            return b.goalsScored - a.goalsScored;
        })
        .map((row, index) => ({
            ...row,
            position: index + 1,
            goals: `${row.goalsScored}-${row.goalsLost}`,
            _key: `${row.teamName}-${index}`
        }));
}