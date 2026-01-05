import { defineField, defineType } from 'sanity'

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

        // --- SOCIAL MEDIA ---
        defineField({
            name: 'socialLinks',
            title: 'Media Społecznościowe',
            type: 'object',
            options: { collapsible: true, collapsed: false },
            fields: [
                defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
                defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
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

        // --- SEO ---
        defineField({
            name: 'seo',
            title: 'Domyślne SEO',
            type: 'object',
            options: { collapsible: true, collapsed: true }, // Domyślnie zwinięte, żeby nie przeszkadzało
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