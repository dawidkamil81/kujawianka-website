import { defineField, defineType } from 'sanity'

export const leagueConfig = defineType({
    name: 'leagueConfig',
    title: 'Konfiguracja Rozgrywek',
    type: 'document',
    fields: [
        // Powiązanie z drużyną (kluczowe)
        defineField({
            name: 'squad',
            title: 'Przypisana Kadra',
            type: 'reference',
            to: [{ type: 'squad' }],
            validation: (rule) => rule.required(),
            readOnly: true, // Zablokowane, bo przypisujemy automatycznie z folderu
        }),

        // Pola informacyjne
        defineField({
            name: 'season',
            title: 'Sezon',
            type: 'string',
            initialValue: '2025/2026',
        }),
        defineField({
            name: 'leagueName',
            title: 'Nazwa Rozgrywek',
            type: 'string',
            description: 'np. IV Liga Kujawsko-Pomorska',
        }),
        defineField({
            name: 'leagueUrl',
            title: 'Link do rozgrywek (np. 90minut)',
            type: 'url',
            description: 'Link do zewnętrznego serwisu. Przydatne głównie dla Seniorów.',
        }),

        // Statystyki ligi
        defineField({
            name: 'teamsCount',
            title: 'Liczba drużyn w lidze',
            type: 'number',
        }),
        defineField({
            name: 'roundsCount',
            title: 'Liczba kolejek',
            type: 'number',
        }),

        // Awanse i Spadki - Sekcja wizualna
        defineField({
            name: 'promotionSpots',
            title: 'Awans bezpośredni (liczba miejsc)',
            type: 'number',
        }),
        defineField({
            name: 'promotionPlayoffSpots',
            title: 'Baraże o awans (liczba miejsc)',
            type: 'number',
        }),
        defineField({
            name: 'relegationPlayoffSpots',
            title: 'Baraże o utrzymanie (liczba miejsc)',
            type: 'number',
        }),
        defineField({
            name: 'relegationSpots',
            title: 'Spadek bezpośredni (liczba miejsc)',
            type: 'number',
        }),
    ],
    preview: {
        select: {
            squadName: 'squad.name',
            season: 'season',
            league: 'leagueName'
        },
        prepare({ squadName, season, league }) {
            return {
                title: `Rozgrywki: ${squadName}`,
                subtitle: `${league || ''} (${season || ''})`
            }
        }
    }
})