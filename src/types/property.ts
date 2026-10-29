export type PropertyCategory =
  | 'All'
  | 'Residential'
  | 'Apartments'
  | 'Commercial'
  | 'Land & Development'

export type TransactionMode =
  | 'All'
  | 'Acquisition'
  | 'Commercial Lease'
  | 'Joint Venture'

export type CurrencyCode = 'USD' | 'NGN' | 'EUR' | 'GBP'

export interface PropertyListing {
  id: string
  title: string
  subtitle: string
  category: Exclude<PropertyCategory, 'All'>
  transaction: Exclude<TransactionMode, 'All'>
  district: string
  address: string
  priceUSD: number
  priceSuffix?: string
  beds?: number
  baths?: number
  areaLabel: string
  plotSize?: string
  projectedYield: string
  fiveYearAppreciation: string
  titleStatus: string
  featuredBadge: string
  image: string
  secondaryImage: string
  summary: string
  highlights: string[]
  idealFor: string[]
}

export interface SearchFilters {
  district: string
  category: PropertyCategory
  priceBand: string
  transaction: TransactionMode
  keyword: string
}

export interface StakeholderLens {
  id: 'families' | 'owners' | 'investors' | 'developers'
  label: string
  eyebrow: string
  headline: string
  description: string
  deliverables: string[]
  metricValue: string
  metricLabel: string
  ctaLabel: string
}
