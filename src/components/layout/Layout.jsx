import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CartProvider } from '../../context/CartContext'
import { AuthProvider } from '../../context/AuthContext'
import { WishlistProvider } from '../../context/WishlistContext'
import PageTransition from './PageTransition'
import AnnouncementBar from './AnnouncementBar'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname } = location

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (location.state?.openCart) {
      setCartOpen(true)
      navigate(pathname + location.search, { replace: true, state: {} })
    }
  }, [location.state?.openCart, pathname, location.search, navigate])

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="app">
            <PageTransition key={pathname} />
            <AnnouncementBar />
            <Header
              cartOpen={cartOpen}
              onCartOpen={() => setCartOpen(true)}
              onCartClose={() => setCartOpen(false)}
            />
            <main>
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}