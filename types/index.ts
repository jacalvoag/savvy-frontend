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
