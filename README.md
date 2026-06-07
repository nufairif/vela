# VELA Store

A modern fashion e-commerce storefront built as a single-page application. VELA showcases a curated apparel collection with shopping, account management, order tracking, and a polished minimalist UI.

## Description

VELA is a front-end demo store for everyday wardrobe essentials. It includes a full customer journey — browsing collections, viewing product details, managing a cart and wishlist, checking out, and tracking orders — without requiring a backend server.

All user data (accounts, cart, orders, addresses, and wishlist) is stored locally in the browser via `localStorage`, making it easy to run, explore, and prototype.

### Key Features

- **Storefront** — Home, shop, collections, product detail pages, journal, and about pages
- **Authentication** — Register, login, logout, profile editing, and password change
- **Shopping cart** — Variant selection (size & color), quantity controls, and cart drawer
- **Wishlist** — Save products to a personal wishlist (login required)
- **Checkout** — Shipping options, payment method selection, and order confirmation
- **Order tracking** — Simulated shipment timeline with AWB numbers and courier details
- **Customer account** — Dashboard, order history, saved addresses, and notification settings
- **Demo account** — Pre-filled sample data for orders, cart, wishlist, and addresses

> **Note:** This is a prototype. Payments, shipping rates, and tracking are simulated. There is no real payment gateway or courier API integration.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev/) |
| Build tool | [Vite 6](https://vitejs.dev/) |
| Routing | [React Router 7](https://reactrouter.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Carousel | [Swiper](https://swiperjs.com/) |
| Styling | Plain CSS (custom design system) |
| Data | Static JSON modules + `localStorage` |
| Fonts | Fraunces & DM Sans (Google Fonts) |

## Requirements

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

## Getting Started

### 1. Clone or download the project

```bash
cd ecommerce-1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### 4. Build for production

```bash
npm run build
```

Output is written to the `dist/` folder.

### 5. Preview the production build

```bash
npm run preview
```

## How to Use

### Browse the store

- Visit the **home page** to explore featured collections
- Go to **Shop** (`/shop`) to see all products with category filters
- Open a **product page** to select size and color, then add items to your bag
- Read articles on the **Journal** page

### Create an account or use the demo

**Option A — Demo account (recommended)**

1. Go to `/login`
2. Click **Gunakan Akun Demo** to auto-fill credentials
3. Click **Masuk** (Login)

| Field | Value |
|-------|-------|
| Email | `demo@vela.com` |
| Password | `demo123` |

The demo account comes pre-loaded with orders, cart items, wishlist products, and saved addresses.

**Option B — Register a new account**

1. Go to `/register`
2. Fill in your name, email, and password
3. Log in with your new credentials

### Shopping flow

1. **Log in** (required to add items to cart or wishlist)
2. Select a product → choose **size** and **color** → click **Add to Bag**
3. Open the cart from the header icon
4. Go to **Checkout** and complete the shipping form
5. After placing an order, click **Lacak Pesanan** to view tracking details

### Track a package

- Open **Lacak Paket** at `/track`
- Enter an order number (e.g. `VELA-W1S6H`) or use the demo samples
- Click **Lihat** on any sample card to expand tracking details inline
- Guests must also enter the order email (`demo@vela.com` for demo orders)

### Manage your account

After logging in, visit **Akun Saya** (`/account`):

| Section | Path | Description |
|---------|------|-------------|
| Overview | `/account` | Summary stats and recent orders |
| Orders | `/account/orders` | Full order history with tracking links |
| Profile | `/account/profile` | Edit name and phone number |
| Addresses | `/account/addresses` | Add, edit, or remove shipping addresses |
| Settings | `/account/settings` | Notification preferences and password |

## Project Structure

```
src/
├── components/     # Reusable UI (layout, product, tracking, sections)
├── context/        # React context (auth, cart, wishlist)
├── data/           # Static content (products, collections, seed data)
├── pages/          # Route-level page components
│   └── account/    # Customer account sub-pages
├── styles/         # Global and page-specific CSS
├── utils/          # Helpers (auth, currency, tracking, user data)
├── router.jsx      # Application routes
└── main.jsx        # App entry point
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Serve the production build locally |

## License

This project is private and intended for demonstration purposes.