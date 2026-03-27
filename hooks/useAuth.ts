      setError(null)
      try {
        const { data } = await authService.login(correo, password)
        setAuth(data.user, data.accessToken, data.refreshToken)
        router.push('/dashboard')
      } catch (err: unknown) {
        const message = (err as any)?.response?.data?.message as string | undefined
        setError(message || 'Credenciales incorrectas. Intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    }

    const register = async (nombre: string, correo: string, password: string) => {
      setLoading(true)
    router.push('/login')
  }

  return { login, register, logout, loading, error, setError }
}

