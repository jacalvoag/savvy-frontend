  }

  export interface Group {
    id: string
    nombre: string
    metaAhorro: number
    inviteCode: string
    liderId: string
    createdAt: string
  }

  export interface LeaderboardEntry {
    rank: number
    usuarioId: string
    nombre: string
  avatarUrl?: string
  contribucion: number
  porcentaje: number
  streakWeeks: number
  isCurrentUser: boolean
}

export interface GroupDetail extends Group {
  totalAcumulado: number
  porcentajeGrupal: number
  miembros: LeaderboardEntry[]
}

export interface Notification {
  id: string
