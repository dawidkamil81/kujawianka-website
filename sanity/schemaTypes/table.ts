import { defineField, defineType } from 'sanity'

export const table = defineType({
    name: 'table',
    title: 'Tabela',
    type: 'document',
    fields: [
        defineField({ name: 'squad', title: 'Kadra', type: 'reference', to: [{ type: 'squad' }], readOnly: true }),
        defineField({ name: 'season', title: 'Sezon', type: 'string' }),

        defineField({
            name: 'rows',
            title: 'Drużyny w tabeli',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'team',
                        title: 'Klub',
                        type: 'reference',
                        to: [{ type: 'team' }],
                        description: 'Wybierz klub z bazy lub stwórz nowy klikając "Create new" w rozwijanym menu.'
                    }),
                    defineField({ name: 'matches', title: 'M', type: 'number', initialValue: 0 }),
                    defineField({ name: 'points', title: 'PKT', type: 'number', initialValue: 0 }),
                    defineField({ name: 'won', title: 'Z', type: 'number', initialValue: 0 }),
                    defineField({ name: 'drawn', title: 'R', type: 'number', initialValue: 0 }),
                    defineField({ name: 'lost', title: 'P', type: 'number', initialValue: 0 }),
                    defineField({ name: 'goalsScored', title: 'B+', type: 'number', initialValue: 0 }),
                    defineField({ name: 'goalsLost', title: 'B-', type: 'number', initialValue: 0 }),
                ],
                preview: {
                    select: { title: 'team.name', points: 'points', matches: 'matches', media: 'team.logo' },
                    prepare({ title, points, matches, media }) {
                        return {
                            title: title || 'Brak klubu',
                            subtitle: `M: ${matches || 0} | Pkt: ${points || 0}`,
                            media: media
                        }
                    }
                }
            }]
        })
    ],
    preview: {
        select: { title: 'season', subtitle: 'squad.name' }
    }
})