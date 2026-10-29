import React from 'react'
import { Bookmark, Trash2, X, ArrowRight } from 'lucide-react'
import { CurrencyCode, PropertyListing } from '../types/property'
import { formatPropertyPrice } from '../data/properties'

interface ShortlistDrawerProps {
  isOpen: boolean
  onClose: () => void
  properties: PropertyListing[]
  currency: CurrencyCode
  onRemove: (id: string) => void
  onSelectProperty: (property: PropertyListing) => void
  onProceedToConsult: () => void
}

export const ShortlistDrawer: React.FC<ShortlistDrawerProps> = ({
  isOpen,
  onClose,
  properties,
  currency,
  onRemove,
  onSelectProperty,
  onProceedToConsult,
}) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#071625]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0C2236] text-[#DFBE88] flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0C2236]">
                Saved Property Shortlist
              </h3>
              <p className="text-xs text-[#64788C]">
                {properties.length}{' '}
                {properties.length === 1 ? 'opportunity' : 'opportunities'} selected
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shortlist"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0C2236] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {properties.length === 0 ? (
            <div className="text-center py-16">
              <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-[#0C2236]">
                Your shortlist is currently empty
              </p>
              <p className="mt-1.5 text-xs text-[#64788C] max-w-xs mx-auto leading-relaxed">
                Bookmark any residential, commercial, or land opportunity to compare
                yields and request a combined advisory dossier.
              </p>
            </div>
          ) : (
            properties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  onClose()
                  onSelectProperty(prop)
                }}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#F6F8FA] border border-slate-200/80 hover:border-[#C59F63] transition-colors cursor-pointer"
              >
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A763E]">
                    {prop.category} • {prop.projectedYield}
                  </span>
                  <h4 className="text-sm font-bold text-[#0C2236] truncate">
                    {prop.title}
                  </h4>
                  <p className="text-xs font-extrabold text-[#0C2236] mt-1 tabular-nums-crest">
                    {formatPropertyPrice(prop.priceUSD, currency)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemove(prop.id)
                  }}
                  aria-label="Remove property"
                  className="p-2 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer CTA */}
        {properties.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-[#F6F8FA]">
            <button
              type="button"
              onClick={() => {
                onClose()
                onProceedToConsult()
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#0C2236] hover:bg-[#163856] text-white text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <span>Request Combined Dossier ({properties.length})</span>
              <ArrowRight className="w-4 h-4 text-[#DFBE88]" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
