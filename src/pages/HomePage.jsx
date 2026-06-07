import { usePageSeo } from '../hooks/usePageSeo'
import { brand } from '../data/site'
import Hero from '../components/sections/Hero'
import CategoryStrip from '../components/sections/CategoryStrip'
import FeaturedCollection from '../components/sections/FeaturedCollection'
import ProductGrid from '../components/sections/ProductGrid'
import StorySection from '../components/sections/StorySection'
import NewsletterCTA from '../components/sections/NewsletterCTA'

export default function HomePage() {
  usePageSeo(brand.name, brand.description)

  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedCollection />
      <ProductGrid limit={6} showFooter />
      <StorySection />
      <NewsletterCTA />
    </>
  )
}