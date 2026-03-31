'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import { useNotifications } from '@/hooks/useNotifications'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuthStore()
  const router = useRouter()
  const [hydrated, setHydrated] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { notifications, unreadCount, fetchNotifications, markAsRead } = useNotifications()

  // Wait for Zustand to hydrate from localStorage before checking auth
  useEffect(() => {
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated && !accessToken) {
      router.replace('/login')
    }
  }, [hydrated, accessToken, router])

  // Notification polling every 30 seconds
  useEffect(() => {
    if (!accessToken) return
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30_000)
    return () => clearInterval(interval)
  }, [accessToken, fetchNotifications])

  // Don't render protected content before hydration or when unauthenticated
  if (!hydrated || !accessToken) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          notifications={notifications}
          unreadCount={unreadCount}
          onMarkRead={markAsRead}
          onHamburger={() => setMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
