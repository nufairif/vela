const CONTACT_KEY = 'vela_contact_submissions'
const NEWSLETTER_KEY = 'vela_newsletter_subscribers'

function loadList(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

function saveList(key, list) {
  localStorage.setItem(key, JSON.stringify(list))
}

export function submitContact({ name, email, subject, message }) {
  const entry = {
    id: `contact-${Date.now()}`,
    name: name.trim(),
    email: email.trim(),
    subject,
    message: message.trim(),
    date: new Date().toISOString(),
  }
  const list = loadList(CONTACT_KEY)
  saveList(CONTACT_KEY, [entry, ...list])
  return { ok: true }
}

export function subscribeNewsletter(email) {
  const normalized = email.trim().toLowerCase()
  if (!normalized) return { ok: false, error: 'Email wajib diisi.' }

  const list = loadList(NEWSLETTER_KEY)
  if (list.some((e) => e.email === normalized)) {
    return { ok: true, already: true }
  }

  saveList(NEWSLETTER_KEY, [
    { email: normalized, date: new Date().toISOString() },
    ...list,
  ])
  return { ok: true, already: false }
}