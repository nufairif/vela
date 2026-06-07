import { useParams, Link, Navigate } from 'react-router-dom'
import { getCollectionBySlug } from '../data/collections'
import { getProductsByCollection } from '../data/products'
import ProductCard from '../components/product/ProductCard'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

export default function CollectionPage() {
  const { slug } = useParams()
  const collection = getCollectionBySlug(slug)
  const items = getProductsByCollection(slug)

  if (!collection) return <Navigate to="/collections" replace />

  return (
    <PageShell>
    <div className="page collection-detail">
      <section className="collection-detail__hero">
        <img src={collection.image} alt={collection.title} />
        <div className="collection-detail__hero-text">
          <Link to="/collections" className="breadcrumb">← Collections</Link>
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
        </div>
      </section>

      <section className="collection-detail__products">
        <p className="shop-page__count">{items.length} items</p>
        <div className="shop-grid__items shop-grid__items--page">
          {items.length > 0 ? (
            items.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.04}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))
          ) : (
            <p className="empty-state">No products in this collection yet.</p>
          )}
        </div>
      </section>
    </div>
    </PageShell>
  )
}