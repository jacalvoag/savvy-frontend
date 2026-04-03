'use client'

interface ProgressBarProps {
  value: number // 0-100
  showLabel?: boolean
  height?: string
}

export default function ProgressBar({
  value,
  showLabel = false,
  height = 'h-2',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="w-full flex items-center gap-3">
      <div className={`flex-1 bg-[#2a2a2a] rounded-full overflow-hidden ${height}`}>
        <div
          className="h-full bg-lime-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-gray-400 shrink-0 w-9 text-right">{clamped}%</span>
      )}
    </div>
  )
}

