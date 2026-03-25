  'use client'

  import Link from 'next/link'
  import { usePathname, useRouter } from 'next/navigation'
  import { useState } from 'react'
  import { useAuthStore } from '@/store/auth.store'
  import Avatar from '@/components/ui/Avatar'

  interface NavItem {
    href: string
    label: string
    icon: React.ReactNode
  }

  const navItems: NavItem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/goals',
    label: 'Savings Hub',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    const pathname = usePathname()
    const router = useRouter()
    const { user, clearAuth } = useAuthStore()

    const handleLogout = () => {
      clearAuth()
      router.push('/login')
    }

    const SidebarContent = () => (
      <aside className="flex flex-col h-full bg-[#111111] border-r border-[#1f1f1f] w-60 shrink-0">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Savvy</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Footer */}
        <div className="px-3 py-4 border-t border-[#1f1f1f]">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors">
            <Avatar src={user?.avatarUrl} nombre={user?.nombre ?? 'U'} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{user?.nombre ?? '—'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.plan ?? 'Free'}</p>
            </div>
            <button
        {/* Desktop sidebar */}
        <div className="hidden lg:flex h-full">
          <SidebarContent />
        </div>

        {/* Mobile overlay sidebar */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <div className="fixed inset-y-0 left-0 z-50 lg:hidden flex">
              <SidebarContent />
            </div>
          </>
        )}
      </>
    )
  }

