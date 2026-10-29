import { CurrencyCode, PropertyListing, StakeholderLens } from '../types/property'

export const CURRENCY_CONFIG: Record<
  CurrencyCode,
  { symbol: string; rate: number; locale: string; label: string }
> = {
  USD: { symbol: '$', rate: 1, locale: 'en-US', label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, locale: 'de-DE', label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, locale: 'en-GB', label: 'GBP (£)' },
  NGN: { symbol: '₦', rate: 1580, locale: 'en-NG', label: 'NGN (₦)' },
}

export function formatPropertyPrice(
  priceUSD: number,
  currency: CurrencyCode,
  compact = false
): string {
  const cfg = CURRENCY_CONFIG[currency]
  const converted = Math.round(priceUSD * cfg.rate)

  if (compact) {
    if (converted >= 1_000_000_000) {
      return `${cfg.symbol}${(converted / 1_000_000_000).toFixed(2)}B`
    }
    if (converted >= 1_000_000) {
      const m = converted / 1_000_000
      return `${cfg.symbol}${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2)}M`
    }
    if (converted >= 1_000) {
      return `${cfg.symbol}${Math.round(converted / 1_000)}K`
    }
  }

  if (currency === 'EUR') {
    // Echoes the clean European architectural formatting of the visual reference while supporting all currencies
    return `€ ${converted.toLocaleString('de-DE')},00`
  }

  return `${cfg.symbol}${converted.toLocaleString(cfg.locale)}`
}

export const DISTRICTS = [
  'All Prime Corridors',
  'Crestview Hills & Maitama',
  'Waterfront Peninsula',
  'Meridian Financial District',
  'Guzape & Asokoro Ridge',
  'Atlantic Coastal Corridor',
]

export const PRICE_BANDS = [
  { id: 'all', label: 'Any Investment Level', min: 0, max: Infinity },
  { id: 'under-500k', label: 'Up to $500,000', min: 0, max: 500_000 },
  { id: '500k-1m', label: '$500,000 – $1,000,000', min: 500_000, max: 1_000_000 },
  { id: '1m-2.5m', label: '$1,000,000 – $2,500,000', min: 1_000_000, max: 2_500_000 },
  { id: '2.5m-plus', label: '$2,500,000+ Institutional', min: 2_500_000, max: Infinity },
]

