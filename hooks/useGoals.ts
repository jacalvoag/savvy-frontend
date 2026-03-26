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

  const createGoal = async (data: CreateGoalData) => {
    setError(null)
    try {
      const { data: newGoal } = await goalsService.create(data)
      setGoals((prev) => [newGoal, ...prev])
      return newGoal
    } catch {
      setError('Error al crear meta.')
      throw new Error('Create failed')
    }
  }

  const boostGoal = async (id: string, monto: number) => {
    setError(null)
