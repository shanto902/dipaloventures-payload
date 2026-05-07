import { revalidatePath } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  hooks: {
    afterChange: [
      () => {
        revalidatePath('/')
        revalidatePath('/portfolio')
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sector', 'stage', 'featured'],
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
      name: 'desc',
      type: 'textarea',
      label: 'Short Description',
      required: true,
    },

    {
      name: 'fundKeys',
      type: 'select',
      hasMany: true,
      label: 'Funds',
      required: true,
      options: [
        { label: 'Fund I', value: 'fund_1' },
        { label: 'Fund II', value: 'fund_2' },
        { label: 'SPV', value: 'spv' },
      ],
    },
    {
      name: 'sector',
      type: 'select',
      required: true,
      options: [
        { label: 'Energy Transition', value: 'energy' },
        { label: 'Climate Tech', value: 'climate' },
        { label: 'Physical AI', value: 'physical_ai' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'stage',
      type: 'select',
      required: true,
      options: [
        { label: 'Pre Seed', value: 'pre_seed' },
        { label: 'Seed', value: 'seed' },
        { label: 'Series A', value: 'series_a' },
        { label: 'Series B', value: 'series_b' },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'productImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'url',
      type: 'text',
      label: 'Website URL',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Show in Homepage Marquee',
      defaultValue: true,
    },

    {
      name: 'isExited',
      type: 'checkbox',
      label: 'Exited?',
      defaultValue: false,
    },
    {
      name: 'exit',
      type: 'text',
      label: 'Exit Status (optional)',
    },
  ],
}
