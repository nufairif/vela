import { Link } from 'react-router-dom'
import { journalPosts } from '../data/journal'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

export default function JournalPage() {
  const [featured, ...rest] = journalPosts

  return (
    <PageShell>
    <div className="page journal-page">
      <PageHero
        compact
        eyebrow="Journal"
        title="Notes & Stories"
        subtitle="Style guides, care tips, and behind-the-scenes from the VELA studio."
      />

      <ScrollReveal>
        <Link to={`/journal/${featured.slug}`} className="journal-featured">
          <img src={featured.image} alt={featured.title} loading="lazy" />
          <div className="journal-featured__text">
            <span>{featured.category} · {featured.date}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="journal-featured__read">Read article →</span>
          </div>
        </Link>
      </ScrollReveal>

      <div className="journal-page__grid">
        {rest.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.08}>
            <Link to={`/journal/${post.slug}`} className="journal-card">
              <img src={post.image} alt={post.title} loading="lazy" />
              <div className="journal-card__text">
                <span>{post.category} · {post.readTime}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
    </PageShell>
  )
}