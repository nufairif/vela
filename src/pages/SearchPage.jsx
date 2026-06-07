import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/product/ProductCard'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'
import { usePageSeo } from '../hooks/usePageSeo'

function searchProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.colors.some((c) => c.toLowerCase().includes(q))
  )
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const results = useMemo(() => searchProducts(query), [query])

  usePageSeo(
    query ? `Cari "${query}"` : 'Cari Produk',
    query
      ? `${results.length} hasil untuk "${query}" di VELA.`
      : 'Cari koleksi pakaian VELA berdasarkan nama, kategori, atau warna.'
  )

  return (
    <PageShell>
      <div className="page search-page">
        <header className="search-page__header">
          <h1>Cari Produk</h1>
          <form
            className="search-page__form"
            onSubmit={(e) => {
              e.preventDefault()
              const q = new FormData(e.target).get('q')
              setParams(q ? { q: String(q) } : {})
            }}
          >
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Cari nama, kategori, atau warna..."
              aria-label="Kata kunci pencarian"
            />
            <button type="submit" className="btn btn--primary">Cari</button>
          </form>
          {query && (
            <p className="search-page__meta">
              {results.length} hasil untuk &ldquo;{query}&rdquo;
            </p>
          )}
        </header>

        {query && results.length === 0 ? (
          <div className="search-page__empty">
            <p>Tidak ada produk yang cocok.</p>
            <Link to="/shop" className="btn btn--ghost">Lihat Semua Produk</Link>
          </div>
        ) : (
          <div className="shop-grid__items search-page__grid">
            {(query ? results : products).map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.04}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  )
}