  const [movements, setMovements] = useState<Movement[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMovements = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await movementsService.getAll()
      setMovements(data)
    } catch {
      setError('Error al cargar movimientos.')
    } finally {
      setLoading(false)
    }
  }, [])

  const createMovement = async (data: CreateMovementData) => {
    setLoading(true)
    setError(null)
    try {
      const { data: newMovement } = await movementsService.create(data)
      setMovements((prev) => [newMovement, ...prev])
      return newMovement
    } catch {
      setError('Error al crear movimiento.')
      throw new Error('Create failed')
    } finally {
      setLoading(false)
    }
  }

  const removeMovement = async (id: string) => {
    try {
      await movementsService.remove(id)
      setMovements((prev) => prev.filter((m) => m.id !== id))
    } catch {
      setError('Error al eliminar movimiento.')
    }
  }

  return { movements, loading, error, fetchMovements, createMovement, removeMovement }
}

