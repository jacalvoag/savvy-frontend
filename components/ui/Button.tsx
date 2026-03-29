  'use client'

  import React from 'react'

  type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
  type Size = 'sm' | 'md' | 'lg'

  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    size?: Size
    loading?: boolean
    children: React.ReactNode
  }

  const variantClasses: Record<Variant, string> = {
  primary:
    'bg-lime-400 text-black font-semibold hover:bg-lime-300 active:bg-lime-500 disabled:bg-lime-400/50',
  secondary:
    'bg-[#222222] text-white hover:bg-[#2a2a2a] active:bg-[#333] border border-[#2a2a2a] disabled:opacity-50',
  ghost:
    'bg-transparent text-white border border-[#2a2a2a] hover:bg-white/5 active:bg-white/10 disabled:opacity-40',
  danger:
    'bg-red-900/80 text-white font-semibold hover:bg-red-700 active:bg-red-800 border border-red-800 disabled:opacity-50',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer select-none',
          variantClasses[variant],
          sizeClasses[size],
          isDisabled ? 'cursor-not-allowed' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }

