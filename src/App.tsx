import React, { useEffect, useMemo, useState } from 'react'
import {
  CurrencyCode,
  PropertyCategory,
  PropertyListing,
  SearchFilters,
} from './types/property'
import { PRICE_BANDS, PROPERTY_LISTINGS } from './data/properties'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { PortfolioSection } from './components/PortfolioSection'
import { MethodSection } from './components/MethodSection'
import { ServicesAndEcosystem } from './components/ServicesAndEcosystem'
import { LegacyCalculator } from './components/LegacyCalculator'
import { PhilosophyAndTestimonials } from './components/PhilosophyAndTestimonials'
import { ConsultationSection } from './components/ConsultationSection'
import { Footer } from './components/Footer'
import { PropertyModal } from './components/PropertyModal'
import { ShortlistDrawer } from './components/ShortlistDrawer'

const DEFAULT_FILTERS: SearchFilters = {
  district: 'All Prime Corridors',
  category: 'All',
  priceBand: 'all',
  transaction: 'All',
  keyword: '',
}

export const App: React.FC = () => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD')
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS)
  const [shortlistIds, setShortlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('evercrest_shortlist')
      return saved ? JSON.parse(saved) : ['crestview-cantilever-villa']
    } catch {
      return ['crestview-cantilever-villa']
    }
  })
  const [shortlistOpen, setShortlistOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(
    null
  )
  const [consultMode, setConsultMode] = useState<'acquire' | 'market'>('acquire')
  const [prefilledPropertyTitle, setPrefilledPropertyTitle] = useState<
    string | null
  >(null)

  useEffect(() => {
    try {
      localStorage.setItem('evercrest_shortlist', JSON.stringify(shortlistIds))
    } catch {
      // ignore storage quota errors
    }
  }, [shortlistIds])

  const filteredListings = useMemo(() => {
    const band =
      PRICE_BANDS.find((b) => b.id === filters.priceBand) || PRICE_BANDS[0]

    return PROPERTY_LISTINGS.filter((item) => {
      if (
        filters.district !== 'All Prime Corridors' &&
        item.district !== filters.district
      ) {
        return false
      }
      if (filters.category !== 'All' && item.category !== filters.category) {
        return false
      }
      if (
        filters.transaction !== 'All' &&
        item.transaction !== filters.transaction
      ) {
        return false
      }
      if (item.priceUSD < band.min || item.priceUSD > band.max) {
        return false
      }
      return true
    })
  }, [filters])

  const shortlistedProperties = useMemo(
    () => PROPERTY_LISTINGS.filter((p) => shortlistIds.includes(p.id)),
    [shortlistIds]
  )

  const handleFiltersChange = (next: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...next }))
  }

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS)
  }

  const handleToggleShortlist = (id: string) => {
    setShortlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const scrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleExecuteSearch = () => {
    scrollToSection('portfolio')
  }

  const handleNavigateConsultation = (mode: 'acquire' | 'market' = 'acquire') => {
    setConsultMode(mode)
    scrollToSection('consultation')
  }

  const handleInquireProperty = (property: PropertyListing) => {
    setSelectedProperty(null)
    setConsultMode('acquire')
    setPrefilledPropertyTitle(property.title)
    setTimeout(() => scrollToSection('consultation'), 80)
  }

  const handleFooterCategorySelect = (cat: PropertyCategory) => {
    setFilters({ ...DEFAULT_FILTERS, category: cat })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0C2236]">
      <Navbar
        currency={currency}
        onCurrencyChange={setCurrency}
        shortlistCount={shortlistIds.length}
        onOpenShortlist={() => setShortlistOpen(true)}
        onNavigateConsultation={handleNavigateConsultation}
      />

      <main className="flex-1">
        <HeroSection
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onExecuteSearch={handleExecuteSearch}
          currency={currency}
          matchedCount={filteredListings.length}
          onListPropertyClick={() => handleNavigateConsultation('market')}
        />

        <PortfolioSection
          listings={filteredListings}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onResetFilters={handleResetFilters}
          currency={currency}
          shortlistIds={shortlistIds}
          onToggleShortlist={handleToggleShortlist}
          onSelectProperty={setSelectedProperty}
        />

        <MethodSection
          onConsultClick={() => handleNavigateConsultation('acquire')}
        />

        <ServicesAndEcosystem onActionClick={handleNavigateConsultation} />

        <LegacyCalculator
          currency={currency}
          onRequestBriefing={() => handleNavigateConsultation('acquire')}
        />

        <PhilosophyAndTestimonials />

        <ConsultationSection
          mode={consultMode}
          onModeChange={setConsultMode}
          shortlistedProperties={shortlistedProperties}
          prefilledPropertyTitle={prefilledPropertyTitle}
        />
      </main>

      <Footer onSelectCategory={handleFooterCategorySelect} />

      <PropertyModal
        property={selectedProperty}
        currency={currency}
        isShortlisted={
          selectedProperty ? shortlistIds.includes(selectedProperty.id) : false
        }
        onToggleShortlist={handleToggleShortlist}
        onClose={() => setSelectedProperty(null)}
        onInquire={handleInquireProperty}
      />

      <ShortlistDrawer
        isOpen={shortlistOpen}
        onClose={() => setShortlistOpen(false)}
        properties={shortlistedProperties}
        currency={currency}
        onRemove={handleToggleShortlist}
        onSelectProperty={setSelectedProperty}
        onProceedToConsult={() => handleNavigateConsultation('acquire')}
      />
    </div>
  )
}

export default App
