import { defineField, defineType } from 'sanity'
import { MatchStatsInput } from '../components/MatchStatsInput'

export const matchReport = defineType({
    name: 'matchReport',
    title: 'Raport Meczowy',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tytuł raportu (Mecz)',
            type: 'string',
            description: 'np. Kolejka 17: Kujawianka vs Rywal',
            validation: (rule) => rule.required(),
        }),
        // 1. Dodajemy referencję do drużyny
        defineField({
            name: 'squad',
            title: 'Drużyna',
            type: 'reference',
            to: [{ type: 'squad' }],
            readOnly: true, // Zablokuj edycję, bo to przyjdzie z folderu
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Data Meczu',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'statsGrid',
            title: 'Macierz Statystyk',
            type: 'array',
            of: [{ type: 'playerStatsRow' }],
            components: {
                input: MatchStatsInput
            },
            description: 'Wybierz zawodników z tej drużyny i uzupełnij statystyki.',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            squadName: 'squad.name',
            date: 'date',
        },
        prepare({ title, squadName, date }) {
            return {
                title: title,
                subtitle: `${squadName || 'Brak drużyny'} | ${date ? new Date(date).toLocaleDateString() : ''}`,
            }
        },
    },
})