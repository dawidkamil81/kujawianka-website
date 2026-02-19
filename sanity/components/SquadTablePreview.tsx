import { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import { Card, Stack, Text, Spinner, Label } from '@sanity/ui'

// Prosty styl dla tabeli (Sanity UI nie ma gotowego komponentu Data Table w core)
const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '14px',
}
const thStyle = {
    textAlign: 'left' as const,
    padding: '10px',
    borderBottom: '1px solid #e0e0e0',
    color: '#6e7683'
}
const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #eee'
}

export function SquadTablePreview({ documentId }: { documentId: string }) {
    const client = useClient({ apiVersion: '2024-01-01' })
    const [table, setTable] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMatches = async () => {
            // Pobieramy mecze dla TEJ drużyny (documentId to ID kadry)
            const query = `*[_type == "result" && squad._ref == $squadId] {
        homeTeam, awayTeam, homeScore, awayScore, isFinished
      }`

            const matches = await client.fetch(query, { squadId: documentId })

            // --- LOGIKA OBLICZANIA TABELI (Ta sama co na stronie) ---
            const teams: any = {}

            matches.forEach((match: any) => {
                if (!match.homeScore && match.homeScore !== 0) return

                const { homeTeam, awayTeam, homeScore, awayScore } = match

                if (!teams[homeTeam]) initTeam(teams, homeTeam)
                if (!teams[awayTeam]) initTeam(teams, awayTeam)

                const home = teams[homeTeam]
                const away = teams[awayTeam]

                home.matches++
                away.matches++
                home.goalsScored += homeScore
                home.goalsConceded += awayScore
                away.goalsScored += awayScore
                away.goalsConceded += homeScore

                if (homeScore > awayScore) {
                    home.points += 3
                    home.won++
                    away.lost++
                } else if (homeScore < awayScore) {
                    away.points += 3
                    away.won++
                    home.lost++
                } else {
                    home.points += 1
                    away.points += 1
                    home.drawn++
                    away.drawn++
                }
            })

            // Sortowanie
            const sorted = Object.values(teams).sort((a: any, b: any) => {
                if (b.points !== a.points) return b.points - a.points
                const diffA = a.goalsScored - a.goalsConceded
                const diffB = b.goalsScored - b.goalsConceded
                if (diffB !== diffA) return diffB - diffA
                return b.goalsScored - a.goalsScored
            })

            setTable(sorted)
            setLoading(false)
        }

        fetchMatches()
    }, [documentId, client])

    const initTeam = (teams: any, name: string) => {
        teams[name] = {
            name, matches: 0, points: 0, won: 0, drawn: 0, lost: 0,
            goalsScored: 0, goalsConceded: 0
        }
    }

    if (loading) return <Card padding={4}><Stack><Spinner /></Stack></Card>

    if (table.length === 0) {
        return (
            <Card padding={4} radius={2} tone="caution">
                <Text align="center">Brak rozegranych meczów dla tej drużyny. Tabela jest pusta.</Text>
            </Card>
        )
    }

    return (
        <Card padding={4} style={{ overflowX: 'auto' }}>
            <Stack space={4}>
                <Label size={2}>Podgląd Tabeli (Generowana automatycznie)</Label>

                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>#</th>
                            <th style={thStyle}>Drużyna</th>
                            <th style={thStyle}>M</th>
                            <th style={thStyle}>Pkt</th>
                            <th style={thStyle}>Z</th>
                            <th style={thStyle}>R</th>
                            <th style={thStyle}>P</th>
                            <th style={thStyle}>Bramki</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, index) => (
                            <tr key={row.name}>
                                <td style={tdStyle}><strong>{index + 1}</strong></td>
                                <td style={tdStyle}>{row.name}</td>
                                <td style={tdStyle}>{row.matches}</td>
                                <td style={tdStyle}><strong>{row.points}</strong></td>
                                <td style={tdStyle}>{row.won}</td>
                                <td style={tdStyle}>{row.drawn}</td>
                                <td style={tdStyle}>{row.lost}</td>
                                <td style={tdStyle}>{row.goalsScored}-{row.goalsConceded}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Stack>
        </Card>
    )
}