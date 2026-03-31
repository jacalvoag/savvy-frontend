import api from '@/lib/axios'
import type { Movement } from '@/types'

interface CreateMovementData {
  monto: number
  tipo: string
  categoria: string
  descripcion?: string
  fecha: string
}

const movementsService = {
  getAll: () => api.get<Movement[]>('/movements'),

  create: (data: CreateMovementData) => api.post<Movement>('/movements', data),
