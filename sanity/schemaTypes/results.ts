import { defineField, defineType } from 'sanity'

export const result = defineType({
    name: 'result',
    title: 'Wyniki Meczów',
    type: 'document',
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
        defineField({
            name: 'source',
            title: 'Źródło danych',
            type: 'string',
            options: {
                list: [
                    { title: 'Manualne (Wybór z listy - Młodzież)', value: 'manual' },
                    { title: 'Scraper (90minut - Seniorzy)', value: 'scraper' }
                ],
                layout: 'radio'
            },
            initialValue: 'manual',
            validation: Rule => Rule.required()
        }),

        defineField({
            name: 'squad',
            title: 'Przypisana Kadra',
            type: 'reference',
            to: [{ type: 'squad' }],
            validation: (rule) => rule.required()
        }),

        defineField({
            name: 'round',
            title: 'Kolejka',
            type: 'number',
            validation: (rule) => rule.required().integer().min(1)
        }),

        defineField({
            name: 'date',
            title: 'Data i godzina',
            type: 'datetime'
        }),

        // --- SEKCJA GOSPODARZA ---
        defineField({
            name: 'homeTeamRef',
            title: 'Gospodarz (Wybierz z listy)',
            type: 'reference',
            to: [{ type: 'team' }],
            hidden: ({ document }) => document?.source === 'scraper',
        }),

        defineField({
            name: 'homeTeam',
            title: 'Gospodarz (Tekst - Scraper)',
            type: 'string',
            readOnly: true,
            hidden: ({ document }) => document?.source === 'manual'
        }),

        // --- SEKCJA GOŚCIA ---
        defineField({
            name: 'awayTeamRef',
            title: 'Gość (Wybierz z listy)',
            type: 'reference',
            to: [{ type: 'team' }],
            hidden: ({ document }) => document?.source === 'scraper',
        }),

        defineField({
            name: 'awayTeam',
            title: 'Gość (Tekst - Scraper)',
            type: 'string',
            readOnly: true,
            hidden: ({ document }) => document?.source === 'manual'
        }),

        // --- WYNIKI ---
        defineField({
            name: 'homeScore',
            title: 'Gole Gospodarzy',
            type: 'number'
        }),
        defineField({
            name: 'awayScore',
            title: 'Gole Gości',
            type: 'number'
        }),

        defineField({
            name: 'season',
            title: 'Sezon',
            type: 'string',
            initialValue: '2025/2026'
        }),

        defineField({
            name: 'externalId',
            title: 'External ID (Tylko Scraper)',
            type: 'string',
            hidden: true,
            readOnly: true
        })
    ],
    preview: {
        select: {
            source: 'source',
            homeString: 'homeTeam',
            awayString: 'awayTeam',
            homeRef: 'homeTeamRef.name',
            awayRef: 'awayTeamRef.name',
            hScore: 'homeScore',
            aScore: 'awayScore',
            round: 'round',
            squadName: 'squad.name'
        },
        prepare({ source, homeString, awayString, homeRef, awayRef, hScore, aScore, round, squadName }) {
            const home = source === 'manual' ? homeRef : homeString
            const away = source === 'manual' ? awayRef : awayString

            const score = (hScore !== null && hScore !== undefined && aScore !== null && aScore !== undefined)
                ? `${hScore}:${aScore}`
                : '-:-'

            const sourceLabel = source === 'scraper' ? ' Auto' : 'Ręczny'

            return {
                title: `${home || '?'} vs ${away || '?'}`,
                subtitle: `Runda ${round} | Wynik: ${score} | ${squadName} | ${sourceLabel}`
            }
        }
    }
})