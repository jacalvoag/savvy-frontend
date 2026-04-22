import api from '@/lib/axios'
import type { Goal } from '@/types'

interface CreateGoalData {
  nombre: string
  montoMeta: number
  fechaInicio: string
  fechaFin?: string
}

const goalsService = {
  getAll: () => api.get<Goal[]>('/goals'),

  create: (data: CreateGoalData) => api.post<Goal>('/goals', data),

  update: (id: string, data: Partial<CreateGoalData>) => 
    api.patch<Goal>(`/goals/${id}`, data),

  boost: (id: string, monto: number) =>
    api.patch<Goal>(`/goals/${id}/boost`, { monto }),

  archive: (id: string) => api.patch<Goal>(`/goals/${id}/archive`),

  delete: (id: string) => api.delete(`/goals/${id}`),
}

export default goalsService
