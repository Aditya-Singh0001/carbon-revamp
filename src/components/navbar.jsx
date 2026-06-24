"use client";
import { useState, useCallback, useEffect, useRef } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Menu, X } from 'lucide-react';

const Navbar = () => {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Ref to prevent double-fire: onTouchEnd fires first, then onClick.
  // If touch handled it, we skip the subsequent click.
  const touchHandledRef = useRef(false);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    touchHandledRef.current = true;
    setIsOpen(prev => !prev);
  }, []);

  const handleClick = useCallback((e) => {
    // If touch already handled this interaction, skip
    if (touchHandledRef.current) {
      touchHandledRef.current = false;
      return;
    }
    e.preventDefault();
    setIsOpen(prev => !prev);
  }, []);

  // Confirm hydration happened
  useEffect(() => {
    console.log('[Navbar] Component hydrated, interactive.');
  }, []);

  return (
    <>
      <nav className="navbar" style={{ position: 'fixed', overflow: 'visible' }}>
        <div className="container navbar-content">
          <div className="logo-nav">
            <img className="img-nav" src="/carbontattva_ai_logo.jpg" alt="CarbonTatva Logo" />
            <Link href="/" className="nav-brand" onClick={close}>
              Carbon<span>Tatva AI</span>
            </Link>
          </div>

          {/* Desktop-only nav menu */}
          <div className="nav-menu hide-on-mobile">
            <div className="nav-links">
              <Link href="/" className={`nav-link ${path === "/" ? "active" : ""}`} onClick={close}>Home</Link>
              <Link href="/about" className={`nav-link ${path === "/about" ? "active" : ""}`} onClick={close}>About Us</Link>
              <Link href="/offerings" className={`nav-link ${path === "/offerings" ? "active" : ""}`} onClick={close}>Our Offerings</Link>
              <Link href="/rd" className={`nav-link ${path === "/rd" ? "active" : ""}`} onClick={close}>R&D</Link>
              <Link href="/blogs" className={`nav-link ${path === "/blogs" ? "active" : ""}`} onClick={close}>Blogs</Link>
            </div>
            <div className="nav-actions">
              <Link href="/demo" className="btn btn-primary" onClick={close}>
                <LogIn size={18} style={{ marginRight: "8px" }} />
                Book a Demo
              </Link>
            </div>
          </div>

          {/* Mobile-only: Book a Demo + Hamburger */}
          <div className="mobile-only-actions">
            <Link href="/demo" className="btn btn-primary btn-mobile-demo" onClick={close}>
              Book a Demo
            </Link>
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={handleClick}
              onTouchEnd={handleTouchEnd}
              aria-label="Toggle Navigation"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown — inside nav for correct z-index stacking */}
        {isOpen && (
          <div
            className="mobile-nav-dropdown"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              borderTop: '1px solid var(--border-light)',
              borderBottom: '2px solid var(--border-light)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Link href="/" className={`mobile-nav-link ${path === "/" ? "active" : ""}`} onClick={close}>Home</Link>
            <Link href="/about" className={`mobile-nav-link ${path === "/about" ? "active" : ""}`} onClick={close}>About Us</Link>
            <Link href="/offerings" className={`mobile-nav-link ${path === "/offerings" ? "active" : ""}`} onClick={close}>Our Offerings</Link>
            <Link href="/rd" className={`mobile-nav-link ${path === "/rd" ? "active" : ""}`} onClick={close}>R&D</Link>
            <Link href="/blogs" className={`mobile-nav-link ${path === "/blogs" ? "active" : ""}`} onClick={close}>Blogs</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
