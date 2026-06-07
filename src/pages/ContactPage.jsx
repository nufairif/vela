import { useState } from 'react'
import { contactInfo } from '../data/site'
import { submitContact } from '../utils/forms'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  usePageSeo('Kontak', 'Hubungi tim VELA untuk pertanyaan pesanan, ukuran, atau kemitraan.')

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    submitContact({
      name: String(form.get('name')),
      email: String(form.get('email')),
      subject: String(form.get('subject')),
      message: String(form.get('message')),
    })
    setSent(true)
    e.target.reset()
  }

  return (
    <PageShell newsletter={false}>
      <div className="page contact-page">
        <PageHero
          compact
          eyebrow="Hubungi Kami"
          title="Kontak"
          subtitle="Pertanyaan tentang pesanan, ukuran, atau kemitraan — kami siap membantu."
        />

        <div className="contact-page__layout">
          <ScrollReveal className="contact-page__info">
            <div className="contact-block">
              <h3>Email</h3>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </div>
            <div className="contact-block">
              <h3>Telepon</h3>
              <p>{contactInfo.phone}</p>
              <span>{contactInfo.hours}</span>
            </div>
            <div className="contact-block">
              <h3>Toko</h3>
              <p>{contactInfo.address}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {sent ? (
              <div className="form-success">
                <h3>Pesan terkirim</h3>
                <p>Terima kasih! Tim kami akan membalas dalam 1–2 hari kerja.</p>
                <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
                  Kirim pesan lain
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <label>
                    Nama
                    <input type="text" name="name" required />
                  </label>
                  <label>
                    Email
                    <input type="email" name="email" required />
                  </label>
                </div>
                <label>
                  Subjek
                  <select name="subject" defaultValue="Pertanyaan pesanan">
                    <option>Pertanyaan pesanan</option>
                    <option>Pengembalian & penukaran</option>
                    <option>Panduan ukuran</option>
                    <option>Wholesale</option>
                    <option>Lainnya</option>
                  </select>
                </label>
                <label>
                  Pesan
                  <textarea name="message" rows={5} required />
                </label>
                <button type="submit" className="btn btn--primary">Kirim Pesan</button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </PageShell>
  )
}