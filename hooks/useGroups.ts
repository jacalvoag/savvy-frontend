  'use client'

  import { useState, useCallback } from 'react'
  import { useRouter } from 'next/navigation'
  import groupsService from '@/services/groups.service'
  import type { Group } from '@/types'

  interface CreateGroupData {
    nombre: string
    metaAhorro: number
  }

  export function useGroups() {
    const [groups, setGroups] = useState<Group[]>([])
    const [loading, setLoading] = useState(false)

    const createGroup = async (data: CreateGroupData) => {
      setError(null)
      try {
        const { data: newGroup } = await groupsService.create(data)
        setGroups((prev) => [newGroup, ...prev])
        return newGroup
      } catch {
        setError('Error al crear grupo.')
        throw new Error('Create failed')
      }
    }

    const joinGroup = async (inviteCode: string) => {
      setError(null)
