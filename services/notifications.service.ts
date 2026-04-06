import api from '@/lib/axios'
import type { Notification } from '@/types'

const notificationsService = {
  getAll: () => api.get<Notification[]>('/notifications'),

  markRead: (id: string) => api.patch(`/notifications/${id}/read`),
}

export default notificationsService
