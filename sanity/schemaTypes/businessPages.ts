import { defineField, defineType } from 'sanity'
import { Briefcase, Handshake, Users, TrendingUp, Calendar, Trophy, Star } from 'lucide-react'

// Wspólne pola (bez zmian, dla porządku)
const commonFields = [
    defineField({
        name: 'title',
        title: 'Tytuł strony (Nagłówek H1)',
        type: 'string',
        validation: rule => rule.required()
    }),
    defineField({
        name: 'description',
        title: 'Opis pod tytułem',
        type: 'text',
        rows: 3
    }),
]

export const offerPage = defineType({
    name: 'offerPage',
    title: 'Strona: Oferta / Współpraca',
    type: 'document',
    fields: [...commonFields,
    defineField({
        name: 'content',
        title: 'Treść oferty',
        type: 'array',
        of: [{ type: 'block' }]
    })
    ]
})

// === TUTAJ GŁÓWNE ZMIANY DLA STRONY SPONSORÓW ===
export const sponsorsPage = defineType({
    name: 'sponsorsPage',
    title: 'Strona: Sponsorzy',
    type: 'document',
    fields: [
        ...commonFields,

        // 1. SEKCJA STATYSTYK (KAFELKI)
        defineField({
            name: 'stats',
            title: 'Kafelki ze statystykami',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({
                        name: 'value',
                        title: 'Wartość (np. 1200+)',
                        type: 'string'
                    }),
                    defineField({
                        name: 'label',
                        title: 'Etykieta (np. Kibiców)',
                        type: 'string'
                    }),
                    defineField({
                        name: 'icon',
                        title: 'Ikona',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Uścisk dłoni (Handshake)', value: 'handshake' },
                                { title: 'Ludzie (Users)', value: 'users' },
                                { title: 'Wykres (TrendingUp)', value: 'trending' },
                                { title: 'Kalendarz (Calendar)', value: 'calendar' },
                                { title: 'Puchar (Trophy)', value: 'trophy' },
                                { title: 'Gwiazda (Star)', value: 'star' },
                            ],
                            layout: 'radio'
                        },
                        initialValue: 'handshake'
                    })
                ],
                preview: {
                    select: {
                        title: 'value',
                        subtitle: 'label'
                    }
                }
            }],
            validation: rule => rule.max(4).warning('Zalecane maksymalnie 4 kafelki')
        }),

        // 2. SEKCJA CTA (DOLNA)
        defineField({
            name: 'ctaTitle',
            title: 'Tytuł sekcji kontaktowej (CTA)',
            type: 'string',
            initialValue: 'Dołącz do Rodziny Kujawianki'
        }),
        defineField({
            name: 'ctaDescription',
            title: 'Opis sekcji kontaktowej',
            type: 'text',
            rows: 2,
            initialValue: 'Budujmy razem silną markę i wspierajmy lokalny sport. Sprawdź naszą ofertę sponsorską.'
        })
    ]
})

export const partnersPage = defineType({
    name: 'partnersPage',
    title: 'Strona: Klubowicze',
    type: 'document',
    fields: [...commonFields]
})

export const club100Page = defineType({
    name: 'club100Page',
    title: 'Strona: Klub 100',
    type: 'document',
    fields: [...commonFields]
})