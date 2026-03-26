  'use client'

  import { useEffect, useState } from 'react'
  import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts'
  import { useMetrics } from '@/hooks/useMetrics'
  import { useMovements } from '@/hooks/useMovements'
  import Button from '@/components/ui/Button'
  import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import { Skeleton } from '@/components/ui/Skeleton'
import type { Period, MovementCategory } from '@/types'

// ─── Category Config ──────────────────────────────────────────────────────────

const CATEGORY_CONFIG: Record<MovementCategory, { icon: string; color: string; bg: string }> = {
  salary:       { icon: '💼', color: 'text-green-400',  bg: 'bg-green-400/10' },
  groceries:    { icon: '🛒', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  transport:    { icon: '🚌', color: 'text-blue-400',   bg: 'bg-blue-400/10' },
  entertainment:{ icon: '🎮', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  savings:      { icon: '💾', color: 'text-lime-400',   bg: 'bg-lime-400/10' },
  dividends:    { icon: '📊', color: 'text-cyan-400',   bg: 'bg-cyan-400/10' },
  subscription: { icon: '📱', color: 'text-pink-400',   bg: 'bg-pink-400/10' },
  food:         { icon: '🍕', color: 'text-red-400',    bg: 'bg-red-400/10' },
    other:        { icon: '❓', color: 'text-gray-400',   bg: 'bg-gray-400/10' },
  }

  const CATEGORIES: MovementCategory[] = [
    'salary','groceries','transport','entertainment','savings','dividends','subscription','food','other'
  ]

  const PERIODS: Period[] = ['1D', '1W', '1M', '1Y']

  // ─── Tooltip ─────────────────────────────────────────────────────────────────

  interface TooltipProps {
    active?: boolean
    payload?: Array<{ value: number }>
    label?: string
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl px-3 py-2 shadow-xl">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-semibold text-lime-400">${payload[0].value.toLocaleString()}</p>
    </div>
  )
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
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

        : portfolio.total * (portfolio.rates?.MXN ?? 1)
      : 0

    const handleCreateMovement = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!movAmount || isNaN(Number(movAmount))) {
        setMovError('Ingresa un monto válido.')
        return
      }
      setMovLoading(true)
      setMovError(null)
      try {
        await createMovement({
          monto: parseFloat(movAmount),
          tipo: movementModal === 'income' ? 'ingreso' : 'egreso',
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
      setMovCategory('other')
      setMovDesc('')
      setMovDate(new Date().toISOString().split('T')[0])
      setMovError(null)
    }

    const formatDate = (iso: string) =>
      new Date(iso).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })

    const recentMovements = movements.slice(0, 8)

    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-5">
        {/* ── Row 1: Portfolio + Performance ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {portfolioLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-5 w-1/3" />
              </div>
            ) : (
              <>
                <div>
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
            <p className="text-sm text-gray-400 font-medium">Performance</p>
            <div className="flex gap-1">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  id={`period-${p.toLowerCase()}`}
                  onClick={() => handlePeriodChange(p)}
                  className={[
                    'px-3 py-1 rounded-lg text-xs font-medium transition-all',
                    period === p
                      ? 'bg-lime-400/10 text-lime-400'
                      : 'text-gray-500 hover:text-gray-300',
                  ].join(' ')}
                >
                  {p}
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
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="label"
                      tick={{ fill: '#6b7280', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#a3e635"
                      strokeWidth={2}
                      fill="url(#limeGradient)"
                      dot={false}
                      activeDot={{ r: 4, fill: '#a3e635', strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center">
                <p className="text-gray-500 text-sm">No performance data for this period</p>
              </div>
            )}
          </div>
        </div>

      {/* ── Row 2: Recent Movements + Smart Insight ───────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Movements */}
        <div className="lg:col-span-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Recent Movements</h2>
            <div className="flex gap-2">
              <Button
                id="add-income-btn"
                variant="secondary"
                size="sm"
                onClick={() => { setMovementModal('income'); resetMovForm() }}
              >
                + Income
              </Button>
                <Button
                  id="add-expense-btn"
                  variant="ghost"
                  size="sm"
                  onClick={() => { setMovementModal('expense'); resetMovForm() }}
                >
                  + Expense
                </Button>
              </div>
            </div>

            <div className="flex flex-col divide-y divide-[#222]">
              {recentMovements.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 text-center">No movements yet</p>
              ) : (
                          m.tipo === 'ingreso' ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {m.tipo === 'ingreso' ? '+' : '-'}${m.monto.toLocaleString()}
                      </p>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Smart Insight */}
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4 glow-lime relative overflow-hidden">
            {/* Subtle glow backdrop */}
          ) : insight ? (
            <>
              <p className="text-sm text-gray-300 leading-relaxed">{insight.mensaje}</p>
              <div className="bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 space-y-1">
                <p className="text-xs text-gray-500">Closest goal</p>
                <p className="text-sm text-white font-medium">{insight.metaNombre}</p>
                <p className="text-xs text-lime-400">{insight.mesesRestantes} months remaining</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">No insights available</p>
          )}
        </div>
      </div>

        {/* ── Create Movement Modal ─────────────────────────────── */}
        <Modal
          isOpen={movementModal !== null}
          onClose={() => setMovementModal(null)}
          title={movementModal === 'income' ? 'Add Income' : 'Add Expense'}
        >
          <form onSubmit={handleCreateMovement} className="flex flex-col gap-4">
            <Input
              id="mov-amount"
              label="Amount"
              type="number"
              placeholder="0.00"
              value={movAmount}
              onChange={(e) => setMovAmount(e.target.value)}
              required
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
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="mov-desc" className="text-sm font-medium text-gray-300">
              Description <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              id="mov-desc"
              value={movDesc}
              onChange={(e) => setMovDesc(e.target.value)}
              placeholder="What was this for?"
              rows={2}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400 resize-none placeholder-gray-600"
            />
          </div>

          <Input
            id="mov-date"
            label="Date"
            type="date"
            value={movDate}
            onChange={(e) => setMovDate(e.target.value)}
            required
          />

          {movError && <p className="text-red-400 text-xs">{movError}</p>}

              >
                Save
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    )
  }

