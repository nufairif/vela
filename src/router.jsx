import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CollectionsPage from './pages/CollectionsPage'
import CollectionPage from './pages/CollectionPage'
import ProductPage from './pages/ProductPage'
import AboutPage from './pages/AboutPage'
import JournalPage from './pages/JournalPage'
import JournalArticlePage from './pages/JournalArticlePage'
import ContactPage from './pages/ContactPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AccountLayout from './pages/account/AccountLayout'
import AccountOverview from './pages/account/AccountOverview'
import AccountOrders from './pages/account/AccountOrders'
import AccountProfile from './pages/account/AccountProfile'
import AccountAddresses from './pages/account/AccountAddresses'
import AccountSettings from './pages/account/AccountSettings'
import AccountOrderTrack from './pages/account/AccountOrderTrack'
import TrackPage from './pages/TrackPage'
import WishlistPage from './pages/WishlistPage'
import HelpPage from './pages/HelpPage'
import NotFoundPage from './pages/NotFoundPage'
import { shippingInfo, returnsInfo, sizeGuideInfo } from './data/help'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: 'collections/:slug', element: <CollectionPage /> },
      { path: 'products/:id', element: <ProductPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'journal', element: <JournalPage /> },
      { path: 'journal/:slug', element: <JournalArticlePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'track', element: <TrackPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'shipping', element: <HelpPage {...shippingInfo} /> },
      { path: 'returns', element: <HelpPage {...returnsInfo} /> },
      { path: 'size-guide', element: <HelpPage {...sizeGuideInfo} /> },
      {
        path: 'account',
        element: <AccountLayout />,
        children: [
          { index: true, element: <AccountOverview /> },
          { path: 'orders', element: <AccountOrders /> },
          { path: 'orders/:orderId/track', element: <AccountOrderTrack /> },
          { path: 'profile', element: <AccountProfile /> },
          { path: 'addresses', element: <AccountAddresses /> },
          { path: 'settings', element: <AccountSettings /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])