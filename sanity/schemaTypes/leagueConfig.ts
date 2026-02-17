import { defineField, defineType } from 'sanity'

export const leagueConfig = defineType({
    name: 'leagueConfig',
    title: 'Konfiguracja Ligi',
    type: 'document',
    fields: [
        defineField({ name: 'squad', title: 'Przypisana Kadra', type: 'reference', to: [{ type: 'squad' }], validation: Rule => Rule.required() }),
        defineField({ name: 'season', title: 'Sezon', type: 'string', initialValue: '2025/2026' }),
        defineField({ name: 'leagueName', title: 'Nazwa Ligi', type: 'string' }),
        defineField({ name: 'leagueUrl', title: 'Link do rozgrywek (Łączy nas piłka/90minut)', type: 'url' }),

        defineField({ name: 'teamsCount', title: 'Liczba drużyn w lidze', type: 'number', validation: Rule => Rule.required().min(2) }),
        defineField({ name: 'roundsCount', title: 'Liczba kolejek', type: 'number', validation: Rule => Rule.required().min(1) }),

        defineField({
            name: 'promotionRelegation',
            title: 'Miejsca w tabeli',
            type: 'object',
            fields: [
                defineField({ name: 'promotion', title: 'Awans (ilość miejsc)', type: 'number' }),
                defineField({ name: 'promotionPlayoff', title: 'Baraże o awans', type: 'number' }),
                defineField({ name: 'relegationPlayoff', title: 'Baraże o utrzymanie', type: 'number' }),
                defineField({ name: 'relegation', title: 'Spadek', type: 'number' }),
            ]
        })
    ],
    preview: {
        select: { title: 'leagueName', subtitle: 'squad.name' }
    }
})