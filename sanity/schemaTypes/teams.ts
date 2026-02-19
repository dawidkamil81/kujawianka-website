import { defineField, defineType } from 'sanity'

export const team = defineType({
    name: 'team',
    title: 'Baza Klubów',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Nazwa Klubu', type: 'string', validation: Rule => Rule.required() }),
        defineField({ name: 'logo', title: 'Herb', type: 'image', options: { hotspot: true } }),
        // Opcjonalnie: miasto, stadion itd.
    ],
    preview: {
        select: { title: 'name', media: 'logo' }
    }
})