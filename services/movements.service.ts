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

  update: (id: string, data: Partial<CreateMovementData>) => 
    api.patch<Movement>(`/movements/${id}`, data),

  remove: (id: string) => api.delete(`/movements/${id}`),
}

export default movementsService
