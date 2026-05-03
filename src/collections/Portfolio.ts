import type { CollectionConfig } from 'payload'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['order', 'name', 'sector', 'stage', 'featured'],
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
      name: 'order',
      type: 'number',
      admin: {
        description: 'Lower numbers appear first',
      },
      defaultValue: 100,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Show in Homepage Marquee',
      defaultValue: true,
    },
    {
      name: 'url',
      type: 'text',
      label: 'Website URL',
      required: true,
    },
    {
      name: 'sector',
      type: 'select',
      required: true,
      options: [
        { label: 'Energy Transition', value: 'energy' },
        { label: 'Climate Tech', value: 'climate' },
        { label: 'Physical AI', value: 'physical_ai' },
      ],
    },
    {
      name: 'stage',
      type: 'select',
      required: true,
      options: [
        { label: 'Seed', value: 'seed' },
        { label: 'Series A', value: 'series_a' },
        { label: 'Series B', value: 'series_b' },
      ],
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
      name: 'desc',
      type: 'textarea',
      label: 'Short Description',
      required: true,
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
      name: 'exit',
      type: 'text',
      label: 'Exit Status (optional)',
    },
  ],
}
