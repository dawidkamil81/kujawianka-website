import { defineField, defineType } from 'sanity'

export const team = defineType({
    name: 'team',
    title: 'Kluby (Baza)',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nazwa Klubu',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'logo',
            title: 'Herb Klubu',
            type: 'image',
            options: { hotspot: true }
        })
    ],
    preview: {
        select: {
            title: 'name',
            media: 'logo'
        }
    }
})