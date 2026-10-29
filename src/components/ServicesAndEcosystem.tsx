import React, { useState } from 'react'
import {
  Megaphone,
  UserCheck,
  LineChart,
  Building,
  Check,
  ArrowUpRight,
} from 'lucide-react'
import { STAKEHOLDER_LENSES } from '../data/properties'

interface ServicesAndEcosystemProps {
  onActionClick: (mode: 'acquire' | 'market') => void
}

const CORE_SERVICES = [
  {
    code: '01',
    title: 'Property Marketing & Positioning',
    icon: Megaphone,
    summary:
      'Strategic market positioning, architectural presentation, and qualified buyer/tenant outreach for residential, commercial, and land owners.',
    tags: ['Valuation Strategy', 'Private Network', 'Mandate Representation'],
  },
  {
    code: '02',
    title: 'Buyer & Tenant Assistance',
    icon: UserCheck,
    summary:
      'Guided discovery, property inspection, comparative evaluation, and fair-term negotiation for homeowners, families, and corporate tenants.',
    tags: ['Home Acquisition', 'Corporate Leasing', 'Title Verification'],
  },
  {
    code: '03',
    title: 'Investment Support & Advisory',
    icon: LineChart,
    summary:
      'Data-led yield modeling, land-banking strategy, portfolio structuring, and capital-appreciation analysis for private and institutional investors.',
    tags: ['Yield Analysis', 'Land Banking', 'Risk Due Diligence'],
  },
  {
    code: '04',
    title: 'Development & Property Services',
    icon: Building,
    summary:
      'Site origination, joint-venture structuring, off-plan sales execution, and ongoing post-acquisition support for developers and asset holders.',
    tags: ['JV Structuring', 'Feasibility', 'Lifecycle Support'],
  },
]

export const ServicesAndEcosystem: React.FC<ServicesAndEcosystemProps> = ({
  onActionClick,
}) => {
  const [selectedLensId, setSelectedLensId] = useState<
    'families' | 'owners' | 'investors' | 'developers'
  >('families')

  const activeLens =
    STAKEHOLDER_LENSES.find((l) => l.id === selectedLensId) ||
    STAKEHOLDER_LENSES[0]

  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-[1px] w-8 bg-[#C59F63]" />
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#9A763E]">
                Advisory & Services
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0C2236] tracking-tight leading-[1.15]">
              Comprehensive Capabilities Across{' '}
              <span className="font-serif-crest italic font-semibold text-[#9A763E]">
                Every Property Stage
              </span>
            </h2>
          </div>

          <p className="text-sm sm:text-[15px] text-[#64788C] max-w-md leading-relaxed">
            Whether securing a family residence, leasing Grade-A commercial space, or
            structuring a multi-acre development, Evercrest aligns expertise with your
            long-term goals.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES.map((svc) => (
            <div
              key={svc.code}
              className="group rounded-[26px] bg-[#F6F8FA] hover:bg-[#0C2236] p-7 border border-slate-200/70 hover:border-[#0C2236] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-[0_24px_48px_-14px_rgba(12,34,54,0.3)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-[0.22em] text-[#9A763E] group-hover:text-[#DFBE88] transition-colors">
                    {svc.code}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-white group-hover:bg-white/10 border border-slate-200/80 group-hover:border-white/15 flex items-center justify-center transition-colors">
                    <svc.icon className="w-5 h-5 text-[#0C2236] group-hover:text-[#DFBE88] transition-colors" />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#0C2236] group-hover:text-white transition-colors leading-snug">
                  {svc.title}
                </h3>

                <p className="mt-3 text-xs sm:text-[13.5px] text-[#4C6278] group-hover:text-white/75 transition-colors leading-relaxed">
                  {svc.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 group-hover:border-white/15 flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-white group-hover:bg-white/10 text-[#0C2236]/80 group-hover:text-white/90 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stakeholder Ecosystem Switcher: Individuals & Families | Property Owners | Investors | Developers */}
        <div className="mt-16 rounded-[32px] bg-[#0C2236] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_28px_70px_-18px_rgba(12,34,54,0.35)]">
          <div className="absolute inset-0 bg-architectural-grid opacity-55 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/12">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.26em] uppercase text-[#DFBE88]">
                  Lasting Relationships
                </span>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-bold tracking-tight">
                  Who Evercrest Serves
                </h3>
              </div>

              {/* 4 Stakeholder Tabs */}
              <div className="flex flex-wrap gap-2">
                {STAKEHOLDER_LENSES.map((lens) => {
                  const active = lens.id === selectedLensId
                  return (
                    <button
                      key={lens.id}
                      type="button"
                      onClick={() => setSelectedLensId(lens.id)}
                      className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-[#C59F63] text-[#0C2236] shadow-lg'
                          : 'bg-white/8 text-white/80 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      {lens.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active Lens Content */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#DFBE88]">
                  {activeLens.eyebrow}
                </span>
                <h4 className="mt-2 text-2xl sm:text-[28px] font-bold leading-snug">
                  {activeLens.headline}
                </h4>
                <p className="mt-3.5 text-sm sm:text-[15px] text-white/78 leading-relaxed">
                  {activeLens.description}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {activeLens.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/90">
                      <span className="w-5 h-5 rounded-full bg-[#C59F63]/25 border border-[#DFBE88]/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#DFBE88]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metric & Direct Action Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-white/8 backdrop-blur-xl border border-white/15 p-7 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                    Evercrest Benchmark
                  </p>
                  <p className="mt-2 text-4xl sm:text-5xl font-extrabold text-[#DFBE88] tabular-nums-crest">
                    {activeLens.metricValue}
                  </p>
                  <p className="mt-2 text-sm text-white/85 font-medium">
                    {activeLens.metricLabel}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      onActionClick(
                        activeLens.id === 'owners' || activeLens.id === 'developers'
                          ? 'market'
                          : 'acquire'
                      )
                    }
                    className="mt-7 w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white text-[#0C2236] hover:bg-[#DFBE88] font-bold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer"
                  >
                    <span>{activeLens.ctaLabel}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
