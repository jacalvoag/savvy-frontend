  'use client'

  interface SkeletonProps {
    className?: string
    count?: number
  }

  export function Skeleton({ className = '' }: SkeletonProps) {
    return (
      <div
        className={`animate-pulse bg-[#2a2a2a] rounded-xl ${className}`}
        aria-hidden="true"
      />
    )
  }

export function SkeletonCard() {
  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 flex flex-col gap-4">
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[#2a2a2a]">
      <Skeleton className="w-9 h-9 rounded-full" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-2.5 w-1/3" />
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
  )
}

