          set((state) => ({
            user: state.user ? { ...state.user, ...partial } : null,
          })),

        clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
      }),
      {
        name: 'savvy-auth',
        storage: createJSONStorage(() => localStorage),
        // Only persist auth data, not actions
        partialize: (state) => ({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      }
    )
  )

