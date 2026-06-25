import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        {/* Brand Section */}
        <div>
          <Link href="/" className="nav-brand" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            CarbonTatva<span>AI</span>
          </Link>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            AI-native carbon intelligence for modern businesses. Measure, monitor, forecast, and reduce emissions seamlessly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
            <li><Link href="/about" className="footer-link">About Us</Link></li>
            <li><Link href="/offerings" className="footer-link">Our Offerings</Link></li>
            <li><Link href="/rd" className="footer-link">R&D</Link></li>
            <li><Link href="/demo" className="footer-link">Book a Demo</Link></li>
            <li><Link href="/esg-calculator" className="footer-link">ESG Calculator</Link></li>
          </ul>
        </div>

        {/* Legal & Resources */}
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Legal</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
            <li><Link href="#" className="footer-link">Privacy Policy</Link></li>
            <li><Link href="#" className="footer-link">Terms of Service</Link></li>
            <li><Link href="#" className="footer-link">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Contact Us</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>info@carbontatva.com</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            {/* Social Icons Placeholder */}
            <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>LinkedIn</a>
            <a href="#" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>Twitter</a>
          </div>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="container" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          &copy; {new Date().getFullYear()} CarbonTatva AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
