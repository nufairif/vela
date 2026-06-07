import { useState } from 'react'
import { Link } from 'react-router-dom'
import WishlistButton from '../ui/WishlistButton'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className="product"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="product__media">
        <Link to={`/products/${product.id}`} className="product__link">
          <img src={product.image} alt={product.name} className="product__img" loading="lazy" />
          <img
            src={product.altImage}
            alt=""
            className={`product__img product__img--alt ${hovered ? 'is-active' : ''}`}
            aria-hidden="true"
            loading="lazy"
          />
          {product.badge && <span className="product__badge">{product.badge}</span>}
          <span className="product__quick">Quick View</span>
        </Link>
        <WishlistButton productId={product.id} className="product__wishlist" />
      </div>
      <Link to={`/products/${product.id}`} className="product__info-link">
        <div className="product__info">
          <h3>{product.name}</h3>
          <p>{product.priceLabel}</p>
        </div>
      </Link>
    </article>
  )
}