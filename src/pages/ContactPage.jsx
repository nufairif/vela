import { contactInfo } from '../data/site'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

export default function ContactPage() {
  return (
    <PageShell newsletter={false}>
    <div className="page contact-page">
      <PageHero
        compact
        eyebrow="Get in Touch"
        title="Contact"
        subtitle="Questions about orders, sizing, or partnerships — we are here to help."
      />

      <div className="contact-page__layout">
        <ScrollReveal className="contact-page__info">
          <div className="contact-block">
            <h3>Email</h3>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </div>
          <div className="contact-block">
            <h3>Phone</h3>
            <p>{contactInfo.phone}</p>
            <span>{contactInfo.hours}</span>
          </div>
          <div className="contact-block">
            <h3>Store</h3>
            <p>{contactInfo.address}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-form__row">
              <label>
                Name
                <input type="text" required />
              </label>
              <label>
                Email
                <input type="email" required />
              </label>
            </div>
            <label>
              Subject
              <select>
                <option>Order inquiry</option>
                <option>Returns & exchanges</option>
                <option>Size guide</option>
                <option>Wholesale</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Message
              <textarea rows={5} required />
            </label>
            <button type="submit" className="btn btn--primary">Send Message</button>
          </form>
        </ScrollReveal>
      </div>
    </div>
    </PageShell>
  )
}