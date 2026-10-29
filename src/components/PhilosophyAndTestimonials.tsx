import React from 'react'
import { Quote } from 'lucide-react'
import { BrandLogo } from './BrandLogo'

const RELATIONSHIP_STORIES = [
  {
    quote:
      'Evercrest transformed what could have been an overwhelming search into a calm, transparent journey. Every title document, structural detail, and neighborhood comparison was verified before we stepped through the door.',
    author: 'Dr. & Mrs. Adeyemi',
    role: 'Residential Villa Acquisition • Family Clients',
    pillar: 'Buyer Assistance',
  },
  {
    quote:
      'When expanding our regional headquarters, Evercrest structured a lease-to-own commercial suite arrangement that protected our operational cash flow while securing long-term equity in a prime business corridor.',
    author: 'K. Okafor, Managing Partner',
    role: 'Meridian Financial District • Corporate Mandate',
    pillar: 'Commercial Advisory',
  },
  {
    quote:
      'From joint-venture land alignment to off-plan buyer positioning, Evercrest thinks like true long-term partners. Their market intelligence shaped our unit mix and accelerated pre-completion uptake.',
    author: 'Vanguard Urban Developments',
    role: 'Mixed-Use Waterfront Precinct • Developer Partner',
    pillar: 'Development & Marketing',
  },
]

export const PhilosophyAndTestimonials: React.FC = () => {
  return (
    <section id="philosophy" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Monumental Philosophy Banner */}
        <div className="relative rounded-[36px] overflow-hidden bg-[#091D30] text-white px-6 py-16 sm:px-14 sm:py-20 lg:px-20 text-center shadow-[0_30px_70px_-18px_rgba(12,34,54,0.38)]">
          <img
            src="/images/prop-apex-development.jpg"
            alt="Evercrest Architectural Vision"
            className="absolute inset-0 w-full h-full object-cover opacity-22"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, rgba(12,34,54,0.78) 0%, rgba(8,24,40,0.96) 100%)',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Official Full Evercrest Lockup */}
            <BrandLogo
              variant="full"
              tone="light"
              className="h-32 sm:h-40 w-auto mb-8 drop-shadow-lg"
            />

            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#DFBE88]">
              Our Guiding Philosophy
            </span>

            <blockquote className="mt-5 font-serif-crest text-2xl sm:text-4xl lg:text-[44px] font-medium leading-[1.24] text-white">
              “Property is more than a transaction; it is an opportunity to build{' '}
              <span className="italic text-[#EAD0A3]">security</span>, create{' '}
              <span className="italic text-[#EAD0A3]">value</span>, and establish a{' '}
              <span className="italic text-[#EAD0A3]">lasting legacy</span>.”
            </blockquote>

            <p className="mt-6 text-sm sm:text-base text-white/75 leading-relaxed max-w-2xl">
              Dedicated to connecting individuals, families, property owners,
              investors, and developers with residential, commercial, land, and
              development opportunities that stand the test of time.
            </p>
          </div>
        </div>

        {/* Relationship Stories Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-7">
          {RELATIONSHIP_STORIES.map((story) => (
            <div
              key={story.author}
              className="rounded-[26px] bg-[#F6F8FA] border border-slate-200/70 p-7 flex flex-col justify-between hover:border-[#C59F63]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <Quote className="w-6 h-6 text-[#C59F63]" />
                  <span className="px-3 py-1 rounded-full bg-white text-[10.5px] font-bold uppercase tracking-wider text-[#0C2236] border border-slate-200/70">
                    {story.pillar}
                  </span>
                </div>
                <p className="text-sm text-[#334A60] leading-relaxed">
                  “{story.quote}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <p className="text-sm font-bold text-[#0C2236]">{story.author}</p>
                <p className="text-xs text-[#64788C] mt-0.5">{story.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
