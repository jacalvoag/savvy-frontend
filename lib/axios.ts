      const { accessToken } = useAuthStore.getState()
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // ─── Response Interceptor (Refresh Token Queue) ───────────────────────────────

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as RetryableRequestConfig

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // Queue this request and resolve when token refresh completes
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`
              }
              return api(originalRequest)
            })
            .catch((err) => Promise.reject(err))
        }

        originalRequest._retry = true
        isRefreshing = true

        const { refreshToken, setAuth, clearAuth, user } = useAuthStore.getState()

        if (!refreshToken) {
          clearAuth()
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
          return Promise.reject(error)
        }

        return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, { refreshToken })
          .then(({ data }) => {
            const newAccessToken: string = data.accessToken
            if (user) {
              setAuth(user, newAccessToken, refreshToken)
            }
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            }
            processQueue(null, newAccessToken)
            resolve(api(originalRequest))
          })
          .catch((err) => {
            processQueue(err, null)
            clearAuth()
            if (typeof window !== 'undefined') {
              window.location.href = '/login'
            }
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    return Promise.reject(error)
  }
)

  export default api

