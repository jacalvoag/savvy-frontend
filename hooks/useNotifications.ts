        const { data } = await notificationsService.getAll()
        setNotifications(data)
      } catch {
        // Silently fail — notification polling shouldn't break the UI
      } finally {
        setLoading(false)
      }
    }, [])

    const markAsRead = async (id: string) => {
      try {
        await notificationsService.markRead(id)
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
        )
