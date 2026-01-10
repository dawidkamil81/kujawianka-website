import { defineField, defineType } from 'sanity'

// Wspólne pola dla stron biznesowych
const commonFields = [
    defineField({
        name: 'title',
        title: 'Tytuł strony',
        type: 'string',
        validation: rule => rule.required()
    }),
    defineField({
        name: 'heroImage',
        title: 'Zdjęcie w nagłówku',
        type: 'image',
        options: { hotspot: true }
    }),
    defineField({
        name: 'content',
        title: 'Treść główna',
        type: 'array',
        of: [{ type: 'block' }] // Prosty edytor tekstu
    })
]

export const offerPage = defineType({
    name: 'offerPage',
    title: 'Strona: Oferta / Współpraca',
    type: 'document',
    fields: [...commonFields]
})

export const sponsorsPage = defineType({
    name: 'sponsorsPage',
    title: 'Strona: Sponsorzy',
    type: 'document',
    fields: [...commonFields] // Tu będą się wyświetlać sponsorzy automatycznie pod treścią
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