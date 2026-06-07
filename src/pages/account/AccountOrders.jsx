import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loadOrders, cancelOrder } from '../../utils/userData'
import { formatPrice } from '../../utils/currency'
import { getProductById } from '../../data/products'
import ScrollReveal from '../../components/ui/ScrollReveal'

const statusClass = {
  delivered: 'account-status--delivered',
  processing: 'account-status--processing',
  shipped: 'account-status--shipped',
  cancelled: 'account-status--cancelled',
}

const paymentLabels = {
  transfer: 'Transfer Bank',
  ewallet: 'E-Wallet',
  cod: 'Bayar di Tempat',
}

export default function AccountOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState(() => loadOrders(user.email))
  const [cancellingId, setCancellingId] = useState(null)
  const [cancelError, setCancelError] = useState('')

  const handleCancel = (orderId) => {
    if (!window.confirm('Batalkan pesanan ini? Tindakan ini tidak dapat dibatalkan.')) return

    const result = cancelOrder(user.email, orderId)
    if (!result.ok) {
      setCancelError(result.error)
      return
    }
    setCancelError('')
    setCancellingId(null)
    setOrders(loadOrders(user.email))
  }

  return (
    <div className="account-panel">
      <ScrollReveal>
        <header className="account-panel__header">
          <span className="account-panel__eyebrow">Riwayat</span>
          <h1>Pesanan Saya</h1>
          <p>Lacak dan lihat detail semua pesanan Anda.</p>
        </header>
      </ScrollReveal>

      {cancelError && (
        <p className="account-form__error">{cancelError}</p>
      )}

      {orders.length === 0 ? (
        <ScrollReveal delay={0.06}>
          <div className="account-empty">
            <p>Belum ada pesanan.</p>
            <Link to="/shop" className="btn btn--primary">Mulai Belanja</Link>
          </div>
        </ScrollReveal>
      ) : (
        <ul className="account-order-list">
          {orders.map((order, i) => (
            <ScrollReveal key={order.id} delay={i * 0.06}>
              <li className="account-order-card">
                <div className="account-order-card__top">
                  <div>
                    <strong>#{order.id}</strong>
                    <small>
                      {new Date(order.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </small>
                  </div>
                  <span className={`account-status ${statusClass[order.status] || ''}`}>
                    {order.statusLabel}
                  </span>
                </div>

                <ul className="account-order-card__products">
                  {order.items.map((item) => {
                    const product = getProductById(item.productId)
                    if (!product) return null
                    return (
                      <li key={`${order.id}-${item.productId}`}>
                        <img src={product.image} alt={product.name} />
                        <div>
                          <Link to={`/products/${product.id}`}>{product.name}</Link>
                          <small>
                            {[item.color, item.size].filter(Boolean).join(' · ')} · Jml {item.qty}
                          </small>
                        </div>
                        <span>{formatPrice(item.price * item.qty)}</span>
                      </li>
                    )
                  })}
                </ul>

                {order.tracking?.awb && order.status !== 'cancelled' && (
                  <p className="account-order-card__awb">
                    Resi: <strong>{order.tracking.awb}</strong> · {order.tracking.courierName}
                  </p>
                )}

                <div className="account-order-card__footer">
                  <div className="account-order-card__actions">
                    <span>{paymentLabels[order.payment] || order.payment}</span>
                    {order.status === 'processing' && (
                      cancellingId === order.id ? (
                        <div className="account-order-card__cancel-confirm">
                          <button
                            type="button"
                            className="btn btn--ghost account-order-card__cancel"
                            onClick={() => handleCancel(order.id)}
                          >
                            Ya, batalkan
                          </button>
                          <button
                            type="button"
                            className="btn btn--ghost"
                            onClick={() => setCancellingId(null)}
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="btn btn--ghost account-order-card__cancel"
                          onClick={() => setCancellingId(order.id)}
                        >
                          Batalkan Pesanan
                        </button>
                      )
                    )}
                    {order.tracking && order.status !== 'cancelled' && (
                      <Link
                        to={`/account/orders/${order.id}/track`}
                        className="btn btn--ghost account-order-card__track"
                      >
                        Lacak Paket
                      </Link>
                    )}
                  </div>
                  <div className="account-order-card__totals">
                    <small>Subtotal {formatPrice(order.subtotal)}</small>
                    {order.discount > 0 && (
                      <small>Diskon −{formatPrice(order.discount)}</small>
                    )}
                    <small>
                      Ongkir {order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}
                    </small>
                    <strong>Total {formatPrice(order.total)}</strong>
                  </div>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      )}
    </div>
  )
}