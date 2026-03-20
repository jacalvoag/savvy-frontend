    try {
      const { data } = await groupsService.getDetail(id)
      setGroupDetail(data)
    } catch {
      setError('Error al cargar el grupo.')
    } finally {
      setLoading(false)
    }
  }, [])

  const contribute = async (id: string, monto: number) => {
    setContributeLoading(true)
    setError(null)
    try {
      await groupsService.contribute(id, monto)
