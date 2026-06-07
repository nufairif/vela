import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

function cartKey(email) {
  return `vela_cart_${email}`
}

function loadCart(email) {
  if (!email) return []
  try {
    return JSON.parse(localStorage.getItem(cartKey(email)) || '[]')
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const { user, isLoggedIn } = useAuth()
  const [items, setItems] = useState([])
  const skipSave = useRef(false)

  useEffect(() => {
    if (!user?.email) {
      setItems([])
      return
    }
    skipSave.current = true
    setItems(loadCart(user.email))
  }, [user?.email])

  useEffect(() => {
    if (!user?.email) return
    if (skipSave.current) {
      skipSave.current = false
      return
    }
    localStorage.setItem(cartKey(user.email), JSON.stringify(items))
  }, [items, user?.email])

  const addItem = useCallback((product, options = {}) => {
    if (!isLoggedIn) return false

    const { size = '', color = '' } = options
    setItems((prev) => {
      const key = `${product.id}-${size}-${color}`
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { key, product, size, color, qty: 1 }]
    })
    return true
  }, [isLoggedIn])

  const removeItem = useCallback((key) => {
    if (!isLoggedIn) return
    setItems((prev) => prev.filter((i) => i.key !== key))
  }, [isLoggedIn])

  const updateQty = useCallback((key, qty) => {
    if (!isLoggedIn) return
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.key !== key))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty } : i))
    )
  }, [isLoggedIn])

  const clearCart = useCallback(() => {
    if (!isLoggedIn) return
    setItems([])
  }, [isLoggedIn])

  const count = useMemo(
    () => (isLoggedIn ? items.reduce((sum, i) => sum + i.qty, 0) : 0),
    [items, isLoggedIn]
  )

  const subtotal = useMemo(
    () => (isLoggedIn ? items.reduce((sum, i) => sum + i.product.price * i.qty, 0) : 0),
    [items, isLoggedIn]
  )

  return (
    <CartContext.Provider value={{ items: isLoggedIn ? items : [], addItem, removeItem, updateQty, clearCart, count, subtotal, isLoggedIn }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}