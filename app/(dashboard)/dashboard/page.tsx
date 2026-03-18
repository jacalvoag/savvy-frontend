    const { portfolio, performance, insight, portfolioLoading, performanceLoading, insightLoading, fetchPortfolio, fetchPerformance, fetchInsight } = useMetrics()
    const { movements, fetchMovements, createMovement } = useMovements()

    const [period, setPeriod] = useState<Period>('1M')
    const [currency, setCurrency] = useState<'USD' | 'MXN'>('USD')

    // Create movement modal state
    const [movementModal, setMovementModal] = useState<'income' | 'expense' | null>(null)
    const [movAmount, setMovAmount] = useState('')
    const [movCategory, setMovCategory] = useState<MovementCategory>('other')
    const [movDesc, setMovDesc] = useState('')
    const [movDate, setMovDate] = useState(() => new Date().toISOString().split('T')[0])
    const [movLoading, setMovLoading] = useState(false)
    const [movError, setMovError] = useState<string | null>(null)

        categoria: movCategory,
        descripcion: movDesc || undefined,
        fecha: movDate,
      })
      setMovementModal(null)
      resetMovForm()
    } catch {
      setMovError('Error al guardar el movimiento.')
    } finally {
      setMovLoading(false)
    }
  }

  const resetMovForm = () => {
    setMovAmount('')
                  <p className="text-4xl font-bold text-white">
                    {currency === 'MXN' ? 'MX$' : '$'}
                    {totalDisplay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                {portfolio && (
                  <div
                    className={[
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit',
                      portfolio.variacion >= 0
                        ? 'bg-green-400/10 text-green-400'
                        : 'bg-red-400/10 text-red-400',
                    ].join(' ')}
                  >
                    {portfolio.variacion >= 0 ? '↑' : '↓'}
                  {Math.abs(portfolio.variacion).toFixed(1)}% vs last month
                </div>
              )}
            </>
          )}

          {/* Mini donut or info */}
          <div className="mt-auto pt-2 border-t border-[#2a2a2a]">
            <p className="text-xs text-gray-500">Updated just now</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
                </button>
              ))}
            </div>
          </div>

          {performanceLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : performance.length > 0 ? (
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performance} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="limeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a3e635" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#a3e635" stopOpacity={0} />
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="mov-category" className="text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                id="mov-category"
                value={movCategory}
                onChange={(e) => setMovCategory(e.target.value as MovementCategory)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1c1c1c]">
                    {CATEGORY_CONFIG[c].icon} {c.charAt(0).toUpperCase() + c.slice(1)}
