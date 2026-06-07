import NewsletterCTA from '../sections/NewsletterCTA'

export default function PageShell({ children, newsletter = true }) {
  return (
    <>
      {children}
      {newsletter && <NewsletterCTA />}
    </>
  )
}