'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import api from '@/lib/axios'

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore()
  const [nombre, setNombre] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (user) {
      setNombre(user.nombre)
      setAvatarUrl(user.avatarUrl || '')
    }
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { data } = await api.patch('/users/me', {
        nombre,
        avatarUrl: avatarUrl || undefined,
      })
      updateUser(data)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      setError('Error al actualizar el perfil')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="text-sm text-gray-500 mt-1">Administra tu perfil y preferencias</p>
      </div>

      {/* Información de la Cuenta */}
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6 space-y-4">
        <h2 className="text-base font-semibold text-white">Información de la Cuenta</h2>
        
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Correo electrónico</p>
          <p className="text-sm text-white">{user?.correo}</p>
          <p className="text-xs text-gray-600 mt-1">No es posible cambiar tu correo electrónico</p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500">Plan actual</p>
          <div className="inline-flex items-center gap-2 bg-lime-400/10 text-lime-400 px-3 py-1.5 rounded-lg text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            {user?.plan || 'Gratis'}
          </div>
        </div>
      </div>

      {/* Editar Perfil */}
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-6">
        <h2 className="text-base font-semibold text-white mb-4">Editar Perfil</h2>
        
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            id="settings-nombre"
            label="Nombre completo"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            required
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />

          <Input
            id="settings-avatar"
            label="URL del Avatar (opcional)"
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://ejemplo.com/avatar.jpg"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
          />

          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-lime-400/10 border border-lime-400 rounded-xl px-4 py-3">
              <p className="text-lime-400 text-sm">Perfil actualizado correctamente</p>
            </div>
          )}

          <Button
            id="save-settings-btn"
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
          >
            Guardar Cambios
          </Button>
        </form>
      </div>

      {/* Zona de Peligro */}
      <div className="bg-[#1c1c1c] border border-red-800/30 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-red-400 mb-2">Zona de Peligro</h2>
        <p className="text-sm text-gray-500 mb-4">
          Estas acciones son permanentes y no se pueden deshacer
        </p>
        <Button
          variant="danger"
          size="md"
          onClick={() => alert('Funcionalidad de eliminación de cuenta próximamente')}
        >
          Eliminar Cuenta
        </Button>
      </div>
    </div>
  )
}