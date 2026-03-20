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
