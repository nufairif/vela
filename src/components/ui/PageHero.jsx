import ScrollReveal from './ScrollReveal'

export default function PageHero({ eyebrow, title, subtitle, image, compact = false }) {
  return (
    <section className={`page-hero ${compact ? 'page-hero--compact' : ''}`}>
      <ScrollReveal className="page-hero__content">
        {eyebrow && <span className="page-hero__eyebrow">{eyebrow}</span>}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </ScrollReveal>
      {image && (
        <ScrollReveal delay={0.1} className="page-hero__image">
          <img src={image} alt="" loading="lazy" />
        </ScrollReveal>
      )}
    </section>
  )
}