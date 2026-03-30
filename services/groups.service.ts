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

