import { photos } from './images'

export const brand = {
  name: 'VELA',
  tagline: 'Quietly confident essentials.',
  description: 'Modern wardrobe pieces designed for everyday ease — refined silhouettes, honest materials.',
}

export const announcement = {
  text: 'Spring Edit — Free shipping on orders over Rp 500K',
  link: '/collections/spring',
}

export const hero = {
  eyebrow: 'Spring / Summer 2026',
  title: 'Wear less,\nmean more.',
  subtitle: 'A curated edit of relaxed tailoring and soft structure for the city and beyond.',
  cta: { label: 'Explore Collection', href: '/collections/spring' },
  image: photos.hero,
  imageAlt: 'Woman in minimalist linen outfit',
}

export const story = {
  quote: 'We believe good clothing should feel invisible — present, but never loud.',
  body: 'VELA was founded on the idea that a smaller, better wardrobe beats endless consumption. Each piece is designed to pair effortlessly, wash beautifully, and last beyond the season.',
  image: photos.story,
  caption: 'Studio 04, Jakarta',
}

export const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
]

export const footerLinks = {
  shop: [
    { label: 'New Arrivals', href: '/shop' },
    { label: 'Tops', href: '/collections/tops' },
    { label: 'Bottoms', href: '/collections/bottoms' },
    { label: 'Outerwear', href: '/collections/outerwear' },
    { label: 'Sale', href: '/collections/sale' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Sustainability', href: '/about#sustainability' },
    { label: 'Careers', href: '/about#careers' },
    { label: 'Stores', href: '/about#stores' },
  ],
  help: [
    { label: 'Lacak Paket', href: '/track' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Contact', href: '/contact' },
  ],
}

export const productFilters = [
  { id: 'all', label: 'All' },
  { id: 'tops', label: 'Tops' },
  { id: 'bottoms', label: 'Bottoms' },
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'dresses', label: 'Dresses' },
]

export const aboutContent = {
  title: 'Built for the long run',
  intro: 'VELA creates timeless wardrobe foundations — pieces you reach for without thinking, season after season.',
  values: [
    { title: 'Honest Materials', desc: 'Natural fibers and responsible sourcing guide every fabric choice we make.' },
    { title: 'Thoughtful Design', desc: 'Clean lines and relaxed fits that work across occasions, not just one moment.' },
    { title: 'Local Craft', desc: 'Produced in small batches with partners who share our standards for quality.' },
  ],
  image: photos.about,
}

export const contactInfo = {
  email: 'hello@vela.studio',
  phone: '+62 21 555 0123',
  hours: 'Mon – Fri, 9am – 6pm WIB',
  address: 'Jl. Kemang Raya No. 12, Jakarta Selatan',
}