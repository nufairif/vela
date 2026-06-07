import { useState } from 'react'
import { usePageSeo } from '../hooks/usePageSeo'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { demoUser } from '../data/seed'
import { demoTrackingSamples } from '../data/trackingSamples'
import { findOrder } from '../utils/userData'
import TrackingSummary from '../components/tracking/TrackingSummary'
import TrackingTimeline from '../components/tracking/TrackingTimeline'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'

export default function TrackPage() {
  usePageSeo('Lacak Paket', 'Lacak status pengiriman pesanan VELA dengan nomor resi atau ID pesanan.')

  const { isLoggedIn, user } = useAuth()
  const [query, setQuery] = useState('')
  const [email, setEmail] = useState(isLoggedIn ? user?.email || demoUser.email : demoUser.email)
  const [formError, setFormError] = useState('')
  const [inlineResult, setInlineResult] = useState(null)

  const lookupOrder = (searchQuery, searchEmail = email) => {
    const found = findOrder(searchQuery, isLoggedIn ? { email: user.email } : {})
    if (!found) return { error: 'Pesanan tidak ditemukan.' }

    if (!isLoggedIn && searchEmail.trim().toLowerCase() !== found.order.customer?.email?.toLowerCase()) {
      return { error: 'Email tidak cocok dengan pesanan ini.' }
    }

    return { order: found.order }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setFormError('')
    setInlineResult(null)

    const result = lookupOrder(query)
    if (result.error) {
      setFormError(result.error)
      return
    }

    setInlineResult({ source: 'form', order: result.order })
  }

  const viewSample = (sample) => {
    setFormError('')
    setQuery(sample.query)
    if (!isLoggedIn) setEmail(demoUser.email)

    const isSameCard = inlineResult?.source === sample.query
    if (isSameCard) {
      setInlineResult(null)
      return
    }

    const result = lookupOrder(sample.query, isLoggedIn ? user.email : demoUser.email)
    if (result.error) {
      setFormError(result.error)
      setInlineResult(null)
      return
    }

    setInlineResult({ source: sample.query, order: result.order })
  }

  return (
    <div className="page track-page">
      <PageHero
        compact
        eyebrow="Pelacakan"
        title="Lacak Paket"
        subtitle="Masukkan nomor pesanan — nomor resi dan riwayat pengiriman akan ditampilkan otomatis."
      />

      <div className="track-page__inner">
        <ScrollReveal>
          <form className="track-form" onSubmit={handleSearch}>
            {formError && <p className="track-form__error">{formError}</p>}
            <label>
              No. Pesanan
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="VELA-XXXXXX"
                required
              />
            </label>
            {!isLoggedIn && (
              <label>
                Email pemesan
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  required
                />
              </label>
            )}
            <button type="submit" className="btn btn--primary">Lacak</button>
            {isLoggedIn && (
              <p className="track-form__hint">
                Atau lihat semua pesanan di <Link to="/account/orders">Pesanan Saya</Link>
              </p>
            )}
          </form>
        </ScrollReveal>

        {inlineResult?.source === 'form' && (
          <ScrollReveal>
            <div className="track-inline-result">
              <TrackingSummary order={inlineResult.order} />
              <section className="tracking-section tracking-section--inline">
                <h2>Riwayat Pengiriman</h2>
                <TrackingTimeline
                  manifest={inlineResult.order.tracking?.manifest}
                  delivered={inlineResult.order.tracking?.delivered}
                />
              </section>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.04}>
          <section className="track-samples">
            <div className="track-samples__head">
              <h2>Contoh Data Demo</h2>
              <p>Klik <strong>Lihat</strong> pada contoh pesanan — detail tracking terbuka di kartu yang sama.</p>
            </div>
            <ul className="track-samples__list">
              {demoTrackingSamples.map((sample) => {
                const isExpanded = inlineResult?.source === sample.query

                return (
                  <li
                    key={sample.query}
                    className={`track-sample-card${isExpanded ? ' is-expanded' : ''}`}
                  >
                    <div className="track-sample-card__header">
                      <div className="track-sample-card__info">
                        <span className="track-sample-card__label">{sample.label}</span>
                        <strong>{sample.query}</strong>
                        <p>{sample.description}</p>
                      </div>
                      <button
                        type="button"
                        className={`btn btn--ghost track-sample-card__btn${isExpanded ? ' is-active' : ''}`}
                        onClick={() => viewSample(sample)}
                      >
                        {isExpanded ? 'Tutup' : 'Lihat'}
                      </button>
                    </div>

                    {isExpanded && inlineResult.order && (
                      <div className="track-sample-card__detail">
                        <TrackingSummary order={inlineResult.order} />
                        <section className="tracking-section tracking-section--inline">
                          <h2>Riwayat Pengiriman</h2>
                          <TrackingTimeline
                            manifest={inlineResult.order.tracking?.manifest}
                            delivered={inlineResult.order.tracking?.delivered}
                          />
                        </section>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
            {!isLoggedIn && (
              <p className="track-samples__note">
                Email demo: <strong>{demoUser.email}</strong>
              </p>
            )}
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}