'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useGoals } from '@/hooks/useGoals'
import { useGroups } from '@/hooks/useGroups'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import ProgressBar from '@/components/ui/ProgressBar'
import CircleProgress from '@/components/ui/CircleProgress'
import Avatar from '@/components/ui/Avatar'
import { SkeletonCard } from '@/components/ui/Skeleton'
import type { Goal } from '@/types'

// ─── Goal Status Badge ────────────────────────────────────────────────────────

function GoalBadge({ goal }: { goal: Goal }) {
  if (goal.completada) {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-lime-400 text-black">
        Completed ✓
      </span>
    )
  }
  if (goal.archivada) {
    return (
      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-transparent border border-gray-600 text-gray-500">
        Archived
      </span>
    )
  }
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#2a2a2a] text-gray-300">
      Active
    </span>
  )
}

// ─── Format Date ──────────────────────────────────────────────────────────────

function formatDate(iso?: string) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })
}

// ─── Savings Hub Page ─────────────────────────────────────────────────────────

export default function GoalsPage() {
  const { goals, loading: goalsLoading, fetchGoals, createGoal, boostGoal, archiveGoal } = useGoals()
  const {
    groups,
    loading: groupsLoading,
    fetchGroups,
    createGroup,
    joinGroup,
  } = useGroups()

  // New Goal Modal
  const [newGoalOpen, setNewGoalOpen] = useState(false)
  const [goalName, setGoalName] = useState('')
  const [goalAmount, setGoalAmount] = useState('')
  const [goalStart, setGoalStart] = useState(() => new Date().toISOString().split('T')[0])
  const [goalEnd, setGoalEnd] = useState('')
  const [goalLoading, setGoalLoading] = useState(false)
  const [goalError, setGoalError] = useState<string | null>(null)

  // Boost Modal
  const [boostGoalId, setBoostGoalId] = useState<string | null>(null)
  const [boostAmount, setBoostAmount] = useState('')
  const [boostLoading, setBoostLoading] = useState(false)
  const [boostError, setBoostError] = useState<string | null>(null)
  const [completedGoalId, setCompletedGoalId] = useState<string | null>(null)

  // New Group Modal

  // ── Goal Handlers ──────────────────────────────────────────────────────────

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!goalName || !goalAmount) { setGoalError('Completa todos los campos.'); return }
    setGoalLoading(true)
    setGoalError(null)
    try {
      await createGoal({
        nombre: goalName,
        montoMeta: parseFloat(goalAmount),
        fechaInicio: goalStart,
        fechaFin: goalEnd || undefined,
      })
      setNewGoalOpen(false)
      setGoalName(''); setGoalAmount(''); setGoalEnd('')
    } catch {
      setGoalError('Error al crear la meta.')
    } finally {
      setGoalLoading(false)
    }
  }

  const handleBoost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!boostGoalId || !boostAmount || isNaN(Number(boostAmount))) {
      setBoostError('Ingresa un monto válido.')
      return
    }
    setBoostLoading(true)
    setBoostError(null)
    try {
      const updated = await boostGoal(boostGoalId, parseFloat(boostAmount))
      if (updated?.completada) {
        setCompletedGoalId(boostGoalId)
        setTimeout(() => setCompletedGoalId(null), 4000)
      }
      setBoostGoalId(null)
      setBoostAmount('')
    } catch {
      setBoostError('Error al realizar el boost.')
    } finally {
      setBoostLoading(false)
    }
  }

  // ── Group Handlers ─────────────────────────────────────────────────────────

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!groupName || !groupMeta) { setGroupError('Completa todos los campos.'); return }
    setGroupLoading(true)
    setGroupError(null)
    try {
      await createGroup({ nombre: groupName, metaAhorro: parseFloat(groupMeta) })
      setNewGroupOpen(false)
      setGroupName(''); setGroupMeta('')
    } catch {
      setGroupError('Error al crear el grupo.')
    } finally {
      setGroupLoading(false)
    }
  }

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteCode) return
    setJoinLoading(true)
    setJoinError(null)
    try {
      await joinGroup(inviteCode.trim().toUpperCase())
      setInviteCode('')
    } catch {
      setJoinError('Código inválido o expirado.')
      } finally {
        setJoinLoading(false)
      }
    }

    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

        {/* ── Section 1: Individual Goals ──────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">My Goals</h2>
              <p className="text-sm text-gray-500">Track and boost your savings targets</p>
            </div>
          <Button
            id="new-goal-btn"
            variant="primary"
            size="md"
            onClick={() => setNewGoalOpen(true)}
          >
            + New Goal
          </Button>
        </div>

        {goalsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : goals.length === 0 ? (
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] border-dashed rounded-2xl p-10 text-center">
            <p className="text-2xl mb-2">💰</p>
            <p className="text-gray-400 text-sm">No goals yet. Create your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className={[
                  'bg-[#1c1c1c] border rounded-2xl p-5 flex flex-col gap-4 transition-all',
                  completedGoalId === goal.id
                    ? 'border-lime-400 glow-lime'
                    : 'border-[#2a2a2a]',
                ].join(' ')}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-white leading-snug">{goal.nombre}</h3>
                  <GoalBadge goal={goal} />
                </div>

                {/* Circle Progress */}
                <div className="flex items-center gap-4">
                  <CircleProgress value={goal.porcentaje} size={68} strokeWidth={6} />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-white">
                      ${goal.montoActual.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      of ${goal.montoMeta.toLocaleString()} goal
                    </p>
                    {goal.fechaFin && (
                      <p className="text-xs text-gray-600 mt-1">
                        Due {formatDate(goal.fechaFin)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {!goal.completada && !goal.archivada && (
                  <div className="flex gap-2 mt-auto">
                    <Button
                      id={`boost-${goal.id}`}
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => { setBoostGoalId(goal.id); setBoostAmount(''); setBoostError(null) }}
                    >
                      ⚡ Boost
                    </Button>
                    <Button
                      id={`archive-${goal.id}`}
                      variant="ghost"
                      size="sm"
                      title="Archive goal"
                      onClick={() => archiveGoal(goal.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Section 2: Group Collaborations ──────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
              <h2 className="text-xl font-bold text-white">Group Collaborations</h2>
              <p className="text-sm text-gray-500">Save together, grow together</p>
            </div>
            <Button
              id="new-group-btn"
              variant="secondary"
              size="md"
              onClick={() => setNewGroupOpen(true)}
            >
              + Create Group
            </Button>
          </div>

          {groupsLoading ? (
            <div className="space-y-3">
            {[1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : groups.length === 0 ? (
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] border-dashed rounded-2xl p-8 text-center">
            <p className="text-2xl mb-2">👥</p>
            <p className="text-gray-400 text-sm">No groups yet. Create one or join with a code!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-white">{group.nombre}</h3>
                    <span className="text-xs text-gray-500 font-mono bg-[#111] px-2 py-0.5 rounded-lg">
                      {group.inviteCode}
                    </span>
                  </div>
                  <ProgressBar value={0} height="h-1.5" />
                  <p className="text-xs text-gray-500">
                    Goal: ${group.metaAhorro.toLocaleString()}
                  </p>
                </div>
                <Link href={`/groups/${group.id}`}>
                  <Button variant="ghost" size="sm" id={`view-lb-${group.id}`}>
                    View Leaderboard →
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Join Group */}
        <div className="mt-4 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5">
          <p className="text-sm font-semibold text-white mb-3">Join a Group</p>
          <form onSubmit={handleJoin} className="flex gap-3">
            <input
              id="invite-code-input"
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
              placeholder="Enter invite code (e.g. ABC123XYZ)"
              maxLength={12}
              className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-white text-sm font-mono placeholder-gray-600 outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400 uppercase"
            />
            <Button
              id="join-group-btn"
              type="submit"
              variant="primary"
              size="md"
              loading={joinLoading}
            >
              Join
            </Button>
          </form>
          {joinError && <p className="text-red-400 text-xs mt-2">{joinError}</p>}
          </div>
        </section>

        {/* ── Modals ────────────────────────────────────────────── */}

        {/* New Goal Modal */}
        <Modal isOpen={newGoalOpen} onClose={() => setNewGoalOpen(false)} title="New Savings Goal">
          <form onSubmit={handleCreateGoal} className="flex flex-col gap-4">
            <Input id="goal-name" label="Goal Name" placeholder="e.g. Emergency Fund" value={goalName} onChange={(e) => setGoalName(e.target.value)} required />
            <Input id="goal-amount" label="Target Amount ($)" type="number" placeholder="5000" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} required />
            <Input id="goal-start" label="Start Date" type="date" value={goalStart} onChange={(e) => setGoalStart(e.target.value)} required />
            <Input id="goal-end" label="End Date (optional)" type="date" value={goalEnd} onChange={(e) => setGoalEnd(e.target.value)} />
            {goalError && <p className="text-red-400 text-xs">{goalError}</p>}
            <div className="flex gap-3 mt-1">
              <Button type="button" variant="ghost" className="flex-1" onClick={() => setNewGoalOpen(false)}>Cancel</Button>
        </form>
      </Modal>

      {/* New Group Modal */}
      <Modal isOpen={newGroupOpen} onClose={() => setNewGroupOpen(false)} title="Create a Group">
        <form onSubmit={handleCreateGroup} className="flex flex-col gap-4">
          <Input id="group-name" label="Group Name" placeholder="e.g. Team Savers" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
          <Input id="group-meta" label="Savings Goal ($)" type="number" placeholder="10000" value={groupMeta} onChange={(e) => setGroupMeta(e.target.value)} required />
          {groupError && <p className="text-red-400 text-xs">{groupError}</p>}
          <div className="flex gap-3 mt-1">
            <Button type="button" variant="ghost" className="flex-1" onClick={() => setNewGroupOpen(false)}>Cancel</Button>
            <Button id="create-group-btn" type="submit" variant="secondary" className="flex-1" loading={groupLoading}>Create Group</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

