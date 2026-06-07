import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { loadAddresses, saveAddresses } from '../../utils/userData'
import ScrollReveal from '../../components/ui/ScrollReveal'

const regionLabels = {
  jakarta: 'Jakarta & sekitarnya',
  java: 'Pulau Jawa',
  outer: 'Luar Jawa',
}

const emptyForm = {
  label: '',
  name: '',
  phone: '',
  street: '',
  city: '',
  postal: '',
  region: 'jakarta',
}

export default function AccountAddresses() {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState(() => loadAddresses(user.email))
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)

  const persist = (next) => {
    setAddresses(next)
    saveAddresses(user.email, next)
  }

  const openNew = () => {
    setEditingId(null)
    setForm({ ...emptyForm, name: user.name })
    setShowForm(true)
  }

  const openEdit = (address) => {
    setEditingId(address.id)
    setForm({
      label: address.label,
      name: address.name,
      phone: address.phone,
      street: address.street,
      city: address.city,
      postal: address.postal,
      region: address.region,
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      persist(
        addresses.map((addr) =>
          addr.id === editingId ? { ...addr, ...form } : addr
        )
      )
    } else {
      const newAddress = {
        id: `addr-${Date.now()}`,
        ...form,
        isDefault: addresses.length === 0,
      }
      persist([...addresses, newAddress])
    }
    setShowForm(false)
    setForm(emptyForm)
    setEditingId(null)
  }

  const setDefault = (id) => {
    persist(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    )
  }

  const removeAddress = (id) => {
    const next = addresses.filter((addr) => addr.id !== id)
    if (next.length > 0 && !next.some((addr) => addr.isDefault)) {
      next[0] = { ...next[0], isDefault: true }
    }
    persist(next)
  }

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="account-panel">
      <ScrollReveal>
        <header className="account-panel__header account-panel__header--row">
          <div>
            <span className="account-panel__eyebrow">Pengiriman</span>
            <h1>Alamat</h1>
            <p>Kelola alamat pengiriman untuk checkout lebih cepat.</p>
          </div>
          <button type="button" className="btn btn--ghost" onClick={openNew}>
            + Tambah Alamat
          </button>
        </header>
      </ScrollReveal>

      {showForm && (
        <ScrollReveal>
          <form className="account-form account-form--card" onSubmit={handleSubmit}>
            <h2>{editingId ? 'Edit Alamat' : 'Alamat Baru'}</h2>
            <div className="account-form__row">
              <label>
                Label
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => updateField('label', e.target.value)}
                  placeholder="Rumah, Kantor, dll."
                  required
                />
              </label>
              <label>
                Nama penerima
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                />
              </label>
            </div>
            <label>
              Nomor telepon
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                required
              />
            </label>
            <label>
              Alamat lengkap
              <input
                type="text"
                value={form.street}
                onChange={(e) => updateField('street', e.target.value)}
                required
              />
            </label>
            <div className="account-form__row">
              <label>
                Kota
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  required
                />
              </label>
              <label>
                Kode pos
                <input
                  type="text"
                  value={form.postal}
                  onChange={(e) => updateField('postal', e.target.value)}
                  required
                />
              </label>
            </div>
            <label>
              Wilayah
              <select value={form.region} onChange={(e) => updateField('region', e.target.value)}>
                <option value="jakarta">Jakarta & sekitarnya</option>
                <option value="java">Pulau Jawa</option>
                <option value="outer">Luar Jawa</option>
              </select>
            </label>
            <div className="account-form__actions">
              <button type="submit" className="btn btn--primary">
                {editingId ? 'Simpan' : 'Tambah'}
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => {
                  setShowForm(false)
                  setEditingId(null)
                }}
              >
                Batal
              </button>
            </div>
          </form>
        </ScrollReveal>
      )}

      {addresses.length === 0 ? (
        <ScrollReveal delay={0.06}>
          <div className="account-empty">
            <p>Belum ada alamat tersimpan.</p>
            <button type="button" className="btn btn--primary" onClick={openNew}>
              Tambah Alamat Pertama
            </button>
          </div>
        </ScrollReveal>
      ) : (
        <ul className="account-address-list">
          {addresses.map((address, i) => (
            <ScrollReveal key={address.id} delay={i * 0.05}>
              <li className={`account-address-card${address.isDefault ? ' is-default' : ''}`}>
                <div className="account-address-card__head">
                  <div>
                    <strong>{address.label}</strong>
                    {address.isDefault && (
                      <span className="account-address-card__badge">Utama</span>
                    )}
                  </div>
                  <div className="account-address-card__actions">
                    <button type="button" onClick={() => openEdit(address)}>Edit</button>
                    {!address.isDefault && (
                      <button type="button" onClick={() => setDefault(address.id)}>
                        Jadikan utama
                      </button>
                    )}
                    <button type="button" onClick={() => removeAddress(address.id)}>Hapus</button>
                  </div>
                </div>
                <p>{address.name} · {address.phone}</p>
                <p>{address.street}</p>
                <p>{address.city}, {address.postal}</p>
                <small>{regionLabels[address.region]}</small>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      )}
    </div>
  )
}