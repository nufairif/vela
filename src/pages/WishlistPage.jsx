import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { loginPath } from '../utils/auth'
import ProductCard from '../components/product/ProductCard'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'

export default function WishlistPage() {
  const { isLoggedIn } = useAuth()
  const { items, count } = useWishlist()

  if (!isLoggedIn) return <Navigate to={loginPath('/wishlist')} replace />

  return (
    <PageShell>
      <div className="page wishlist-page">
        <PageHero
          compact
          eyebrow="Favorit Anda"
          title="Wishlist"
          subtitle={count > 0
            ? `${count} produk tersimpan — siap saat Anda butuh.`
            : 'Simpan produk favorit untuk dibeli nanti.'}
        />

        {items.length > 0 ? (
          <section className="wishlist-page__grid">
            {items.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.04}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </section>
        ) : (
          <ScrollReveal>
            <div className="wishlist-empty">
              <p>Wishlist Anda masih kosong.</p>
              <Link to="/shop" className="btn btn--primary">Mulai Belanja</Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </PageShell>
  )
}