export const PROPERTY_LISTINGS: PropertyListing[] = [
  {
    id: 'crestview-cantilever-villa',
    title: 'Crestview Horizon Villa',
    subtitle: 'Architectural Cantilevered Residence with Infinity Reflection Pool',
    category: 'Residential',
    transaction: 'Acquisition',
    district: 'Crestview Hills & Maitama',
    address: '14 Crestline Ridge, Maitama Hills',
    priceUSD: 985000,
    beds: 5,
    baths: 6,
    areaLabel: '640 sqm',
    plotSize: '1,250 sqm',
    projectedYield: '7.8% p.a.',
    fiveYearAppreciation: '+44%',
    titleStatus: 'Certificate of Occupancy (Verified)',
    featuredBadge: 'Most Viewed',
    image: '/images/prop-crestview-villa.jpg',
    secondaryImage: '/images/hero-villa.jpg',
    summary:
      'Sculpted into an elevated ridge overlooking tranquil water and dusk hills, Crestview Horizon Villa pairs floor-to-ceiling structural glass with basalt stone and warm cedar soffits—crafted for multigenerational family living and enduring capital security.',
    highlights: [
      'Double-cantilevered reception lounge with 270° panoramic twilight vistas',
      'Heated saltwater infinity lap pool and sunken travertine fire courtyard',
      'Smart home automation, solar-hybrid microgrid, and private 4-car gallery',
      'Independent title verification and full structural warranty dossier complete',
    ],
    idealFor: ['Families', 'Private Wealth Buyers', 'Diplomatic Leasing'],
  },
  {
    id: 'aurelia-sky-penthouse',
    title: 'Aurelia Sky Penthouse',
    subtitle: 'Double-Height Duplex Penthouse & Wrap-Around Terrace',
    category: 'Apartments',
    transaction: 'Acquisition',
    district: 'Waterfront Peninsula',
    address: '88 Waterfront Boulevard, Tower II',
    priceUSD: 760000,
    beds: 4,
    baths: 5,
    areaLabel: '485 sqm',
    projectedYield: '9.2% p.a.',
    fiveYearAppreciation: '+39%',
    titleStatus: 'Registered Strata Deed',
    featuredBadge: 'High Rental Yield',
    image: '/images/prop-skyline-penthouse.jpg',
    secondaryImage: '/images/prop-veridian-apartments.jpg',
    summary:
      'Commanding the crown of Tower II along the Waterfront Peninsula, Aurelia Sky Penthouse offers private-lift arrival, bespoke limestone interiors, and effortless turnkey executive leasing appeal.',
    highlights: [
      '6.2-meter double-height great room wrapped in acoustic low-E curtain glass',
      '140 sqm landscaped sky terrace with outdoor dining pavilion',
      '24/7 concierge, private wellness club, and executive marina access',
      'Proven corporate tenant demand with 9.2% projected net annual yield',
    ],
    idealFor: ['Executives', 'Yield Investors', 'Lock-up-and-Leave Living'],
  },
  {
    id: 'solaris-courtyard-estate',
    title: 'Solaris Courtyard Residence',
    subtitle: 'Gated Contemporary Family Sanctuary with Lush Atrium',
    category: 'Residential',
    transaction: 'Acquisition',
    district: 'Guzape & Asokoro Ridge',
    address: '27 Sovereign Close, Guzape Hills',
    priceUSD: 590000,
    beds: 4,
    baths: 5,
    areaLabel: '510 sqm',
    plotSize: '900 sqm',
    projectedYield: '7.4% p.a.',
    fiveYearAppreciation: '+41%',
    titleStatus: 'Certificate of Occupancy (Verified)',
    featuredBadge: 'Family Legacy Pick',
    image: '/images/prop-solaris-estate.jpg',
    secondaryImage: '/images/editorial-legacy.jpg',
    summary:
      'Designed around a tranquil central garden courtyard, Solaris Residence balances architectural drama with everyday family warmth inside a low-density gated enclave.',
    highlights: [
      'Indoor-outdoor seamless living opening onto manicured courtyard lawn',
      'Dedicated ground-floor guest suite, private study, and staff quarters',
      'Natural limestone cladding, teak eaves, and cross-ventilated layout',
      'Flexible milestone acquisition structure available for qualified buyers',
    ],
    idealFor: ['Growing Families', 'Homeowners', 'Long-Term Capital Growth'],
  },
  {
    id: 'meridian-corporate-pavilion',
    title: 'Meridian Corporate Pavilion',
    subtitle: 'Grade-A Boutique Headquarters & Flagship Commercial Atrium',
    category: 'Commercial',
    transaction: 'Acquisition',
    district: 'Meridian Financial District',
    address: '402 Civic Exchange Avenue, CBD',
    priceUSD: 2150000,
    areaLabel: '1,850 sqm GLA',
    plotSize: '2,100 sqm',
    projectedYield: '11.4% p.a.',
    fiveYearAppreciation: '+48%',
    titleStatus: 'Commercial C of O (Unencumbered)',
    featuredBadge: 'Institutional Grade',
    image: '/images/prop-meridian-commercial.jpg',
    secondaryImage: '/images/prop-harborview-commercial.jpg',
    summary:
      'An iconic Grade-A commercial address engineered for corporate headquarters, family offices, or flagship institutional tenancy, featuring column-free floor plates and an illuminated stone plaza.',
    highlights: [
      '1,850 sqm gross leasable area across 4 modular column-free levels',
      'Double-height reception gallery plus ground-floor flagship showroom wing',
      '38 dedicated underground & plaza bays, dual fiber redundancy, LEED-ready',
      'Available for outright acquisition or anchor single-tenant lease structuring',
    ],
    idealFor: ['Corporates', 'Commercial Investors', 'Family Offices'],
  },
  {
    id: 'peninsula-crest-land-parcel',
    title: 'Peninsula Crest Waterfront Land',
    subtitle: 'Serviced Master-Planned Development Parcel on Titled Peninsula',
    category: 'Land & Development',
    transaction: 'Acquisition',
    district: 'Atlantic Coastal Corridor',
    address: 'Plot B4–B7 Peninsula Boulevard',
    priceUSD: 1320000,
    areaLabel: '4,200 sqm',
    plotSize: '4,200 sqm Serviced',
    projectedYield: '16.5% IRR',
    fiveYearAppreciation: '+68%',
    titleStatus: 'Governor’s Consent & Approved Survey',
    featuredBadge: 'Prime Land Bank',
    image: '/images/prop-harbor-land.jpg',
    secondaryImage: '/images/prop-apex-development.jpg',
    summary:
      'A rare contiguous 4,200 sqm waterfront corner parcel with completed perimeter shoreline protection, underground utilities, and mixed-residential zoning approval for up to 8 floors.',
    highlights: [
      'Direct paved boulevard frontage and unobstructed 75-meter water views',
      'Pre-approved zoning for boutique luxury apartments or signature villas',
      'Sub-soil geotechnical report, hydrographic clearance & clean root of title',
      'Evercrest development feasibility & off-plan marketing advisory included',
    ],
    idealFor: ['Property Developers', 'Land Banking Investors', 'Syndicates'],
  },
  {
    id: 'veridian-terrace-apartments',
    title: 'Veridian Terrace Residences',
    subtitle: 'Curated Collection of 3-Bedroom Biophilic Luxury Apartments',
    category: 'Apartments',
    transaction: 'Acquisition',
    district: 'Crestview Hills & Maitama',
    address: '9 Botanical Crescent, Crestview',
    priceUSD: 420000,
    beds: 3,
    baths: 4,
    areaLabel: '265 sqm',
    projectedYield: '9.6% p.a.',
    fiveYearAppreciation: '+37%',
    titleStatus: 'Registered Sub-Lease & Deed',
    featuredBadge: 'Turnkey Investment',
    image: '/images/prop-veridian-apartments.jpg',
    secondaryImage: '/images/prop-skyline-penthouse.jpg',
    summary:
      'Sculpted limestone wraparound balconies and cascading vertical gardens define Veridian Terrace—offering discerning homeowners and investors effortless urban serenity.',
    highlights: [
      'Deep cantilevered planted terraces providing natural shade and privacy',
      'Chef’s kitchen with integrated European appliances and quartz island',
      'Resident rooftop lounge, co-working library, and lap pool',
      'Dedicated Evercrest tenant placement & asset management program',
    ],
    idealFor: ['First-Time Luxury Buyers', 'Buy-to-Let Investors', 'Professionals'],
  },
  {
    id: 'harborview-innovation-exchange',
    title: 'Harborview Commercial Suites',
    subtitle: 'Flexible Corporate Suites & Retail Gallery for Lease or Purchase',
    category: 'Commercial',
    transaction: 'Commercial Lease',
    district: 'Meridian Financial District',
    address: '18 Harborgate Plaza, Central District',
    priceUSD: 145000,
    priceSuffix: '/ yr lease',
    areaLabel: '620 sqm Suite',
    projectedYield: '10.8% p.a.',
    fiveYearAppreciation: '+35%',
    titleStatus: 'Verified Commercial Leasehold',
    featuredBadge: 'Move-In Ready',
    image: '/images/prop-harborview-commercial.jpg',
    secondaryImage: '/images/prop-meridian-commercial.jpg',
    summary:
      'Positioned at a premier commercial crossroads, Harborview Suites delivers cantilevered glass boardrooms, private terrace breakout zones, and prestigious street presence for growing enterprises.',
    highlights: [
      'Customizable 620 sqm full-floor plate with private reception & acoustic pods',
      'Transparent service-charge governance and 99.9% power uptime guarantee',
      'Evercrest tenant representation includes fit-out coordination & lease structuring',
      'Option to acquire strata floor ownership within 36 months',
    ],
    idealFor: ['Corporate Tenants', 'Tech & Advisory Firms', 'Flagship Showrooms'],
  },
  {
    id: 'apex-mixed-use-precinct',
    title: 'Apex Mixed-Use Development JV',
    subtitle: 'Co-Development & Off-Plan Equity Opportunity Across 3 Pavilions',
    category: 'Land & Development',
    transaction: 'Joint Venture',
    district: 'Waterfront Peninsula',
    address: 'Precinct 5, Waterfront Masterplan',
    priceUSD: 3400000,
    areaLabel: '9,600 sqm GFA',
    plotSize: '6,000 sqm Site',
    projectedYield: '22.4% Est. IRR',
    fiveYearAppreciation: '+76%',
    titleStatus: 'Escrow-Protected JV Structure',
    featuredBadge: 'Development Mandate',
    image: '/images/prop-apex-development.jpg',
    secondaryImage: '/images/prop-harbor-land.jpg',
    summary:
      'An institutional-caliber residential and lifestyle commercial development opportunity structured by Evercrest Properties, uniting land equity with vetted development capital.',
    highlights: [
      '42 luxury residences over boutique lifestyle retail & landscaped sky-bridges',
      'Full architectural schematics, QS bill of quantities, and planning permits ready',
      'Structured milestone escrow governance and exclusive Evercrest off-plan sales desk',
      'Minimum syndicate tranche entry available from $500,000 upon qualification',
    ],
    idealFor: ['Developers', 'Institutional Investors', 'Landowners'],
  },
]

