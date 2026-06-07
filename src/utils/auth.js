export function safeRedirect(path) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return '/account'
  return path
}

export function loginPath(redirectTo = '/account', { openCart = false } = {}) {
  const params = new URLSearchParams()
  params.set('redirect', safeRedirect(redirectTo))
  if (openCart) params.set('cart', '1')
  return `/login?${params.toString()}`
}

export function registerPath(redirectTo = '/account', { openCart = false } = {}) {
  const params = new URLSearchParams()
  params.set('redirect', safeRedirect(redirectTo))
  if (openCart) params.set('cart', '1')
  return `/register?${params.toString()}`
}