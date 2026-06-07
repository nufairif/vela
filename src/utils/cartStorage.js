export const GUEST_CART_KEY = 'vela_guest_cart'

export function cartKey(email) {
  return `vela_cart_${email}`
}

export function loadCartFromStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

export function saveCartToStorage(key, items) {
  localStorage.setItem(key, JSON.stringify(items))
}

export function mergeCartItems(userItems, guestItems) {
  const merged = [...userItems]
  for (const guest of guestItems) {
    const existing = merged.find((i) => i.key === guest.key)
    if (existing) {
      existing.qty = existing.qty + guest.qty
    } else {
      merged.push(guest)
    }
  }
  return merged
}