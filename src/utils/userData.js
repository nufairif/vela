export function profileKey(email) {
  return `vela_profile_${email}`
}

export function addressesKey(email) {
  return `vela_addresses_${email}`
}

export function ordersKey(email) {
  return `vela_orders_${email}`
}

export function loadProfile(email) {
  if (!email) return { phone: '', notifications: { email: true, sms: false } }
  try {
    return JSON.parse(localStorage.getItem(profileKey(email)) || 'null') || {
      phone: '',
      notifications: { email: true, sms: false },
    }
  } catch {
    return { phone: '', notifications: { email: true, sms: false } }
  }
}

export function saveProfile(email, profile) {
  if (!email) return
  localStorage.setItem(profileKey(email), JSON.stringify(profile))
}

export function loadAddresses(email) {
  if (!email) return []
  try {
    return JSON.parse(localStorage.getItem(addressesKey(email)) || '[]')
  } catch {
    return []
  }
}

export function saveAddresses(email, addresses) {
  if (!email) return
  localStorage.setItem(addressesKey(email), JSON.stringify(addresses))
}

export function loadOrders(email) {
  if (!email) return []
  try {
    return JSON.parse(localStorage.getItem(ordersKey(email)) || '[]')
  } catch {
    return []
  }
}

export function saveOrders(email, orders) {
  if (!email) return
  localStorage.setItem(ordersKey(email), JSON.stringify(orders))
}

export function addOrder(email, order) {
  if (!email) return
  const orders = loadOrders(email)
  saveOrders(email, [order, ...orders])
}

function loadAllUserEmails() {
  try {
    const users = JSON.parse(localStorage.getItem('vela_users') || '[]')
    return users.map((u) => u.email).filter(Boolean)
  } catch {
    return []
  }
}

export function findOrder(query, { email } = {}) {
  const normalized = query.trim().toUpperCase()
  if (!normalized) return null

  const emails = email ? [email] : loadAllUserEmails()

  for (const userEmail of emails) {
    const orders = loadOrders(userEmail)
    const found = orders.find(
      (order) =>
        order.id.toUpperCase() === normalized ||
        order.tracking?.awb?.toUpperCase() === normalized
    )
    if (found) return { order: found, ownerEmail: userEmail }
  }

  return null
}

export function getOrderById(email, orderId) {
  if (!email || !orderId) return null
  return loadOrders(email).find((order) => order.id === orderId) || null
}