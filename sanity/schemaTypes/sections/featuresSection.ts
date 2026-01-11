import { defineField, defineType } from 'sanity'
import { LayoutGrid, Star } from 'lucide-react'

export const featuresSection = defineType({
    name: 'featuresSection',
    title: 'Siatka Cech (Grid)',
    type: 'object',
    icon: LayoutGrid,
    fields: [
        defineField({
            name: 'heading',
            title: 'Nagłówek sekcji',
            type: 'string',
            initialValue: 'Dlaczego warto?'
        }),
        defineField({
            name: 'columns',
            title: 'Liczba kolumn w wierszu',
            type: 'string',
            options: {
                list: [
                    { title: '2 Kolumny', value: '2' },
                    { title: '3 Kolumny (Standard)', value: '3' },
                    { title: '4 Kolumny', value: '4' },
                    // { title: '5 Kolumn', value: '5' } // Opcjonalnie, ale na mobile/tablet może być ciasno
                ],
                layout: 'radio'
            },
            initialValue: '3'
        }),
        defineField({
            name: 'items',
            title: 'Elementy siatki',
            type: 'array',
            of: [
                {
                    type: 'object',
                    icon: Star,
                    fields: [
                        defineField({ name: 'title', title: 'Tytuł', type: 'string' }),
                        defineField({ name: 'description', title: 'Opis', type: 'text', rows: 3 }),
                        defineField({
                            name: 'iconName',
                            title: 'Ikona',
                            type: 'string',
                            options: {
                                list: [
                                    // Lista dostępnych ikon - możesz dodać więcej
                                    { title: 'Puchar (Trophy)', value: 'trophy' },
                                    { title: 'Gwiazda (Star)', value: 'star' },
                                    { title: 'Ludzie (Users)', value: 'users' },
                                    { title: 'Tarcza (Shield)', value: 'shield' },
                                    { title: 'Bilet (Ticket)', value: 'ticket' },
                                    { title: 'Uścisk dłoni (Handshake)', value: 'handshake' },
                                    { title: 'Megafon (Megaphone)', value: 'megaphone' },
                                    { title: 'Teczka (Briefcase)', value: 'briefcase' },
                                    { title: 'Serce (Heart)', value: 'heart' },
                                    { title: 'Kalendarz (Calendar)', value: 'calendar' },
                                    { title: 'Koszulka (Shirt)', value: 'shirt' },
                                    { title: 'Cel (Target)', value: 'target' },
                                    { title: 'Diament (Gem)', value: 'gem' },
                                ]
                            },
                            initialValue: 'star'
                        })
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'iconName' },
                        prepare({ title, subtitle }) {
                            return { title: title || 'Nowy element', subtitle: `Ikona: ${subtitle}` }
                        }
                    }
                }
            ]
        })
    ],
    preview: {
        select: { title: 'heading', columns: 'columns' },
        prepare({ title, columns }) {
            return {
                title: title || 'Siatka Cech',
                subtitle: `Układ: ${columns} kolumny`,
                media: LayoutGrid
            }
        }
    }
})