// Pitch form schema — the single source of truth for sections and fields.
// Field ids here must stay in sync with PITCH_COLUMN_MAP in src/lib/monday.ts.

export type PitchFieldType =
  | 'text'
  | 'email'
  | 'url'
  | 'long'
  | 'select'
  | 'radio'
  | 'check'
  | 'file'

export interface PitchField {
  id: string
  label: string
  type: PitchFieldType
  required: boolean
  placeholder?: string
  help?: string
  half?: boolean
  options?: string[]
}

export interface PitchSection {
  id: string
  kicker: string
  short: string
  title: string
  blurb?: string
  fields: PitchField[]
}

export const PITCH_SCHEMA: PitchSection[] = [
  {
    id: 'contact',
    kicker: '01 / Contact',
    short: 'Contact',
    title: 'Contact Information',
    blurb: 'Tell us who you are.',
    fields: [
      {
        id: 'name',
        label: 'Your name',
        type: 'text',
        required: true,
        placeholder: 'Jane Founder',
        half: true,
      },
      {
        id: 'email',
        label: 'Your email address',
        type: 'email',
        required: true,
        placeholder: 'jane@company.com',
        half: true,
      },
      {
        id: 'applied',
        label: 'Have you applied to our Fund before?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No'],
      },
      {
        id: 'heard',
        label: 'How did you hear about us?',
        type: 'radio',
        required: true,
        options: [
          'A Fund In Our Network',
          'Website',
          'Conference',
          'Networking Event',
          'Accelerators & Incubators',
          'Newsletter',
          'Referral',
          'Other',
        ],
      },
      {
        id: 'heardDetail',
        label: 'Tell us more',
        type: 'text',
        required: false,
        placeholder: 'Name of person, event, fund, etc.',
        help: 'Optional — helps us credit the connection.',
      },
    ],
  },
  {
    id: 'company',
    kicker: '02 / Company',
    short: 'Company',
    title: 'Company Information',
    fields: [
      {
        id: 'company',
        label: "Your company's name",
        type: 'text',
        required: true,
        placeholder: 'Acme Robotics',
        half: true,
      },
      {
        id: 'website',
        label: "Your company's website",
        type: 'url',
        required: true,
        placeholder: 'https://',
        half: true,
      },
      {
        id: 'linkedin',
        label: "CEO's LinkedIn",
        type: 'url',
        required: true,
        placeholder: 'https://linkedin.com/in/',
      },
      {
        id: 'oneliner',
        label: 'In one sentence, what does your company do?',
        type: 'text',
        required: true,
        placeholder: 'We build…',
      },
      {
        id: 'deck',
        label: 'Your pitch deck',
        type: 'file',
        required: true,
        help: 'PDF format · Max 10 MB',
      },
      {
        id: 'identity',
        label: 'Do any of your founding team identify as any of the below? Select all that apply.',
        type: 'check',
        required: false,
        help: 'Optional — we only use this data to assess bias in our selection process.',
        options: [
          'Prefer not to answer',
          'Black / African American',
          'Hispanic / Latinx',
          'Asian American',
          'Native American or Alaska Native',
          'Native Hawaiian or Pacific Islander',
          'Women',
          'LGBTQIA+',
          'Foreign Born or First-Gen Immigrant',
          'Veterans',
          'Persons with Disabilities',
          'Neurodivergent',
          'None of the above',
        ],
      },
      {
        id: 'street',
        label: 'Street address',
        type: 'text',
        required: true,
        placeholder: '123 Main St',
      },
      { id: 'city', label: 'City', type: 'text', required: true, half: true },
      {
        id: 'state',
        label: 'State / Province',
        type: 'text',
        required: true,
        placeholder: 'e.g. Illinois, Ontario',
        half: true,
      },
      {
        id: 'country',
        label: 'Which country is your company based in?',
        type: 'select',
        required: true,
        options: [
          'United States',
          'Canada',
          'United Kingdom',
          'Germany',
          'France',
          'Netherlands',
          'Sweden',
          'Switzerland',
          'Israel',
          'India',
          'Singapore',
          'Australia',
          'Japan',
          'South Korea',
          'Brazil',
          'Mexico',
          'Nigeria',
          'Kenya',
          'South Africa',
          'United Arab Emirates',
          'Other',
        ],
      },
      {
        id: 'industry',
        label: 'Pick your industry',
        type: 'radio',
        required: true,
        options: ['Energy', 'Climate', 'Physical AI', 'Other'],
      },
      {
        id: 'sector',
        label: 'Pick the closest sector your company operates in',
        type: 'radio',
        required: true,
        options: [
          'Distributed Generation',
          'Energy Storage',
          'Renewables & Data Center Infrastructure',
          'Waste to Value',
          'Water Tech',
          'Industrial Decarbonization',
          'Smart Devices',
          'Bio Synthetics',
          'Industrial Intelligence',
          'Other',
        ],
      },
      {
        id: 'share',
        label: 'OK to share basic details about your company with other potential investors?',
        type: 'radio',
        required: true,
        help: "We'd only share: your name, email, company name, website, sector, and brief description.",
        options: ['Yes', 'No'],
      },
    ],
  },
  {
    id: 'business',
    kicker: '03 / Business',
    short: 'Business',
    title: 'Business Plan & Model',
    blurb: 'Explain as briefly as possible — please skip jargon and marketing speak.',
    fields: [
      {
        id: 'problem',
        label: 'What is the problem you are trying to solve?',
        type: 'long',
        required: true,
      },
      {
        id: 'solution',
        label: 'How is your company addressing this problem?',
        type: 'long',
        required: true,
      },
      { id: 'diff', label: 'What are your key differentiators?', type: 'long', required: true },
      {
        id: 'revenue',
        label: 'What is your current annual revenue?',
        type: 'text',
        required: true,
        placeholder: '$0',
        half: true,
      },
      {
        id: 'tam',
        label: 'How big is your Total Addressable Market?',
        type: 'text',
        required: true,
        placeholder: '$',
        half: true,
      },
      { id: 'model', label: 'What is your business model?', type: 'long', required: true },
    ],
  },
  {
    id: 'product',
    kicker: '04 / Product',
    short: 'Product',
    title: 'Product',
    fields: [
      {
        id: 'validation',
        label: 'What customer validation have you done?',
        type: 'long',
        required: true,
      },
      {
        id: 'trl',
        label: "What is your product's Technology Readiness Level?",
        type: 'select',
        required: true,
        help: '1 = basic principles · 9 = proven in operational use',
        options: [
          'TRL 1',
          'TRL 2',
          'TRL 3',
          'TRL 4',
          'TRL 5',
          'TRL 6',
          'TRL 7',
          'TRL 8',
          'TRL 9',
          'Not sure',
        ],
      },
      {
        id: 'products',
        label: 'What are your products? Briefly describe each.',
        type: 'long',
        required: true,
      },
      { id: 'ip', label: 'Tell us about your intellectual property', type: 'long', required: true },
    ],
  },
  {
    id: 'sustain',
    kicker: '05 / Sustainability',
    short: 'Sustainability',
    title: 'Sustainability',
    blurb:
      'Dipalo is committed to investing in companies working to reduce greenhouse gas emissions.',
    fields: [
      {
        id: 'climate',
        label: 'What is your overall climate impact? Include metrics if available.',
        type: 'long',
        required: true,
      },
      {
        id: 'designSus',
        label: 'Describe how your product is designed for sustainability.',
        type: 'long',
        required: true,
        help: 'e.g. green components/materials, predictive maintenance, battery recycling.',
      },
      {
        id: 'mfgSus',
        label: 'How sustainable are your manufacturing processes?',
        type: 'long',
        required: true,
        help: 'e.g. optimizing supply chain, recycling waste.',
      },
    ],
  },
  {
    id: 'raise',
    kicker: '06 / Raise',
    short: 'Fundraising',
    title: 'Your Fundraising Round',
    fields: [
      {
        id: 'stage',
        label: 'What fundraising stage is your company at?',
        type: 'text',
        required: true,
        placeholder: 'Seed',
        help: 'We are raising a ____ round.',
        half: true,
      },
      {
        id: 'roundSize',
        label: 'What is the current round size?',
        type: 'text',
        required: true,
        placeholder: '$500,000',
        help: 'Use a dollar sign and commas.',
        half: true,
      },
      {
        id: 'valuation',
        label: 'What is your pre-money valuation?',
        type: 'text',
        required: true,
        placeholder: '$5,000,000',
        help: 'Use a dollar sign and commas.',
        half: true,
      },
      {
        id: 'priorVC',
        label: 'Do you have prior VC investors? Who?',
        type: 'long',
        required: true,
        half: true,
      },
      {
        id: 'instrument',
        label: 'Is this a priced round, a SAFE, or a convertible note?',
        type: 'radio',
        required: true,
        options: ['Priced Round', 'SAFE', 'Convertible Note'],
      },
    ],
  },
]

export const PITCH_DRAFT_KEY = 'dipalo_pitch_draft_v2'
