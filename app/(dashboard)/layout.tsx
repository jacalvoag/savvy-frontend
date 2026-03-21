
  // Wait for Zustand to hydrate from localStorage before checking auth
  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated && !accessToken) {
      router.replace('/login')
    }
  }, [hydrated, accessToken, router])

  // Notification polling every 30 seconds
  useEffect(() => {
    if (!accessToken) return
