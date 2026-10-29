import React, { useEffect, useState } from 'react'
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Clock,
} from 'lucide-react'
import { PropertyListing } from '../types/property'

interface ConsultationSectionProps {
  mode: 'acquire' | 'market'
  onModeChange: (mode: 'acquire' | 'market') => void
  shortlistedProperties: PropertyListing[]
  prefilledPropertyTitle?: string | null
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  mode,
  onModeChange,
  shortlistedProperties,
  prefilledPropertyTitle,
}) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [clientProfile, setClientProfile] = useState('Individual / Family')
  const [propertyInterest, setPropertyInterest] = useState('Houses & Villas')
  const [notes, setNotes] = useState('')
  const [submittedRef, setSubmittedRef] = useState<string | null>(null)

  useEffect(() => {
    if (prefilledPropertyTitle) {
      setNotes(
        `Requesting private dossier, valuation brief, and viewing availability for "${prefilledPropertyTitle}".`
      )
    }
  }, [prefilledPropertyTitle])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const randomCode = Math.floor(100000 + Math.random() * 900000)
    setSubmittedRef(`EC-${randomCode}`)
  }

  return (
    <section
      id="consultation"
      className="bg-[#F6F8FA] py-20 sm:py-28 border-t border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Advisory Contact & Concierge Overview */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2.5 mb-3">
              <span className="h-[1px] w-8 bg-[#C59F63]" />
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[#9A763E]">
                Private Advisory Desk
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0C2236] tracking-tight leading-[1.15]">
              Begin a Lasting{' '}
              <span className="font-serif-crest italic font-semibold text-[#9A763E]">
                Property Relationship
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#4C6278] leading-relaxed">
              Whether you are searching for a family residence, evaluating a commercial
              or land investment, or appointing Evercrest to market or co-develop your
              property, our advisors respond with tailored intelligence.
            </p>

            {/* Direct Channels */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/70">
                <div className="w-10 h-10 rounded-xl bg-[#0C2236] text-[#DFBE88] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#9A763E]">
                    Advisory Gallery
                  </p>
                  <p className="text-sm font-semibold text-[#0C2236] mt-0.5">
                    Evercrest Crestline House, Central Advisory Suite
                  </p>
                  <p className="text-xs text-[#64788C]">
                    Private appointments Monday – Saturday, 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/70">
                <div className="w-10 h-10 rounded-xl bg-[#0C2236] text-[#DFBE88] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#9A763E]">
                    Direct Mandate Desk
                  </p>
                  <p className="text-sm font-semibold text-[#0C2236] mt-0.5">
                    advisory@evercrestproperties.com
                  </p>
                  <p className="text-xs text-[#64788C]">
                    Dossiers & portfolio schedules dispatched within 4 business hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/70">
                <div className="w-10 h-10 rounded-xl bg-[#0C2236] text-[#DFBE88] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#9A763E]">
                    Client Concierge Line
                  </p>
                  <p className="text-sm font-semibold text-[#0C2236] mt-0.5">
                    +234 (0) 800 EVERCREST • +1 (212) 555-0194
                  </p>
                  <p className="text-xs text-[#64788C]">
                    Dedicated residential, commercial & diaspora investor desk
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Dual-Track Concierge Form */}
          <div className="lg:col-span-7 rounded-[32px] bg-white border border-slate-200/80 p-6 sm:p-10 shadow-property-card">
            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-[#F3F6F9] mb-7">
              <button
                type="button"
                onClick={() => {
                  onModeChange('acquire')
                  setSubmittedRef(null)
                }}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'acquire'
                    ? 'bg-[#0C2236] text-white shadow-sm'
                    : 'text-[#4C6278] hover:text-[#0C2236]'
                }`}
              >
                Acquire, Lease or Invest
              </button>
              <button
                type="button"
                onClick={() => {
                  onModeChange('market')
                  setSubmittedRef(null)
                }}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'market'
                    ? 'bg-[#0C2236] text-white shadow-sm'
                    : 'text-[#4C6278] hover:text-[#0C2236]'
                }`}
              >
                Market or Develop Property
              </button>
            </div>

            {submittedRef ? (
              <div className="py-10 px-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#9A763E]">
                  Mandate Reference {submittedRef}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[#0C2236]">
                  Thank You, {fullName || 'Valued Client'}
                </h3>
                <p className="mt-2.5 text-sm text-[#4C6278] max-w-md mx-auto leading-relaxed">
                  Your {mode === 'acquire' ? 'acquisition & advisory' : 'property marketing & development'}{' '}
                  brief has been routed to an Evercrest Senior Advisor. Expect your
                  tailored response at <strong>{email}</strong> shortly.
                </p>

                {shortlistedProperties.length > 0 && (
                  <div className="mt-5 inline-block px-4 py-2 rounded-full bg-[#F6F8FA] border border-slate-200 text-xs font-semibold text-[#0C2236]">
                    Included {shortlistedProperties.length} shortlisted{' '}
                    {shortlistedProperties.length === 1 ? 'property' : 'properties'} in
                    dossier request
                  </div>
                )}

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null)
                      setNotes('')
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#0C2236] text-white text-xs font-semibold hover:bg-[#163856] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {shortlistedProperties.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-[#0C2236]/4 border border-[#C59F63]/35 flex items-center justify-between gap-3">
                    <div className="text-xs text-[#0C2236]">
                      <span className="font-bold text-[#9A763E]">
                        Shortlist Attached ({shortlistedProperties.length}):{' '}
                      </span>
                      {shortlistedProperties.map((p) => p.title).join(', ')}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2236] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Alexandra Mensah"
                      className="w-full px-4 py-3 rounded-xl bg-[#F6F8FA] border border-slate-200 text-sm text-[#0C2236] focus:outline-none focus:border-[#0C2236] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0C2236] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#F6F8FA] border border-slate-200 text-sm text-[#0C2236] focus:outline-none focus:border-[#0C2236] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0C2236] mb-1.5">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 / +44 / +1..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F6F8FA] border border-slate-200 text-sm text-[#0C2236] focus:outline-none focus:border-[#0C2236] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2236] mb-1.5">
                      I Am Representing
                    </label>
                    <select
                      value={clientProfile}
                      onChange={(e) => setClientProfile(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#F6F8FA] border border-slate-200 text-sm text-[#0C2236] focus:outline-none focus:border-[#0C2236] focus:bg-white transition-colors"
                    >
                      <option>Individual / Family</option>
                      <option>Private Investor</option>
                      <option>Property Owner</option>
                      <option>Corporate / Tenant</option>
                      <option>Property Developer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0C2236] mb-1.5">
                      {mode === 'acquire' ? 'Primary Focus' : 'Asset Category'}
                    </label>
                    <select
                      value={propertyInterest}
                      onChange={(e) => setPropertyInterest(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#F6F8FA] border border-slate-200 text-sm text-[#0C2236] focus:outline-none focus:border-[#0C2236] focus:bg-white transition-colors"
                    >
                      <option>Houses & Villas</option>
                      <option>Luxury Apartments</option>
                      <option>Commercial Spaces</option>
                      <option>Titled Land & Plots</option>
                      <option>Joint-Venture Development</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0C2236] mb-1.5">
                    {mode === 'acquire'
                      ? 'Your Property Requirements & Timeline'
                      : 'Property Location, Title Status & Objectives'}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      mode === 'acquire'
                        ? 'Tell us your preferred locations, budget parameters, yield goals, or move-in horizon...'
                        : 'Share brief details about your residential, commercial, or land asset for confidential valuation and marketing review...'
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F6F8FA] border border-slate-200 text-sm text-[#0C2236] focus:outline-none focus:border-[#0C2236] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-[11.5px] text-[#64788C]">
                    <span className="inline-flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-[#C59F63]" />
                      Strict Confidentiality
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#C59F63]" />
                      4-Hr Advisor Response
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0C2236] hover:bg-[#163856] text-white text-sm font-semibold shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#DFBE88]" />
                    <span>
                      {mode === 'acquire'
                        ? 'Request Tailored Briefing'
                        : 'Submit Property Mandate'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
