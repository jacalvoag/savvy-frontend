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
  }

