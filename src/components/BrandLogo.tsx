import React from 'react'

interface BrandLogoProps {
  variant?: 'horizontal' | 'full' | 'crest'
  tone?: 'light' | 'dark' | 'gold'
  className?: string
  showTagline?: boolean
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  tone = 'light',
  className = '',
  showTagline = false,
}) => {
  if (variant === 'crest') {
    const crestSrc =
      tone === 'gold'
        ? '/brand/evercrest-crest-gold.png'
        : tone === 'dark'
          ? '/brand/evercrest-crest-dark.png'
          : '/brand/evercrest-crest-light.png'

    return (
      <img
        src={crestSrc}
        alt="Evercrest Properties Crest"
        className={`object-contain select-none ${className}`}
      />
    )
  }

  if (variant === 'full') {
    const lockupSrc =
      tone === 'dark'
        ? '/brand/evercrest-lockup-dark.png'
        : '/brand/evercrest-lockup-light.png'

    return (
      <img
        src={lockupSrc}
        alt="Evercrest Properties — Where Legacies Rise"
        className={`object-contain select-none ${className}`}
      />
    )
  }

  // Horizontal precision lockup using the official Evercrest crest + official serif wordmark
  const crestSrc =
    tone === 'dark'
      ? '/brand/evercrest-crest-dark.png'
      : '/brand/evercrest-crest-light.png'
  const wordmarkSrc =
    tone === 'dark'
      ? '/brand/evercrest-wordmark-dark.png'
      : '/brand/evercrest-wordmark-light.png'

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src={crestSrc}
        alt="Evercrest Crest"
        className="h-9 w-auto sm:h-10 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col justify-center">
        <img
          src={wordmarkSrc}
          alt="Evercrest"
          className="h-4 sm:h-[19px] w-auto object-contain object-left"
        />
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`h-[1px] w-3.5 ${
              tone === 'dark' ? 'bg-[#C59F63]' : 'bg-[#DFBE88]/85'
            }`}
          />
          <span
            className={`text-[9px] sm:text-[9.5px] font-semibold tracking-[0.32em] uppercase leading-none ${
              tone === 'dark' ? 'text-[#9A763E]' : 'text-[#DFBE88]'
            }`}
          >
            Properties
          </span>
          <span
            className={`h-[1px] w-3.5 ${
              tone === 'dark' ? 'bg-[#C59F63]' : 'bg-[#DFBE88]/85'
            }`}
          />
        </div>
        {showTagline && (
          <span
            className={`text-[8px] tracking-[0.26em] uppercase mt-1 ${
              tone === 'dark' ? 'text-[#4C6278]' : 'text-white/70'
            }`}
          >
            Where Legacies Rise.
          </span>
        )}
      </div>
    </div>
  )
}
