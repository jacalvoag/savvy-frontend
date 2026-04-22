'use client'

import { useState, useCallback } from 'react'
import movementsService from '@/services/movements.service'
import type { Movement } from '@/types'

interface CreateMovementData {
  monto: number
  tipo: string
  categoria: string
  descripcion?: string
  fecha: string
}

export function useMovements() {
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
  }, []) // ← Array de dependencias vacío

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
      await fetchMovements()
    } catch {
      setError('Error al eliminar movimiento.')
    }
  }

  const updateMovement = async (id: string, data: Partial<CreateMovementData>) => {
    setLoading(true)
    setError(null)
    try {
      const { data: updatedMovement } = await movementsService.update(id, data)
      setMovements((prev) => prev.map((m) => (m.id === id ? updatedMovement : m)))
      await fetchMovements()
      return updatedMovement
    } catch {
      setError('Error al actualizar movimiento.')
      throw new Error('Update failed')
    } finally {
      setLoading(false)
    }
  }

  return { movements, loading, error, fetchMovements, createMovement, updateMovement, removeMovement }
}