import { Link } from 'react-router-dom'
import { collections } from '../data/collections'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

export default function CollectionsPage() {
  return (
    <PageShell>
    <div className="page collections-page">
      <PageHero
        compact
        eyebrow="Curated Edits"
        title="Collections"
        subtitle="Focused edits built around fabric, mood, and season."
      />

      <section className="collections-page__grid">
        {collections.map((col, i) => (
          <ScrollReveal key={col.slug} delay={i * 0.06}>
            <Link to={`/collections/${col.slug}`} className="collection-card">
              <div className="collection-card__img">
                <img src={col.image} alt={col.title} loading="lazy" />
              </div>
              <div className="collection-card__body">
                <span className="collection-card__count">{col.productCount} pieces</span>
                <h2>{col.title}</h2>
                <p>{col.subtitle}</p>
                <span className="collection-card__link">View collection →</span>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </section>
    </div>
    </PageShell>
  )
}