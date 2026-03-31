import api from '@/lib/axios'

const authService = {
  login: (correo: string, password: string) =>
    api.post<{ user: import('@/types').User; accessToken: string; refreshToken: string }>(
      '/auth/login',
      { correo, password }
    ),

  register: (nombre: string, correo: string, password: string) =>
    api.post<{ user: import('@/types').User; accessToken: string; refreshToken: string }>(
      '/auth/register',
      { nombre, correo, password }
    ),

    refresh: (refreshToken: string) =>
      api.post<{ accessToken: string }>('/auth/refresh', { refreshToken }),
  }

  export default authService
