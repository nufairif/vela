import { useState } from 'react'
import { Link, useNavigate, Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { safeRedirect, registerPath } from '../utils/auth'
import { demoUser } from '../data/seed'
import ScrollReveal from '../components/ui/ScrollReveal'

const redirectMessages = {
  '/wishlist': 'Masuk untuk menyimpan dan melihat wishlist Anda.',
  '/checkout': 'Masuk untuk melanjutkan ke checkout.',
}

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = safeRedirect(searchParams.get('redirect'))
  const openCart = searchParams.get('cart') === '1'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isLoggedIn) {
    return <Navigate to={redirect} replace state={openCart ? { openCart: true } : undefined} />
  }

  const subtitle = openCart
    ? 'Masuk untuk menambahkan produk ke keranjang dan melanjutkan belanja.'
    : redirectMessages[redirect] || 'Masuk ke akun VELA Anda untuk melanjutkan belanja.'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login({ email, password })
    if (result.ok) {
      navigate(redirect, { state: openCart ? { openCart: true } : undefined })
    } else {
      setError(result.error)
    }
  }

  const fillDemo = () => {
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    setError('')
  }

  return (
    <div className="page auth-page">
      <ScrollReveal>
        <div className="auth-card">
          <span className="auth-card__eyebrow">Selamat datang kembali</span>
          <h1>Masuk</h1>
          <p className="auth-card__subtitle">{subtitle}</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="auth-form__error">{error}</p>}
            <label>
              Email
              <input
                type="email"
                name="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn--primary auth-form__submit">Masuk</button>
          </form>

          <div className="auth-card__demo">
            <span className="auth-card__demo-label">Coba tanpa daftar</span>
            <button type="button" className="btn btn--ghost auth-card__demo-btn" onClick={fillDemo}>
              Gunakan Akun Demo
            </button>
            <p className="auth-card__demo-hint">
              Mengisi email <strong>{demoUser.email}</strong> dan password demo secara otomatis.
            </p>
          </div>

          <p className="auth-card__footer">
            Belum punya akun? <Link to={registerPath(redirect, { openCart })}>Daftar</Link>
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}