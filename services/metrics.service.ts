import api from '@/lib/axios'
import type { PortfolioData, PerformancePoint, InsightData, Period } from '@/types'

const metricsService = {
  getPortfolio: () => api.get<PortfolioData>('/metrics/portfolio'),

  getPerformance: (period: Period) =>
    api.get<PerformancePoint[]>(`/metrics/performance?period=${period}`),

  getInsight: () => api.get<InsightData>('/metrics/insight'),
}

export default metricsService
