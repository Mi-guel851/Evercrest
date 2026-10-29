import React, { useState } from 'react'
import { CheckCircle2, FileCheck2, Compass, KeyRound, ArrowRight } from 'lucide-react'
import { BrandLogo } from './BrandLogo'

interface MethodSectionProps {
  onConsultClick: () => void
}

const METHOD_STEPS = [
  {
    number: '01',
    title: 'Find with Precision',
    subtitle: 'Residential, Commercial, Land & Off-Market Discovery',
    icon: Compass,
    description:
      'Instead of overwhelming you with unverified listings, we begin with your objective—family living, corporate expansion, rental yield, or land development—and curate only opportunities that match your brief.',
    checks: [
      'Bespoke residential, commercial & titled land sourcing',
      'Corridor infrastructure & neighborhood growth intelligence',
      'Access to private mandates before public release',
    ],
  },
  {
    number: '02',
    title: 'Evaluate with Clarity',
    subtitle: 'Independent Due Diligence, Valuation & Yield Modeling',
    icon: FileCheck2,
    description:
      'Every Evercrest property undergoes multi-point verification so you understand true market value, legal root of title, zoning compliance, and realistic financial performance before committing.',
    checks: [
      'Registry title search, survey & encumbrance verification',
      'Comparative market valuation & cap-rate / IRR analysis',
      'Physical, structural & development feasibility review',
    ],
  },
  {
    number: '03',
    title: 'Secure Lasting Legacy',
    subtitle: 'Structured Negotiation, Closing & Ongoing Asset Support',
    icon: KeyRound,
    description:
      'Because property is more than a transaction, we guide contract structuring, milestone escrow protection, handover, tenant placement, and long-term portfolio growth.',
    checks: [
      'Transparent offer structuring & legal documentation support',
      'Seamless possession handover, leasing & property marketing',
      'Long-term advisory for portfolio expansion & redevelopment',
    ],
  },
]

export const MethodSection: React.FC<MethodSectionProps> = ({ onConsultClick }) => {
  const [activeStep, setActiveStep] = useState(0)
  const step = METHOD_STEPS[activeStep]

  return (
    <section
      id="method"
      className="relative bg-[#F6F8FA] py-20 sm:py-28 border-t border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Photography + Overlapping Frosted Glass Evercrest Crest Tile (Direct Homage to Reference Image 1 Bottom Section) */}
          <div className="lg:col-span-5 relative pt-5 pr-4 sm:pr-7">
            <div className="relative rounded-[32px] overflow-hidden shadow-[0_28px_65px_-15px_rgba(12,34,54,0.22)] aspect-[4/4.5] bg-[#0C2236]">
              <img
                src="/images/editorial-legacy.jpg"
                alt="Contemporary Architectural Roofline at Twilight"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(12,34,54,0.08) 0%, rgba(12,34,54,0.72) 100%)',
                }}
              />

              {/* Bottom Caption Card Inside Frame */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[#0C2236]/80 backdrop-blur-xl border border-white/15 p-4 text-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#DFBE88]">
                      Evercrest Verification Standard
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Every Mandate Screened Across 18 Due-Diligence Checkpoints
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#C59F63]/20 border border-[#DFBE88]/40 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-5 h-5 text-[#DFBE88]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Overlapping Frosted-Glass Badge on Top-Right Corner (Inspired Directly by Reference Image 1's Floating Glass House Tile) */}
            <div className="glass-badge-crest absolute top-0 right-0 sm:right-1 w-24 h-24 sm:w-28 sm:h-28 rounded-[26px] flex items-center justify-center p-4 z-20">
              <BrandLogo variant="crest" tone="light" className="w-16 h-16 drop-shadow-md" />
            </div>
          </div>

          {/* Right Column: Editorial Headline + Interactive 3-Pillar Method */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 mb-3.5">
              <span className="h-[1px] w-8 bg-[#C59F63]" />
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#9A763E]">
                The Evercrest Method
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0C2236] leading-[1.15] tracking-tight">
              The Most Informed Way{' '}
              <span className="block">
                To Find, Evaluate &{' '}
                <span className="font-serif-crest italic font-semibold text-[#9A763E]">
                  Secure Property
                </span>
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#4C6278] leading-relaxed max-w-2xl">
              From houses and apartments to commercial spaces, titled land, and
              development ventures, Evercrest replaces uncertainty with structured
              intelligence—making every step straightforward and transparent.
            </p>

            {/* Step Selector Pills */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {METHOD_STEPS.map((item, idx) => {
                const active = activeStep === idx
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-[#0C2236] text-white border-[#0C2236] shadow-[0_14px_32px_-10px_rgba(12,34,54,0.38)]'
                        : 'bg-white text-[#0C2236] border-slate-200/80 hover:border-[#C59F63]/60'
                    }`}
                  >
                    <span
                      className={`text-xs font-bold tracking-widest ${
                        active ? 'text-[#DFBE88]' : 'text-[#9A763E]'
                      }`}
                    >
                      STEP {item.number}
                    </span>
                    <p className="mt-1 text-sm font-bold leading-snug">{item.title}</p>
                  </button>
                )
              })}
            </div>

            {/* Active Step Detail Card */}
            <div className="mt-5 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-[0_14px_38px_-16px_rgba(12,34,54,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#9A763E]">
                    {step.subtitle}
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-[#0C2236]">
                    {step.number}. {step.title}
                  </h3>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#0C2236]/6 flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-[#0C2236]" />
                </div>
              </div>

              <p className="mt-3 text-sm text-[#4C6278] leading-relaxed">
                {step.description}
              </p>

              <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {step.checks.map((check) => (
                  <div key={check} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C59F63] shrink-0 mt-0.5" />
                    <span className="text-xs font-medium text-[#0C2236]/85 leading-snug">
                      {check}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={onConsultClick}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0C2236] hover:bg-[#163856] text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Speak With an Advisor</span>
                <ArrowRight className="w-4 h-4 text-[#DFBE88]" />
              </button>
              <span className="text-xs sm:text-sm text-[#64788C]">
                Complimentary initial mandate & due-diligence consultation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
