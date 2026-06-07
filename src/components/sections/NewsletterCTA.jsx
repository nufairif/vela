import { useState } from 'react'
import { subscribeNewsletter } from '../../utils/forms'
import ScrollReveal from '../ui/ScrollReveal'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = subscribeNewsletter(email)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setError('')
    setMessage(result.already ? 'Anda sudah berlangganan.' : 'Berhasil berlangganan!')
    setEmail('')
    setTimeout(() => setMessage(''), 4000)
  }

  return (
    <ScrollReveal>
      <section className="newsletter">
        <div className="newsletter__inner">
          <h2>Tetap terhubung</h2>
          <p>Akses awal koleksi baru, tips gaya, dan penawaran eksklusif — tanpa spam.</p>
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email@anda.com"
              required
              aria-label="Alamat email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn--light">Berlangganan</button>
          </form>
          {error && <p className="newsletter__error">{error}</p>}
          {message && <p className="newsletter__success">{message}</p>}
        </div>
      </section>
    </ScrollReveal>
  )
}