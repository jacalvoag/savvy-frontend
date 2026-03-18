  boost: (id: string, monto: number) =>
    api.patch<Goal>(`/goals/${id}/boost`, { monto }),

  archive: (id: string) => api.patch<Goal>(`/goals/${id}/archive`),
}

export default goalsService
