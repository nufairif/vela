import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { story } from '../../data/site'
import ScrollReveal from '../ui/ScrollReveal'

export default function StorySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section className="story" ref={ref}>
      <div className="story__visual">
        <motion.img
          src={story.image}
          alt="Studio VELA Jakarta — ruang desain dan fitting"
          className="story__image"
          style={{ y: imageY }}
          loading="lazy"
        />
        <span className="story__caption">{story.caption}</span>
      </div>
      <ScrollReveal className="story__content">
        <blockquote className="story__quote">{story.quote}</blockquote>
        <p className="story__body">{story.body}</p>
        <Link to="/about" className="btn btn--ghost">Our Story →</Link>
      </ScrollReveal>
    </section>
  )
}