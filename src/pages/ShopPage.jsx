import { useState, useMemo } from 'react'
import { usePageSeo } from '../hooks/usePageSeo'
import { products } from '../data/products'
import { productFilters } from '../data/site'
import ProductCard from '../components/product/ProductCard'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

const sortOptions = [
  { id: 'newest', label: 'Terbaru' },
  { id: 'price-asc', label: 'Harga: Rendah' },
  { id: 'price-desc', label: 'Harga: Tinggi' },
  { id: 'name', label: 'Nama' },
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

  usePageSeo('Toko', 'Jelajahi koleksi lengkap VELA — pakaian esensial yang dirancang untuk bertahan melewati musim.')

  return (
    <PageShell>
    <div className="page shop-page">
      <PageHero
        compact
        eyebrow="Semua Produk"
        title="Toko"
        subtitle="Jelajahi koleksi lengkap VELA — pakaian esensial yang dirancang untuk bertahan melewati musim."
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

        <p className="shop-page__count">{filtered.length} produk</p>

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