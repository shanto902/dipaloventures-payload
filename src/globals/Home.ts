import { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'residencySection',
      type: 'group',
      label: 'Residency Section',
      fields: [
        {
          name: 'carouselImages',
          type: 'array',
          label: 'Carousel Images',
          minRows: 1,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
