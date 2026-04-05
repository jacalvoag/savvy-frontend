import api from '@/lib/axios'
import type { Group, GroupDetail } from '@/types'

interface CreateGroupData {
  nombre: string
  metaAhorro: number
}

const groupsService = {
  getAll: () => api.get<Group[]>('/groups'),

  create: (data: CreateGroupData) => api.post<Group>('/groups', data),

  join: (inviteCode: string) => api.post('/groups/join', { inviteCode }),

  getDetail: (id: string) => api.get<GroupDetail>(`/groups/${id}`),

  contribute: (id: string, monto: number) =>
    api.patch(`/groups/${id}/contribute`, { monto }),

  /** Only available to the group leader */
  deleteGroup: (id: string) => api.delete(`/groups/${id}`),

  /** Available to non-leader members */
  leaveGroup: (id: string) => api.delete(`/groups/${id}/leave`),
}

export default groupsService