export const STAKEHOLDER_LENSES: StakeholderLens[] = [
  {
    id: 'families',
    label: 'Individuals & Families',
    eyebrow: 'RESIDENTIAL & HOME ADVISORY',
    headline: 'Find a home that protects your peace today and grows your family’s tomorrow.',
    description:
      'Whether acquiring your family’s signature residence, securing an urban apartment, or leasing a refined home, Evercrest eliminates guesswork—verifying every title, neighborhood fundamental, and valuation benchmark before you commit.',
    deliverables: [
      'Curated residential shortlists matched to lifestyle, school & commute corridors',
      'Comprehensive legal title, structural & fair-market price verification',
      'End-to-end negotiation, closing coordination & seamless handover support',
    ],
    metricValue: '100%',
    metricLabel: 'Title & Valuation Vetted Before Presentation',
    ctaLabel: 'Start Your Home Search',
  },
  {
    id: 'owners',
    label: 'Property Owners',
    eyebrow: 'STRATEGIC PROPERTY MARKETING',
    headline: 'Position your asset before qualified buyers and premier tenants with authority.',
    description:
      'Superior properties deserve more than passive listings. Evercrest crafts bespoke architectural storytelling, targeted private-network distribution, and rigorous buyer/tenant qualification to maximize realized value.',
    deliverables: [
      'Editorial architectural presentation, valuation positioning & dossier creation',
      'Discreet private-client outreach alongside high-intent digital showcasing',
      'Vetted buyer & corporate tenant screening, offer structuring & closing oversight',
    ],
    metricValue: '34 Days',
    metricLabel: 'Average Time to Qualified Mandate Offer',
    ctaLabel: 'Market Your Property With Us',
  },
  {
    id: 'investors',
    label: 'Investors',
    eyebrow: 'INVESTMENT SUPPORT & CAPITAL GROWTH',
    headline: 'Deploy capital with data-backed clarity across yield, land banking & appreciation.',
    description:
      'From high-yielding executive apartments and Grade-A commercial spaces to strategic land parcels in high-growth corridors, we equip investors with transparent cash-flow models and exit pathways.',
    deliverables: [
      'Net rental yield, cap-rate & 5-to-10-year capital appreciation modeling',
      'Independent due diligence on root of title, zoning & infrastructure catalysts',
      'Portfolio diversification across residential, commercial & titled land assets',
    ],
    metricValue: '9.4% – 18%',
    metricLabel: 'Target Annualized Yield & Land IRR Range',
    ctaLabel: 'Request Investor Briefings',
  },
  {
    id: 'developers',
    label: 'Developers',
    eyebrow: 'DEVELOPMENT & JOINT-VENTURE SERVICES',
    headline: 'From raw land acquisition to sold-out off-plan absorption—built on insight.',
    description:
      'Evercrest partners with visionary developers across site sourcing, joint-venture landowner alignment, demand-driven unit mix advisory, and dedicated off-plan sales execution.',
    deliverables: [
      'Development site acquisition & structured Joint-Venture (JV) origination',
      'Highest-and-best-use market feasibility & unit pricing optimization',
      'Exclusive project marketing, off-plan sales desk & investor syndication',
    ],
    metricValue: '$480M+',
    metricLabel: 'Combined Advisory & Development Pipeline',
    ctaLabel: 'Discuss a Development Mandate',
  },
]
