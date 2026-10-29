import React, { useMemo, useState } from 'react'
import { Calculator, TrendingUp, Landmark, ArrowRight } from 'lucide-react'
import { CurrencyCode } from '../types/property'
import { formatPropertyPrice } from '../data/properties'

interface LegacyCalculatorProps {
  currency: CurrencyCode
  onRequestBriefing: () => void
}

const ASSET_PROFILES = [
  {
    id: 'residential',
    label: 'Houses & Villas',
    annualAppreciation: 0.076,
    netRentalYield: 0.075,
    note: 'Balanced family security, steady diplomatic/executive rental demand & resilient land value.',
  },
  {
    id: 'apartments',
    label: 'Luxury Apartments',
    annualAppreciation: 0.068,
    netRentalYield: 0.092,
    note: 'High occupancy turnkey cash flow in prime urban & waterfront corridors.',
  },
  {
    id: 'commercial',
    label: 'Commercial Spaces',
    annualAppreciation: 0.082,
    netRentalYield: 0.11,
    note: 'Multi-year corporate lease covenants with strong inflation-hedged escalations.',
  },
  {
    id: 'land',
    label: 'Land & Development',
    annualAppreciation: 0.135,
    netRentalYield: 0.0,
    note: 'Maximum capital compounding along infrastructure & master-planned expansion corridors.',
  },
]

