import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { loginPath } from '../../utils/auth'
import { HeartIcon } from '../icons/Icons'

export default function WishlistButton({ productId, className = '' }) {
  const { isLoggedIn } = useAuth()
  const { has, toggle } = useWishlist()
  const navigate = useNavigate()
  const location = useLocation()
  const active = has(productId)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      navigate(loginPath(location.pathname))
      return
    }

    toggle(productId)
  }

  return (
    <button
      type="button"
      className={`wishlist-btn ${active ? 'is-active' : ''} ${className}`}
      onClick={handleClick}
      aria-label={active ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
    >
      <HeartIcon filled={active} />
    </button>
  )
}