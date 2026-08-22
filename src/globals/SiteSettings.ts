import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General Site Settings',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Default Site Title',
              defaultValue: 'Dipalo Ventures — Venture Capital for the Physical World',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Default Site Description',
              defaultValue:
                'We back founders building breakthrough deep tech across Energy, Climate, and Physical AI, bringing hands-on engineering expertise and the product manufacturing networks to help you go from prototype to production.',
              required: true,
            },
          ],
        },
        {
          label: 'Page Metadata',
          fields: [
            {
              name: 'pageMetadata',
              type: 'group',
              label: 'Page Specific Metadata',
              fields: [
                {
                  name: 'contact',
                  type: 'group',
                  label: 'Contact Page',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Page Title',
                      defaultValue: 'Contact | Dipalo Ventures',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Page Description',
                      defaultValue:
                        'Connect with the firm. Submit technical inquiries and join the operator network.',
                    },
                  ],
                },
                {
                  name: 'media',
                  type: 'group',
                  label: 'Media Page',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Page Title',
                      defaultValue: 'Media — Dipalo Ventures',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Page Description',
                      defaultValue:
                        'Tales From The Hard Side — honest conversations with the founders manufacturing the physical future.',
                    },
                  ],
                },
                {
                  name: 'portfolio',
                  type: 'group',
                  label: 'Portfolio Page',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Page Title',
                      defaultValue: 'Portfolio — Dipalo Ventures',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Page Description',
                      defaultValue:
                        '16 hard tech companies backed across Fund I, Fund II, and SPVs — built by operators, supported by operators.',
                    },
                  ],
                },
                {
                  name: 'residency',
                  type: 'group',
                  label: 'Residency Page',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Page Title',
                      defaultValue: 'The Residency — Dipalo Ventures',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Page Description',
                      defaultValue:
                        'Our technical diligence program identifies product design and engineering gaps before we invest.',
                    },
                  ],
                },
                {
                  name: 'team',
                  type: 'group',
                  label: 'Team Page',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Page Title',
                      defaultValue: 'Team — Dipalo Ventures',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Page Description',
                      defaultValue:
                        "Operators who invest. Engineers, product builders, and manufacturers who've shipped real things at real scale.",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
