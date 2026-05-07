import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  labels: {
    singular: 'Gallery Image',
    plural: 'Gallery',
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'order', 'filename'],
  },
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/team')
      },
    ],
  },
  access: {
    read: () => true,
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Sorting order (lower numbers first)',
      },
      defaultValue: 0,
    },
  ],
}
