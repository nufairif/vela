import { photos } from './images'

export const journalPosts = [
  {
    slug: 'art-of-less',
    title: 'The Art of Wearing Less',
    excerpt: 'Why a smaller wardrobe can actually give you more — and how to build one that works.',
    category: 'Style Notes',
    date: 'May 12, 2026',
    readTime: '5 min read',
    image: photos.journal1,
    content: [
      'The best wardrobes are not the fullest ones. They are the ones where every piece earns its place — where getting dressed takes minutes, not mornings.',
      'Start with neutrals that layer well: a crisp shirt, tailored trousers, a coat that works over everything. Add texture through fabric, not volume through quantity.',
      'At VELA, we design for this kind of closet. Pieces that pair without thinking, wash without fuss, and look better with time.',
    ],
  },
  {
    slug: 'linen-care-guide',
    title: 'How to Care for Linen',
    excerpt: 'Linen softens with age — here is how to wash, dry, and store it so it lasts for years.',
    category: 'Care Guide',
    date: 'Apr 28, 2026',
    readTime: '4 min read',
    image: photos.journal2,
    content: [
      'Linen is one of the most forgiving natural fibers — it breathes, it drapes, and it gets softer with every wash.',
      'Wash in cold water on a gentle cycle. Skip the dryer when you can; line-drying preserves the fiber and reduces creasing.',
      'Embrace the crease. A little wrinkle is part of linen\'s character. For a crisper look, steam lightly rather than pressing hard.',
    ],
  },
  {
    slug: 'spring-lookbook',
    title: 'Spring Lookbook: City to Coast',
    excerpt: 'Three outfits, one capsule — styled for workdays, weekends, and everything between.',
    category: 'Lookbook',
    date: 'Apr 10, 2026',
    readTime: '6 min read',
    image: photos.journal3,
    content: [
      'Spring dressing is about balance: enough structure for the office, enough ease for the weekend.',
      'Pair the Aria Linen Shirt with Sora Wide Pants for a clean weekday uniform. Roll the sleeves, add a simple sandal.',
      'For evenings, layer the Mira Knit Vest over the slip dress and add the Elio Trench when the air cools.',
    ],
  },
]

export function getJournalPost(slug) {
  return journalPosts.find((p) => p.slug === slug)
}