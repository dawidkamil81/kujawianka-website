import { defineField, defineType } from 'sanity'

// Pomocnicza funkcja do tworzenia pól social media
const socialLink = (name: string, title: string) =>
    defineField({
        name,
        title,
        type: 'object',
        options: { collapsible: true, collapsed: true },
        fields: [
            defineField({
                name: 'url',
                title: 'Link do profilu',
                type: 'url'
            }),
            defineField({
                name: 'isVisible',
                title: 'Widoczny na stronie?',
                type: 'boolean',
                initialValue: false // Domyślnie ukryte, chyba że włączymy
            }),
        ]
    });

export const siteSettings = defineType({
    name: 'siteSettings',
    title: 'Ustawienia Strony',
    type: 'document',
    fields: [
        // --- GŁÓWNE ---
        defineField({
            name: 'title',
            title: 'Tytuł Strony',
            type: 'string',
            description: 'Główny tytuł strony (np. nazwa klubu), widoczny na pasku przeglądarki.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo Klubu',
            type: 'image',
            options: { hotspot: true },
            description: 'Główne logo wyświetlane w nagłówku i stopce.',
        }),

        // --- SOCIAL MEDIA (ZMODYFIKOWANE) ---
        defineField({
            name: 'socialLinks',
            title: 'Media Społecznościowe',
            type: 'object',
            options: { collapsible: true, collapsed: false },
            description: 'Zarządzaj linkami do social mediów. Włącz "Widoczny", aby ikona pojawiła się w stopce.',
            fields: [
                socialLink('facebook', 'Facebook'),
                socialLink('instagram', 'Instagram'),
                socialLink('youtube', 'YouTube'),
                socialLink('tiktok', 'TikTok'),
                socialLink('twitter', 'X (Twitter)'), // Opcjonalnie
            ]
        }),

        // --- KONTAKT ---
        defineField({
            name: 'contact',
            title: 'Dane Kontaktowe',
            type: 'object',
            options: { collapsible: true, collapsed: false },
            fields: [
                defineField({ name: 'email', title: 'Adres E-mail', type: 'string' }),
                defineField({ name: 'phone', title: 'Numer Telefonu', type: 'string' }),
                defineField({ name: 'address', title: 'Adres Klubu', type: 'text', rows: 3 }),
            ]
        }),

        defineField({
            name: 'footerCertificates',
            title: 'Certyfikaty w stopce',
            description: 'Logotypy partnerów, certyfikaty, licencje (widoczne pod opisem w stopce)',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    defineField({ name: 'alt', title: 'Opis (Alt)', type: 'string' }),
                    defineField({ name: 'url', title: 'Link (opcjonalny)', type: 'url' })
                ]
            }]
        }),

        defineField({
            name: 'footerDownloads',
            title: 'Pliki do pobrania w stopce',
            description: 'Np. Oferta PDF, Statut, Logo Pack',
            type: 'array',
            of: [{
                type: 'file',
                options: { storeOriginalFilename: true },
                fields: [
                    defineField({
                        name: 'title',
                        title: 'Nazwa wyświetlana na przycisku',
                        type: 'string',
                        validation: Rule => Rule.required()
                    })
                ]
            }]
        }),

        // --- SEO ---
        defineField({
            name: 'seo',
            title: 'Domyślne SEO',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            description: 'Ustawienia domyślne dla wyszukiwarek i udostępniania.',
            fields: [
                defineField({
                    name: 'description',
                    title: 'Opis strony (Meta Description)',
                    type: 'text',
                    rows: 3,
                    validation: (rule) => rule.max(160).warning('Opis powinien mieć max 160 znaków.')
                }),
                defineField({
                    name: 'ogImage',
                    title: 'Obrazek udostępniania (Social Share)',
                    type: 'image',
                    description: 'Obrazek, który pojawi się po wklejeniu linku do strony na Facebooka.'
                }),
            ]
        }),
    ],
})