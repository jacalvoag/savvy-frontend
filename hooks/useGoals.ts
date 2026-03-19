  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGoals = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await goalsService.getAll()
      setGoals(data)
    } catch {
      setError('Error al cargar metas.')
    } finally {
      setLoading(false)
    }
  }, [])
