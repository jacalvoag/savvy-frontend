'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import { useGroupDetail } from '@/hooks/useGroupDetail'
import { useGroups } from '@/hooks/useGroups'
import { useAuthStore } from '@/store/auth.store'
import Button from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import Avatar from '@/components/ui/Avatar'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { Skeleton, SkeletonRow } from '@/components/ui/Skeleton'
import Input from '@/components/ui/Input'

type LeaderboardTab = 'contributions' | 'streaks'

// ─── Helper ────────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      id="copy-invite-code"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2a2a2a] hover:bg-[#333] text-gray-300 hover:text-white text-xs font-medium transition-all"
    >
      {copied ? (
        <>✓ Copied!</>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  )
}

        await contribute(id, parseFloat(contribAmount))
        setContribAmount('')
      } catch {
        setContribError('Error al registrar contribución.')
      }
    }

    const handleDelete = async () => {
      setActionError(null)
      try {
        await deleteGroup(id)
      } catch {
        setActionError('Error al eliminar el grupo.')
        throw new Error('delete failed')
      }
    }

    const handleLeave = async () => {
      setActionError(null)
      try {
        await leaveGroup(id)
      } catch {
        setActionError('No puedes salir de este grupo.')
        throw new Error('leave failed')
      }
    }

    return (
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5">

        {/* ── Group Header ───────────────────────────────────────── */}
        {loading && !groupDetail ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        ) : groupDetail ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white">{groupDetail.nombre}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">Invite code:</span>
                <code className="font-mono text-sm text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-lg">
                  {groupDetail.inviteCode}
                </code>
                <CopyButton text={groupDetail.inviteCode} />
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {groupDetail.miembros.length} member{groupDetail.miembros.length !== 1 ? 's' : ''}
            </div>
          </div>
        ) : (
          <p className="text-red-400 text-sm">{error ?? 'Group not found'}</p>
        )}

        {/* ── Balance Card ────────────────────────────────────────── */}
        {groupDetail && (
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
            </div>
            <ProgressBar value={groupDetail.porcentajeGrupal} showLabel={false} height="h-3" />
          </div>
        )}

        {/* ── Main Grid: Leaderboard + Action Cards ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Leaderboard Table (spans 2 cols) */}
          <div className="lg:col-span-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl overflow-hidden">
            {/* Tab Toggle */}
            <div className="flex border-b border-[#2a2a2a]">
              {(['contributions', 'streaks'] as LeaderboardTab[]).map((t) => (
                <button
                  key={t}
                            'hover:bg-white/[0.02]',
                          ].join(' ')}
                          style={{ animationDelay: `${idx * 60}ms` }}
                        >
                          {/* Rank */}
                          <td className="px-4 py-3">
                            <span className={`font-bold ${isFirst ? 'text-lime-400' : 'text-gray-500'}`}>
                              {isFirst ? '👑' : member.rank}
                            </span>
                          </td>
                          {/* Member */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <Avatar
                                src={member.avatarUrl}
                          ) : (
                            <span className="text-white font-semibold">{member.streakWeeks}w 🔥</span>
                          )}
                        </td>
                        {/* Share (contributions tab only) */}
                        {lbTab === 'contributions' && (
                          <td className="px-4 py-3 text-right hidden sm:table-cell">
                            <span className="text-lime-400 text-xs font-medium">{member.porcentaje.toFixed(1)}%</span>
                          </td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              </div>
            )}
          </div>

          {/* ── Action Cards (right column) ────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Contribute Card */}
            <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-white">Add Contribution</h3>
              <form onSubmit={handleContribute} className="space-y-3">
                <Input
                  id="contrib-amount"
                  type="number"
                  placeholder="Amount ($)"
                </p>
              </>
            )}
          </div>

          {/* Actions Card (Delete / Leave) */}
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">Group Actions</h3>
            {isLeader ? (
              <>
                <p className="text-xs text-gray-500">As the group leader, you can permanently delete this group.</p>
                <Button
                  id="delete-group-btn"
                  variant="danger"
                  size="md"
          title="Delete Group"
          message="This action cannot be undone. All members will be removed from the group and all data will be permanently deleted."
          confirmLabel="Delete Group"
          cancelLabel="Cancel"
          error={actionError}
        />

        <ConfirmDialog
          isOpen={leaveOpen}
          onClose={() => setLeaveOpen(false)}
          onConfirm={handleLeave}
          title="Leave Group"
          message="You will no longer have access to this group's leaderboard or progress. Your past contributions will be kept in the group records."
          confirmLabel="Leave Group"
          cancelLabel="Stay"
        error={actionError}
      />
    </div>
  )
}

