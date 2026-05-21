export const residencyTags = [
  'Product Management',
  'Customer Experience Design',
  'Data Science',
  'Contract Manufacturing',
  'Supply Chain',
  'Electrical Design',
  'Mechanical Design',
]

export type TeamMember = {
  name: string
  slug?: string
  role: string
  location: string
  bio: string
  photo?: string
  linkedin: string
  category?: 'gp' | 'vp' | 'advisor'
  priorInvestments?: any[]
}

export const team: TeamMember[] = [
  {
    name: 'Rafiq Ahmed',
    role: 'General Partner',
    location: 'Chicago',
    bio: 'Former engineering leader at Motorola. Over 20 years of hardware product development experience.',
    photo: '',
    linkedin: 'https://linkedin.com/in/ahmedrafiq/',
    category: 'gp',
  },
  {
    name: 'Mitul Patel',
    role: 'General Partner',
    location: 'Chicago',
    bio: 'Electrical engineer and hardware designer. Designed core components for multiple consumer electronics.',
    photo: '',
    linkedin: 'https://linkedin.com/in/mrpatel624/',
    category: 'gp',
  },
  {
    name: 'Rezwan Shafique',
    role: 'Venture Partner',
    location: 'Gulf · GCC',
    bio: 'Anchors our Gulf presence — connecting portfolio companies to GCC capital.',
    photo: '',
    linkedin: 'https://linkedin.com/in/rezwanshafique/',
    category: 'vp',
  },
  {
    name: 'Larry Hayward',
    role: 'Venture Partner',
    location: 'Chicago',
    bio: 'Early stage investor and operator.',
    photo: '',
    linkedin: 'https://linkedin.com/in/laurence-hayward-a33a57/',
    category: 'vp',
  },
  {
    name: 'Sarah Connor',
    role: 'General Manager',
    location: 'Chicago',
    bio: 'Experienced operations lead with a focus on manufacturing logistics and team management.',
    photo: '',
    linkedin: 'https://linkedin.com/',
    category: 'vp',
  },
]

export const heroStats = [
  { n: '70+', l: 'Years Operator Experience' },
  { n: '12', l: 'U.S. Patents' },
  { n: '$1B+', l: 'Product Revenue Shipped' },
  { n: '100+', l: 'Companies Backed' },
]

export type OrgLink = { label: string; href: string }

export const orgs: Record<string, OrgLink[]> = {
  'Rafiq Ahmed': [{ label: 'Prior Investments', href: 'https://www.linkedin.com/in/ahmedrafiq/' }],
  'Mitul Patel': [
    { label: 'MP Consulting', href: 'https://www.linkedin.com/in/mrpatel624/' },
    { label: 'AMC', href: 'https://www.linkedin.com/in/mrpatel624/' },
    { label: 'The Aarush M. Patel Foundation', href: 'https://www.linkedin.com/in/mrpatel624/' },
  ],
  'Rezwan Shafique': [
    { label: 'Prior Investments', href: 'https://www.linkedin.com/in/rezwanshafique/' },
  ],
  'Larry Hayward': [
    { label: 'Prior Investments', href: 'https://www.linkedin.com/in/laurence-hayward-a33a57/' },
  ],
  'Greg Rublev': [{ label: 'Prior Investments', href: 'https://www.linkedin.com/in/gregrublev/' }],
}

export const advisors = [
  {
    name: 'Saifur Rahman',
    title: 'President & CEO',
    org: 'IEEE / Virginia Tech',
    linkedin: 'https://linkedin.com/in/saifur-rahman-vt/',
    bg: '#E6F1FB',
    fg: '#0C447C',
  },
  {
    name: 'Akanksha Agarwal',
    title: 'Capital Markets',
    org: 'Google',
    linkedin: 'https://linkedin.com/in/akanksha-agarwal-2bb60125/',
    bg: '#EAF3DE',
    fg: '#27500A',
  },
  {
    name: 'Sap Basu',
    title: 'Director',
    org: 'ConocoPhillips',
    linkedin: 'https://linkedin.com/in/saptaswa/',
    bg: '#FAEEDA',
    fg: '#633806',
  },
  {
    name: 'Garry Cooper',
    title: 'CEO',
    org: 'Rheaply',
    linkedin: 'https://linkedin.com/in/garrycooper/',
    bg: '#EEEDFE',
    fg: '#3C3489',
  },
  {
    name: 'Kevin Keith',
    title: 'CTO',
    org: 'MITO Materials',
    linkedin: 'https://linkedin.com/in/krkeith/',
    bg: '#FCEBEB',
    fg: '#791F1F',
  },
]

