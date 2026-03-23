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

