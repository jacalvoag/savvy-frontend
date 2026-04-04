'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

type Tab = 'login' | 'register'

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('login')
  const { login, register, loading, error, setError } = useAuth()

  // Login form
  const [loginEmail, setLoginEmail] = useState('')
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
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    await register(regName, regEmail, regPassword)
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel ─────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden flex-col">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Savvy</span>
          </div>

          {/* Hero */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white/80 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                Financial Intelligence
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Control your
                <br />
                <span className="gradient-text">financial future</span>
              </h1>
              <p className="text-white/60 text-base leading-relaxed max-w-xs">
                Track your money, set savings goals, and compete with friends to build better financial habits.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { label: 'Users', value: '10K+' },
                { label: 'Saved', value: '$2M+' },
                { label: 'Goals', value: '50K+' },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-3 text-center">
                  <p className="text-white font-bold text-xl">{s.value}</p>
                  <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer quote */}
          <p className="text-white/30 text-xs">
            "The secret to getting ahead is getting started." — Mark Twain
          </p>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────── */}
      <div className="flex-1 bg-[#111111] flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8 justify-center">
            <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Savvy</span>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account or create a new one</p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-1 mb-6">
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                id={`tab-${t}`}
                onClick={() => handleTabChange(t)}
                className={[
                  'flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  tab === t
                    ? 'bg-lime-400 text-black'
                      : 'text-gray-400 hover:text-white',
                  ].join(' ')}
                >
                  {t === 'login' ? 'Sign In' : 'Register'}
                </button>
              ))}
            </div>

            {/* ── Login Form ── */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <Input
                  id="login-email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="email"
                  required
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                />
                <Input
                  id="login-password"
                  label="Password"
                  type="password"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                id="login-submit"
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full mt-1"
              >
                Sign In
              </Button>

              <p className="text-center text-xs text-gray-500 mt-2">
                Don&#39;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleTabChange('register')}
                  className="text-lime-400 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </form>
          )}

          {/* ── Register Form ── */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <Input
                id="reg-name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                autoComplete="name"
                required
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              />
              <Input
                id="reg-email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                autoComplete="email"
                required
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              />
              <Input
                id="reg-password"
                label="Password"
                type="password"
                placeholder="Min 8 characters"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                autoComplete="new-password"
                required
              />

              {error && (
                <div className="bg-red-900/30 border border-red-700 rounded-xl px-4 py-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                id="register-submit"
                type="submit"
      </div>
    </div>
  )
}

