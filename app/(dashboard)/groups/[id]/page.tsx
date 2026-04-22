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
        <>✓ ¡Copiado!</>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copiar
        </>
      )}
    </button>
  )
}

// ─── Group Leaderboard Page ────────────────────────────────────────────────────

export default function GroupLeaderboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { groupDetail, loading, contributeLoading, error, fetchGroupDetail, contribute } = useGroupDetail()
  const { deleteGroup, leaveGroup } = useGroups()
  const { user } = useAuthStore()

  const [lbTab, setLbTab] = useState<LeaderboardTab>('contributions')
  const [contribAmount, setContribAmount] = useState('')
  const [contribError, setContribError] = useState<string | null>(null)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [leaveOpen, setLeaveOpen] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const isLeader = groupDetail?.liderId === user?.id

  useEffect(() => {
    fetchGroupDetail(id)
  }, [id, fetchGroupDetail])

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contribAmount || isNaN(Number(contribAmount)) || Number(contribAmount) < 1) {
      setContribError('Monto mínimo: $1')
      return
    }
    setContribError(null)
    try {
      await contribute(id, parseFloat(contribAmount))
      setContribAmount('')
    } catch {
      setContribError('Error al registrar la contribución.')
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

      {/* ── Encabezado del Grupo ───────────────────────────────── */}
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
              <span className="text-xs text-gray-500">Código de invitación:</span>
              <code className="font-mono text-sm text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-lg">
                {groupDetail.inviteCode}
              </code>
              <CopyButton text={groupDetail.inviteCode} />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {groupDetail.miembros.length} miembro{groupDetail.miembros.length !== 1 ? 's' : ''}
          </div>
        </div>
      ) : (
        <p className="text-red-400 text-sm">{error ?? 'Grupo no encontrado'}</p>
      )}

      {/* ── Tarjeta de Balance ────────────────────────────────── */}
      {groupDetail && (
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Total Ahorrado</p>
              <p className="text-3xl font-bold text-white mt-1">
                ${groupDetail.totalAcumulado.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                de ${groupDetail.metaAhorro.toLocaleString()} de meta
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-lime-400">
                {Math.round(groupDetail.porcentajeGrupal)}%
              </p>
              <p className="text-xs text-gray-500">Completado</p>
            </div>
          </div>
          <ProgressBar value={groupDetail.porcentajeGrupal} showLabel={false} height="h-3" />
        </div>
      )}

      {/* ── Grid Principal: Clasificación + Acciones ──────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Tabla de Clasificación (ocupa 2 columnas) */}
        <div className="lg:col-span-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          {/* Tab Toggle */}
          <div className="flex border-b border-[#2a2a2a]">
            {(['contributions', 'streaks'] as LeaderboardTab[]).map((t) => (
              <button
                key={t}
                id={`lb-tab-${t}`}
                onClick={() => setLbTab(t)}
                className={[
                  'flex-1 py-3 text-sm font-medium transition-all',
                  lbTab === t
                    ? 'text-lime-400 border-b-2 border-lime-400'
                    : 'text-gray-500 hover:text-gray-300',
                ].join(' ')}
              >
                {t === 'contributions' ? 'Contribuciones' : 'Rachas 🔥'}
              </button>
            ))}
          </div>

          {/* Tabla */}
          {loading && !groupDetail ? (
            <div className="p-4 space-y-1">
              {[1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-[#222]">
                    <th className="text-left px-4 py-3 font-medium">#</th>
                    <th className="text-left px-4 py-3 font-medium">Miembro</th>
                    <th className="text-right px-4 py-3 font-medium">
                      {lbTab === 'contributions' ? 'Contribución' : 'Racha'}
                    </th>
                    {lbTab === 'contributions' && (
                      <th className="text-right px-4 py-3 font-medium hidden sm:table-cell">Porcentaje</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {groupDetail?.miembros.map((member, idx) => {
                    const isFirst = member.rank === 1
                    const isCurrent = member.isCurrentUser
                    return (
                      <tr
                        key={member.usuarioId}
                        className={[
                          'border-b border-[#1a1a1a] transition-colors fade-in-up',
                          isFirst ? 'bg-lime-400/5 border-l-2 border-lime-400' : '',
                          isCurrent && !isFirst ? 'bg-lime-400/[0.03] border border-dashed border-lime-400/30' : '',
                          'hover:bg-white/[0.02]',
                        ].join(' ')}
                        style={{ animationDelay: `${idx * 60}ms` }}
                      >
                        {/* Posición */}
                        <td className="px-4 py-3">
                          <span className={`font-bold ${isFirst ? 'text-lime-400' : 'text-gray-500'}`}>
                            {isFirst ? '👑' : member.rank}
                          </span>
                        </td>
                        {/* Miembro */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar
                              src={member.avatarUrl}
                              nombre={member.nombre}
                              size="sm"
                            />
                            <div>
                              <p className={`font-medium ${isCurrent ? 'text-lime-400' : 'text-white'}`}>
                                {member.nombre}
                                {isCurrent && <span className="text-xs text-gray-500 ml-1">(tú)</span>}
                              </p>
                            </div>
                          </div>
                        </td>
                        {/* Valor */}
                        <td className="px-4 py-3 text-right">
                          {lbTab === 'contributions' ? (
                            <span className="text-white font-semibold">${member.contribucion.toLocaleString()}</span>
                          ) : (
                            <span className="text-white font-semibold">{member.streakWeeks}sem 🔥</span>
                          )}
                        </td>
                        {/* Porcentaje (solo en contribuciones) */}
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

        {/* ── Tarjetas de Acción (columna derecha) ──────────────── */}
        <div className="flex flex-col gap-4">

          {/* Tarjeta Contribuir */}
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">Agregar Contribución</h3>
            <form onSubmit={handleContribute} className="space-y-3">
              <Input
                id="contrib-amount"
                type="number"
                placeholder="Monto ($)"
                value={contribAmount}
                onChange={(e) => setContribAmount(e.target.value)}
              />
              {contribError && <p className="text-red-400 text-xs">{contribError}</p>}
              <Button
                id="contrib-submit"
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                loading={contributeLoading}
              >
                Agregar Contribución
              </Button>
            </form>
          </div>

          {/* Tarjeta Invitar */}
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">Invitar Amigos</h3>
            {groupDetail && (
              <>
                <div className="bg-[#111] rounded-xl p-3 text-center">
                  <code className="font-mono text-2xl text-lime-400 tracking-widest">
                    {groupDetail.inviteCode}
                  </code>
                </div>
                <CopyButton text={groupDetail.inviteCode} />
                <p className="text-xs text-gray-500 leading-relaxed">
                  Comparte este código con tus amigos para invitarlos al grupo
                </p>
              </>
            )}
          </div>

          {/* Tarjeta Acciones del Grupo */}
          <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white">Acciones del Grupo</h3>
            {isLeader ? (
              <>
                <p className="text-xs text-gray-500">Como líder del grupo, puedes eliminarlo permanentemente.</p>
                <Button
                  id="delete-group-btn"
                  variant="danger"
                  size="md"
                  className="w-full"
                  onClick={() => { setActionError(null); setDeleteOpen(true) }}
                >
                  Eliminar Grupo
                </Button>
              </>
            ) : (
              <>
                <p className="text-xs text-gray-500">Puedes salir de este grupo en cualquier momento.</p>
                <Button
                  id="leave-group-btn"
                  variant="ghost"
                  size="md"
                  className="w-full border-red-800/50 text-red-400 hover:text-red-300 hover:bg-red-900/10"
                  onClick={() => { setActionError(null); setLeaveOpen(true) }}
                >
                  Salir del Grupo
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Diálogos de Confirmación ───────────────────────────── */}

      <ConfirmDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Eliminar Grupo"
        message="Esta acción no se puede deshacer. Todos los miembros serán removidos del grupo y todos los datos se eliminarán permanentemente."
        confirmLabel="Eliminar Grupo"
        cancelLabel="Cancelar"
        error={actionError}
      />

      <ConfirmDialog
        isOpen={leaveOpen}
        onClose={() => setLeaveOpen(false)}
        onConfirm={handleLeave}
        title="Salir del Grupo"
        message="Ya no tendrás acceso a la clasificación ni al progreso del grupo. Tus contribuciones anteriores se conservarán en los registros del grupo."
        confirmLabel="Salir del Grupo"
        cancelLabel="Quedarse"
        error={actionError}
      />
    </div>
  )
}