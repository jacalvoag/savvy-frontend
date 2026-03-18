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

