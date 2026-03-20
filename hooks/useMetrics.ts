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
      portfolioLoading,
      performanceLoading,
      insightLoading,
      error,
      fetchPortfolio,
      fetchPerformance,
      fetchInsight,
    }
  }