export const focusAreas = [
  {
    title: 'Energy',
    n: '01',
    image: 'energy',
    body: 'Backing startups transforming how the world generates, stores, and uses energy from renewables to grid tech to electrification.',
    tags: ['Distributed Generation Storage', 'Renewables', 'Data Center Infrastructure'],
  },
  {
    title: 'Climate',
    n: '02',
    image: 'climate',
    body: 'Investing in technologies that reduce cost while mitigating climate change across food & agriculture, industry, transportation, and the built environment.',
    tags: ['Waste to Value', 'Water Tech', 'Industrial Decarbonization'],
  },
  {
    title: 'Physical AI',
    n: '03',
    image: 'physical-ai',
    body: 'Intelligent hardware robotics, industrial automation, embedded AI, and the physical systems where machine intelligence meets the real world.',
    tags: ['Robotics', 'Smart Devices', 'Industrial Intelligence'],
  },
]

export type FundKey = 'fund_1' | 'fund_2' | 'spv'
export type Sector = 'energy' | 'climate' | 'physical_ai' | 'other'
export type Stage = 'pre_seed' | 'seed' | 'series_a' | 'series_b' | 'series_c'

export const fundMeta: Record<FundKey, { label: string; tone: string }> = {
  fund_1: { label: 'Fund I', tone: 'bg-neutral-100 text-neutral-800' },
  fund_2: { label: 'Fund II', tone: 'bg-neutral-100 text-neutral-800' },
  spv: { label: 'SPV', tone: 'bg-neutral-100 text-neutral-800' },
}

export const scopeCards = [
  {
    n: '01',
    t: 'Engineering Audits',
    d: 'Architecture, design, and IP reviews pre and post-investment.',
  },
  {
    n: '02',
    t: 'Supply Chain Mapping',
    d: 'Vendor selection, lead time analysis, and risk mitigation.',
  },
  {
    n: '03',
    t: 'Design + Manufacturing',
    d: 'DFM, tolerancing, prototyping, and pilot production support.',
  },
  {
    n: '04',
    t: 'Gap Identification',
    d: "What you don't know, you don't know surfaced early.",
  },
]

export const sectorMeta: Record<Sector, { label: string }> = {
  energy: { label: 'Energy' },
  climate: { label: 'Climate' },
  physical_ai: { label: 'Physical AI' },
  other: { label: 'Other' },
}

export const stageMeta: Record<Stage, { label: string }> = {
  pre_seed: { label: 'Pre Seed' },
  seed: { label: 'Seed' },
  series_a: { label: 'Series A' },
  series_b: { label: 'Series B' },
  series_c: { label: 'Series C' },
}

export const portfolio = [
  {
    name: 'Pluie',
    logo: '',
    url: 'https://hello-pluie.com',
    fundKeys: ['fund_1' as FundKey],
    sector: 'physical_ai' as Sector,
    stage: 'seed' as Stage,
    desc: 'Self-sanitizing diaper changing tables.',
    productImage: '',
    exit: '',
    isExited: false,
  },
  {
    name: 'Vumo',
    logo: '',
    url: 'https://vumo.ai',
    fundKeys: ['fund_1' as FundKey],
    sector: 'physical_ai' as Sector,
    stage: 'seed' as Stage,
    desc: 'AI-powered vehicle inspection.',
    productImage: '',
    exit: '',
    isExited: false,
  },
  {
    name: 'NuCurrent',
    logo: '',
    url: 'https://nucurrent.com',
    fundKeys: ['spv' as FundKey],
    sector: 'energy' as Sector,
    stage: 'series_b' as Stage,
    desc: 'Wireless power technologies.',
    productImage: '',
    exit: '',
    isExited: false,
  },
  {
    name: 'WasteWizer',
    logo: '',
    url: 'https://wastewizer.com',
    fundKeys: ['fund_2' as FundKey],
    sector: 'climate' as Sector,
    stage: 'seed' as Stage,
    desc: 'Smart waste management.',
    productImage: '',
    exit: '',
    isExited: false,
  },
  {
    name: 'Kadeya',
    logo: '',
    url: 'https://kadeya.com',
    fundKeys: ['fund_1' as FundKey],
    sector: 'climate' as Sector,
    stage: 'series_a' as Stage,
    desc: 'Closed-loop beverage systems.',
    productImage: '',
    exit: '',
    isExited: false,
  },
  {
    name: 'Scalable Systems',
    logo: '',
    url: 'https://scalablesystems.com',
    fundKeys: ['fund_2' as FundKey],
    sector: 'physical_ai' as Sector,
    stage: 'seed' as Stage,
    desc: 'Advanced robotics scaling.',
    productImage: '',
    exit: '',
    isExited: false,
  },
]

