    refresh: (refreshToken: string) =>
      api.post<{ accessToken: string }>('/auth/refresh', { refreshToken }),
  }

  export default authService
