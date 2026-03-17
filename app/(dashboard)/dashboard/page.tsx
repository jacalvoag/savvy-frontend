        categoria: movCategory,
        descripcion: movDesc || undefined,
        fecha: movDate,
      })
      setMovementModal(null)
      resetMovForm()
    } catch {
      setMovError('Error al guardar el movimiento.')
    } finally {
      setMovLoading(false)
    }
  }

  const resetMovForm = () => {
    setMovAmount('')
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="mov-category" className="text-sm font-medium text-gray-300">
                Category
              </label>
              <select
                id="mov-category"
                value={movCategory}
                onChange={(e) => setMovCategory(e.target.value as MovementCategory)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-lime-400/40 focus:border-lime-400"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-[#1c1c1c]">
                    {CATEGORY_CONFIG[c].icon} {c.charAt(0).toUpperCase() + c.slice(1)}
