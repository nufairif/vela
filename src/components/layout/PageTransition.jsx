import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { brand } from '../../data/site'

const ease = [0.76, 0, 0.24, 1]

export default function PageTransition() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden="true"
        >
          <div className="page-loader__logo-wrap">
            <motion.span
              className="page-loader__logo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -8] }}
              transition={{ duration: 0.85, times: [0, 0.18, 0.5, 1], ease: 'easeOut' }}
            >
              {brand.name}
            </motion.span>
          </div>
          <motion.div
            className="page-loader__panel page-loader__panel--top"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          />
          <motion.div
            className="page-loader__panel page-loader__panel--bottom"
            initial={{ y: 0 }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}