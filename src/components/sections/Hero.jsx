import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { hero } from '../../data/site'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <motion.span
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {hero.title.split('\n').map((line, i, arr) => (
            <span key={line}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <Link to={hero.cta.href} className="btn btn--primary">
            {hero.cta.label}
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="hero__visual"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={hero.image} alt={hero.imageAlt} />
        <div className="hero__visual-frame" aria-hidden="true" />
      </motion.div>
    </section>
  )
}