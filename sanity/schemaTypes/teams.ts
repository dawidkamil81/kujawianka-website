import { defineField, defineType } from 'sanity'

export const teams = defineType({
    name: 'teams',
    title: 'Drużyny',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'Nazwa', type: 'string' }),
        defineField({ name: 'image', title: 'Logo', type: 'image', options: { hotspot: true } }),
    ],
})