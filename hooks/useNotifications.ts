'use client'

import { useState, useCallback } from 'react'
import notificationsService from '@/services/notifications.service'
import type { Notification } from '@/types'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)

  const unreadCount = notifications.filter((n) => !n.leida).length

  const fetchNotifications = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await notificationsService.getAll()
      setNotifications(data)
    } catch {
      // Silently fail — notification polling shouldn't break the UI
    } finally {
      setLoading(false)
    }
  }, [])

  const markAsRead = async (id: string) => {
    try {
      await notificationsService.markRead(id)
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
      )
      } catch {
        // Silently fail
      }
    }

    return { notifications, unreadCount, loading, fetchNotifications, markAsRead }
  }

