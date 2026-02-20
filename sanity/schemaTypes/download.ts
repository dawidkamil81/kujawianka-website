import { defineField, defineType } from 'sanity'
import { Download } from 'lucide-react'

export const download = defineType({
  name: 'download',
  title: 'Pliki do pobrania',
  type: 'document',
  icon: Download,
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa dokumentu',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Krótki opis (opcjonalnie)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'file',
      title: 'Plik',
      type: 'file',
      options: {
        storeOriginalFilename: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategoria',
      type: 'string',
      options: {
        list: [
          { title: 'Dokumenty klubowe', value: 'club' },
          { title: 'Dla zawodników', value: 'players' },
          { title: 'Inne', value: 'other' },
        ],
      },
      initialValue: 'club',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data dodania',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    },
  },
})
