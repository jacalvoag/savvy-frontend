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
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const fetchGroups = useCallback(async () => {
      setLoading(true)
      setError(null)
      try {
        const { data } = await groupsService.getAll()
        setGroups(data)
      } catch {
        setError('Error al cargar grupos.')
      } finally {
        setLoading(false)
      }
    }, [])

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
      try {
        const { data: joinedGroup } = await groupsService.join(inviteCode)
        setGroups((prev) => [...prev, joinedGroup])
        return joinedGroup
      } catch {
        setError('Código de invitación inválido o expirado.')
        throw new Error('Join failed')
      }
    }

    const deleteGroup = async (id: string) => {
      setError(null)
      try {
        await groupsService.deleteGroup(id)
        setGroups((prev) => prev.filter((g) => g.id !== id))
      router.push('/goals')
    } catch (err: unknown) {
      const status = (err as any)?.response?.status as number | undefined
      if (status === 403) {
        setError('No tienes permisos para eliminar este grupo.')
      } else {
        setError('Error al eliminar grupo.')
      }
      throw err
    }
  }

  const leaveGroup = async (id: string) => {
    setError(null)
    try {
        await groupsService.leaveGroup(id)
        setGroups((prev) => prev.filter((g) => g.id !== id))
        router.push('/goals')
      } catch (err: unknown) {
        const status = (err as any)?.response?.status as number | undefined
        if (status === 403) {
          setError('El líder no puede salir del grupo sin transferir el liderazgo.')
        } else {
          setError('Error al salir del grupo.')
        }
        throw err
      }
    }

    return { groups, loading, error, fetchGroups, createGroup, joinGroup, deleteGroup, leaveGroup }
