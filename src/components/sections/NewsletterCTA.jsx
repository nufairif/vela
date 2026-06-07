import ScrollReveal from '../ui/ScrollReveal'

export default function NewsletterCTA() {
  return (
    <ScrollReveal>
      <section className="newsletter">
        <div className="newsletter__inner">
          <h2>Stay in the loop</h2>
          <p>Early access to new drops, styling notes, and exclusive offers — no spam.</p>
          <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" required aria-label="Email address" />
            <button type="submit" className="btn btn--light">Subscribe</button>
          </form>
        </div>
      </section>
    </ScrollReveal>
  )
}