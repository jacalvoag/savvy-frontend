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
