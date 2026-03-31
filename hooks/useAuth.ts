'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import authService from '@/services/auth.service'

export function useAuth() {
  const { setAuth, clearAuth } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (correo: string, password: string) => {
    setLoading(true)
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
    setError(null)
    try {
      const { data } = await authService.register(nombre, correo, password)
      setAuth(data.user, data.accessToken, data.refreshToken)
      router.push('/dashboard')
    } catch (err: unknown) {
      const message = (err as any)?.response?.data?.message as string | undefined
      setError(message || 'Error al crear cuenta. El correo puede ya estar registrado.')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearAuth()
    router.push('/login')
  }

  return { login, register, logout, loading, error, setError }
}

