import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, CheckCircle2, Phone, Mail, FileText, CalendarCheck } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, onOpenQuote }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'calibration', label: 'Calibration' },
    { id: 'partners', label: 'Partners' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="header-sticky-root">
      {/* =========================================================================
          1. TOP DARK UTILITY / ANNOUNCEMENT BAR (Matching User Design)
          ========================================================================= */}
      <div className="top-utility-bar">
        <div className="top-utility-inner">
          {/* Left: Badges & Physical Address */}
          <div className="top-utility-left">
            <span className="badge-top-nabl">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>NABL ISO/IEC 17025:2017</span>
            </span>

            <span className="badge-top-iso">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>ISO 9001:2015 CERTIFIED</span>
            </span>

            <span className="top-utility-address">
              Plot No.- 177, IMT Manesar, Sector 6, Gurugram, Haryana
            </span>
          </div>

          {/* Right: Phone & Direct Lab Email */}
          <div className="top-utility-right">
            <a href="tel:+911244209395" className="top-utility-link">
              <Phone size={13} />
              <span>+91 (0124) 420-WEXL</span>
            </a>
            <a href="mailto:info@wexllab.com" className="top-utility-link">
              <Mail size={13} />
              <span>info@wexllab.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN NAVIGATION BAR (Crisp White, Large Typography, Exact Branding)
          ========================================================================= */}
      <div className={`main-navbar-bar ${scrolled ? 'scrolled-elevation' : ''}`}>
        <div className="main-navbar-inner">
          {/* Brand Logo & Prominent Title Lockup */}
          <div
            onClick={() => handleLinkClick('hero')}
            className="brand-lockup-container"
            title="WeXL Laboratory Pvt. Ltd."
          >
            {/* User's Official Emblem (Transparent, High-Res, Complete Logo) */}
            <div className="brand-emblem-box">
              <img
                src="/images/wexl-emblem.png"
                alt="WeXL Laboratory Emblem"
                className="brand-emblem-img"
              />
            </div>

            {/* Enlarged Company Name & Discipline Subtitle */}
            <div className="brand-text-column">
              <div className="brand-title-line">
                <span className="brand-name-wexl">WeXL</span>
                <span className="brand-name-lab">Laboratory</span>
              </div>
              <span className="brand-subtitle-line">
                MATERIALS · METAL · AUTOMOBILE TESTING
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Exact User Layout with Light Green Active Pill) */}
          <nav className="desktop-nav-menu">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className={`nav-menu-btn ${isActive ? 'active-pill' : ''}`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons: [Verify Report] [Request Quote] */}
          <div className="header-actions-group">
            <button
              type="button"
              onClick={() => handleLinkClick('verify')}
              className={`btn-verify-report ${activeSection === 'verify' ? 'active-verify' : ''}`}
              title="Verify NABL QR Code Digital Report"
            >
              <CalendarCheck size={16} />
              <span>Verify Report</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenQuote && onOpenQuote()}
              className="btn-request-quote"
              title="Request Testing Quotation"
            >
              <FileText size={16} />
              <span>Request Quote</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-hamburger-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. RESPONSIVE MOBILE DRAWER
          ========================================================================= */}
      {mobileOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div>
              {/* Drawer Top */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img src="/images/wexl-emblem.png" alt="WeXL Logo" style={{ height: '36px', width: 'auto' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-brand-rounded)', fontWeight: 800, fontSize: '1.3rem', color: '#000000', lineHeight: 1.1 }}>
                      WeXL Laboratory
                    </div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em' }}>
                      MATERIALS TESTING
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0.5rem', color: '#64748b' }}
                >
                  <X size={22} />
                </button>
              </div>

              {/* Accreditations in Drawer */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem', padding: '0.75rem', background: '#0f172a', borderRadius: '12px', color: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>
                  <ShieldCheck size={14} />
                  <span>NABL ISO/IEC 17025:2017</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Plot No.- 177, IMT Manesar, Gurugram
                </div>
              </div>

              {/* Nav Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    style={{
                      textAlign: 'left',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: activeSection === link.id ? 700 : 600,
                      border: 'none',
                      background: activeSection === link.id ? '#ecfdf5' : 'transparent',
                      color: activeSection === link.id ? '#059669' : '#334155',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{link.label}</span>
                    {activeSection === link.id && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }}></span>}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => handleLinkClick('verify')}
                  style={{
                    textAlign: 'left',
                    padding: '0.8rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#0f172a',
                    cursor: 'pointer',
                    marginTop: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CalendarCheck size={16} color="#059669" />
                  <span>Verify Report QR</span>
                </button>
              </div>
            </div>

            {/* Bottom Quote Button */}
            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenQuote && onOpenQuote();
                }}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
              >
                <FileText size={16} />
                <span>Request Quote</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
