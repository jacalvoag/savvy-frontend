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
