import { useState, useEffect, useMemo } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { brand, navLinks } from '../../data/site'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { formatPrice } from '../../utils/currency'
import { loginPath } from '../../utils/auth'
import { SearchIcon, CartIcon, CloseIcon, HeartIcon, AccountIcon } from '../icons/Icons'
import Drawer from './Drawer'

export default function Header({ onCartOpen, cartOpen, onCartClose }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const { items, count, subtotal, removeItem } = useCart()
  const { user, isLoggedIn } = useAuth()
  const { count: wishlistCount } = useWishlist()
  const navigate = useNavigate()
  const location = useLocation()

  const handleCartOpen = () => {
    if (!isLoggedIn) {
      navigate(loginPath(location.pathname, { openCart: true }))
      return
    }
    onCartOpen()
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || cartOpen || searchOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, cartOpen, searchOpen])

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return []
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 6)
  }, [searchQuery])

  const goToProduct = (id) => {
    setSearchOpen(false)
    setSearchQuery('')
    navigate(`/products/${id}`)
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="site-header__inner">
          <button className="site-header__menu" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span /><span />
          </button>

          <Link to="/" className="site-header__logo">{brand.name}</Link>

          <nav className="site-header__nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) => isActive ? 'is-active' : ''}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <div className="site-header__auth">
              {isLoggedIn ? (
                <Link to="/account" className="site-header__auth-link site-header__auth-link--account">
                  <AccountIcon />
                  <span>{user.name.split(' ')[0]}</span>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="site-header__auth-link">Masuk</Link>
                  <Link to="/register" className="site-header__auth-btn">Daftar</Link>
                </>
              )}
            </div>
            <Link
              to={isLoggedIn ? '/wishlist' : loginPath('/wishlist')}
              className="site-header__action"
              aria-label="Wishlist"
            >
              <HeartIcon />
              {wishlistCount > 0 && <span className="site-header__cart-count">{wishlistCount}</span>}
            </Link>
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="site-header__action">
              <SearchIcon />
            </button>
            <button onClick={handleCartOpen} aria-label="Cart" className="site-header__action">
              <CartIcon />
              {count > 0 && <span className="site-header__cart-count">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="search-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="search-panel__inner">
              <input
                type="search"
                placeholder="Search products..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery('') }} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            {searchQuery.trim() && (
              <div className="search-panel__results">
                {searchResults.length > 0 ? (
                  searchResults.map((p) => (
                    <button key={p.id} className="search-panel__result" onClick={() => goToProduct(p.id)}>
                      <img src={p.image} alt="" />
                      <div>
                        <span>{p.name}</span>
                        <small>{p.priceLabel}</small>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="search-panel__empty">No products found</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Drawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} title="Menu">
        <nav className="mobile-nav">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: navLinks.length * 0.06 }}
          >
            <Link
              to={isLoggedIn ? '/wishlist' : loginPath('/wishlist')}
              onClick={() => setMenuOpen(false)}
            >
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (navLinks.length + 1) * 0.06 }}
          >
            {isLoggedIn ? (
              <Link to="/account" onClick={() => setMenuOpen(false)}>Akun Saya</Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Masuk</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="mobile-nav__register">
                  Daftar
                </Link>
              </>
            )}
          </motion.div>
        </nav>
      </Drawer>

      <Drawer isOpen={cartOpen} onClose={onCartClose} title="Bag">
        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your bag is empty</p>
            <Link to="/shop" className="btn btn--ghost" onClick={onCartClose}>Start Shopping</Link>
          </div>
        ) : (
          <div className="cart-drawer">
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={item.key} className="cart-drawer__item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="cart-drawer__info">
                    <span>{item.product.name}</span>
                    {(item.size || item.color) && (
                      <small>
                        {[item.color, item.size].filter(Boolean).join(' · ')}
                      </small>
                    )}
                    <small>Qty {item.qty} · {item.product.priceLabel}</small>
                  </div>
                  <button
                    className="cart-drawer__remove"
                    onClick={() => removeItem(item.key)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <Link to="/checkout" className="btn btn--primary" onClick={onCartClose}>
                Checkout
              </Link>
              <Link to="/shop" className="btn btn--ghost cart-drawer__continue" onClick={onCartClose}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </Drawer>
    </>
  )
}