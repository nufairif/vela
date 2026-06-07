import { createContext, useContext, useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { getProductById } from '../data/products'
import { useAuth } from './AuthContext'

const WishlistContext = createContext(null)

function wishlistKey(email) {
  return `vela_wishlist_${email}`
}

function loadIds(email) {
  if (!email) return []
  try {
    return JSON.parse(localStorage.getItem(wishlistKey(email)) || '[]')
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const { user, isLoggedIn } = useAuth()
  const [ids, setIds] = useState([])
  const skipSave = useRef(false)

  useEffect(() => {
    if (!user?.email) {
      setIds([])
      return
    }
    skipSave.current = true
    setIds(loadIds(user.email))
  }, [user?.email])

  useEffect(() => {
    if (!user?.email) return
    if (skipSave.current) {
      skipSave.current = false
      return
    }
    localStorage.setItem(wishlistKey(user.email), JSON.stringify(ids))
  }, [ids, user?.email])

  const toggle = useCallback((productId) => {
    if (!isLoggedIn) return false
    setIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
    return true
  }, [isLoggedIn])

  const remove = useCallback((productId) => {
    if (!isLoggedIn) return
    setIds((prev) => prev.filter((id) => id !== productId))
  }, [isLoggedIn])

  const has = useCallback(
    (productId) => isLoggedIn && ids.includes(productId),
    [ids, isLoggedIn]
  )

  const items = useMemo(
    () => (isLoggedIn ? ids.map((id) => getProductById(id)).filter(Boolean) : []),
    [ids, isLoggedIn]
  )

  const count = isLoggedIn ? ids.length : 0

  return (
    <WishlistContext.Provider value={{ ids, items, count, toggle, remove, has, isLoggedIn }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}