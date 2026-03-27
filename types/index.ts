// ─── Core Domain Types ────────────────────────────────────────────────────────

export interface User {
  id: string
  nombre: string
  correo: string
  avatarUrl?: string
  plan: string
}

export type MovementCategory =
  | 'salary'
  | 'groceries'
  | 'transport'
  | 'entertainment'
    | 'savings'
    | 'dividends'
    | 'subscription'
    | 'food'
    | 'other'

  export type MovementType = 'ingreso' | 'egreso'

  export interface Movement {
    id: string
    usuarioId: string
    tipo: MovementType
    monto: number
    categoria: MovementCategory
    descripcion?: string
  moneda: string
  fecha: string
}

export interface Goal {
  id: string
  usuarioId: string
  nombre: string
  montoMeta: number
  montoActual: number
  fechaInicio: string
  fechaFin?: string
  completada: boolean
  archivada: boolean
  porcentaje: number // calculated by backend, do not recalculate
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
}

export interface InsightData {
  mensaje: string
  mesesRestantes: number
  metaNombre: string
}

// ─── Auth Types ───────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setAuth: (user: User, accessToken: string, refreshToken: string) => void
  updateUser: (partial: Partial<User>) => void
  clearAuth: () => void
}

// ─── API Response Wrappers ────────────────────────────────────────────────────

export interface ApiError {
  message: string
  statusCode?: number
}

export type Period = '1D' | '1W' | '1M' | '1Y'

