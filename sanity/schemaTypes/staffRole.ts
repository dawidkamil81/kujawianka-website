import { defineField, defineType } from 'sanity'
import { UserCog } from 'lucide-react'

export const staffRole = defineType({
  name: 'staffRole',
  title: 'Role w Sztabie',
  type: 'document',
  icon: UserCog,
  fields: [
    defineField({
      name: 'name',
      title: 'Nazwa Roli',
      type: 'string',
      description: 'np. Trener, Asystent, Fizjoterapeuta',
      validation: (rule) => rule.required(),
    }),
  ],
})
