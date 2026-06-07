import { seedReviews } from '../data/reviews'

const REVIEWS_KEY = 'vela_reviews'

function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}')
  } catch {
    return {}
  }
}

function saveAll(data) {
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(data))
}

export function getReviews(productId) {
  const stored = loadAll()[productId] || []
  const seeded = seedReviews[productId] || []
  const seen = new Set(stored.map((r) => r.id))
  const merged = [...stored, ...seeded.filter((r) => !seen.has(r.id))]
  return merged.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getAverageRating(productId) {
  const reviews = getReviews(productId)
  if (reviews.length === 0) return null
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return Math.round((sum / reviews.length) * 10) / 10
}

export function addReview(productId, { author, rating, text }) {
  const entry = {
    id: `user-${Date.now()}`,
    author: author.trim(),
    rating: Math.min(5, Math.max(1, rating)),
    text: text.trim(),
    date: new Date().toISOString().split('T')[0],
  }
  const all = loadAll()
  all[productId] = [entry, ...(all[productId] || [])]
  saveAll(all)
  return entry
}