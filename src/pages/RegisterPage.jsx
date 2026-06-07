import { useState } from 'react'
import { Link, useNavigate, Navigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { safeRedirect, loginPath } from '../utils/auth'
import ScrollReveal from '../components/ui/ScrollReveal'

const redirectMessages = {
  '/wishlist': 'Buat akun untuk menyimpan produk favorit Anda.',
  '/checkout': 'Buat akun untuk menyelesaikan pesanan.',
}

export default function RegisterPage() {
  const { register, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = safeRedirect(searchParams.get('redirect'))
  const openCart = searchParams.get('cart') === '1'
  const [error, setError] = useState('')

  if (isLoggedIn) {
    return <Navigate to={redirect} replace state={openCart ? { openCart: true } : undefined} />
  }

  const subtitle = openCart
    ? 'Buat akun untuk menambahkan produk ke keranjang dan melanjutkan belanja.'
    : redirectMessages[redirect] || 'Buat akun untuk menyimpan wishlist dan melacak pesanan.'

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const form = new FormData(e.target)
    const password = form.get('password')
    const confirm = form.get('confirm')

    if (password !== confirm) {
      setError('Konfirmasi password tidak cocok.')
      return
    }
    if (String(password).length < 6) {
      setError('Password minimal 6 karakter.')
      return
    }

    const result = register({
      name: form.get('name'),
      email: form.get('email'),
      password,
    })
    if (result.ok) {
      navigate(redirect, { state: openCart ? { openCart: true } : undefined })
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="page auth-page">
      <ScrollReveal>
        <div className="auth-card">
          <span className="auth-card__eyebrow">Bergabung dengan VELA</span>
          <h1>Daftar</h1>
          <p className="auth-card__subtitle">{subtitle}</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="auth-form__error">{error}</p>}
            <label>
              Nama lengkap
              <input type="text" name="name" required placeholder="Nama Anda" />
            </label>
            <label>
              Email
              <input type="email" name="email" required placeholder="nama@email.com" />
            </label>
            <label>
              Password
              <input type="password" name="password" required placeholder="Min. 6 karakter" />
            </label>
            <label>
              Konfirmasi password
              <input type="password" name="confirm" required placeholder="Ulangi password" />
            </label>
            <button type="submit" className="btn btn--primary auth-form__submit">Daftar</button>
          </form>

          <p className="auth-card__footer">
            Sudah punya akun? <Link to={loginPath(redirect, { openCart })}>Masuk</Link>
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}