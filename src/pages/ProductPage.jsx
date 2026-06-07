import { useState } from 'react'
import { useParams, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { loginPath } from '../utils/auth'
import ProductCard from '../components/product/ProductCard'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'
import WishlistButton from '../components/ui/WishlistButton'

export default function ProductPage() {
  const { id } = useParams()
  const product = getProductById(id)
  const { isLoggedIn } = useAuth()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) return <Navigate to="/shop" replace />

  const images = [product.image, product.altImage]
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAdd = () => {
    if (!size || !color) return
    if (!isLoggedIn) {
      navigate(loginPath(location.pathname, { openCart: true }))
      return
    }
    if (addItem(product, { size, color })) {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  return (
    <PageShell>
      <div className="page product-page">
        <div className="product-page__breadcrumb">
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <Link to={`/collections/${product.category}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-page__layout">
          <div className="product-page__gallery">
            <div className="product-page__main-img">
              <img src={images[activeImage]} alt={product.name} />
              <WishlistButton productId={product.id} className="product-page__wishlist" />
            </div>
            <div className="product-page__thumbs">
              {images.map((src, i) => (
                <button
                  key={src}
                  className={activeImage === i ? 'is-active' : ''}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="product-page__info">
            {product.badge && <span className="product-page__badge">{product.badge}</span>}
            <h1>{product.name}</h1>
            <p className="product-page__price">{product.priceLabel}</p>
            <p className="product-page__desc">{product.description}</p>

            <div className="product-page__option">
              <label>Color</label>
              <div className="product-page__chips">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`option-chip ${color === c ? 'is-active' : ''}`}
                    onClick={() => setColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-page__option">
              <label>Size</label>
              <div className="product-page__chips">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`option-chip ${size === s ? 'is-active' : ''}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <Link to="/size-guide" className="product-page__size-link">Size guide</Link>
            </div>

            <div className="product-page__actions">
              <button
                className="btn btn--primary product-page__add"
                onClick={handleAdd}
                disabled={!size || !color}
              >
                {added ? 'Added to Bag ✓' : 'Add to Bag'}
              </button>
              <WishlistButton productId={product.id} className="product-page__wishlist-btn" />
            </div>

            <div className="product-page__details">
              <h3>Details</h3>
              <ul>
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="product-page__related">
            <h2>You may also like</h2>
            <div className="shop-grid__items">
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.06}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  )
}