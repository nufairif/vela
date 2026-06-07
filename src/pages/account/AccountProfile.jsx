import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ScrollReveal from '../../components/ui/ScrollReveal'

export default function AccountProfile() {
  const { user, profile, updateProfile } = useAuth()
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(profile.phone)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    const result = updateProfile({ name, phone })
    if (result.ok) {
      setMessage('Profil berhasil diperbarui.')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="account-panel">
      <ScrollReveal>
        <header className="account-panel__header">
          <span className="account-panel__eyebrow">Informasi</span>
          <h1>Profil</h1>
          <p>Perbarui nama dan informasi kontak Anda.</p>
        </header>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <form className="account-form" onSubmit={handleSubmit}>
          {error && <p className="account-form__error">{error}</p>}
          {message && <p className="account-form__success">{message}</p>}

          <label>
            Nama lengkap
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input type="email" value={user.email} disabled />
            <small className="account-form__hint">Email tidak dapat diubah.</small>
          </label>

          <label>
            Nomor telepon
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
          </label>

          <button type="submit" className="btn btn--primary">Simpan Perubahan</button>
        </form>
      </ScrollReveal>
    </div>
  )
}