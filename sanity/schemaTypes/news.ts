import { defineField, defineType } from 'sanity'

export const news = defineType({
    name: 'news',
    title: 'Aktualność',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Tytuł',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Adres URL',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Data publikacji',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Zdjęcie główne',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Tekst alternatywny',
                    description: 'Krótki opis zdjęcia dla niewidomych, SEO lub w przypadku gdyby zdjęcie nie mogło zostać wyświetlone.',
                }
            ]
        }),
        defineField({
            name: 'excerpt',
            title: 'Krótki opis',
            type: 'text',
            rows: 3,
            description: 'Ten tekst pojawi się na stronie głównej i w liście aktualności.',
            validation: (rule) => rule.max(200),
        }),
        defineField({
            name: 'content',
            title: 'Treść artykułu',
            type: 'array',
            of: [{ type: 'block' }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `by ${author}` }
        },
    },
})