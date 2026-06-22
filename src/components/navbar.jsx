import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="logo-nav">
          <img className="img-nav hide-on-mobile" src="/carbontattva_ai_logo.jpg" alt="CarbonTatva Logo" />
          <Link to="/" className="nav-brand" onClick={() => setIsOpen(false)}>
            Carbon<span>Tatva AI</span>
          </Link>
        </div>

        {/* Global Desktop Navigation / Mobile Hidden List */}
        <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <Link to="/" className={`nav-link ${path === "/" ? "active" : ""}`} onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link
              to="/about"
              className={`nav-link ${path === "/about" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/offerings"
              className={`nav-link ${path === "/offerings" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Our Offerings
            </Link>
            <Link
              to="/rd"
              className={`nav-link ${path === "/rd" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              R&D
            </Link>
          </div>
          <div className="nav-actions hide-on-mobile">
            <Link to="/demo" className="btn btn-primary" onClick={() => setIsOpen(false)}>
              <LogIn size={18} style={{ marginRight: "8px" }} />
              Book a Demo
            </Link>
          </div>
        </div>

        {/* Mobile ONLY Navigation Actions */}
        <div className="mobile-only-actions">
          <Link to="/demo" className="btn btn-primary btn-mobile-demo" onClick={() => setIsOpen(false)}>
            Book a Demo
          </Link>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
