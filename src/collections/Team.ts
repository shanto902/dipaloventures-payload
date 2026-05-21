import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

const slugify = (val: string): string => {
  return val
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const Team: CollectionConfig = {
  slug: 'team',
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.name && !data.slug) {
          data.slug = slugify(data.name)
        }
        return data
      },
    ],
    afterChange: [
      ({ doc }) => {
        revalidatePath('/')
        revalidatePath('/team')
        if (doc?.slug) {
          revalidatePath(`/team/${doc.slug}`)
        }
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'role', 'order'],
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
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from name if left blank',
      },
    },
    {
      name: 'priorInvestments',
      type: 'relationship',
      relationTo: 'companies',
      hasMany: true,
      label: 'Prior Investments',
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Lower numbers appear first',
      },
      defaultValue: 100,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'General Partner', value: 'gp' },
        { label: 'Venture Partner', value: 'vp' },
        { label: 'Advisor', value: 'advisor' },
      ],
      defaultValue: 'gp',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: false,
    },
    {
      name: 'organization',
      type: 'text',
      required: false,
      admin: {
        description: 'Company or institution (e.g. Google, Virginia Tech)',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: false,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'linkedin',
      type: 'text',
      required: false,
    },
    {
      name: 'orgLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
