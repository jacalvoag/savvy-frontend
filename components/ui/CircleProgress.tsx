'use client'

import { useEffect, useRef } from 'react'

interface CircleProgressProps {
  value: number // 0-100
  size?: number // px
  strokeWidth?: number
}

export default function CircleProgress({
  value,
  size = 80,
  strokeWidth = 7,
}: CircleProgressProps) {
    const clamped = Math.min(100, Math.max(0, value))
    const radius = (size - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (clamped / 100) * circumference

    const circleRef = useRef<SVGCircleElement>(null)

    useEffect(() => {
      // Animate from 0 to target on mount
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = String(circumference)
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (circleRef.current) {
              circleRef.current.style.transition = 'stroke-dashoffset 1s ease-out'
            circleRef.current.style.strokeDashoffset = String(offset)
          }
        })
      })
    }
  }, [circumference, offset])

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#a3e635"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>
        {/* Center label */}
        <span
          className="absolute text-white font-bold"
          style={{ fontSize: size * 0.18 }}
        >
          {Math.round(clamped)}%
        </span>
      </div>
    )
  }

