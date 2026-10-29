import React, { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { PropertyCategory } from '../types/property'

interface FooterProps {
  onSelectCategory: (cat: PropertyCategory) => void
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [briefEmail, setBriefEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (briefEmail.trim()) {
      setSubscribed(true)
      setBriefEmail('')
    }
  }

  return (
    <footer className="bg-[#08192B] text-white pt-18 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <BrandLogo variant="horizontal" tone="light" showTagline />
            <p className="mt-5 text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Connecting individuals, families, property owners, investors, and
              developers with residential, commercial, land, and development
              opportunities—where security, value, and lasting legacies rise.
            </p>
          </div>

          {/* Property Pillars */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-[#DFBE88] mb-4">
              Portfolio
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              {(
                [
                  ['Residential', 'Houses & Villas'],
                  ['Apartments', 'Luxury Apartments'],
                  ['Commercial', 'Commercial Spaces'],
                  ['Land & Development', 'Land & Development'],
                ] as [PropertyCategory, string][]
              ).map(([cat, label]) => (
                <li key={cat}>
                  <a
                    href="#portfolio"
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Advisory Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-[#DFBE88] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-white/75">
              <li>
                <a href="#method" className="hover:text-white transition-colors">
                  Our Method
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Advisory Services
                </a>
              </li>
              <li>
                <a href="#evaluator" className="hover:text-white transition-colors">
                  Legacy Evaluator
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-white transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#consultation" className="hover:text-white transition-colors">
                  Private Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Quarterly Intelligence Brief */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-[#DFBE88] mb-3">
              Quarterly Property Intelligence
            </h4>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
              Receive vetted off-market land releases, commercial yield benchmarks, and
              residential corridor reports.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-xs font-semibold text-emerald-200">
                <Check className="w-4 h-4" />
                <span>Subscribed to the Evercrest Market Brief</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={briefEmail}
                  onChange={(e) => setBriefEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-3 rounded-full bg-white/8 border border-white/15 text-xs sm:text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-[#DFBE88]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="w-11 h-11 rounded-full bg-[#C59F63] hover:bg-[#DFBE88] text-[#0C2236] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Motto Bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p>
            © {new Date().getFullYear()} Evercrest Properties. All rights reserved.
          </p>
          <p className="tracking-[0.24em] uppercase text-[#DFBE88]/85 font-semibold text-[10.5px]">
            Evercrest Properties — Where Legacies Rise.
          </p>
        </div>
      </div>
    </footer>
  )
}
