import { defineField, defineType } from 'sanity'

// Wspólne pola (nagłówek, opis)
const commonFields = [
    defineField({
        name: 'title',
        title: 'Tytuł strony',
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
            title: 'Karty Pakietów Sponsorskich',
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
                                { title: 'Diament', value: 'gem' },
                                { title: 'Cel', value: 'target' },
                                { title: 'Koszulka', value: 'shirt' },
                                { title: 'Korona', value: 'crown' },
                                { title: 'Uścisk dłoni', value: 'handshake' },
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
                                { title: 'Biały', value: 'white' },
                                { title: 'Niebieski', value: 'blue' },
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
        defineField({
            name: 'contentBuilder',
            title: 'Dynamiczne Sekcje Strony',
            type: 'pageBuilder' // <--- To musi tu być
        }),

        defineField({ name: 'ctaTitle', title: 'Nagłówek sekcji kontaktowej', type: 'string' }),
        defineField({ name: 'ctaDescription', title: 'Opis sekcji kontaktowej', type: 'text' })
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
                                { title: 'Uścisk dłoni', value: 'handshake' },
                                { title: 'Ludzie', value: 'users' },
                                { title: 'Wykres', value: 'trending' },
                                { title: 'Kalendarz', value: 'calendar' },
                                { title: 'Puchar', value: 'trophy' },
                                { title: 'Gwiazda', value: 'star' },
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
            title: 'Tytuł sekcji kontaktowej',
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
    fields: [
        ...commonFields,

        // Sekcja "Dlaczego warto?" (opcjonalna)
        defineField({
            name: 'benefitsTitle',
            title: 'Tytuł sekcji korzyści',
            type: 'string'
        }),
        defineField({
            name: 'benefits',
            title: 'Karty korzyści',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'title', title: 'Tytuł', type: 'string' }),
                    defineField({ name: 'description', title: 'Opis', type: 'text', rows: 2 }),
                    defineField({
                        name: 'iconName',
                        title: 'Ikona',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Uścisk dłoni', value: 'handshake' },
                                { title: 'Ludzie', value: 'users' },
                                { title: 'Serce', value: 'heart' },
                                { title: 'Gwiazda', value: 'star' },
                                { title: 'Medal', value: 'medal' }
                            ]
                        }
                    })
                ]
            }]
        }),

        // CTA
        defineField({ name: 'ctaTitle', title: 'Nagłówek sekcji kontaktowej', type: 'string' }),
        defineField({ name: 'ctaDescription', title: 'Opis sekcji kontaktowej', type: 'text' })
    ]
})

export const club100Page = defineType({
    name: 'club100Page',
    title: 'Strona: Klub 100',
    type: 'document',
    fields: [
        ...commonFields,

        // 1. Sekcja Korzyści (Górna)
        defineField({
            name: 'benefits',
            title: 'Karty korzyści',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    defineField({ name: 'title', title: 'Tytuł', type: 'string' }),
                    defineField({ name: 'description', title: 'Opis', type: 'text', rows: 3 }),
                    defineField({
                        name: 'iconName',
                        title: 'Ikona',
                        type: 'string',
                        options: {
                            list: [
                                { title: 'Korona', value: 'crown' },
                                { title: 'Tarcza', value: 'shield' },
                                { title: 'Ludzie', value: 'users' },
                                { title: 'Gwiazda', value: 'star' },
                                { title: 'Bilet', value: 'ticket' }
                            ]
                        },
                        initialValue: 'crown'
                    })
                ]
            }]
            // Usunięto validation: rule => rule.max(3), możesz dodać ile chcesz
        }),

        // 2. NOWOŚĆ: Sekcja "Więcej niż wsparcie" (Środkowa)
        defineField({
            name: 'aboutTitle',
            title: 'Tytuł sekcji środkowej (np. Więcej niż wsparcie)',
            type: 'string',
            initialValue: 'Więcej niż wsparcie'
        }),
        defineField({
            name: 'aboutContent',
            title: 'Treść sekcji środkowej',
            type: 'text',
            rows: 6,
            initialValue: 'Klub 100 to inicjatywa skierowana do osób prywatnych i lokalnych przedsiębiorców...'
        }),

        // 3. CTA
        defineField({ name: 'ctaTitle', title: 'Nagłówek sekcji kontaktowej', type: 'string' }),
        defineField({ name: 'ctaDescription', title: 'Opis sekcji kontaktowej', type: 'text' })
    ]
})