
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
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30_000)
    return () => clearInterval(interval)
  }, [accessToken, fetchNotifications])

  // Don't render protected content before hydration or when unauthenticated
  if (!hydrated || !accessToken) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
