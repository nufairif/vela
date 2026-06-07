import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { loginPath } from '../../utils/auth'
import PageShell from '../../components/layout/PageShell'

const navItems = [
  { to: '/account', label: 'Ringkasan', end: true },
  { to: '/account/orders', label: 'Pesanan' },
  { to: '/account/profile', label: 'Profil' },
  { to: '/account/addresses', label: 'Alamat' },
  { to: '/account/settings', label: 'Pengaturan' },
]

export default function AccountLayout() {
  const { user, logout, isLoggedIn } = useAuth()

  if (!isLoggedIn) return <Navigate to={loginPath('/account')} replace />

  return (
    <PageShell>
      <div className="page account-page">
        <div className="account-layout">
          <aside className="account-sidebar">
            <div className="account-sidebar__user">
              <span className="account-sidebar__avatar">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </div>
            </div>

            <nav className="account-sidebar__nav">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `account-sidebar__link${isActive ? ' is-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink to="/wishlist" className="account-sidebar__link">
                Wishlist
              </NavLink>
              <NavLink to="/track" className="account-sidebar__link">
                Lacak Paket
              </NavLink>
            </nav>

            <button type="button" className="account-sidebar__logout" onClick={logout}>
              Keluar
            </button>
          </aside>

          <div className="account-content">
            <Outlet />
          </div>
        </div>
      </div>
    </PageShell>
  )
}