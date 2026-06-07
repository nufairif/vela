import { useState, useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { loginPath } from '../utils/auth'
import { formatPrice, getShippingCost } from '../utils/currency'
import { addOrder, loadAddresses } from '../utils/userData'
import { createTrackingForOrder } from '../utils/tracking'
import { validatePromo, applyPromo } from '../utils/promo'
import { getMaxQty } from '../utils/inventory'
import { usePageSeo } from '../hooks/usePageSeo'
import PageHero from '../components/ui/PageHero'
import ScrollReveal from '../components/ui/ScrollReveal'

const paymentMethods = [
  { id: 'transfer', label: 'Transfer Bank', desc: 'BCA · Mandiri · BNI' },
  { id: 'ewallet', label: 'E-Wallet', desc: 'GoPay · OVO · DANA' },
  { id: 'cod', label: 'Bayar di Tempat', desc: 'Area Jakarta saja' },
]

const regionLabels = {
  jakarta: 'Jakarta & sekitarnya (1–2 hari)',
  java: 'Pulau Jawa (2–4 hari)',
  outer: 'Luar Jawa (4–7 hari)',
}

function generateOrderId() {
  return `VELA-${Date.now().toString(36).toUpperCase()}`
}

function splitName(fullName) {
  const parts = fullName.trim().split(' ')
  return { firstName: parts[0] || '', lastName: parts.slice(1).join(' ') }
}

export default function CheckoutPage() {
  const { isLoggedIn, user } = useAuth()
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart()
  const savedAddresses = useMemo(
    () => (user?.email ? loadAddresses(user.email) : []),
    [user?.email]
  )
  const defaultAddress = savedAddresses.find((a) => a.isDefault) || savedAddresses[0]

  const [addressMode, setAddressMode] = useState(defaultAddress ? 'saved' : 'manual')
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id || '')
  const [region, setRegion] = useState(defaultAddress?.region || 'jakarta')
  const [payment, setPayment] = useState('transfer')
  const [promoInput, setPromoInput] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [promoError, setPromoError] = useState('')
  const [order, setOrder] = useState(null)

  usePageSeo('Checkout', 'Selesaikan pesanan Anda di VELA.')

  const selectedAddress = savedAddresses.find((a) => a.id === selectedAddressId)

  const shippingBase = useMemo(
    () => getShippingCost(subtotal, region),
    [subtotal, region]
  )

  const { discount, shipping } = useMemo(
    () => applyPromo(appliedPromo, { subtotal, shipping: shippingBase }),
    [appliedPromo, subtotal, shippingBase]
  )

  const total = subtotal - discount + shipping

  const handleApplyPromo = () => {
    const result = validatePromo(promoInput, subtotal)
    if (!result.ok) {
      setPromoError(result.error)
      setAppliedPromo(null)
      return
    }
    setPromoError('')
    setAppliedPromo(result.promo)
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoInput('')
    setPromoError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const orderDate = new Date().toISOString().split('T')[0]

    let customer
    if (addressMode === 'saved' && selectedAddress) {
      const { firstName, lastName } = splitName(selectedAddress.name)
      customer = {
        firstName,
        lastName,
        email: user.email,
        phone: selectedAddress.phone,
        address: selectedAddress.street,
        city: selectedAddress.city,
        postal: selectedAddress.postal,
        notes: form.get('notes') || '',
        name: selectedAddress.name,
        addressId: selectedAddress.id,
      }
    } else {
      const firstName = form.get('firstName')
      const lastName = form.get('lastName')
      customer = {
        firstName,
        lastName,
        email: form.get('email'),
        phone: form.get('phone'),
        address: form.get('address'),
        city: form.get('city'),
        postal: form.get('postal'),
        notes: form.get('notes'),
        name: `${firstName} ${lastName}`.trim(),
      }
    }

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
      discount,
      promo: appliedPromo?.code || null,
      shipping,
      total,
      region,
      payment,
      customer,
      tracking: createTrackingForOrder({
        status: 'processing',
        orderDate,
        origin: 'Jakarta Selatan',
        destination: customer.city,
        receiverName: customer.name,
      }),
    }

    addOrder(user.email, savedOrder)
    setOrder({ ...savedOrder, items: [...items] })
    clearCart()
    window.scrollTo(0, 0)
  }

  if (order) {
    return (
      <div className="page checkout-page">
        <section className="checkout-success">
          <ScrollReveal>
            <span className="checkout-success__icon">✓</span>
            <h1>Pesanan dikonfirmasi</h1>
            <p>Terima kasih, {order.customer.firstName}. Pesanan Anda telah kami terima.</p>
            <p className="checkout-success__id">Pesanan #{order.id}</p>
            <p className="checkout-success__email">
              Konfirmasi akan dikirim ke {order.customer.email}.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="checkout-success__summary">
              <h2>Ringkasan pesanan</h2>
              <ul>
                {order.items.map((item) => (
                  <li key={item.key}>
                    <span>{item.product.name} × {item.qty}</span>
                    <span>{formatPrice(item.product.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
              {order.discount > 0 && (
                <div className="checkout-summary__row checkout-summary__row--discount">
                  <span>Diskon{order.promo ? ` (${order.promo})` : ''}</span>
                  <span>−{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="checkout-summary__row">
                <span>Ongkir</span>
                <span>{order.shipping === 0 ? 'Gratis' : formatPrice(order.shipping)}</span>
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
              <Link to="/shop" className="btn btn--ghost">Lanjut Belanja</Link>
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
        eyebrow="Checkout Aman"
        title="Checkout"
        subtitle="Periksa keranjang dan selesaikan pesanan Anda."
      />

      <div className="checkout-page__layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <ScrollReveal>
            <section className="checkout-form__section">
              <h2>Kontak</h2>
              {addressMode === 'saved' && selectedAddress ? (
                <p className="checkout-form__hint">
                  {selectedAddress.name} · {selectedAddress.phone} · {user.email}
                </p>
              ) : (
                <>
                  <div className="checkout-form__row">
                    <label>
                      Nama depan
                      <input type="text" name="firstName" required defaultValue={defaultFirstName} />
                    </label>
                    <label>
                      Nama belakang
                      <input type="text" name="lastName" required defaultValue={defaultLastName} />
                    </label>
                  </div>
                  <div className="checkout-form__row">
                    <label>
                      Email
                      <input type="email" name="email" required defaultValue={user.email} />
                    </label>
                    <label>
                      Telepon
                      <input type="tel" name="phone" required />
                    </label>
                  </div>
                </>
              )}
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <section className="checkout-form__section">
              <h2>Alamat pengiriman</h2>

              {savedAddresses.length > 0 && (
                <div className="checkout-address-mode">
                  <button
                    type="button"
                    className={addressMode === 'saved' ? 'is-active' : ''}
                    onClick={() => setAddressMode('saved')}
                  >
                    Alamat tersimpan
                  </button>
                  <button
                    type="button"
                    className={addressMode === 'manual' ? 'is-active' : ''}
                    onClick={() => setAddressMode('manual')}
                  >
                    Alamat baru
                  </button>
                </div>
              )}

              {addressMode === 'saved' && savedAddresses.length > 0 ? (
                <ul className="checkout-address-list">
                  {savedAddresses.map((addr) => (
                    <li key={addr.id}>
                      <label className={`checkout-address-card${selectedAddressId === addr.id ? ' is-selected' : ''}`}>
                        <input
                          type="radio"
                          name="savedAddress"
                          value={addr.id}
                          checked={selectedAddressId === addr.id}
                          onChange={() => {
                            setSelectedAddressId(addr.id)
                            setRegion(addr.region)
                          }}
                        />
                        <div>
                          <strong>{addr.label}</strong>
                          {addr.isDefault && <span className="checkout-address-card__badge">Utama</span>}
                          <p>{addr.name} · {addr.phone}</p>
                          <p>{addr.street}</p>
                          <p>{addr.city}, {addr.postal}</p>
                          <small>{regionLabels[addr.region]}</small>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <label>
                    Alamat lengkap
                    <input type="text" name="address" required />
                  </label>
                  <div className="checkout-form__row">
                    <label>
                      Kota
                      <input type="text" name="city" required />
                    </label>
                    <label>
                      Kode pos
                      <input type="text" name="postal" required />
                    </label>
                  </div>
                  <label>
                    Wilayah
                    <select value={region} onChange={(e) => setRegion(e.target.value)}>
                      <option value="jakarta">{regionLabels.jakarta}</option>
                      <option value="java">{regionLabels.java}</option>
                      <option value="outer">{regionLabels.outer}</option>
                    </select>
                  </label>
                </>
              )}

              <label>
                Catatan pesanan <span className="checkout-form__optional">(opsional)</span>
                <textarea name="notes" rows={3} placeholder="Instruksi pengiriman, pesan hadiah..." />
              </label>

              <Link to="/account/addresses" className="checkout-form__link">
                Kelola alamat tersimpan
              </Link>
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <section className="checkout-form__section">
              <h2>Pembayaran</h2>
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
            Buat Pesanan · {formatPrice(total)}
          </button>
        </form>

        <aside className="checkout-summary">
          <ScrollReveal>
            <h2>Keranjang Anda</h2>
            <ul className="checkout-summary__items">
              {items.map((item) => {
                const maxQty = getMaxQty(item.product.id, item.size, item.color)
                return (
                  <li key={item.key} className="checkout-summary__item">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="checkout-summary__info">
                      <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                      <small>{[item.color, item.size].filter(Boolean).join(' · ')}</small>
                      {maxQty <= 5 && maxQty > 0 && (
                        <small className="checkout-summary__stock">Stok tersisa {maxQty}</small>
                      )}
                      <div className="checkout-summary__qty">
                        <button
                          type="button"
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          aria-label="Kurangi jumlah"
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          disabled={item.qty >= maxQty}
                          aria-label="Tambah jumlah"
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
                        Hapus
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="checkout-promo">
              <div className="checkout-promo__row">
                <input
                  type="text"
                  placeholder="Kode promo"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  disabled={!!appliedPromo}
                />
                {appliedPromo ? (
                  <button type="button" className="btn btn--ghost" onClick={handleRemovePromo}>
                    Hapus
                  </button>
                ) : (
                  <button type="button" className="btn btn--ghost" onClick={handleApplyPromo}>
                    Pakai
                  </button>
                )}
              </div>
              {promoError && <p className="checkout-promo__error">{promoError}</p>}
              {appliedPromo && (
                <p className="checkout-promo__applied">{appliedPromo.label} diterapkan</p>
              )}
              <p className="checkout-promo__hint">Coba: VELA10, GRATISONGKIR, HEMAT50K</p>
            </div>

            <div className="checkout-summary__row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="checkout-summary__row checkout-summary__row--discount">
                <span>Diskon</span>
                <span>−{formatPrice(discount)}</span>
              </div>
            )}
            <div className="checkout-summary__row">
              <span>Ongkir</span>
              <span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span>
            </div>
            {subtotal < 500000 && !appliedPromo && (
              <p className="checkout-summary__note">
                Gratis ongkir untuk pesanan di atas Rp 500.000
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