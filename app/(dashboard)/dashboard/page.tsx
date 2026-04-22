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
  salary:       { icon: '', color: 'text-green-400',  bg: 'bg-green-400/10' },
  groceries:    { icon: '', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  transport:    { icon: '', color: 'text-blue-400',   bg: 'bg-blue-400/10' },
  entertainment:{ icon: '', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  savings:      { icon: '', color: 'text-lime-400',   bg: 'bg-lime-400/10' },
  dividends:    { icon: '', color: 'text-cyan-400',   bg: 'bg-cyan-400/10' },
  subscription: { icon: '', color: 'text-pink-400',   bg: 'bg-pink-400/10' },
  food:         { icon: '', color: 'text-red-400',    bg: 'bg-red-400/10' },
  other:        { icon: '', color: 'text-gray-400',   bg: 'bg-gray-400/10' },
}

const CATEGORY_LABELS: Record<MovementCategory, string> = {
  salary: 'Salario',
  groceries: 'Supermercado',
  transport: 'Transporte',
  entertainment: 'Entretenimiento',
  savings: 'Ahorro',
  dividends: 'Dividendos',
  subscription: 'Suscripción',
  food: 'Comida',
  other: 'Otro',
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

  useEffect(() => {
    fetchPortfolio()
    fetchPerformance('1M')
    fetchInsight()
    fetchMovements()
  }, [fetchPortfolio, fetchPerformance, fetchInsight, fetchMovements])

  const handlePeriodChange = (p: Period) => {
    setPeriod(p)
    fetchPerformance(p)
  }

  const totalDisplay = portfolio
    ? currency === 'USD'
      ? portfolio.total
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
      {/* ── Fila 1: Portfolio + Rendimiento ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Tarjeta Portfolio */}
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400 font-medium">Portfolio Total</p>
            {/* Currency toggle */}
            <div className="flex bg-[#111] border border-[#2a2a2a] rounded-lg p-0.5 text-xs">
              {(['USD', 'MXN'] as const).map((c) => (
                <button
                  key={c}
                  id={`currency-${c.toLowerCase()}`}
                  onClick={() => setCurrency(c)}
                  className={[
                    'px-2.5 py-1 rounded-md font-medium transition-all',
                    currency === c ? 'bg-lime-400 text-black' : 'text-gray-400 hover:text-white',
                  ].join(' ')}
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
                  {Math.abs(portfolio.variacion).toFixed(1)}% vs mes anterior
                </div>
              )}
            </>
          )}

          <div className="mt-auto pt-2 border-t border-[#2a2a2a]">
            <p className="text-xs text-gray-500">Actualizado ahora mismo</p>
          </div>
        </div>

        {/* Gráfico de Rendimiento */}
        <div className="lg:col-span-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm text-gray-400 font-medium">Rendimiento</p>
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
              <p className="text-gray-500 text-sm">Sin datos de rendimiento para este periodo</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Fila 2: Movimientos Recientes + Insight ───────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Movimientos Recientes */}
        <div className="lg:col-span-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Movimientos Recientes</h2>
            <div className="flex gap-2">
              <Button
                id="add-income-btn"
                variant="secondary"
                size="sm"
                onClick={() => { setMovementModal('income'); resetMovForm() }}
              >
                + Ingreso
              </Button>
              <Button
                id="add-expense-btn"
                variant="ghost"
                size="sm"
                onClick={() => { setMovementModal('expense'); resetMovForm() }}
              >
                + Egreso
              </Button>
            </div>
          </div>

          <div className="flex flex-col divide-y divide-[#222]">
            {recentMovements.length === 0 ? (
              <p className="text-gray-500 text-sm py-4 text-center">Aún no hay movimientos</p>
            ) : (
              recentMovements.map((m) => {
                const cfg = CATEGORY_CONFIG[m.categoria]
                return (
                  <div key={m.id} className="flex items-center gap-3 py-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${cfg.bg}`}>
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white capitalize">
                        {m.descripcion || CATEGORY_LABELS[m.categoria]}
                      </p>
                      <p className="text-xs text-gray-500">{formatDate(m.fecha)}</p>
                    </div>
                    <p
                      className={`text-sm font-semibold shrink-0 ${
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

        {/* Insight Inteligente */}
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col gap-4 glow-lime relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-lime-400/5 blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-lime-400/10 flex items-center justify-center text-lg">
              🚀
            </div>
            <p className="text-sm font-semibold text-lime-400">Insight Inteligente</p>
          </div>

          {insightLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          ) : insight ? (
            <>
              <p className="text-sm text-gray-300 leading-relaxed">{insight.mensaje}</p>
              <div className="bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-3 space-y-1">
                <p className="text-xs text-gray-500">Meta más cercana</p>
                <p className="text-sm text-white font-medium">{insight.metaNombre}</p>
                <p className="text-xs text-lime-400">{insight.mesesRestantes} meses restantes</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500">Sin insights disponibles</p>
          )}
        </div>
      </div>

      {/* ── Modal Crear Movimiento ─────────────────────────────── */}
      <Modal
        isOpen={movementModal !== null}
        onClose={() => setMovementModal(null)}
        title={movementModal === 'income' ? 'Agregar Ingreso' : 'Agregar Egreso'}
      >
        <form onSubmit={handleCreateMovement} className="flex flex-col gap-4">
          <Input
            id="mov-amount"
            label="Monto"
            type="number"
            placeholder="0.00"
            value={movAmount}
            onChange={(e) => setMovAmount(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="mov-category" className="text-sm font-medium text-gray-300">
              Categoría
            </label>
            <select
              id="mov-category"
              value={movCategory}
              onChange={(e) => setMovCategory(e.target.value as MovementCategory)}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-[#1c1c1c]">
                  {CATEGORY_CONFIG[c].icon} {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="mov-desc" className="text-sm font-medium text-gray-300">
              Descripción <span className="text-gray-500">(opcional)</span>
            </label>
            <textarea
              id="mov-desc"
              value={movDesc}
              onChange={(e) => setMovDesc(e.target.value)}
              placeholder="¿Para qué fue este movimiento?"
              rows={2}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400 resize-none placeholder-gray-600"
            />
          </div>

          <Input
            id="mov-date"
            label="Fecha"
            type="date"
            value={movDate}
            onChange={(e) => setMovDate(e.target.value)}
            required
          />

          {movError && <p className="text-red-400 text-xs">{movError}</p>}

          <div className="flex gap-3 mt-1">
            <Button
              type="button"
              variant="ghost"
              className="flex-1"
              onClick={() => setMovementModal(null)}
            >
              Cancelar
            </Button>
            <Button
              id="mov-save-btn"
              type="submit"
              variant="primary"
              className="flex-1"
              loading={movLoading}
            >
              Guardar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}