export const LegacyCalculator: React.FC<LegacyCalculatorProps> = ({
  currency,
  onRequestBriefing,
}) => {
  const [profileId, setProfileId] = useState('residential')
  const [acquisitionUSD, setAcquisitionUSD] = useState(750_000)
  const [horizonYears, setHorizonYears] = useState(10)

  const profile =
    ASSET_PROFILES.find((p) => p.id === profileId) || ASSET_PROFILES[0]

  const metrics = useMemo(() => {
    const projectedAssetValue = Math.round(
      acquisitionUSD * Math.pow(1 + profile.annualAppreciation, horizonYears)
    )
    // Cumulative rental income assuming modest 3% annual rent growth on initial basis
    let cumulativeIncome = 0
    if (profile.netRentalYield > 0) {
      for (let y = 0; y < horizonYears; y++) {
        cumulativeIncome +=
          acquisitionUSD * profile.netRentalYield * Math.pow(1.035, y)
      }
    }
    cumulativeIncome = Math.round(cumulativeIncome)
    const totalLegacyValue = projectedAssetValue + cumulativeIncome
    const netValueCreated = totalLegacyValue - acquisitionUSD
    const wealthMultiple = (totalLegacyValue / acquisitionUSD).toFixed(2)

    return {
      projectedAssetValue,
      cumulativeIncome,
      totalLegacyValue,
      netValueCreated,
      wealthMultiple,
    }
  }, [acquisitionUSD, horizonYears, profile])

  const capitalSharePct = Math.round(
    (metrics.projectedAssetValue / metrics.totalLegacyValue) * 100
  )

  return (
    <section
      id="evaluator"
      className="bg-[#F6F8FA] py-20 sm:py-28 border-t border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Interactive Controls Panel */}
          <div className="lg:col-span-7 rounded-[32px] bg-[#0C2236] text-white p-7 sm:p-10 shadow-[0_26px_65px_-16px_rgba(12,34,54,0.3)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-[#DFBE88] text-[11px] font-semibold tracking-[0.26em] uppercase">
                <Calculator className="w-4 h-4" />
                <span>Informed Evaluation Studio</span>
              </div>

              <h2 className="mt-2.5 text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight leading-snug">
                Legacy Value & Yield Modeler
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                Evaluate how different property classes compound security, rental cash
                flow, and generational equity over time.
              </p>

              {/* Asset Class Selector */}
              <div className="mt-7">
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2.5">
                  1. Select Property Pillar
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ASSET_PROFILES.map((item) => {
                    const active = item.id === profileId
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setProfileId(item.id)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          active
                            ? 'bg-[#C59F63] text-[#0C2236] shadow-md'
                            : 'bg-white/8 text-white/80 hover:bg-white/15'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
                <p className="mt-2.5 text-xs text-[#DFBE88]/90 italic">
                  {profile.note}
                </p>
              </div>

              {/* Acquisition Capital Slider */}
              <div className="mt-7">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="capital-slider"
                    className="text-xs font-semibold uppercase tracking-wider text-white/70"
                  >
                    2. Initial Property Value
                  </label>
                  <span className="text-lg sm:text-xl font-extrabold text-white tabular-nums-crest">
                    {formatPropertyPrice(acquisitionUSD, currency)}
                  </span>
                </div>
                <input
                  id="capital-slider"
                  type="range"
                  min={200_000}
                  max={5_000_000}
                  step={50_000}
                  value={acquisitionUSD}
                  onChange={(e) => setAcquisitionUSD(Number(e.target.value))}
                  className="w-full crest-slider"
                />
                <div className="mt-1.5 flex justify-between text-[11px] text-white/50 tabular-nums-crest">
                  <span>{formatPropertyPrice(200_000, currency, true)}</span>
                  <span>{formatPropertyPrice(2_500_000, currency, true)}</span>
                  <span>{formatPropertyPrice(5_000_000, currency, true)}</span>
                </div>
              </div>

              {/* Holding Horizon Selector */}
              <div className="mt-7">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label
                    htmlFor="horizon-slider"
                    className="text-xs font-semibold uppercase tracking-wider text-white/70"
                  >
                    3. Legacy Holding Horizon
                  </label>
                  <span className="text-lg sm:text-xl font-extrabold text-[#DFBE88] tabular-nums-crest">
                    {horizonYears} Years
                  </span>
                </div>
                <input
                  id="horizon-slider"
                  type="range"
                  min={3}
                  max={20}
                  step={1}
                  value={horizonYears}
                  onChange={(e) => setHorizonYears(Number(e.target.value))}
                  className="w-full crest-slider"
                />
                <div className="mt-1.5 flex justify-between text-[11px] text-white/50">
                  <span>3 Yrs (Medium)</span>
                  <span>10 Yrs (Cycle)</span>
                  <span>20 Yrs (Generational)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/12 flex flex-wrap items-center justify-between gap-3 text-xs text-white/65">
              <span>
                Est. Appreciation:{' '}
                <strong className="text-white">
                  {(profile.annualAppreciation * 100).toFixed(1)}% / yr
                </strong>
              </span>
              <span>
                Est. Net Yield:{' '}
                <strong className="text-white">
                  {profile.netRentalYield > 0
                    ? `${(profile.netRentalYield * 100).toFixed(1)}% / yr`
                    : 'Pure Capital Appreciation'}
                </strong>
              </span>
            </div>
          </div>

          {/* Right Live Output Scorecard */}
          <div className="lg:col-span-5 rounded-[32px] bg-white border border-slate-200/80 p-7 sm:p-10 shadow-property-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#9A763E]">
                  Projected {horizonYears}-Year Outcome
                </span>
                <span className="px-3 py-1 rounded-full bg-[#0C2236]/6 text-[#0C2236] text-xs font-extrabold tabular-nums-crest">
                  {metrics.wealthMultiple}x Multiple
                </span>
              </div>

              {/* Total Legacy Position */}
              <div className="mt-5">
                <p className="text-xs text-[#64788C] font-medium">
                  Estimated Total Legacy Position (Asset + Cumulative Yield)
                </p>
                <p className="mt-1.5 text-3xl sm:text-4xl font-extrabold text-[#0C2236] tabular-nums-crest tracking-tight">
                  {formatPropertyPrice(metrics.totalLegacyValue, currency)}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>
                    +{formatPropertyPrice(metrics.netValueCreated, currency)} Net Value
                    Created
                  </span>
                </p>
              </div>

              {/* Visual Bar Split */}
              <div className="mt-7">
                <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex">
                  <div
                    className="bg-[#0C2236] transition-all duration-300"
                    style={{ width: `${capitalSharePct}%` }}
                  />
                  <div
                    className="bg-[#C59F63] transition-all duration-300"
                    style={{ width: `${100 - capitalSharePct}%` }}
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-semibold text-[#4C6278]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0C2236]" />
                    Asset Value ({capitalSharePct}%)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C59F63]" />
                    Rental Cash Flow ({100 - capitalSharePct}%)
                  </span>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="mt-6 space-y-3 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64788C]">Projected Property Valuation</span>
                  <span className="font-bold text-[#0C2236] tabular-nums-crest">
                    {formatPropertyPrice(metrics.projectedAssetValue, currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64788C]">Cumulative Net Rental Income</span>
                  <span className="font-bold text-[#9A763E] tabular-nums-crest">
                    {metrics.cumulativeIncome > 0
                      ? formatPropertyPrice(metrics.cumulativeIncome, currency)
                      : 'Land Appreciation Strategy'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64788C]">Initial Capital Deployed</span>
                  <span className="font-medium text-[#4C6278] tabular-nums-crest">
                    {formatPropertyPrice(acquisitionUSD, currency)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100">
              <button
                type="button"
                onClick={onRequestBriefing}
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-[#0C2236] hover:bg-[#163856] text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <Landmark className="w-4 h-4 text-[#DFBE88]" />
                <span>Request Custom Investment Schedule</span>
                <ArrowRight className="w-4 h-4 text-[#DFBE88]" />
              </button>
              <p className="mt-2.5 text-[11px] text-center text-[#64788C]">
                Illustrative corridor benchmarks. Evercrest prepares asset-specific
                cash-flow schedules for every mandate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
