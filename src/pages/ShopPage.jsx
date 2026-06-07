import { useState, useMemo } from 'react'
import { products } from '../data/products'
import { productFilters } from '../data/site'
import ProductCard from '../components/product/ProductCard'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

const sortOptions = [
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low' },
  { id: 'price-desc', label: 'Price: High' },
  { id: 'name', label: 'Name' },
]

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sort, setSort] = useState('newest')

  const filtered = useMemo(() => {
    let list = activeFilter === 'all'
      ? [...products]
      : products.filter((p) => p.category === activeFilter)

    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      case 'name':
        return list.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return list
    }
  }, [activeFilter, sort])

  return (
    <PageShell>
    <div className="page shop-page">
      <PageHero
        compact
        eyebrow="All Products"
        title="Shop"
        subtitle="Explore the full VELA collection — essentials designed to last beyond the season."
      />

      <section className="shop-page__content">
        <div className="shop-page__toolbar">
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
          <select className="shop-page__sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>{o.label}</option>
            ))}
          </select>
        </div>

        <p className="shop-page__count">{filtered.length} items</p>

        <div className="shop-grid__items shop-grid__items--page">
          {filtered.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.04}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
    </PageShell>
  )
}