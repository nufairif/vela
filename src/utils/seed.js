import {
  demoUser,
  demoWishlist,
  demoCart,
  demoProfile,
  demoAddresses,
  demoOrders,
} from '../data/seed'
import { getProductById } from '../data/products'
import { saveProfile, saveAddresses, saveOrders } from './userData'

const USERS_KEY = 'vela_users'
const DEMO_SEED_VERSION_KEY = 'vela_demo_seed_version'
const DEMO_SEED_VERSION = 'tracking-v3'

function cartKey(email) {
  return `vela_cart_${email}`
}

function wishlistKey(email) {
  return `vela_wishlist_${email}`
}

function buildCartItems() {
  return demoCart
    .map(({ productId, size, color, qty }) => {
      const product = getProductById(productId)
      if (!product) return null
      return {
        key: `${product.id}-${size}-${color}`,
        product,
        size,
        color,
        qty,
      }
    })
    .filter(Boolean)
}

export function ensureDemoUser() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const idx = users.findIndex((u) => u.email === demoUser.email)

    if (idx === -1) {
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, demoUser]))
      return
    }

    users[idx] = { ...users[idx], name: demoUser.name, password: demoUser.password }
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([demoUser]))
  }
}

export function seedDemoUserData(email) {
  if (email !== demoUser.email) return

  localStorage.setItem(wishlistKey(email), JSON.stringify(demoWishlist))
  localStorage.setItem(cartKey(email), JSON.stringify(buildCartItems()))
  saveProfile(email, demoProfile)
  saveAddresses(email, demoAddresses)
  saveOrders(email, demoOrders)
  localStorage.setItem(DEMO_SEED_VERSION_KEY, DEMO_SEED_VERSION)
}

export function syncDemoSeedIfNeeded() {
  const version = localStorage.getItem(DEMO_SEED_VERSION_KEY)
  if (version !== DEMO_SEED_VERSION) {
    seedDemoUserData(demoUser.email)
  }
}

export function ensureDemoTrackingData() {
  ensureDemoUser()
  seedDemoUserData(demoUser.email)
}