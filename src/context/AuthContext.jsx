import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { ensureDemoUser, seedDemoUserData, syncDemoSeedIfNeeded } from '../utils/seed'
import { loadProfile, saveProfile } from '../utils/userData'

const USERS_KEY = 'vela_users'
const SESSION_KEY = 'vela_session'

const AuthContext = createContext(null)

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({ phone: '', notifications: { email: true, sms: false } })

  const syncProfile = useCallback((email) => {
    setProfile(loadProfile(email))
  }, [])

  useEffect(() => {
    ensureDemoUser()
    syncDemoSeedIfNeeded()

    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
      if (session?.email) {
        seedDemoUserData(session.email)
        const found = loadUsers().find((u) => u.email === session.email)
        if (found) {
          setUser({ name: found.name, email: found.email })
          syncProfile(found.email)
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [syncProfile])

  const register = useCallback(({ name, email, password }) => {
    const users = loadUsers()
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: 'Email sudah terdaftar.' }
    }
    const newUser = { name, email, password }
    saveUsers([...users, newUser])
    saveProfile(email, { phone: '', notifications: { email: true, sms: false } })
    const session = { name, email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    syncProfile(email)
    return { ok: true }
  }, [syncProfile])

  const login = useCallback(({ email, password }) => {
    const found = loadUsers().find((u) => u.email === email)
    if (!found || found.password !== password) {
      return { ok: false, error: 'Email atau password salah.' }
    }
    seedDemoUserData(found.email)
    const session = { name: found.name, email: found.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    syncProfile(found.email)
    return { ok: true }
  }, [syncProfile])

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    setProfile({ phone: '', notifications: { email: true, sms: false } })
  }, [])

  const updateProfile = useCallback(({ name, phone }) => {
    if (!user) return { ok: false, error: 'Anda belum masuk.' }

    const users = loadUsers()
    const idx = users.findIndex((u) => u.email === user.email)
    if (idx === -1) return { ok: false, error: 'Akun tidak ditemukan.' }

    users[idx] = { ...users[idx], name: name.trim() }
    saveUsers(users)

    const nextProfile = { ...loadProfile(user.email), phone: phone.trim() }
    saveProfile(user.email, nextProfile)

    const session = { name: name.trim(), email: user.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    setProfile(nextProfile)
    return { ok: true }
  }, [user])

  const updateSettings = useCallback(({ notifications }) => {
    if (!user) return { ok: false, error: 'Anda belum masuk.' }

    const nextProfile = { ...loadProfile(user.email), notifications }
    saveProfile(user.email, nextProfile)
    setProfile(nextProfile)
    return { ok: true }
  }, [user])

  const changePassword = useCallback(({ currentPassword, newPassword }) => {
    if (!user) return { ok: false, error: 'Anda belum masuk.' }
    if (newPassword.length < 6) {
      return { ok: false, error: 'Password baru minimal 6 karakter.' }
    }

    const users = loadUsers()
    const idx = users.findIndex((u) => u.email === user.email)
    if (idx === -1) return { ok: false, error: 'Akun tidak ditemukan.' }
    if (users[idx].password !== currentPassword) {
      return { ok: false, error: 'Password saat ini salah.' }
    }

    users[idx] = { ...users[idx], password: newPassword }
    saveUsers(users)
    return { ok: true }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        register,
        login,
        logout,
        updateProfile,
        updateSettings,
        changePassword,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}