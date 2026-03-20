  'use client'

  import Image from 'next/image'

  type AvatarSize = 'sm' | 'md' | 'lg'

  interface AvatarProps {
    src?: string | null
    nombre: string
    size?: AvatarSize
  }

  const sizePx: Record<AvatarSize, number> = { sm: 28, md: 36, lg: 48 }
  const sizeClass: Record<AvatarSize, string> = {
    sm: 'w-7 h-7 text-xs',
  const cls = sizeClass[size]

  if (src) {
    return (
      <div className={`${cls} rounded-full overflow-hidden shrink-0`}>
        <Image src={src} alt={nombre} width={px} height={px} className="object-cover w-full h-full" />
      </div>
    )
  }

  return (
    <div
      className={`${cls} rounded-full bg-lime-400 text-black font-bold flex items-center justify-center shrink-0 select-none`}
      aria-label={nombre}
    >
