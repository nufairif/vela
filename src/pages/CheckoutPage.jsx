import { useState, useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { loginPath } from '../utils/auth'
import { formatPrice, getShippingCost } from '../utils/currency'
import { addOrder } from '../utils/userData'
import { createTrackingForOrder } from '../utils/tracking'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'

const paymentMethods = [
  { id: 'transfer', label: 'Bank Transfer', desc: 'BCA · Mandiri · BNI' },
  { id: 'ewallet', label: 'E-Wallet', desc: 'GoPay · OVO · DANA' },
  { id: 'cod', label: 'Cash on Delivery', desc: 'Jakarta area only' },
]

function generateOrderId() {
  return `VELA-${Date.now().toString(36).toUpperCase()}`
}

export default function CheckoutPage() {
  const { isLoggedIn, user } = useAuth()
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart()
  const [region, setRegion] = useState('jakarta')
  const [payment, setPayment] = useState('transfer')
  const [order, setOrder] = useState(null)

  const shipping = useMemo(
    () => getShippingCost(subtotal, region),
    [subtotal, region]
  )
  const total = subtotal + shipping

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const orderDate = new Date().toISOString().split('T')[0]
    const city = form.get('city')
    const firstName = form.get('firstName')
    const lastName = form.get('lastName')

    const savedOrder = {
      id: generateOrderId(),
      date: orderDate,
      status: 'processing',
      statusLabel: 'Diproses',
      items: items.map((item) => ({
        productId: item.product.id,
        size: item.size,
        color: item.color,
        qty: item.qty,
        price: item.product.price,
      })),
      subtotal,
      shipping,
      total,
      region,
      payment,
      customer: {
        firstName,
        lastName,
        email: form.get('email'),
        phone: form.get('phone'),
        address: form.get('address'),
        city,
        postal: form.get('postal'),
        notes: form.get('notes'),
        name: `${firstName} ${lastName}`.trim(),
      },
      tracking: createTrackingForOrder({
        status: 'processing',
        orderDate,
        origin: 'Jakarta Selatan',
        destination: city,
        receiverName: `${firstName} ${lastName}`.trim(),
      }),
    }

    addOrder(user.email, savedOrder)

    const snapshot = {
      ...savedOrder,
      items: [...items],
    }

    setOrder(snapshot)
    clearCart()
    window.scrollTo(0, 0)
  }

  if (order) {
    return (
      <div className="page checkout-page">
        <section className="checkout-success">
          <ScrollReveal>
            <span className="checkout-success__icon">✓</span>
            <h1>Order confirmed</h1>
            <p>Thank you, {order.customer.firstName}. We have received your order.</p>
            <p className="checkout-success__id">Order #{order.id}</p>
            <p className="checkout-success__email">
              A confirmation email will be sent to {order.customer.email}.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="checkout-success__summary">
              <h2>Order summary</h2>
              <ul>
                {order.items.map((item) => (
                  <li key={item.key}>
                    <span>{item.product.name} × {item.qty}</span>
                    <span>{formatPrice(item.product.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="checkout-summary__row">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}</span>
              </div>
              <div className="checkout-summary__row checkout-summary__row--total">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="checkout-success__actions">
              <Link to={`/account/orders/${order.id}/track`} className="btn btn--primary">
                Lacak Pesanan
              </Link>
              <Link to="/shop" className="btn btn--ghost">Continue Shopping</Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    )
  }

  if (!isLoggedIn) return <Navigate to={loginPath('/checkout')} replace />

  if (items.length === 0) return <Navigate to="/shop" replace />

  const nameParts = user.name.split(' ')
  const defaultFirstName = nameParts[0] || ''
  const defaultLastName = nameParts.slice(1).join(' ')

  return (
    <div className="page checkout-page">
      <PageHero
        compact
        eyebrow="Secure Checkout"
        title="Checkout"
        subtitle="Review your bag and complete your order."
      />

      <div className="checkout-page__layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <ScrollReveal>
            <section className="checkout-form__section">
              <h2>Contact</h2>
              <div className="checkout-form__row">
                <label>
                  First name
                  <input type="text" name="firstName" required defaultValue={defaultFirstName} />
                </label>
                <label>
                  Last name
                  <input type="text" name="lastName" required defaultValue={defaultLastName} />
                </label>
              </div>
              <div className="checkout-form__row">
                <label>
                  Email
                  <input type="email" name="email" required defaultValue={user.email} />
                </label>
                <label>
                  Phone
                  <input type="tel" name="phone" required />
                </label>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <section className="checkout-form__section">
              <h2>Shipping address</h2>
              <label>
                Street address
                <input type="text" name="address" required />
              </label>
              <div className="checkout-form__row">
                <label>
                  City
                  <input type="text" name="city" required />
                </label>
                <label>
                  Postal code
                  <input type="text" name="postal" required />
                </label>
              </div>
              <label>
                Region
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="jakarta">Jakarta & surrounding (1–2 days)</option>
                  <option value="java">Java (2–4 days)</option>
                  <option value="outer">Outside Java (4–7 days)</option>
                </select>
              </label>
              <label>
                Order notes <span className="checkout-form__optional">(optional)</span>
                <textarea name="notes" rows={3} placeholder="Delivery instructions, gift message..." />
              </label>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <section className="checkout-form__section">
              <h2>Payment</h2>
              <div className="checkout-payment">
                {paymentMethods.map((m) => (
                  <label key={m.id} className={`checkout-payment__option ${payment === m.id ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                    />
                    <div>
                      <span>{m.label}</span>
                      <small>{m.desc}</small>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <button type="submit" className="btn btn--primary checkout-form__submit">
            Place Order · {formatPrice(total)}
          </button>
        </form>

        <aside className="checkout-summary">
          <ScrollReveal>
            <h2>Your bag</h2>
            <ul className="checkout-summary__items">
              {items.map((item) => (
                <li key={item.key} className="checkout-summary__item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="checkout-summary__info">
                    <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                    <small>{[item.color, item.size].filter(Boolean).join(' · ')}</small>
                    <div className="checkout-summary__qty">
                      <button
                        type="button"
                        onClick={() => updateQty(item.key, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.key, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="checkout-summary__price">
                    <span>{formatPrice(item.product.price * item.qty)}</span>
                    <button
                      type="button"
                      className="checkout-summary__remove"
                      onClick={() => removeItem(item.key)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="checkout-summary__row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </div>
            {subtotal < 500000 && (
              <p className="checkout-summary__note">
                Free shipping on orders over Rp 500,000
              </p>
            )}
            <div className="checkout-summary__row checkout-summary__row--total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </ScrollReveal>
        </aside>
      </div>
    </div>
  )
}