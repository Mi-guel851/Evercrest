import React, { useState } from 'react'
import { ChevronDown, Search, ShieldCheck, Building2, Compass } from 'lucide-react'
import { CurrencyCode, PropertyCategory, SearchFilters } from '../types/property'
import { DISTRICTS, PRICE_BANDS, formatPropertyPrice } from '../data/properties'

interface HeroSectionProps {
  filters: SearchFilters
  onFiltersChange: (next: Partial<SearchFilters>) => void
  onExecuteSearch: () => void
  currency: CurrencyCode
  matchedCount: number
  onListPropertyClick: () => void
}

const CATEGORY_OPTIONS: { value: PropertyCategory; label: string; sub: string }[] = [
  { value: 'All', label: 'All Property Types', sub: 'Residential, Commercial & Land' },
  { value: 'Residential', label: 'Houses & Villas', sub: 'Signature homes & gated estates' },
  { value: 'Apartments', label: 'Luxury Apartments', sub: 'Penthouses & executive suites' },
  { value: 'Commercial', label: 'Commercial Spaces', sub: 'Offices, retail & headquarters' },
  {
    value: 'Land & Development',
    label: 'Land & Development',
    sub: 'Titled plots & JV opportunities',
  },
]

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  onFiltersChange,
  onExecuteSearch,
  currency,
  matchedCount,
  onListPropertyClick,
}) => {
  const [openDropdown, setOpenDropdown] = useState<
    'district' | 'category' | 'price' | null
  >(null)

  const currentCategoryLabel =
    CATEGORY_OPTIONS.find((c) => c.value === filters.category)?.label ||
    'All Property Types'

  const getPriceBandDisplay = (bandId: string) => {
    switch (bandId) {
      case 'under-500k':
        return `Up to ${formatPropertyPrice(500_000, currency, true)}`
      case '500k-1m':
        return `${formatPropertyPrice(500_000, currency, true)} – ${formatPropertyPrice(1_000_000, currency, true)}`
      case '1m-2.5m':
        return `${formatPropertyPrice(1_000_000, currency, true)} – ${formatPropertyPrice(2_500_000, currency, true)}`
      case '2.5m-plus':
        return `${formatPropertyPrice(2_500_000, currency, true)}+ Mandate`
      default:
        return `${formatPropertyPrice(985_000, currency)} Ceiling`
    }
  }

  return (
    <section id="top" className="relative bg-white pb-8">
      {/* Main Twilight Architectural Hero Frame */}
      <div className="relative min-h-[680px] sm:min-h-[740px] lg:min-h-[790px] w-full overflow-hidden bg-[#091D30]">
        {/* Bespoke Blue-Hour Architectural Residence */}
        <img
          src="/images/hero-villa.jpg"
          alt="Evercrest Properties Signature Twilight Architecture"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01]"
        />

        {/* Atmospheric Prussian-Blue Directional Scrim (Preserves luminous architecture on right while ensuring crisp contrast on left & header) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(102deg, rgba(8, 26, 44, 0.88) 0%, rgba(11, 35, 58, 0.68) 42%, rgba(12, 34, 54, 0.22) 76%, rgba(8, 24, 40, 0.35) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background:
              'linear-gradient(180deg, rgba(7, 22, 38, 0.65) 0%, rgba(7, 22, 38, 0) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              'linear-gradient(0deg, rgba(7, 22, 38, 0.68) 0%, rgba(7, 22, 38, 0) 100%)',
          }}
        />

        {/* Hero Editorial Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-32 sm:pt-40 pb-28 sm:pb-36 flex flex-col justify-center min-h-[680px] sm:min-h-[740px] lg:min-h-[790px]">
          <div className="max-w-2xl">
            {/* Brand Tagline Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-[1px] w-8 bg-[#DFBE88]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#DFBE88]">
                Where Legacies Rise
              </span>
            </div>

            {/* Primary Architectural Headline (Inspired by Reference Rhythm, Tailored to Evercrest) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-[-0.025em] leading-[1.08]">
              Securing Exceptional{' '}
              <span className="block mt-1">
                Property,{' '}
                <span className="font-serif-crest italic font-semibold text-[#EAD0A3] tracking-normal">
                  Made Informed.
                </span>
              </span>
            </h1>

            {/* Evercrest Core Narrative */}
            <p className="mt-6 text-sm sm:text-base lg:text-[16.5px] text-white/82 leading-relaxed max-w-xl font-normal">
              Evercrest Properties connects individuals, families, investors, and
              developers with vetted{' '}
              <span className="text-white font-medium">
                residential homes, apartments, commercial spaces, and prime land
              </span>
              —turning complex property decisions into lasting security and value.
            </p>

            {/* Signature Frosted-Glass Pill Button with Elongated Architectural Arrow (Direct Homage to Reference Image 1) */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="group glass-pill inline-flex items-center justify-between gap-8 px-7 py-4 rounded-full text-white text-sm font-medium tracking-wide transition-all duration-300 shadow-[0_14px_34px_rgba(0,0,0,0.22)] min-w-[245px] sm:min-w-[270px]"
              >
                <span>Explore Opportunities</span>
                <span className="inline-flex items-center">
                  <span className="h-[1.5px] w-10 sm:w-12 bg-white/85 group-hover:w-16 transition-all duration-300" />
                  <svg
                    className="w-3.5 h-3.5 -ml-1 text-white/90 transform group-hover:translate-x-0.5 transition-transform"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M5 3L11 8L5 13"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>

              <button
                type="button"
                onClick={onListPropertyClick}
                className="px-6 py-4 rounded-full text-sm font-medium text-white/90 hover:text-white border border-white/20 hover:border-[#DFBE88]/60 bg-[#0C2236]/45 backdrop-blur-md transition-all cursor-pointer"
              >
                Market or Develop With Us
              </button>
            </div>

            {/* Subtle Trust Pillars Strip */}
            <div className="mt-11 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#DFBE88] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    100% Vetted
                  </p>
                  <p className="text-[11px] text-white/65">Title & Valuation</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#DFBE88] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    4 Asset Pillars
                  </p>
                  <p className="text-[11px] text-white/65">Home, Office & Land</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-[#DFBE88] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    End-to-End
                  </p>
                  <p className="text-[11px] text-white/65">Advisory & Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Overlapping White Pill Search Bar (Exact Spatial Centerpiece from Reference Image 1) */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 -mt-14 sm:-mt-16">
        {openDropdown && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpenDropdown(null)}
          />
        )}

        <div className="relative z-20 bg-white rounded-[28px] lg:rounded-full p-3 sm:p-4 lg:px-8 lg:py-4 shadow-search-pill border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-[1.15fr_1.15fr_1.1fr_auto] items-center gap-3 sm:gap-4 lg:gap-6">
            {/* Filter 1: Location / Corridor */}
            <div className="relative px-3 py-1.5 sm:border-r border-slate-200/80">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'district' ? null : 'district')
                }
                className="w-full text-left group cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64788C] group-hover:text-[#0C2236] transition-colors">
                  Location Corridor
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openDropdown === 'district' ? 'rotate-180 text-[#C59F63]' : ''
                    }`}
                  />
                </span>
                <p className="mt-1 text-[14.5px] sm:text-[15px] font-bold text-[#0C2236] truncate">
                  {filters.district}
                </p>
              </button>

              {openDropdown === 'district' && (
                <div className="absolute left-0 top-full mt-3 w-full sm:w-72 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2 z-40">
                  {DISTRICTS.map((dist) => (
                    <button
                      key={dist}
                      type="button"
                      onClick={() => {
                        onFiltersChange({ district: dist })
                        setOpenDropdown(null)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors flex items-center justify-between cursor-pointer ${
                        filters.district === dist
                          ? 'bg-[#0C2236]/6 text-[#0C2236] font-bold'
                          : 'text-[#334A60] hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <span>{dist}</span>
                      {filters.district === dist && (
                        <span className="w-2 h-2 rounded-full bg-[#C59F63]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 2: Property Typology */}
            <div className="relative px-3 py-1.5 sm:border-r border-slate-200/80">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'category' ? null : 'category')
                }
                className="w-full text-left group cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64788C] group-hover:text-[#0C2236] transition-colors">
                  Typology of Property
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openDropdown === 'category' ? 'rotate-180 text-[#C59F63]' : ''
                    }`}
                  />
                </span>
                <p className="mt-1 text-[14.5px] sm:text-[15px] font-bold text-[#0C2236] truncate">
                  {currentCategoryLabel}
                </p>
              </button>

              {openDropdown === 'category' && (
                <div className="absolute left-0 top-full mt-3 w-full sm:w-80 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2 z-40">
                  {CATEGORY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onFiltersChange({ category: opt.value })
                        setOpenDropdown(null)
                      }}
                      className={`w-full text-left px-4 py-2.5 transition-colors flex items-center justify-between cursor-pointer ${
                        filters.category === opt.value
                          ? 'bg-[#0C2236]/6'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-[#0C2236]">
                          {opt.label}
                        </p>
                        <p className="text-[11px] text-[#64788C]">{opt.sub}</p>
                      </div>
                      {filters.category === opt.value && (
                        <span className="w-2 h-2 rounded-full bg-[#C59F63] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 3: Price / Investment Level */}
            <div className="relative px-3 py-1.5">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === 'price' ? null : 'price')
                }
                className="w-full text-left group cursor-pointer"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64788C] group-hover:text-[#0C2236] transition-colors">
                  Investment Range
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openDropdown === 'price' ? 'rotate-180 text-[#C59F63]' : ''
                    }`}
                  />
                </span>
                <p className="mt-1 text-[14.5px] sm:text-[15px] font-bold text-[#0C2236] tabular-nums-crest truncate">
                  {filters.priceBand === 'all'
                    ? 'Any Investment Level'
                    : getPriceBandDisplay(filters.priceBand)}
                </p>
              </button>

              {openDropdown === 'price' && (
                <div className="absolute left-0 lg:right-0 lg:left-auto top-full mt-3 w-full sm:w-72 rounded-2xl bg-white shadow-2xl border border-slate-100 py-2 z-40">
                  {PRICE_BANDS.map((band) => (
                    <button
                      key={band.id}
                      type="button"
                      onClick={() => {
                        onFiltersChange({ priceBand: band.id })
                        setOpenDropdown(null)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm transition-colors flex items-center justify-between cursor-pointer ${
                        filters.priceBand === band.id
                          ? 'bg-[#0C2236]/6 text-[#0C2236] font-bold'
                          : 'text-[#334A60] hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <span>
                        {band.id === 'all'
                          ? 'Any Investment Level'
                          : getPriceBandDisplay(band.id)}
                      </span>
                      {filters.priceBand === band.id && (
                        <span className="w-2 h-2 rounded-full bg-[#C59F63]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Deep Prussian-Navy Pill CTA Button (Matches Reference Image 1's Rounded Navy Search Button) */}
            <div className="sm:col-span-3 lg:col-span-1 flex justify-end">
              <button
                type="button"
                onClick={onExecuteSearch}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0C2C47] hover:bg-[#0C2236] text-white text-sm font-semibold tracking-wide transition-all duration-200 shadow-[0_10px_24px_-6px_rgba(12,44,71,0.45)] hover:shadow-[0_14px_28px_-6px_rgba(12,34,54,0.6)] active:scale-[0.99] cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#DFBE88]" />
                <span>Search</span>
                <span className="ml-0.5 px-2 py-0.5 rounded-full bg-white/15 text-[11px] font-bold tabular-nums-crest">
                  {matchedCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
