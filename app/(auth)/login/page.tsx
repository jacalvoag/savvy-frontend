    const [loginPassword, setLoginPassword] = useState('')

    // Register form
    const [regName, setRegName] = useState('')
    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')

    const handleTabChange = (t: Tab) => {
      setTab(t)
      setError(null)
    }

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault()
      await login(loginEmail, loginPassword)
              background: 'linear-gradient(145deg, #ff6b35 0%, #e8420a 35%, #8b1200 70%, #1a0a0a 100%)',
            }}
          />
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-lime-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/5" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full px-10 py-10">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        </div>
      </div>
    )
  }

