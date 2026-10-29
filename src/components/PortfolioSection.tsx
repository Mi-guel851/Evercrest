import React, { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  RotateCcw,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import {
  CurrencyCode,
  PropertyCategory,
  PropertyListing,
  SearchFilters,
} from '../types/property'
import { formatPropertyPrice } from '../data/properties'

interface PortfolioSectionProps {
  listings: PropertyListing[]
  filters: SearchFilters
  onFiltersChange: (next: Partial<SearchFilters>) => void
  onResetFilters: () => void
  currency: CurrencyCode
  shortlistIds: string[]
  onToggleShortlist: (id: string) => void
  onSelectProperty: (property: PropertyListing) => void
}

const CATEGORY_TABS: { value: PropertyCategory; label: string }[] = [
  { value: 'All', label: 'All Opportunities' },
  { value: 'Residential', label: 'Houses & Villas' },
  { value: 'Apartments', label: 'Apartments' },
  { value: 'Commercial', label: 'Commercial Spaces' },
  { value: 'Land & Development', label: 'Land & Development' },
]

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  listings,
  filters,
  onFiltersChange,
  onResetFilters,
  currency,
  shortlistIds,
  onToggleShortlist,
  onSelectProperty,
}) => {
  const [page, setPage] = useState(0)
  const [showAllGrid, setShowAllGrid] = useState(false)

  const pageSize = 3
  const totalPages = Math.max(1, Math.ceil(listings.length / pageSize))

  useEffect(() => {
    setPage(0)
  }, [filters.category, filters.district, filters.priceBand, filters.transaction])

  const displayedListings = showAllGrid
    ? listings
    : listings.slice(page * pageSize, page * pageSize + pageSize)

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.district !== 'All Prime Corridors' ||
    filters.priceBand !== 'all' ||
    filters.transaction !== 'All'

  return (
    <section
      id="portfolio"
      className="relative bg-white pt-16 sm:pt-20 pb-20 sm:pb-28 overflow-hidden"
    >
      {/* Hidden SVG ClipPath Definition: Tangent-Continuous Sloped Roofline Mask (Inspired by Reference Image 1) */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="evercrest-sloped-roof" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.115 Q 0,0.006 0.085,0.022 L 0.922,0.186 Q 1,0.201 1,0.295 L 1,0.905 Q 1,1 0.92,1 L 0.08,1 Q 0,1 0,0.905 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header (Matches Reference Image 1 Centered Editorial Rhythm) */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2.5 mb-3">
            <span className="h-[1px] w-7 bg-[#C59F63]" />
            <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#9A763E]">
              Curated Portfolio
            </span>
            <span className="h-[1px] w-7 bg-[#C59F63]" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0C2236] tracking-tight">
            Most Viewed Opportunities
          </h2>

          <p className="mt-3.5 text-sm sm:text-[15px] text-[#64788C] leading-relaxed">
            Discover vetted residential homes, luxury apartments, Grade-A commercial
            spaces, and titled development land—evaluated for lasting value and peace
            of mind.
          </p>
        </div>

        {/* Interactive Category Filter Pills */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {CATEGORY_TABS.map((tab) => {
            const active = filters.category === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onFiltersChange({ category: tab.value })}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-[#0C2236] text-white shadow-[0_10px_24px_-8px_rgba(12,34,54,0.45)]'
                    : 'bg-[#F3F6F9] text-[#4C6278] hover:bg-[#E6ECF2] hover:text-[#0C2236]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full text-xs font-semibold text-[#9A763E] bg-[#C59F63]/12 hover:bg-[#C59F63]/20 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Empty State if strict filter combo yields 0 */}
        {listings.length === 0 ? (
          <div className="mt-14 rounded-3xl bg-[#F6F8FA] border border-slate-200/70 p-12 text-center max-w-xl mx-auto">
            <Sparkles className="w-8 h-8 text-[#C59F63] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#0C2236]">
              No public mandates match this exact filter combination
            </h3>
            <p className="mt-2 text-sm text-[#64788C]">
              Evercrest maintains discreet off-market residential, commercial, and land
              holdings. Reset filters to browse featured listings or request a custom
              briefing.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-6 px-6 py-3 rounded-full bg-[#0C2236] text-white text-xs font-semibold tracking-wide hover:bg-[#163856] transition-colors cursor-pointer"
            >
              View All Curated Properties
            </button>
          </div>
        ) : (
          <>
            {/* Signature 3-Column Sloped-Roofline Architectural Property Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
              {displayedListings.map((property) => {
                const isSaved = shortlistIds.includes(property.id)
                return (
                  <article
                    key={property.id}
                    onClick={() => onSelectProperty(property)}
                    className="group relative bg-white rounded-[28px] p-3.5 pb-6 shadow-property-card border border-slate-100/90 hover:border-[#C59F63]/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
                  >
                    {/* Top Image Container with Sloped Roofline Mask */}
                    <div className="relative">
                      <div
                        className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#0C2236]"
                        style={{ clipPath: 'url(#evercrest-sloped-roof)' }}
                      >
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 opacity-55 group-hover:opacity-35 transition-opacity"
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(12,34,54,0.05) 45%, rgba(12,34,54,0.68) 100%)',
                          }}
                        />

                        {/* Bottom-left Category & Yield Pill inside photo */}
                        <div className="absolute bottom-3.5 left-3.5 right-14 flex items-center gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-[#0C2236]/80 backdrop-blur-md text-[10.5px] font-semibold tracking-wider uppercase text-white border border-white/15">
                            {property.category}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10.5px] font-bold text-[#0C2236]">
                            <TrendingUp className="w-3 h-3 text-[#9A763E]" />
                            {property.projectedYield}
                          </span>
                        </div>
                      </div>

                      {/* Bookmark Button Positioned Cleanly Along Upper-Left or Below Right Roof Slope */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleShortlist(property.id)
                        }}
                        aria-label={
                          isSaved ? 'Remove from shortlist' : 'Save to shortlist'
                        }
                        className={`absolute bottom-3.5 right-3.5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                          isSaved
                            ? 'bg-[#C59F63] text-white'
                            : 'bg-white/90 hover:bg-white text-[#0C2236]'
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Card Body (Faithful to Reference Image 1 Clean Layout + Evercrest Intelligence) */}
                    <div className="px-2.5 pt-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Address + Specs Row */}
                        <div className="flex items-center justify-between gap-2 text-[11.5px] text-[#64788C]">
                          <span className="inline-flex items-center gap-1 truncate">
                            <MapPin className="w-3.5 h-3.5 text-[#C59F63] shrink-0" />
                            <span className="truncate">{property.address}</span>
                          </span>

                          <div className="flex items-center gap-2.5 shrink-0 font-semibold text-[#0C2236]/80">
                            {property.beds !== undefined && (
                              <span className="inline-flex items-center gap-1">
                                <BedDouble className="w-3.5 h-3.5 text-[#64788C]" />
                                {property.beds}
                              </span>
                            )}
                            {property.baths !== undefined && (
                              <span className="inline-flex items-center gap-1">
                                <Bath className="w-3.5 h-3.5 text-[#64788C]" />
                                {property.baths}
                              </span>
                            )}
                            {property.beds === undefined && (
                              <span className="inline-flex items-center gap-1">
                                <Layers className="w-3.5 h-3.5 text-[#64788C]" />
                                {property.areaLabel}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Property Title */}
                        <h3 className="mt-2 text-lg sm:text-[19px] font-bold text-[#0C2236] group-hover:text-[#163D61] transition-colors leading-snug">
                          {property.title}
                        </h3>

                        <p className="mt-1 text-xs text-[#64788C] line-clamp-1">
                          {property.titleStatus} • {property.areaLabel}
                        </p>
                      </div>

                      {/* Price & Action Footer */}
                      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-baseline justify-between gap-2">
                        <div>
                          <span className="text-lg sm:text-[20px] font-extrabold text-[#0C2236] tabular-nums-crest tracking-tight">
                            {formatPropertyPrice(property.priceUSD, currency)}
                          </span>
                          {property.priceSuffix && (
                            <span className="ml-1 text-xs font-medium text-[#64788C]">
                              {property.priceSuffix}
                            </span>
                          )}
                        </div>

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#9A763E] group-hover:text-[#0C2236] transition-colors">
                          <span>Dossier</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Carousel Pagination Dots + View Toggle (Matches Reference Image 1 Dots with Full Interactivity) */}
            <div className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-5">
              {!showAllGrid && totalPages > 1 && (
                <div className="inline-flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#0C2236] hover:bg-[#0C2236] hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous property page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2.5 px-2">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPage(idx)}
                        aria-label={`Go to page ${idx + 1}`}
                        className={`rounded-full transition-all duration-300 cursor-pointer ${
                          page === idx
                            ? 'w-3 h-3 bg-[#0C2236] scale-110'
                            : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setPage((p) => (p + 1) % totalPages)}
                    className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-[#0C2236] hover:bg-[#0C2236] hover:text-white transition-colors cursor-pointer"
                    aria-label="Next property page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {listings.length > 3 && (
                <button
                  type="button"
                  onClick={() => setShowAllGrid((prev) => !prev)}
                  className="px-5 py-2 rounded-full text-xs font-semibold text-[#0C2236] bg-[#F3F6F9] hover:bg-[#E5ECF3] transition-colors cursor-pointer"
                >
                  {showAllGrid
                    ? 'Show 3-Card Carousel View'
                    : `View All ${listings.length} Filtered Properties`}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
