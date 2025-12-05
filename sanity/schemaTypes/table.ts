import { defineField, defineType } from 'sanity'

export const table = defineType({
    name: 'table',
    title: 'Tabela Ligowa',
    type: 'document',
    fields: [
        defineField({
            name: 'season',
            title: 'Sezon',
            type: 'string',
            initialValue: '2025/2026'
        }),
        defineField({
            name: 'rows',
            title: 'Wiersze Tabeli',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'tableRow',
                    title: 'Wiersz',
                    fields: [
                        defineField({ name: 'teamName', title: 'Nazwa drużyny', type: 'string' }),
                        defineField({ name: 'position', title: 'Pozycja', type: 'number' }),
                        defineField({ name: 'matches', title: 'Mecze (M)', type: 'number' }),
                        defineField({ name: 'points', title: 'Punkty (Pkt)', type: 'number' }),
                        defineField({ name: 'won', title: 'Zwycięstwa (Z)', type: 'number' }),
                        defineField({ name: 'drawn', title: 'Remisy (R)', type: 'number' }),
                        defineField({ name: 'lost', title: 'Porażki (P)', type: 'number' }),
                        defineField({ name: 'goals', title: 'Bilans bramkowy', type: 'string' }),
                    ],
                    preview: {
                        select: {
                            title: 'teamName',
                            position: 'position',
                            points: 'points',
                            media: 'teamLogo'
                        },
                        prepare({ title, position, points, media }) {
                            return {
                                title: `${position}. ${title}`,
                                subtitle: `${points} pkt`,
                                media: media
                            }
                        }
                    }
                },
            ],
        }),
    ],
})