export const lpAdvantages = [
  { title: 'Proprietary Deal Flow', body: 'We source deals from our unique network.' },
  { title: 'Deep Diligence', body: 'Our technical audit uncovers hidden risks.' },
  { title: 'Operational Support', body: 'We actively help our portfolio companies scale.' },
]

export const testimonialCards = [
  {
    kind: 'Founder' as const,
    quote:
      "I didn't know what I didn't know. Working with Dipalo Ventures helped me formulate a better plan — it showed gaps in our engineering, supply chain, and time to market that we needed to solve immediately.",
    initials: 'AG',
    name: 'Adia Gundry',
    role: 'CEO, Pluie',
    photo: undefined,
  },
  {
    kind: 'Founder' as const,
    quote:
      'You are the only investors who perfectly know the right questions to ask. Where are the huge potential risks for delivery fulfillment.',
    initials: 'SP',
    name: 'Slawek Potasz',
    role: 'CEO & Founder, Vumo',
    photo: undefined,
  },
  {
    kind: 'Founder' as const,
    quote:
      'Dipalo Ventures brings deep technical expertise that is hard to find in the venture world. They truly understand the challenges of building hardware.',
    initials: 'NC',
    name: 'NuCurrent Team',
    role: 'Wireless Power Tech',
    photo: undefined,
  },
]

export const tabContent = {
  founders: {
    headline: 'An Unfair Advantage in Hard Tech',
    body: "Hard tech fails where spreadsheets can't go on factory floors, across supply chains, and in engineering detail. We've built through it. Our GPs have shipped physical products at scale, so we know what matters before we invest and how to help after.",
    bullets: [
      {
        t: 'Diligence, Under the Hood',
        b: 'We go deep before we invest reviewing engineering, identifying supply chain risks, and pressure-testing your path from prototype to production.',
      },
      {
        t: 'Hands-On from Day One',
        b: 'We work alongside you on the details CAD, BOMs, and manufacturing plans and stay engaged as you scale.',
      },
      {
        t: 'Built Locally. Scaled Globally',
        b: "When you're ready to expand, we leverage our networks to unlock international markets and support execution on the ground.",
      },
    ],
  },
  investors: {
    headline: 'An Unfair Advantage in Hard Tech',
    body: "Hard tech is redefining venture companies solving real-world problems with defensible, IP-driven advantage. Our funds and SPVs provide access to these opportunities underwritten with technical depth most investment teams don't have.",
    bullets: [
      {
        t: 'Proprietary Deal Flow',
        b: 'We source and vet hard-tech opportunities in the US heartland and across the globe through networks built over decades giving us early access to high-conviction companies.',
      },
      {
        t: 'Beyond Software',
        b: 'Deep tech, including Physical AI, is driving the next generation of venture returns, built on real-world innovation and durable, IP-driven advantage.',
      },
      {
        t: 'Operator-Led. Proven',
        b: 'Our partners have built and exited deep-tech companies. We bring operator experience, not just capital. Our Founding GP has delivered a 19% net IRR over the past decade in early-stage investments.',
      },
    ],
  },
}

export const lookFor = [
  {
    ico: '✦',
    t: 'Disruptive Idea',
    b: 'Energy, climate, or physical products.',
  },
  {
    ico: '◉',
    t: 'Physical Product at Core',
    b: 'Manufactured hardware in development.',
  },
  {
    ico: '◐',
    t: 'Technical Team',
    b: 'Engineering DNA and path to scale.',
  },
  {
    ico: '❀',
    t: 'Sustainable by Design',
    b: 'Built in from day one — not an afterthought.',
  },
]

export const methodologySteps = [
  {
    n: '01',
    t: 'Engineering audits',
    b: 'Architecture, design, and IP reviews pre- and post-investment.',
  },
  {
    n: '02',
    t: 'Supply chain mapping',
    b: 'Vendor selection, lead time analysis, risk mitigation.',
  },
  {
    n: '03',
    t: 'Design + manufacturing',
    b: 'DFM, tolerancing, prototyping, pilot production support.',
  },
  { n: '04', t: 'Gap identification', b: "What you don't know you don't know — surfaced early." },
]

