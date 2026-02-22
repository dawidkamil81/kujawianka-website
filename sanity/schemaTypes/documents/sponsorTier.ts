import { defineField, defineType } from 'sanity'
import { Tag } from 'lucide-react'

export const sponsorTier = defineType({
  name: 'sponsorTier',
  title: 'Typy Sponsorów',
  type: 'document',
  icon: Tag,
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa Grupy',
      type: 'string',
      description: 'np. Sponsor Główny, Partnerzy Techniczni, Klub 100',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rank',
      title: 'Kolejność (Waga)',
      type: 'number',
      description:
        'Im mniejsza liczba, tym wyżej grupa będzie wyświetlana (np. 1 dla Sponsora Głównego).',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Kolejność',
      name: 'rankAsc',
      by: [{ field: 'rank', direction: 'asc' }],
    },
  ],
})
