import { Link } from 'react-router-dom'
import { brand, footerLinks } from '../../data/site'
import ScrollReveal from '../ui/ScrollReveal'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <ScrollReveal>
          <div className="site-footer__brand">
            <Link to="/" className="site-footer__logo">{brand.name}</Link>
            <p>{brand.tagline}</p>
          </div>
        </ScrollReveal>

        <div className="site-footer__cols">
          <ScrollReveal delay={0.05} className="site-footer__col">
            <h4>Shop</h4>
            <ul>
              {footerLinks.shop.map((link) => (
                <li key={link.label}><Link to={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="site-footer__col">
            <h4>Company</h4>
            <ul>
              {footerLinks.company.map((link) => (
                <li key={link.label}><Link to={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="site-footer__col">
            <h4>Help</h4>
            <ul>
              {footerLinks.help.map((link) => (
                <li key={link.label}><Link to={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="site-footer__col site-footer__col--newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe for updates and exclusive offers.</p>
            <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" required aria-label="Email" />
              <button type="submit">Subscribe</button>
            </form>
          </ScrollReveal>
        </div>

        <div className="site-footer__bottom">
          <span>© 2026 {brand.name}. All rights reserved.</span>
          <div className="site-footer__legal">
            <Link to="/contact">Privacy</Link>
            <Link to="/contact">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}