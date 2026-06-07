import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getOrderById } from '../../utils/userData'
import { getProductById } from '../../data/products'
import { formatPrice } from '../../utils/currency'
import TrackingSummary from '../../components/tracking/TrackingSummary'
import TrackingTimeline from '../../components/tracking/TrackingTimeline'
import ScrollReveal from '../../components/ui/ScrollReveal'

export default function AccountOrderTrack() {
  const { orderId } = useParams()
  const { user, isLoggedIn } = useAuth()
  const order = getOrderById(user?.email, orderId)

  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (!order) return <Navigate to="/account/orders" replace />

  return (
    <div className="account-panel">
      <ScrollReveal>
        <header className="account-panel__header">
          <Link to="/account/orders" className="account-panel__back">← Kembali ke pesanan</Link>
          <span className="account-panel__eyebrow">Pelacakan</span>
          <h1>Lacak Paket</h1>
          <p>Pantau perjalanan pesanan Anda secara real-time (simulasi).</p>
        </header>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <TrackingSummary order={order} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <section className="tracking-section">
          <h2>Riwayat Pengiriman</h2>
          <TrackingTimeline
            manifest={order.tracking?.manifest}
            delivered={order.tracking?.delivered}
          />
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.14}>
        <section className="tracking-section">
          <h2>Detail Pesanan</h2>
          <ul className="tracking-order-items">
            {order.items.map((item) => {
              const product = getProductById(item.productId)
              if (!product) return null
              return (
                <li key={`${order.id}-${item.productId}`}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong>
                    <small>
                      {[item.color, item.size].filter(Boolean).join(' · ')} · Qty {item.qty}
                    </small>
                  </div>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </li>
              )
            })}
          </ul>
        </section>
      </ScrollReveal>
    </div>
  )
}