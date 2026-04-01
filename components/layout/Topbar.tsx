'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import Avatar from '@/components/ui/Avatar'
import type { Notification } from '@/types'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/goals': 'Savings Hub',
  '/settings': 'Settings',
}

interface TopbarProps {
  notifications: Notification[]
  unreadCount: number
  onMarkRead: (id: string) => void
  onHamburger: () => void
}

export default function Topbar({ notifications, unreadCount, onMarkRead, onHamburger }: TopbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)

  const title = Object.entries(PAGE_TITLES).find(([key]) => pathname.startsWith(key))?.[1] ?? 'Savvy'

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = () => {
    clearAuth()
    router.push('/login')
  }

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('es-MX', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <header className="h-14 bg-[#111111] border-b border-[#1f1f1f] px-4 md:px-6 flex items-center justify-between gap-4 shrink-0">
      {/* Left: Hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onHamburger}
          className="lg:hidden text-gray-400 hover:text-white p-1"
          aria-label="Abrir menú"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white font-semibold text-base">{title}</h1>
        </div>

        {/* Right: Notifications + Avatar */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              id="notifications-btn"
              onClick={() => setNotifOpen((v) => !v)}
              className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Notificaciones"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center px-1">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#2a2a2a]">
                      <p className="text-sm text-white leading-snug">{n.mensaje}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{formatDate(n.createdAt)}</p>
                      {!n.leida && <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-1.5" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar Dropdown */}
        <div className="relative" ref={userRef}>
          <button
            id="user-menu-btn"
            onClick={() => setUserOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl p-1 hover:bg-white/5 transition-colors"
          >
            <Avatar src={user?.avatarUrl} nombre={user?.nombre ?? 'U'} size="sm" />
          </button>

          {userOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl shadow-2xl z-50 overflow-hidden">
              <div className="px-3 py-2 border-b border-[#2a2a2a]">
                <p className="text-xs text-white font-medium truncate">{user?.nombre}</p>
                <p className="text-[11px] text-gray-500 truncate">{user?.correo}</p>
              </div>
              <button
                onClick={() => { setUserOpen(false); router.push('/settings') }}
                className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
}

