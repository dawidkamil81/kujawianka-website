import { defineField, defineType } from 'sanity'
import { ImageIcon, AlignLeft, AlignRight } from 'lucide-react'

export const imageTextSection = defineType({
  name: 'imageTextSection',
  title: 'Zdjęcie + Tekst',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({ name: 'heading', title: 'Nagłówek', type: 'string' }),
    defineField({
      name: 'content',
      title: 'Treść',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Zdjęcie',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'layout',
      title: 'Układ',
      type: 'string',
      options: {
        list: [
          { title: 'Zdjęcie po lewej', value: 'left' },
          { title: 'Zdjęcie po prawej', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'image' },
    prepare({ title, media }) {
      return { title: title || 'Zdjęcie z tekstem', media }
    },
  },
})
