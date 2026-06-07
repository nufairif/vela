const OOS_VARIANTS = new Set([
  'aria-linen-shirt|XS|Natural',
  'elio-trench-coat|XL|Black',
  'kai-denim-shorts|XS|Light Wash',
  'luna-midi-dress|L|Blush',
])

const LOW_STOCK_VARIANTS = {
  'noa-slip-dress|S|Ivory': 2,
  'sora-wide-pants|M|Indigo': 3,
  'mira-knit-vest|M|Oat': 4,
  'sol-cotton-tee|L|Clay': 2,
}

function variantKey(productId, size, color) {
  return `${productId}|${size}|${color}`
}

function hashStock(productId, size, color) {
  const str = variantKey(productId, size, color)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % 1000
  }
  return 8 + (hash % 13)
}

export function getStock(productId, size, color) {
  if (!productId || !size || !color) return 0
  const key = variantKey(productId, size, color)
  if (OOS_VARIANTS.has(key)) return 0
  if (key in LOW_STOCK_VARIANTS) return LOW_STOCK_VARIANTS[key]
  return hashStock(productId, size, color)
}

export function getStockStatus(stock) {
  if (stock <= 0) return { level: 'out', label: 'Habis' }
  if (stock <= 5) return { level: 'low', label: `Tersisa ${stock}` }
  return { level: 'ok', label: 'Tersedia' }
}

export function getMaxQty(productId, size, color) {
  return getStock(productId, size, color)
}