/**
 * DIRECTORY SITE CONFIGURATION
 *
 * Moving Company Directory — MoverCompare
 */

const siteConfig = {
  // ── Basics ──────────────────────────────────────────────
  name: 'MoverCompare',
  domain: 'movercompare.com',
  tagline: 'Compare Moving Company Prices Near You',
  description: 'Find and compare moving company prices from trusted local and national movers.',
  contactEmail: 'hello@movercompare.com',
  notificationEmail: 'fred@tunajam.com',

  // ── Industry ────────────────────────────────────────────
  industry: {
    singular: 'Moving Company',
    plural: 'Moving Companies',
    slug: 'moving-company',
    companyNoun: 'mover',
    companyNounPlural: 'movers',
    serviceVerb: 'hire',
  },

  // ── Service Options ─────────────────────────────────────
  serviceOptions: {
    label: 'Move Size',
    unit: 'BR',
    options: [
      { value: 1, label: 'Studio/1', description: 'Studio or 1-bedroom apartment move', capacity: '$300–$800' },
      { value: 2, label: '2–3', description: '2 to 3-bedroom home move', capacity: '$800–$2,500' },
      { value: 4, label: '4+', description: '4+ bedroom or large home move', capacity: '$2,000–$5,000+' },
      { value: 5, label: 'Long Distance', description: 'Interstate or cross-country move', capacity: '$3,000–$10,000+' },
    ],
  },

  // ── How It Works Steps ──────────────────────────────────
  steps: [
    { title: 'Search Your City', description: 'Enter your city to see local and national movers.' },
    { title: 'Compare Prices', description: 'View side-by-side pricing, ratings, and services.' },
    { title: 'Get a Quote', description: 'Request a free moving quote directly from the company.' },
  ],

  // ── Theme ───────────────────────────────────────────────
  theme: {
    primary: '#92400e',        // warm brown — header, headings
    primaryLight: '#b45309',
    primaryDark: '#78350f',
    accent: '#f59e0b',         // amber — CTAs, highlights
    accentLight: '#fbbf24',
    accentDark: '#d97706',
  },

  // ── SEO Templates ───────────────────────────────────────
  seo: {
    cityTitle: '{industryPlural} in {city}, {state} — Compare {count} Local Movers | {siteName}',
    cityDescription: 'Compare moving company prices from {count} movers in {city}, {state}. Get free moving quotes instantly.',
    companyTitle: '{companyName} — {industry} in {city}, {state} | {siteName}',
    companyDescription: '{companyName} offers moving services in {city}, {state}. Compare prices, ratings, and service areas.',
  },

  // ── Hero Search ─────────────────────────────────────────
  hero: {
    heading: 'Compare Moving Company\\nPrices Near You',
    subheading: 'Stop calling around for moving quotes. Compare trusted local movers side by side — pricing, ratings, and availability in seconds.',
    searchPlaceholder: 'Enter your city (e.g. Austin, Chicago)',
    searchButton: 'Find Movers →',
  },

  // ── Quote Form ──────────────────────────────────────────
  quoteForm: {
    heading: 'Get a Free Moving Quote',
    subheading: 'Fill out the form and {companyName} will contact you with pricing.',
    submitButton: 'Get My Free Quote →',
    successMessage: '{companyName} will get back to you within 1 business day.',
    fields: ['name', 'phone', 'email', 'serviceOption', 'message'],
  },

  // ── Blog ────────────────────────────────────────────────
  blog: {
    title: 'Moving Tips & Guides',
    description: 'Expert advice on moving costs, planning tips, and hiring movers.',
  },

  // ── Monetization ─────────────────────────────────────────
  monetization: {
    ads: {
      enabled: true,
      topSlot: true,
      sidebarSlot: true,
    },
    claimListing: {
      enabled: true,
      heading: 'Is this your business?',
      subheading: 'Claim this listing to update your info, add real pricing, respond to quotes, and get a verified badge.',
      buttonText: 'Claim This Listing — It\'s Free',
    },
    leadCapture: {
      enabled: true,
      heading: 'Get Free Quotes',
      subheading: 'Tell us what you need and get quotes from top-rated local companies.',
      buttonText: 'Get My Free Quotes →',
      successMessage: 'Thanks! Local companies will reach out within 1 business day.',
    },
  },
  // ── Analytics ───────────────────────────────────────────
  posthog: {
    key: '',
    host: 'https://us.i.posthog.com',
  },

  // ── Notifications ───────────────────────────────────────
  notifications: {
    provider: 'resend',
  },
} as const;

export default siteConfig;
export type SiteConfig = typeof siteConfig;
