import { aboutContent, story } from '../data/site'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

export default function AboutPage() {
  return (
    <PageShell>
    <div className="page about-page">
      <PageHero
        eyebrow="Our Story"
        title={aboutContent.title}
        subtitle={aboutContent.intro}
        image={aboutContent.image}
      />

      <section className="about-page__values">
        {aboutContent.values.map((v, i) => (
          <ScrollReveal key={v.title} delay={i * 0.08}>
            <div className="value-card">
              <span className="value-card__num">0{i + 1}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <ScrollReveal>
        <section className="about-page__quote">
          <blockquote>{story.quote}</blockquote>
          <p>{story.body}</p>
        </section>
      </ScrollReveal>

      <section className="about-page__sections" id="sustainability">
        <ScrollReveal>
          <div className="about-section" id="careers">
            <h2>Sustainability</h2>
            <p>We produce in small batches to reduce waste, prioritize natural fibers, and partner with factories that meet our ethical standards. Packaging is plastic-free and fully recyclable.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <div className="about-section" id="stores">
            <h2>Our Stores</h2>
            <p>Visit us at Kemang, Jakarta Selatan — a quiet space to try pieces, feel fabrics, and talk to our team. Open daily, 10am – 8pm.</p>
          </div>
        </ScrollReveal>
      </section>
    </div>
    </PageShell>
  )
}