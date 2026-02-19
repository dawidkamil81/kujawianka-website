import { Match, PointCorrection, TableRow } from '../../types';

// Rozszerzony typ wiersza o wewnętrzne pola do liczenia
type CalculatedRow = Omit<TableRow, 'position' | 'goals'> & {
    goalsScored: number;
    goalsLost: number;
    goalsDiff: number;
    teamId: string;
};

export function calculateTableFromMatches(
    matches: Match[],
    pointCorrections: PointCorrection[] = []
): TableRow[] {
    const teamsMap = new Map<string, CalculatedRow>();

    // Pomocnicza funkcja do pobierania/tworzenia wpisu drużyny
    const getTeam = (teamId: string, teamName: string, teamLogo?: string) => {
        if (!teamsMap.has(teamId)) {
            teamsMap.set(teamId, {
                _key: teamId,
                teamId: teamId,
                teamName: teamName,
                teamLogo: teamLogo,
                matches: 0, points: 0, won: 0, drawn: 0, lost: 0,
                goalsScored: 0, goalsLost: 0, goalsDiff: 0
            });
        }
        return teamsMap.get(teamId)!;
    };

    // KROK 1: "Podwójny przebieg" - Rejestrujemy WSZYSTKIE drużyny, które są w terminarzu, 
    // nawet jeśli jeszcze nie rozegrały meczu, aby zagwarantować ich obecność w tabeli.
    matches.forEach(match => {
        if (match.homeTeam?._id) {
            getTeam(match.homeTeam._id, match.homeTeam.name, match.homeTeam.logoUrl);
        }
        if (match.awayTeam?._id) {
            getTeam(match.awayTeam._id, match.awayTeam.name, match.awayTeam.logoUrl);
        }
    });

    // KROK 2: OBLICZANIE WYNIKÓW Z ROZEGRANYCH MECZÓW
    matches.forEach(match => {
        // Jeśli oba wyniki są wpisane (są liczbami), to po prostu liczymy ten mecz
        if (typeof match.homeScore !== 'number' || typeof match.awayScore !== 'number') {
            return;
        }

        if (!match.homeTeam?._id || !match.awayTeam?._id) {
            return;
        }

        const home = getTeam(match.homeTeam._id, match.homeTeam.name, match.homeTeam.logoUrl);
        const away = getTeam(match.awayTeam._id, match.awayTeam.name, match.awayTeam.logoUrl);

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

    // KROK 3: APLIKOWANIE KOREKT PUNKTOWYCH Z SANITY
    if (pointCorrections && pointCorrections.length > 0) {
        pointCorrections.forEach(correction => {
            if (correction.team?._id) {
                const teamData = getTeam(correction.team._id, correction.team.name, correction.team.logoUrl);
                teamData.points += correction.points;
            }
        });
    }

    // KROK 4: SORTOWANIE (Punkty -> Różnica bramek -> Bramki strzelone)
    return Array.from(teamsMap.values())
        .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalsDiff !== a.goalsDiff) return b.goalsDiff - a.goalsDiff;
            return b.goalsScored - a.goalsScored;
        })
        .map((row, index) => ({
            _key: row._key,
            position: index + 1,
            teamName: row.teamName,
            teamLogo: row.teamLogo,
            matches: row.matches,
            points: row.points,
            won: row.won,
            drawn: row.drawn,
            lost: row.lost,
            goals: `${row.goalsScored}-${row.goalsLost}`
        }));
}