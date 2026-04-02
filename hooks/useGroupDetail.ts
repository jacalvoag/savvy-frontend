'use client'

import { useState, useCallback } from 'react'
import groupsService from '@/services/groups.service'
import type { GroupDetail } from '@/types'

export function useGroupDetail() {
  const [groupDetail, setGroupDetail] = useState<GroupDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [contributeLoading, setContributeLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGroupDetail = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await groupsService.getDetail(id)
      setGroupDetail(data)
    } catch {
      setError('Error al cargar el grupo.')
    } finally {
      setLoading(false)
    }
  }, [])

  const contribute = async (id: string, monto: number) => {
    setContributeLoading(true)
    setError(null)
    try {
      await groupsService.contribute(id, monto)
      // Reload to get accurate server-side ranking
      const { data } = await groupsService.getDetail(id)
      setGroupDetail(data)
      return data
    } catch {
      setError('Error al registrar contribución.')
      throw new Error('Contribute failed')
    } finally {
      setContributeLoading(false)
    }
  }

  return { groupDetail, loading, contributeLoading, error, fetchGroupDetail, contribute }
}

