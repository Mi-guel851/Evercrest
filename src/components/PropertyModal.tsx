import React, { useEffect, useState } from 'react'
import {
  Bath,
  BedDouble,
  Bookmark,
  CheckCircle2,
  FileCheck2,
  Layers,
  MapPin,
  TrendingUp,
  X,
  ArrowRight,
} from 'lucide-react'
import { CurrencyCode, PropertyListing } from '../types/property'
import { formatPropertyPrice } from '../data/properties'

interface PropertyModalProps {
  property: PropertyListing | null
  currency: CurrencyCode
  isShortlisted: boolean
  onToggleShortlist: (id: string) => void
  onClose: () => void
  onInquire: (property: PropertyListing) => void
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  currency,
  isShortlisted,
  onToggleShortlist,
  onClose,
  onInquire,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)

  useEffect(() => {
    setActivePhotoIndex(0)
  }, [property?.id])

  useEffect(() => {
    if (!property) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [property, onClose])

  if (!property) return null

  const photos = [property.image, property.secondaryImage]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#071625]/75 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-[32px] bg-white shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gallery Header */}
        <div className="relative h-64 sm:h-80 w-full bg-[#0C2236] shrink-0">
          <img
            src={photos[activePhotoIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,25,43,0.45) 0%, rgba(8,25,43,0.08) 45%, rgba(8,25,43,0.82) 100%)',
            }}
          />

          {/* Top Controls */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0C2236]/85 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-[#DFBE88] border border-white/15">
                {property.category} • {property.transaction}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleShortlist(property.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isShortlisted
                    ? 'bg-[#C59F63] text-white'
                    : 'bg-white/90 text-[#0C2236] hover:bg-white'
                }`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${isShortlisted ? 'fill-current' : ''}`}
                />
                <span>{isShortlisted ? 'Shortlisted' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close dossier"
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#0C2236] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Photo Switcher Thumbnails */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            {photos.map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-14 h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activePhotoIndex === idx
                    ? 'border-[#DFBE88] scale-105'
                    : 'border-white/40 opacity-75 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-4 left-5 right-36 text-white">
            <p className="inline-flex items-center gap-1.5 text-xs text-white/85">
              <MapPin className="w-3.5 h-3.5 text-[#DFBE88]" />
              <span>
                {property.address} — {property.district}
              </span>
            </p>
            <h3 className="mt-1 text-2xl sm:text-3xl font-bold leading-tight">
              {property.title}
            </h3>
          </div>
        </div>

        {/* Scrollable Dossier Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Price + Key Evaluation Benchmarks Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 p-4 rounded-2xl bg-[#F6F8FA] border border-slate-200/80">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64788C]">
                Guide Valuation
              </p>
              <p className="mt-1 text-lg sm:text-xl font-extrabold text-[#0C2236] tabular-nums-crest">
                {formatPropertyPrice(property.priceUSD, currency)}
                {property.priceSuffix && (
                  <span className="text-xs font-normal text-[#64788C] ml-1">
                    {property.priceSuffix}
                  </span>
                )}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64788C]">
                Est. Yield / IRR
              </p>
              <p className="mt-1 text-lg font-extrabold text-[#9A763E] inline-flex items-center gap-1 tabular-nums-crest">
                <TrendingUp className="w-4 h-4" />
                {property.projectedYield}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64788C]">
                5-Yr Corridor Growth
              </p>
              <p className="mt-1 text-lg font-extrabold text-emerald-700 tabular-nums-crest">
                {property.fiveYearAppreciation}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#64788C]">
                Footprint / Area
              </p>
              <p className="mt-1 text-sm sm:text-base font-bold text-[#0C2236]">
                {property.areaLabel}
                {property.plotSize ? ` • ${property.plotSize}` : ''}
              </p>
            </div>
          </div>

          {/* Architectural Specs & Title Status */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[#0C2236]">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <FileCheck2 className="w-3.5 h-3.5" />
              {property.titleStatus}
            </span>
            {property.beds !== undefined && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100">
                <BedDouble className="w-3.5 h-3.5 text-[#64788C]" />
                {property.beds} Bedrooms
              </span>
            )}
            {property.baths !== undefined && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100">
                <Bath className="w-3.5 h-3.5 text-[#64788C]" />
                {property.baths} Bathrooms
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100">
              <Layers className="w-3.5 h-3.5 text-[#64788C]" />
              {property.subtitle}
            </span>
          </div>

          {/* Narrative Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-[#9A763E]">
              Architectural & Mandate Overview
            </h4>
            <p className="mt-2 text-sm sm:text-[15px] text-[#334A60] leading-relaxed">
              {property.summary}
            </p>
          </div>

          {/* Due Diligence & Asset Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-[#9A763E] mb-3">
              Key Evaluation Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F6F8FA] border border-slate-200/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#C59F63] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[13px] text-[#0C2236] font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Modal CTA Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#64788C] mr-1">Ideal for:</span>
              {property.idealFor.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-[#0C2236]/6 text-[11px] font-semibold text-[#0C2236]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onInquire(property)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0C2236] hover:bg-[#163856] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer shrink-0"
            >
              <span>Request Full Dossier & Viewing</span>
              <ArrowRight className="w-4 h-4 text-[#DFBE88]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
