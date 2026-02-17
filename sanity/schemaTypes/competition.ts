import { defineField, defineType } from 'sanity'

export const competition = defineType({
    name: 'competition',
    title: 'Rozgrywki (Konfiguracja)',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nazwa Rozgrywek',
            type: 'string', // np. "IV Liga Kujawsko-Pomorska"
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'season',
            title: 'Sezon',
            type: 'string', // np. "2023/2024"
            initialValue: '2024/2025'
        }),
        defineField({
            name: 'squad',
            title: 'Przypisana Kadra',
            type: 'reference',
            to: [{ type: 'squad' }],
            description: 'Wybierz kadrę (np. Seniorzy, Juniorzy), która bierze udział w tych rozgrywkach.',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'url',
            title: 'Link do zewnętrznych rozgrywek',
            type: 'url'
        }),
        // --- KONFIGURACJA ROZGRYWEK ---
        defineField({
            name: 'config',
            title: 'Konfiguracja Ligi',
            type: 'object',
            options: { collapsible: false },
            fields: [
                { name: 'teamsCount', title: 'Liczba drużyn w lidze', type: 'number', validation: Rule => Rule.min(2) },
                { name: 'roundsCount', title: 'Liczba kolejek', type: 'number' },
                { name: 'promotionSpots', title: 'Miejsca premiowane awansem', type: 'number' },
                { name: 'promotionPlayoffSpots', title: 'Miejsca barażowe (awans)', type: 'number' },
                { name: 'relegationPlayoffSpots', title: 'Miejsca barażowe (spadek)', type: 'number' },
                { name: 'relegationSpots', title: 'Miejsca spadkowe', type: 'number' },
            ]
        })
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'season'
        }
    }
})