import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import { productFilters } from '../../data/site'
import ProductCard from '../product/ProductCard'
import ScrollReveal from '../ui/ScrollReveal'

export default function ProductGrid({ limit, showFooter = false }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? products
    : products.filter((p) => p.category === activeFilter)

  const displayed = limit ? filtered.slice(0, limit) : filtered

  return (
    <section className="shop-grid">
      <ScrollReveal>
        <div className="shop-grid__header">
          <div>
            <div className="section-label">
              <span>Shop</span>
              <span className="section-label__line" />
            </div>
            <h2 className="shop-grid__title">New Arrivals</h2>
          </div>

          <div className="shop-grid__filters">
            {productFilters.map((f) => (
              <button
                key={f.id}
                className={`filter-chip ${activeFilter === f.id ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <div className="shop-grid__items">
        {displayed.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 0.06}>
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>

      {showFooter && (
        <ScrollReveal>
          <div className="shop-grid__footer">
            <Link to="/shop" className="btn btn--outline">View All Products</Link>
          </div>
        </ScrollReveal>
      )}
    </section>
  )
}