import { defineField, defineType } from 'sanity'

export const result = defineType({
    name: 'result',
    title: 'Wyniki',
    type: 'document',
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

        // Drużyny (Referencje do schematu 'team' lub wpisane ręcznie)
        // Jeśli scrapujesz, na początku łatwiej użyć Stringów, chyba że napiszesz logikę mapowania nazw na ID drużyn w bazie
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
            description: 'Unikalny identyfikator meczu z serwisu źródłowego. Służy do aktualizacji wyników.',
            readOnly: true, // Żeby nikt ręcznie tego nie popsuł w panelu
            hidden: true // Możesz to ukryć, redaktorom to niepotrzebne
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
            const dateStr = date ? new Date(date).toLocaleDateString('pl-PL') : '';

            return {
                title: `Kolejka ${round}: ${home} ${score} ${away}`,
                subtitle: dateStr
            }
        }
    }
})