export const residencyCovers = [
  {
    t: 'Engineering Audits',
    b: 'Architecture, design, and IP reviews — pre- and post-investment.',
  },
  { t: 'Supply Chain Mapping', b: 'Vendor selection, lead time analysis, and risk mitigation.' },
  {
    t: 'Design + Manufacturing',
    b: 'DFM, tolerancing, prototyping, and pilot production support.',
  },
  { t: 'Gap Identification', b: "What you don't know you don't know — surfaced early." },
]

export const raasCards = [
  {
    t: 'For Founders',
    b: 'Engineering audits, DFM, and supply chain mapping for non-portfolio companies.',
  },
  {
    t: 'For Corporates',
    b: "Outside-in technical reviews and emerging-tech scouting from operators who've shipped.",
  },
  {
    t: 'For Co-Investors',
    b: 'Independent technical diligence and gap analysis for hardware deals.',
  },
  {
    t: 'Engagement Models',
    b: 'Fixed-scope sprints, retainers, or milestone-based programs — your call.',
  },
]

export const emailCards = [
  {
    eyebrow: 'Founders',
    title: 'Submit a pitch',
    subtitle: 'Submit via application portal',
    email: 'founders@dipaloventures.com',
  },
  {
    eyebrow: 'Investors',
    title: 'Request LP info',
    subtitle: 'Fund details · vehicles · co-invest',
    email: 'investors@dipaloventures.com',
  },
  {
    eyebrow: 'Everyone else',
    title: 'Say hello',
    subtitle: 'Press · partnerships · Residency',
    email: 'info@dipaloventures.com',
  },
]

export const facts = [
  { label: 'Stage', value: 'Seed to Series A' },
  { label: 'Check size', value: '$250K–$1.5M' },
  { label: 'Geography', value: 'N. America · Europe' },
  { label: 'Sectors', value: 'Energy · Climate · AI' },
]

export const MAP_EMBED =
  'https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72NouQmaUbVhZwQnQQ9qBLMPY&q=1623+W+Fulton+St+%23237,Chicago,IL+60612&zoom=14'
export const MAP_DIRECTIONS = 'https://maps.google.com/?q=1623+W+Fulton+St+%23237+Chicago+IL+60612'
export const blogPosts = [
  {
    date: 'Dec 2025',
    title: "Season's Greetings from Dipalo Ventures",
    body: "Year-end notes from the partnership — portfolio milestones, what we're watching, and where 2026 is heading.",
    href: 'https://medium.com/@dipaloventures/seasons-greetings-from-dipalo-ventures-ed47b6bf8c1b',
  },
  {
    date: 'Oct 2025',
    title: 'Fall 2025: Portfolio Wins, Curry & Capital Nov 5',
    body: 'Recent wins across the portfolio and a preview of our Curry & Capital gathering in Chicago.',
    href: 'https://medium.com/@dipaloventures/fall-2025-portfolio-wins-curry-capital-nov-5-eda599318a2d',
  },
  {
    date: 'Oct 2025',
    title: 'Understanding Venture Capital: How Smart Investors Back Innovation',
    body: 'A primer on how venture funds operate and what separates patient capital from the rest.',
    href: 'https://medium.com/@dipaloventures/understanding-venture-capital-how-smart-investors-back-innovation-93d7cc597a5b',
  },
  {
    date: 'Jul 2025',
    title: "From Ideas to Action: Chicago's Big Week of Climate Tech & Innovation",
    body: 'On-the-ground from Chicago Tech Week — climate policy, midwest momentum, and the founders we met.',
    href: 'https://medium.com/@dipaloventures/from-ideas-to-action-chicagos-big-week-of-climate-tech-innovation-563b6e13a5fe',
  },
]

export const videos = [
  {
    id: 'WzDEvG3BOzY',
    title: 'Investing in Disruptive Hard Tech for People & Planet',
    desc: 'A wide-angle conversation on backing hardware founders.',
  },
  {
    id: 'TM960kFx7dY',
    title: "Backing Hardtech: A VC's Perspective with Dipalo Ventures",
    desc: 'How we evaluate hardtech bets and what we look for.',
  },
  {
    id: 'leTcWdhHU9s',
    title: 'Episode 12 — Salvador Dueñas & Tina Hrabak',
    desc: 'Two founders on building physical things at scale.',
  },
]

export const socialLinks = {
  youtube: 'https://www.youtube.com/@dipaloventures',
  instagram: 'https://www.instagram.com/dipaloventures/',
  medium: 'https://medium.com/@dipaloventures',
  linkedin: 'https://www.linkedin.com/company/dipaloventures/',
  substack: 'https://dipaloventures.substack.com',
}
