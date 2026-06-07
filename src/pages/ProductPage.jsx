import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { getStock, getStockStatus } from '../utils/inventory'
import { getAverageRating } from '../utils/reviews'
import { usePageSeo } from '../hooks/usePageSeo'
import ProductCard from '../components/product/ProductCard'
import ProductReviews from '../components/product/ProductReviews'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageShell from '../components/layout/PageShell'
import WishlistButton from '../components/ui/WishlistButton'

export default function ProductPage() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addItem } = useCart()
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')

  if (!product) return <Navigate to="/shop" replace />

  const averageRating = getAverageRating(product.id)
  const stock = size && color ? getStock(product.id, size, color) : null
  const stockStatus = stock !== null ? getStockStatus(stock) : null

  usePageSeo(product.name, product.description)

  const images = [product.image, product.altImage]
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAdd = () => {
    if (!size || !color) return
    const result = addItem(product, { size, color })
    if (result.ok) {
      setError('')
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } else {
      setError(result.error)
    }
  }

  const isVariantAvailable = (s, c) => getStock(product.id, s, c) > 0

  return (
    <PageShell>
      <div className="page product-page">
        <div className="product-page__breadcrumb">
          <Link to="/shop">Toko</Link>
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
            {averageRating !== null && (
              <p className="product-page__rating">★ {averageRating} ulasan</p>
            )}
            <p className="product-page__price">{product.priceLabel}</p>
            <p className="product-page__desc">{product.description}</p>

            <div className="product-page__option">
              <label>Warna</label>
              <div className="product-page__chips">
                {product.colors.map((c) => {
                  const available = size ? isVariantAvailable(size, c) : product.sizes.some((s) => isVariantAvailable(s, c))
                  return (
                    <button
                      key={c}
                      className={`option-chip ${color === c ? 'is-active' : ''}${!available ? ' is-disabled' : ''}`}
                      onClick={() => available && setColor(c)}
                      disabled={!available}
                    >
                      {c}
                      {!available && <span className="option-chip__oos">Habis</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="product-page__option">
              <label>Ukuran</label>
              <div className="product-page__chips">
                {product.sizes.map((s) => {
                  const available = color ? isVariantAvailable(s, color) : product.colors.some((c) => isVariantAvailable(s, c))
                  const sStock = color ? getStock(product.id, s, color) : null
                  return (
                    <button
                      key={s}
                      className={`option-chip ${size === s ? 'is-active' : ''}${!available ? ' is-disabled' : ''}`}
                      onClick={() => available && setSize(s)}
                      disabled={!available}
                    >
                      {s}
                      {sStock !== null && sStock > 0 && sStock <= 5 && (
                        <span className="option-chip__low">{sStock}</span>
                      )}
                      {!available && <span className="option-chip__oos">Habis</span>}
                    </button>
                  )
                })}
              </div>
              <Link to="/size-guide" className="product-page__size-link">Panduan ukuran</Link>
            </div>

            {stockStatus && (
              <p className={`product-page__stock product-page__stock--${stockStatus.level}`}>
                {stockStatus.label}
              </p>
            )}

            {error && <p className="product-page__error">{error}</p>}

            <div className="product-page__actions">
              <button
                className="btn btn--primary product-page__add"
                onClick={handleAdd}
                disabled={!size || !color || stock === 0}
              >
                {added ? 'Ditambahkan ✓' : 'Tambah ke Keranjang'}
              </button>
              <WishlistButton productId={product.id} className="product-page__wishlist-btn" />
            </div>

            <div className="product-page__details">
              <h3>Detail</h3>
              <ul>
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <ProductReviews productId={product.id} />

        {related.length > 0 && (
          <section className="product-page__related">
            <h2>Mungkin Anda suka</h2>
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