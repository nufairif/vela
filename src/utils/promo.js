export const promoCodes = {
  VELA10: {
    code: 'VELA10',
    label: 'Diskon 10%',
    type: 'percent',
    value: 10,
    minSubtotal: 200000,
  },
  GRATISONGKIR: {
    code: 'GRATISONGKIR',
    label: 'Gratis ongkir',
    type: 'free_shipping',
    value: 0,
    minSubtotal: 300000,
  },
  HEMAT50K: {
    code: 'HEMAT50K',
    label: 'Potongan Rp 50.000',
    type: 'fixed',
    value: 50000,
    minSubtotal: 400000,
  },
}

export function validatePromo(code, subtotal) {
  const normalized = code.trim().toUpperCase()
  if (!normalized) return { ok: false, error: 'Masukkan kode promo.' }

  const promo = promoCodes[normalized]
  if (!promo) return { ok: false, error: 'Kode promo tidak valid.' }
  if (subtotal < promo.minSubtotal) {
    return {
      ok: false,
      error: `Minimal belanja ${formatMin(promo.minSubtotal)} untuk kode ini.`,
    }
  }

  return { ok: true, promo }
}

function formatMin(amount) {
  return `Rp ${amount.toLocaleString('id-ID')}`
}

export function applyPromo(promo, { subtotal, shipping }) {
  if (!promo) return { discount: 0, shipping }

  if (promo.type === 'percent') {
    return { discount: Math.round(subtotal * (promo.value / 100)), shipping }
  }
  if (promo.type === 'fixed') {
    return { discount: Math.min(promo.value, subtotal), shipping }
  }
  if (promo.type === 'free_shipping') {
    return { discount: 0, shipping: 0 }
  }
  return { discount: 0, shipping }
}