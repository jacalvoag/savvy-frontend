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
