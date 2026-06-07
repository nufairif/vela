import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useAuth } from './AuthContext'
import {
  GUEST_CART_KEY,
  cartKey,
  loadCartFromStorage,
  saveCartToStorage,
} from '../utils/cartStorage'
import { getMaxQty } from '../utils/inventory'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const skipSave = useRef(false)
  const storageKey = user?.email ? cartKey(user.email) : GUEST_CART_KEY

  useEffect(() => {
    skipSave.current = true
    if (user?.email) {
      setItems(loadCartFromStorage(cartKey(user.email)))
    } else {
      setItems(loadCartFromStorage(GUEST_CART_KEY))
    }
  }, [user?.email])

  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false
      return
    }
    saveCartToStorage(storageKey, items)
  }, [items, storageKey])

  const addItem = useCallback((product, options = {}) => {
    const { size = '', color = '' } = options
    const maxQty = getMaxQty(product.id, size, color)
    if (maxQty <= 0) return { ok: false, error: 'Varian ini sedang habis.' }

    let added = false
    setItems((prev) => {
      const key = `${product.id}-${size}-${color}`
      const existing = prev.find((i) => i.key === key)
      const nextQty = (existing?.qty || 0) + 1
      if (nextQty > maxQty) return prev

      added = true
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { key, product, size, color, qty: 1 }]
    })
    return added ? { ok: true } : { ok: false, error: 'Stok tidak mencukupi.' }
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [])

  const updateQty = useCallback((key, qty) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.key !== key))
      return
    }
    setItems((prev) =>
      prev.map((i) => {
        if (i.key !== key) return i
        const maxQty = getMaxQty(i.product.id, i.size, i.color)
        return { ...i, qty: Math.min(qty, maxQty) }
      })
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  )

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        count,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}