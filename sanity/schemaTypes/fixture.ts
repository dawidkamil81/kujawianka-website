import { defineField, defineType } from 'sanity'

// Obiekt pojedynczego meczu
const match = defineField({
    name: 'match',
    title: 'Mecz',
    type: 'object',
    fields: [
        defineField({
            name: 'dataSource',
            title: 'Źródło danych',
            type: 'string',
            options: {
                list: [
                    { title: 'Scraper (Łącznik)', value: 'scraper' },
                    { title: 'Manualnie', value: 'manual' }
                ],
                layout: 'radio'
            },
            initialValue: 'manual'
        }),

        // --- ID ZEWNĘTRZNE (Widoczne tylko dla scrapera) ---
        defineField({
            name: 'externalId',
            title: 'ID Meczu (Systemowe)',
            type: 'string',
            hidden: ({ parent }) => parent?.dataSource !== 'scraper',
            readOnly: true,
            description: 'Unikalny identyfikator meczu ze scrapera.'
        }),

        // --- DATA I GODZINA ---
        defineField({
            name: 'date',
            title: 'Data i godzina',
            type: 'datetime',
            // Jeśli scraper -> tylko do odczytu, jeśli manual -> edytowalne
            readOnly: ({ parent }) => parent?.dataSource === 'scraper'
        }),

        // --- GOSPODARZ ---
        defineField({
            name: 'homeTeam',
            title: 'Gospodarz',
            type: 'reference',
            to: [{ type: 'team' }],
            // Widoczne zawsze, ale zablokowane dla scrapera
            readOnly: ({ parent }) => parent?.dataSource === 'scraper',
            description: 'Wybierz z listy lub stwórz nowy zespół (+)'
        }),

        // --- GOŚĆ ---
        defineField({
            name: 'awayTeam',
            title: 'Gość',
            type: 'reference',
            to: [{ type: 'team' }],
            readOnly: ({ parent }) => parent?.dataSource === 'scraper'
        }),

        // --- WYNIKI ---
        defineField({
            name: 'homeScore',
            title: 'Gole Gospodarzy',
            type: 'number',
            readOnly: ({ parent }) => parent?.dataSource === 'scraper'
        }),
        defineField({
            name: 'awayScore',
            title: 'Gole Gości',
            type: 'number',
            readOnly: ({ parent }) => parent?.dataSource === 'scraper'
        }),

        // --- STATUS (Ukryte techniczne) ---
        defineField({
            name: 'isFinished',
            title: 'Zakończony',
            type: 'boolean',
            initialValue: true,
            hidden: true
        })
    ],

    // --- PODGLĄD NA LIŚCIE ---
    preview: {
        select: {
            home: 'homeTeam.name',
            away: 'awayTeam.name',
            hScore: 'homeScore',
            aScore: 'awayScore',
            source: 'dataSource',
            date: 'date'
        },
        prepare({ home, away, hScore, aScore, source, date }) {
            // Formatowanie daty
            const dateStr = date
                ? new Date(date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
                : '';

            const scoreStr = (hScore !== undefined && hScore !== null)
                ? `${hScore} : ${aScore}`
                : '-:-';

            const icon = source === 'scraper' ? '🤖' : '👤';

            return {
                title: `${home || '?'} vs ${away || '?'}`,
                subtitle: `${icon} ${scoreStr} | ${dateStr}`
            }
        }
    }
})

export const fixture = defineType({
    name: 'fixture',
    title: 'Kolejka (Terminarz)',
    type: 'document',
    fields: [
        defineField({
            name: 'competition',
            title: 'Rozgrywki',
            type: 'reference',
            to: [{ type: 'competition' }],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'roundNumber',
            title: 'Numer Kolejki',
            type: 'number',
            validation: Rule => Rule.required().min(1)
        }),

        defineField({
            name: 'matches',
            title: 'Mecze w kolejce',
            type: 'array',
            of: [match]
        }),

        // Pola techniczne
        defineField({
            name: 'season',
            title: 'Sezon',
            type: 'string',
            readOnly: true,
            hidden: true
        }),
        defineField({
            name: 'squad',
            title: 'Kadra',
            type: 'reference',
            to: [{ type: 'squad' }],
            readOnly: true,
            hidden: true
        })
    ],
    preview: {
        select: {
            round: 'roundNumber',
            comp: 'competition.name',
            matches: 'matches'
        },
        prepare({ round, comp, matches }) {
            const matchCount = matches ? matches.length : 0;
            return {
                title: `Kolejka ${round}`,
                subtitle: `${comp} | Mecze: ${matchCount}`
            }
        }
    }
})