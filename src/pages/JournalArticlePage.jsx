import { useParams, Link, Navigate } from 'react-router-dom'
import { getJournalPost, journalPosts } from '../data/journal'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

export default function JournalArticlePage() {
  const { slug } = useParams()
  const post = getJournalPost(slug)

  if (!post) return <Navigate to="/journal" replace />

  const others = journalPosts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <PageShell>
    <article className="page article-page">
      <div className="article-page__header">
        <Link to="/journal" className="breadcrumb">← Journal</Link>
        <span className="article-page__meta">{post.category} · {post.date} · {post.readTime}</span>
        <h1>{post.title}</h1>
        <p className="article-page__excerpt">{post.excerpt}</p>
      </div>

      <div className="article-page__hero">
        <img src={post.image} alt={post.title} />
      </div>

      <div className="article-page__body">
        {post.content.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>

      {others.length > 0 && (
        <section className="article-page__more">
          <h2>More from the Journal</h2>
          <div className="journal-page__grid">
            {others.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.06}>
                <Link to={`/journal/${p.slug}`} className="journal-card">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="journal-card__text">
                    <span>{p.category}</span>
                    <h3>{p.title}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </article>
    </PageShell>
  )
}