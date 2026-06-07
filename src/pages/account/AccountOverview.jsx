import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { loadOrders } from '../../utils/userData'
import { formatPrice } from '../../utils/currency'
import { getProductById } from '../../data/products'
import ScrollReveal from '../../components/ui/ScrollReveal'

const statusClass = {
  delivered: 'account-status--delivered',
  processing: 'account-status--processing',
  shipped: 'account-status--shipped',
  cancelled: 'account-status--cancelled',
}

export default function AccountOverview() {
  const { user } = useAuth()
  const { count: cartCount } = useCart()
  const { count: wishlistCount } = useWishlist()
  const orders = loadOrders(user.email)
  const recentOrders = orders.slice(0, 2)

  return (
    <div className="account-panel">
      <ScrollReveal>
        <header className="account-panel__header">
          <span className="account-panel__eyebrow">Akun Saya</span>
          <h1>Halo, {user.name.split(' ')[0]}</h1>
          <p>Kelola pesanan, profil, dan preferensi belanja Anda.</p>
        </header>
      </ScrollReveal>

      <div className="account-stats">
        <ScrollReveal>
          <Link to="/account/orders" className="account-stat">
            <span className="account-stat__num">{orders.length}</span>
            <span className="account-stat__label">Pesanan</span>
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <Link to="/wishlist" className="account-stat">
            <span className="account-stat__num">{wishlistCount}</span>
            <span className="account-stat__label">Wishlist</span>
          </Link>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Link to="/shop" className="account-stat">
            <span className="account-stat__num">{cartCount}</span>
            <span className="account-stat__label">Di Keranjang</span>
          </Link>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.12}>
        <section className="account-section">
          <div className="account-section__head">
            <h2>Pesanan Terbaru</h2>
            {orders.length > 0 && (
              <Link to="/account/orders" className="account-section__link">Lihat semua</Link>
            )}
          </div>

          {recentOrders.length === 0 ? (
            <div className="account-empty">
              <p>Belum ada pesanan.</p>
              <Link to="/shop" className="btn btn--ghost">Mulai Belanja</Link>
            </div>
          ) : (
            <ul className="account-order-list">
              {recentOrders.map((order) => (
                <li key={order.id} className="account-order-card account-order-card--compact">
                  <div className="account-order-card__top">
                    <div>
                      <strong>#{order.id}</strong>
                      <small>{new Date(order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</small>
                    </div>
                    <span className={`account-status ${statusClass[order.status] || ''}`}>
                      {order.statusLabel}
                    </span>
                  </div>
                  <p className="account-order-card__items">
                    {order.items.map((item) => getProductById(item.productId)?.name).filter(Boolean).join(', ')}
                  </p>
                  <div className="account-order-card__compact-footer">
                    <span className="account-order-card__total">{formatPrice(order.total)}</span>
                    {order.tracking && (
                      <Link to={`/account/orders/${order.id}/track`} className="account-order-card__track">
                        Lacak Paket
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.16}>
        <div className="account-quick-links">
          <Link to="/account/profile" className="account-quick-link">Edit Profil</Link>
          <Link to="/account/addresses" className="account-quick-link">Kelola Alamat</Link>
          <Link to="/account/settings" className="account-quick-link">Pengaturan</Link>
          <Link to="/track" className="account-quick-link">Lacak Paket</Link>
          <Link to="/contact" className="account-quick-link">Bantuan</Link>
        </div>
      </ScrollReveal>
    </div>
  )
}