'use client'

import { useState, useCallback } from 'react'
import goalsService from '@/services/goals.service'
import type { Goal } from '@/types'

interface CreateGoalData {
  nombre: string
  montoMeta: number
  fechaInicio: string
  fechaFin?: string
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGoals = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await goalsService.getAll()
      setGoals(data)
    } catch {
      setError('Error al cargar metas.')
    } finally {
      setLoading(false)
    }
  }, []) // ← Array de dependencias vacío

  const createGoal = async (data: CreateGoalData) => {
    setError(null)
    try {
      const { data: newGoal } = await goalsService.create(data)
      setGoals((prev) => [newGoal, ...prev])
      return newGoal
    } catch {
      setError('Error al crear meta.')
      throw new Error('Create failed')
    }
  }

  const boostGoal = async (id: string, monto: number) => {
    setError(null)
    try {
      const { data: updatedGoal } = await goalsService.boost(id, monto)
      setGoals((prev) => prev.map((g) => (g.id === id ? updatedGoal : g)))
      return updatedGoal
    } catch {
      setError('Error al realizar boost.')
      throw new Error('Boost failed')
    }
  }

  const archiveGoal = async (id: string) => {
    setError(null)
    try {
      const { data: updatedGoal } = await goalsService.archive(id)
      setGoals((prev) => prev.map((g) => (g.id === id ? updatedGoal : g)))
    } catch {
      setError('Error al archivar meta.')
    }
  }

  return { goals, loading, error, fetchGoals, createGoal, boostGoal, archiveGoal }
}