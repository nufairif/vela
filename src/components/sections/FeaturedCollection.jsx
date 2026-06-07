import { Link } from 'react-router-dom'
import { homeFeatured } from '../../data/collections'
import ScrollReveal from '../ui/ScrollReveal'

export default function FeaturedCollection() {
  const [large, small] = homeFeatured

  return (
    <section className="featured">
      <ScrollReveal>
        <div className="section-label">
          <span>Featured</span>
          <span className="section-label__line" />
        </div>
      </ScrollReveal>

      <div className="featured__bento">
        <ScrollReveal className="featured__card featured__card--large">
          <Link to={large.href} className="featured__link">
            <img src={large.image} alt={large.title} loading="lazy" />
            <div className="featured__overlay">
              <span className="featured__tag">Collection</span>
              <h3>{large.title}</h3>
              <p>{large.subtitle}</p>
            </div>
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="featured__card featured__card--small">
          <Link to={small.href} className="featured__link">
            <img src={small.image} alt={small.title} loading="lazy" />
            <div className="featured__overlay">
              <span className="featured__tag">Collection</span>
              <h3>{small.title}</h3>
              <p>{small.subtitle}</p>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}