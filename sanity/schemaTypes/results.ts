import { defineField, defineType } from 'sanity'

export const result = defineType({
    name: 'result',
    title: 'Wyniki',
    type: 'document',
    // Dodajemy domyślne sortowanie (najpierw po kolejce, potem po dacie)
    orderings: [
        {
            title: 'Kolejka (Rosnąco)',
            name: 'roundAsc',
            by: [
                { field: 'round', direction: 'asc' },
                { field: 'date', direction: 'asc' }
            ]
        },
        {
            title: 'Data Meczu (Chronologicznie)',
            name: 'dateAsc',
            by: [
                { field: 'date', direction: 'asc' }
            ]
        }
    ],
    fields: [
        // Pola informacyjne
        defineField({
            name: 'round',
            title: 'Kolejka',
            type: 'number',
            description: 'Numer kolejki ligowej (np. 12)',
            validation: (rule) => rule.required().integer().min(1)
        }),
        defineField({
            name: 'date',
            title: 'Data i Godzina',
            type: 'datetime',
            description: 'Jeśli dokładna godzina nie jest znana, ustaw domyślną.'
        }),

        // Drużyny
        defineField({ name: 'homeTeam', title: 'Gospodarz', type: 'string' }),
        defineField({ name: 'awayTeam', title: 'Gość', type: 'string' }),

        // Wynik
        defineField({ name: 'homeScore', title: 'Gole Gospodarzy', type: 'number' }),
        defineField({ name: 'awayScore', title: 'Gole Gości', type: 'number' }),

        // KLUCZOWE DLA SCRAPINGU
        defineField({
            name: 'externalId',
            title: 'ID Zewnętrzne (90minut)',
            type: 'string',
            description: 'Unikalny identyfikator meczu. Służy do aktualizacji wyników.',
            readOnly: true,
            hidden: true
        }),
    ],
    preview: {
        select: {
            round: 'round',
            home: 'homeTeam',
            away: 'awayTeam',
            hScore: 'homeScore',
            aScore: 'awayScore',
            date: 'date'
        },
        prepare({ round, home, away, hScore, aScore, date }) {
            const score = (hScore !== undefined && aScore !== undefined)
                ? `${hScore}:${aScore}`
                : 'vs';

            // Formatujemy datę, jeśli istnieje
            const dateStr = date
                ? new Date(date).toLocaleDateString('pl-PL', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                : '';

            return {
                title: `${home} ${score} ${away}`,
                subtitle: `Kolejka ${round} | ${dateStr}`
            }
        }
    }
})