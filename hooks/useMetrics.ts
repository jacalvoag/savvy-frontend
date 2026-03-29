  'use client'

  import { useState, useCallback } from 'react'
  import metricsService from '@/services/metrics.service'
  import type { PortfolioData, PerformancePoint, InsightData, Period } from '@/types'

  export function useMetrics() {
    const [portfolio, setPortfolio] = useState<PortfolioData | null>(null)
    const [performance, setPerformance] = useState<PerformancePoint[]>([])
    const [insight, setInsight] = useState<InsightData | null>(null)

    const [portfolioLoading, setPortfolioLoading] = useState(false)
    const [performanceLoading, setPerformanceLoading] = useState(false)
    const [insightLoading, setInsightLoading] = useState(false)

  const fetchPerformance = useCallback(async (period: Period) => {
    setPerformanceLoading(true)
    setError(null)
    try {
      const { data } = await metricsService.getPerformance(period)
      setPerformance(data)
    } catch {
      setError('Error al cargar rendimiento.')
    } finally {
      setPerformanceLoading(false)
    }
  }, [])

  const fetchInsight = useCallback(async () => {
    setInsightLoading(true)
      setError(null)
      try {
        const { data } = await metricsService.getInsight()
        setInsight(data)
      } catch {
        setError('Error al cargar insight.')
      } finally {
        setInsightLoading(false)
      }
    }, [])

    return {
      portfolio,
      performance,
      insight,
      portfolioLoading,
      performanceLoading,
      insightLoading,
      error,
      fetchPortfolio,
      fetchPerformance,
      fetchInsight,
    }
  }
