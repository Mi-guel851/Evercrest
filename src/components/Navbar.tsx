import React, { useEffect, useState } from 'react'
import { Bookmark, Globe, Menu, X } from 'lucide-react'
import { CurrencyCode } from '../types/property'
import { CURRENCY_CONFIG } from '../data/properties'
import { BrandLogo } from './BrandLogo'

interface NavbarProps {
  currency: CurrencyCode
  onCurrencyChange: (currency: CurrencyCode) => void
  shortlistCount: number
  onOpenShortlist: () => void
  onNavigateConsultation: (mode?: 'acquire' | 'market') => void
}

const NAV_LINKS = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Our Method', href: '#method' },
  { label: 'Services', href: '#services' },
  { label: 'Evaluator', href: '#evaluator' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Contact', href: '#consultation' },
]

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  shortlistCount,
  onOpenShortlist,
  onNavigateConsultation,
}) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-xl border-b border-[#0C2236]/10 py-3.5 shadow-[0_10px_30px_-15px_rgba(12,34,54,0.12)]'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between gap-4">
        {/* Official Evercrest Brand Lockup */}
        <a
          href="#top"
          className="group focus:outline-none"
          aria-label="Evercrest Properties Home"
        >
          <BrandLogo variant="horizontal" tone={scrolled ? 'dark' : 'light'} />
        </a>

        {/* Center Navigation Links (Echoing Reference Image 1) */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[13.5px] font-medium tracking-wide transition-colors relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                scrolled
                  ? 'text-[#0C2236]/80 hover:text-[#0C2236] after:bg-[#C59F63]'
                  : 'text-white/85 hover:text-white after:bg-[#DFBE88]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Controls: Currency + Shortlist + Signature Frosted Pill CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setCurrencyOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                scrolled
                  ? 'bg-[#0C2236]/5 text-[#0C2236] hover:bg-[#0C2236]/10'
                  : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/20 backdrop-blur-md'
              }`}
              aria-label="Select display currency"
            >
              <Globe className="w-3.5 h-3.5 opacity-80" />
              <span>{currency}</span>
            </button>

            {currencyOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setCurrencyOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white shadow-xl border border-slate-100 py-1.5 z-20 overflow-hidden">
                  {(Object.keys(CURRENCY_CONFIG) as CurrencyCode[]).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        onCurrencyChange(code)
                        setCurrencyOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                        currency === code
                          ? 'bg-[#0C2236] text-white font-semibold'
                          : 'text-[#0C2236] hover:bg-slate-50'
                      }`}
                    >
                      <span>{CURRENCY_CONFIG[code].label}</span>
                      {currency === code && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DFBE88]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Saved Properties Shortlist Button */}
          <button
            type="button"
            onClick={onOpenShortlist}
            className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              scrolled
                ? 'bg-[#0C2236]/5 text-[#0C2236] hover:bg-[#0C2236]/10'
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-md'
            }`}
            aria-label="Open saved property shortlist"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Shortlist</span>
            {shortlistCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#C59F63] text-white text-[10px] font-bold">
                {shortlistCount}
              </span>
            )}
          </button>

          {/* Signature Frosted Pill CTA (Inspired by Reference Top-Right Pill) */}
          <button
            type="button"
            onClick={() => onNavigateConsultation('acquire')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              scrolled
                ? 'bg-[#0C2236] text-white hover:bg-[#163856] shadow-md'
                : 'glass-pill text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]'
            }`}
          >
            Private Consultation
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={onOpenShortlist}
            className={`relative p-2.5 rounded-full transition-colors ${
              scrolled
                ? 'bg-[#0C2236]/5 text-[#0C2236]'
                : 'bg-white/15 text-white border border-white/20 backdrop-blur-md'
            }`}
            aria-label="Saved properties"
          >
            <Bookmark className="w-4 h-4" />
            {shortlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C59F63] text-white text-[10px] font-bold flex items-center justify-center">
                {shortlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`p-2.5 rounded-full transition-colors ${
              scrolled
                ? 'bg-[#0C2236]/5 text-[#0C2236]'
                : 'bg-white/15 text-white border border-white/20 backdrop-blur-md'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-3 mx-4 rounded-3xl bg-[#0C2236]/96 backdrop-blur-2xl border border-white/15 p-6 text-white shadow-2xl">
          <div className="flex flex-col gap-3.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-white/90 hover:text-[#DFBE88] py-1.5 border-b border-white/10"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-widest text-white/60">
              Currency
            </span>
            <div className="flex items-center gap-1.5">
              {(Object.keys(CURRENCY_CONFIG) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onCurrencyChange(code)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    currency === code
                      ? 'bg-[#C59F63] text-white'
                      : 'bg-white/10 text-white/75'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false)
              onNavigateConsultation('acquire')
            }}
            className="mt-5 w-full py-3 rounded-full bg-white text-[#0C2236] font-semibold text-sm shadow-lg"
          >
            Book Private Consultation
          </button>
        </div>
      )}
    </header>
  )
}
