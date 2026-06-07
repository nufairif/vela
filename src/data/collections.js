import { photos } from './images'

export const collections = [
  {
    slug: 'spring',
    title: 'Spring Edit',
    subtitle: 'Light layers for warmer days',
    description: 'Fresh silhouettes in breathable fabrics — built for transition weather and everyday movement.',
    image: photos.hero,
    productCount: 5,
  },
  {
    slug: 'linen',
    title: 'The Linen Capsule',
    subtitle: 'Breathable pieces for warm days',
    description: 'A focused edit of linen essentials that soften with every wear.',
    image: photos.linenFeatured,
    productCount: 2,
  },
  {
    slug: 'evening',
    title: 'Evening Edit',
    subtitle: 'Understated after dark',
    description: 'Refined pieces for dinners, events, and evenings out — minimal, never loud.',
    image: photos.eveningFeatured,
    productCount: 2,
  },
  {
    slug: 'tops',
    title: 'Tops',
    subtitle: 'Shirts, knits & tees',
    description: 'Foundation pieces for layering or wearing on their own.',
    image: photos.topsCategory,
    productCount: 3,
  },
  {
    slug: 'bottoms',
    title: 'Bottoms',
    subtitle: 'Pants, shorts & skirts',
    description: 'Tailored and relaxed bottoms with clean lines and easy fits.',
    image: photos.bottomsCategory,
    productCount: 2,
  },
  {
    slug: 'outerwear',
    title: 'Outerwear',
    subtitle: 'Coats & layers',
    description: 'Structured outer layers designed to anchor any outfit.',
    image: photos.outerwearCategory,
    productCount: 1,
  },
  {
    slug: 'dresses',
    title: 'Dresses',
    subtitle: 'One-piece essentials',
    description: 'Effortless dresses from day to evening.',
    image: photos.dressesCategory,
    productCount: 2,
  },
  {
    slug: 'sale',
    title: 'Sale',
    subtitle: 'Limited-time offers',
    description: 'Selected styles at special prices while stocks last.',
    image: photos.eveningFeatured,
    productCount: 4,
  },
]

export const homeCategories = [
  { num: '01', title: 'Tops', desc: 'Relaxed shirts & knits', href: '/collections/tops', image: photos.topsCategory },
  { num: '02', title: 'Bottoms', desc: 'Tailored pants & shorts', href: '/collections/bottoms', image: photos.bottomsCategory },
  { num: '03', title: 'Outerwear', desc: 'Layers for every season', href: '/collections/outerwear', image: photos.outerwearCategory },
  { num: '04', title: 'Dresses', desc: 'Effortless one-pieces', href: '/collections/dresses', image: photos.dressesCategory },
]

export const homeFeatured = [
  { title: 'The Linen Capsule', subtitle: 'Breathable pieces for warm days', href: '/collections/linen', image: photos.linenFeatured },
  { title: 'Evening Edit', subtitle: 'Understated after dark', href: '/collections/evening', image: photos.eveningFeatured },
]

export function getCollectionBySlug(slug) {
  return collections.find((c) => c.slug === slug)
}