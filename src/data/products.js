import { photos } from './images'

export const products = [
  {
    id: 'aria-linen-shirt',
    name: 'Aria Linen Shirt',
    category: 'tops',
    collection: 'linen',
    price: 485000,
    priceLabel: 'Rp 485,000',
    badge: null,
    image: photos.shirt1,
    altImage: photos.shirt2,
    description: 'A relaxed linen shirt with a soft collar and hidden placket. Breathable enough for tropical heat, polished enough for dinner.',
    details: ['100% European linen', 'Relaxed fit', 'Mother-of-pearl buttons', 'Machine wash cold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Natural', 'Stone', 'Sage'],
  },
  {
    id: 'sora-wide-pants',
    name: 'Sora Wide Pants',
    category: 'bottoms',
    collection: 'spring',
    price: 620000,
    priceLabel: 'Rp 620,000',
    badge: 'New',
    image: photos.pants1,
    altImage: photos.pants2,
    description: 'High-rise wide-leg trousers in a structured cotton twill. Falls cleanly from the hip with a pressed front seam.',
    details: ['Cotton twill blend', 'High-rise waist', 'Side zip closure', 'Dry clean recommended'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Indigo', 'Sand', 'Black'],
  },
  {
    id: 'mira-knit-vest',
    name: 'Mira Knit Vest',
    category: 'tops',
    collection: 'spring',
    price: 395000,
    priceLabel: 'Rp 395,000',
    badge: null,
    image: photos.knit1,
    altImage: photos.knit2,
    description: 'A lightweight rib-knit vest that layers over shirts and under coats. Finished with a deep V and clean armholes.',
    details: ['Rib-knit cotton blend', 'Deep V neckline', 'Slim fit', 'Hand wash cold'],
    sizes: ['S', 'M', 'L'],
    colors: ['Oat', 'Charcoal', 'Forest'],
  },
  {
    id: 'elio-trench-coat',
    name: 'Elio Trench Coat',
    category: 'outerwear',
    collection: 'evening',
    price: 1250000,
    priceLabel: 'Rp 1,250,000',
    badge: null,
    image: photos.coat1,
    altImage: photos.coat2,
    description: 'A modern trench with storm flap, belted waist, and matte hardware. Cut slightly oversized for layering.',
    details: ['Water-resistant cotton', 'Removable belt', 'Double-breasted', 'Professional dry clean'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Black'],
  },
  {
    id: 'noa-slip-dress',
    name: 'Noa Slip Dress',
    category: 'dresses',
    collection: 'evening',
    price: 540000,
    priceLabel: 'Rp 540,000',
    badge: 'Bestseller',
    image: photos.dress1,
    altImage: photos.dress2,
    description: 'Bias-cut slip dress in washed satin. Skims the body without clinging, with adjustable straps and a midi hem.',
    details: ['Washed satin', 'Bias cut', 'Adjustable straps', 'Hand wash cold'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory', 'Champagne', 'Noir'],
  },
  {
    id: 'kai-denim-shorts',
    name: 'Kai Denim Shorts',
    category: 'bottoms',
    collection: 'spring',
    price: 450000,
    priceLabel: 'Rp 450,000',
    badge: null,
    image: photos.shorts1,
    altImage: photos.shorts2,
    description: 'High-waisted denim shorts with a relaxed leg and vintage wash. Cuffed hem and classic five-pocket construction.',
    details: ['100% cotton denim', 'High-rise fit', 'Cuffed hem', 'Machine wash cold'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Light Wash', 'Mid Blue'],
  },
  {
    id: 'sol-cotton-tee',
    name: 'Sol Cotton Tee',
    category: 'tops',
    collection: 'spring',
    price: 285000,
    priceLabel: 'Rp 285,000',
    badge: null,
    image: photos.tee1,
    altImage: photos.tee2,
    description: 'An everyday crew-neck tee in heavyweight organic cotton. Structured enough to stand alone, soft enough to layer.',
    details: ['Organic cotton', 'Crew neckline', 'Relaxed fit', 'Machine wash cold'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Clay'],
  },
  {
    id: 'luna-midi-dress',
    name: 'Luna Midi Dress',
    category: 'dresses',
    collection: 'linen',
    price: 595000,
    priceLabel: 'Rp 595,000',
    badge: 'New',
    image: photos.dress2,
    altImage: photos.dress1,
    description: 'A sleeveless midi dress with a square neckline and side slit. Linen-cotton blend keeps its shape through the day.',
    details: ['Linen-cotton blend', 'Square neckline', 'Side slit', 'Machine wash gentle'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Blush'],
  },
]

export function getProductById(id) {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category) {
  if (!category || category === 'all') return products
  return products.filter((p) => p.category === category)
}

export function getProductsByCollection(slug) {
  if (slug === 'sale') {
    return products.filter((p) => p.badge === 'Bestseller' || p.badge === 'New')
  }
  return products.filter((p) => p.collection === slug || p.category === slug)
}