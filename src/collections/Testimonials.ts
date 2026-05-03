import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/')
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'kind', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g. CEO, Pluie',
      },
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Founder', value: 'Founder' },
        { label: 'Investor', value: 'Investor' },
        { label: 'Partner', value: 'Partner' },
      ],
      defaultValue: 'Founder',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Lower numbers appear first',
      },
      defaultValue: 1,
    },
  ],
}
