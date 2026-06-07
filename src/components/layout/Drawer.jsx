import { motion, AnimatePresence } from 'framer-motion'
import { CloseIcon } from '../icons/Icons'

export default function Drawer({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="drawer__head">
              <span>{title}</span>
              <button onClick={onClose} aria-label="Close"><CloseIcon /></button>
            </div>
            <div className="drawer__body">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}