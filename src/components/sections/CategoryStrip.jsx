import { Link } from 'react-router-dom'
import { homeCategories } from '../../data/collections'
import ScrollReveal from '../ui/ScrollReveal'

export default function CategoryStrip() {
  return (
    <section className="categories">
      <ScrollReveal>
        <div className="section-label">
          <span>Categories</span>
          <span className="section-label__line" />
        </div>
      </ScrollReveal>

      <div className="categories__track">
        {homeCategories.map((cat, i) => (
          <ScrollReveal key={cat.title} delay={i * 0.08}>
            <Link to={cat.href} className="category-item">
              <span className="category-item__num">{cat.num}</span>
              <div className="category-item__img">
                <img src={cat.image} alt={cat.title} loading="lazy" />
              </div>
              <div className="category-item__text">
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </div>
              <span className="category-item__arrow">→</span>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}