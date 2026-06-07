export function formatPrice(amount) {
  return `Rp ${amount.toLocaleString('id-ID')}`
}

export const FREE_SHIPPING_THRESHOLD = 500000

export const SHIPPING_RATES = {
  jakarta: 25000,
  java: 35000,
  outer: 55000,
}

export function getShippingCost(subtotal, region) {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0
  return SHIPPING_RATES[region] ?? SHIPPING_RATES.java
}