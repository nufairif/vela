export const img = (id, w = 800, h = null) => {
  const params = new URLSearchParams({ auto: 'format', fit: 'crop', w: String(w), q: '80' })
  if (h) params.set('h', String(h))
  return `https://images.unsplash.com/${id}?${params}`
}

export const photos = {
  hero: img('photo-1594633312681-425c7b97ccd1', 1200, 1400),
  topsCategory: img('photo-1596755094514-f87e34085b2c', 600, 800),
  bottomsCategory: img('photo-1556905055-8f358a7a47b2', 600, 800),
  outerwearCategory: img('photo-1539533018447-63fcce2678e3', 600, 800),
  dressesCategory: img('photo-1515372039744-b8f02a3ae446', 600, 800),
  linenFeatured: img('photo-1445205170230-053b83016050', 1000, 1200),
  eveningFeatured: img('photo-1509631179647-0177331693ae', 800, 1000),
  story: img('photo-1558618666-fcd25c85cd64', 1000, 1200),
  about: img('photo-1556909114-f6e7ad7d3136', 1200, 800),
  journal1: img('photo-1434389677669-e08b4cac3105', 900, 600),
  journal2: img('photo-1496747611176-843222e1e57c', 900, 600),
  journal3: img('photo-1572804013309-59a88b7e92f1', 900, 600),
  shirt1: img('photo-1596755094514-f87e34085b2c', 700, 900),
  shirt2: img('photo-1591047139829-d91aecb6caea', 700, 900),
  shirt3: img('photo-1620799140408-edc6dcb6d633', 700, 900),
  pants1: img('photo-1556905055-8f358a7a47b2', 700, 900),
  pants2: img('photo-1624378439575-d8705ad7ae80', 700, 900),
  knit1: img('photo-1572804013309-59a88b7e92f1', 700, 900),
  knit2: img('photo-1603252109303-2751441dd157', 700, 900),
  coat1: img('photo-1539533018447-63fcce2678e3', 700, 900),
  coat2: img('photo-1551028719-00167b16eac5', 700, 900),
  dress1: img('photo-1496747611176-843222e1e57c', 700, 900),
  dress2: img('photo-1515372039744-b8f02a3ae446', 700, 900),
  shorts1: img('photo-1591195853828-11db59a44f6b', 700, 900),
  shorts2: img('photo-1583743814966-8936f5b7be1a', 700, 900),
  tee1: img('photo-1552374196-1ab2a1c593e8', 700, 900),
  tee2: img('photo-1503342217505-b0a15ec3261c', 700, 900),
}