import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import ScrollReveal from '../../components/ui/ScrollReveal'

export default function AccountSettings() {
  const { profile, updateSettings, changePassword } = useAuth()
  const [notifications, setNotifications] = useState(profile.notifications)
  const [settingsMessage, setSettingsMessage] = useState('')
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const toggleNotification = (key) => {
    const next = { ...notifications, [key]: !notifications[key] }
    setNotifications(next)
    const result = updateSettings({ notifications: next })
    if (result.ok) setSettingsMessage('Preferensi notifikasi disimpan.')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setPasswordMessage('')
    setPasswordError('')

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Konfirmasi password tidak cocok.')
      return
    }

    const result = changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    })

    if (result.ok) {
      setPasswordMessage('Password berhasil diubah.')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } else {
      setPasswordError(result.error)
    }
  }

  return (
    <div className="account-panel">
      <ScrollReveal>
        <header className="account-panel__header">
          <span className="account-panel__eyebrow">Preferensi</span>
          <h1>Pengaturan</h1>
          <p>Atur notifikasi dan keamanan akun Anda.</p>
        </header>
      </ScrollReveal>

      <ScrollReveal delay={0.06}>
        <section className="account-settings-group">
          <h2>Notifikasi</h2>
          {settingsMessage && <p className="account-form__success">{settingsMessage}</p>}
          <label className="account-toggle">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => toggleNotification('email')}
            />
            <span>
              <strong>Email</strong>
              <small>Update pesanan, promo, dan rekomendasi produk.</small>
            </span>
          </label>
          <label className="account-toggle">
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={() => toggleNotification('sms')}
            />
            <span>
              <strong>SMS / WhatsApp</strong>
              <small>Notifikasi pengiriman dan status pesanan.</small>
            </span>
          </label>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <section className="account-settings-group">
          <h2>Keamanan</h2>
          <form className="account-form" onSubmit={handlePasswordSubmit}>
            {passwordError && <p className="account-form__error">{passwordError}</p>}
            {passwordMessage && <p className="account-form__success">{passwordMessage}</p>}
            <label>
              Password saat ini
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                }
                required
              />
            </label>
            <label>
              Password baru
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
                }
                required
                minLength={6}
              />
            </label>
            <label>
              Konfirmasi password baru
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
                required
                minLength={6}
              />
            </label>
            <button type="submit" className="btn btn--primary">Ubah Password</button>
          </form>
        </section>
      </ScrollReveal>
    </div>
  )
}