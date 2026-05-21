import type { CollectionConfig } from 'payload'

export const Companies: CollectionConfig = {
  slug: 'companies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'link', 'exit', 'isInactive'],
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'link',
      type: 'text',
      label: 'Website Link',
      required: false,
    },
    {
      name: 'exit',
      type: 'checkbox',
      label: 'Exited?',
      defaultValue: false,
    },
    {
      name: 'isInactive',
      type: 'checkbox',
      label: 'Inactive?',
      defaultValue: false,
    },
  ],
}
