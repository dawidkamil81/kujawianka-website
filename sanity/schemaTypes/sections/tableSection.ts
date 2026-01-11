import { defineField, defineType } from 'sanity'
import { Table, Columns } from 'lucide-react'

export const tableSection = defineType({
    name: 'tableSection',
    title: 'Sekcja Tabela',
    type: 'object',
    icon: Table,
    fields: [
        defineField({
            name: 'heading',
            title: 'Nagłówek sekcji',
            type: 'string',
        }),
        defineField({
            name: 'layout',
            title: 'Układ treści',
            type: 'string',
            options: {
                list: [
                    { title: 'Tabela na całą szerokość (Bez tekstu obok)', value: 'full' },
                    { title: 'Tekst po lewej, Tabela po prawej', value: 'text-left' },
                    { title: 'Tabela po lewej, Tekst po prawej', value: 'text-right' },
                ],
                layout: 'radio'
            },
            initialValue: 'full'
        }),
        defineField({
            name: 'content',
            title: 'Treść obok tabeli (Opcjonalna)',
            type: 'array',
            of: [{ type: 'block' }],
            hidden: ({ parent }) => parent?.layout === 'full' // Ukryj, jeśli wybrano full width
        }),

        // --- STRUKTURA TABELI ---
        defineField({
            name: 'tableRows',
            title: 'Wiersze Tabeli',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Wiersz',
                    icon: Columns,
                    fields: [
                        defineField({
                            name: 'isHeader',
                            title: 'To jest nagłówek (wyróżniony)',
                            type: 'boolean',
                            initialValue: false
                        }),
                        defineField({
                            name: 'cells',
                            title: 'Komórki (Tekst w kolumnach)',
                            description: 'Dodaj tyle elementów, ile ma być kolumn w tym wierszu.',
                            type: 'array',
                            of: [{ type: 'string' }]
                        })
                    ],
                    preview: {
                        select: { cells: 'cells', isHeader: 'isHeader' },
                        prepare({ cells, isHeader }) {
                            const text = cells ? cells.join(' | ') : '(Pusty wiersz)';
                            return {
                                title: text,
                                subtitle: isHeader ? 'Nagłówek' : 'Zwykły wiersz'
                            }
                        }
                    }
                }
            ]
        })
    ],
    preview: {
        select: { title: 'heading', layout: 'layout' },
        prepare({ title, layout }) {
            return {
                title: title || 'Sekcja Tabela',
                subtitle: `Układ: ${layout}`,
                media: Table
            }
        }
    }
})