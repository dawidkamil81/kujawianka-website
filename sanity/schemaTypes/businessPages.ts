import { defineField, defineType } from 'sanity'

// Wspólne pola (nagłówek, opis)
const commonFields = [
    defineField({
        name: 'title',
        title: 'Tytuł strony (H1)',
        type: 'string',
        initialValue: 'Tytuł strony'
    }),
    defineField({
        name: 'description',
        title: 'Opis pod tytułem',
        type: 'text',
        rows: 3
    }),
]

// === 1. STRONA OFERTY (Zostawiamy tę wersję, bo działa poprawnie z frontendem) ===
export const offerPage = defineType({
    name: 'offerPage',
    title: 'Strona: Oferta',
    type: 'document',
    fields: [
        ...commonFields,

        // Pakiety Sponsorskie
        defineField({
            name: 'packages',
            title: 'Karty Pakietów (Cooperation Types)',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'title', title: 'Nazwa Pakietu', type: 'string' }),
                    defineField({ name: 'description', title: 'Opis', type: 'text', rows: 4 }),
                    defineField({
                        name: 'iconName',
                        title: 'Ikona',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Diament (Gem)', value: 'gem' },
                                { title: 'Cel (Target)', value: 'target' },
                                { title: 'Koszulka (Shirt)', value: 'shirt' },
                                { title: 'Korona (Crown)', value: 'crown' },
                                { title: 'Uścisk dłoni (Handshake)', value: 'handshake' },
                            ],
                            layout: 'radio'
                        },
                        initialValue: 'gem'
                    }),
                    defineField({
                        name: 'colorTheme',
                        title: 'Kolorystyka karty',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Szmaragdowy (Domyślny)', value: 'emerald' },
                                { title: 'Biały (Dla Klub 100)', value: 'white' },
                                { title: 'Niebieski (Dla Klubowicza)', value: 'blue' },
                            ],
                            layout: 'radio'
                        },
                        initialValue: 'emerald'
                    }),
                    defineField({
                        name: 'link',
                        title: 'Link',
                        type: 'string',
                        initialValue: '#contact'
                    })
                ],
                preview: {
                    select: {
                        title: 'title',
                        subtitle: 'colorTheme'
                    }
                }
            }]
        }),

        // Statystyki dla Oferty
        defineField({
            name: 'stats',
            title: 'Statystyki (Kafelki)',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'value', title: 'Wartość', type: 'string' }),
                    defineField({ name: 'label', title: 'Etykieta', type: 'string' }),
                    defineField({
                        name: 'iconName',
                        title: 'Ikona',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Uścisk dłoni', value: 'handshake' },
                                { title: 'Ludzie', value: 'users' },
                                { title: 'Wykres', value: 'trending' },
                                { title: 'Kalendarz', value: 'calendar' }
                            ]
                        }
                    })
                ]
            }]
        }),

        defineField({ name: 'ctaTitle', title: 'Nagłówek CTA', type: 'string' }),
        defineField({ name: 'ctaDescription', title: 'Opis CTA', type: 'text' })
    ]
})

// === 2. STRONA SPONSORÓW (Przywrócona pełna wersja z Twojego kodu) ===
export const sponsorsPage = defineType({
    name: 'sponsorsPage',
    title: 'Strona: Sponsorzy',
    type: 'document',
    fields: [
        ...commonFields,

        // SEKCJA STATYSTYK (KAFELKI)
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
                        name: 'icon', // Tutaj w Sponsorach używamy pola 'icon', w ofercie 'iconName' (zgodnie z historią zmian)
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

        // SEKCJA CTA (DOLNA)
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

// === 3. POZOSTAŁE STRONY ===
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