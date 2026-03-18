
    const createGroup = async (data: CreateGroupData) => {
      setError(null)
      try {
        const { data: newGroup } = await groupsService.create(data)
        setGroups((prev) => [newGroup, ...prev])
        return newGroup
      } catch {
        setError('Error al crear grupo.')
        throw new Error('Create failed')
      }
    }

    const joinGroup = async (inviteCode: string) => {
      setError(null)
