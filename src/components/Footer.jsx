import React from 'react';
import { Download, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer({ onNavigate, onOpenQuote }) {
  return (
    <footer style={{
      background: '#0f172a',
      color: '#cbd5e1',
      paddingTop: '4.5rem',
      paddingBottom: '3rem',
      borderTop: '1px solid #1e293b',
      position: 'relative',
      zIndex: 10
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid #1e293b'
        }}>
          {/* Col 1: Brand & Accreditation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#ffffff',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img src="/images/wexl-emblem.png" alt="WeXL Emblem" style={{ height: '28px', width: 'auto' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-brand-rounded)', fontWeight: 800, fontSize: '1.35rem', color: '#ffffff', letterSpacing: '-0.01em' }}>
                  WeXL <span style={{ color: '#10b981' }}>Laboratory</span>
                </div>
                <div style={{ fontSize: '0.675rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  M/s WeXL Laboratory Pvt. Ltd.
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6 }}>
              One of the most trusted and competitive materials, metals, polymers and automobile testing laboratories in the NCR region. Accredited by NABL to ISO/IEC 17025:2017 & certified to ISO 9001:2015.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
              <span style={{ fontSize: '0.675rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '9999px', background: '#064e3b', color: '#6ee7b7', border: '1px solid #047857' }}>
                NABL ISO/IEC 17025:2017
              </span>
              <span style={{ fontSize: '0.675rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '9999px', background: '#1e293b', color: '#cbd5e1', border: '1px solid #334155' }}>
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h5 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffffff' }}>
              Navigation
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
              <li><button onClick={() => onNavigate('hero')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Overview Home</button></li>
              <li><button onClick={() => onNavigate('services')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Testing Services</button></li>
              <li><button onClick={() => onNavigate('equipment')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Major Equipment</button></li>
              <li><button onClick={() => onNavigate('calibration')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Traceable Calibration</button></li>
              <li><button onClick={() => onNavigate('calculator')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Pricing Calculator</button></li>
              <li><button onClick={() => onNavigate('partners')} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Business Partners</button></li>
            </ul>
          </div>

          {/* Col 3: Testing Disciplines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h5 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffffff' }}>
              Testing Scopes
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              <li>Metals & Chemical Spectroscopy (OES)</li>
              <li>1000 kN Tensile & Mechanical Testing</li>
              <li>FTIR Polymer Fingerprinting & MFI</li>
              <li>Accelerated Salt Spray Fog (NSS/CASS)</li>
              <li>ELV & RoHS Compliance Screening</li>
              <li>Failure Analysis & Root Cause</li>
            </ul>
          </div>

          {/* Col 4: Coordinates & Brochure */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <h5 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffffff' }}>
              Coordinates
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Plot No.- 177, IMT Manesar, Sector 6, Gurugram, Haryana - 122052</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="#34d399" style={{ flexShrink: 0 }} />
                <span>+91 (0124) 420-WEXL</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="#34d399" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)' }}>info@wexllab.com</span>
              </div>
            </div>

            <div style={{ paddingTop: '0.5rem' }}>
              <a
                href="/wexl-brochure.pdf"
                download="WeXL_Laboratory_Brochure.pdf"
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', fontWeight: 700, gap: '0.4rem', background: '#1e293b', color: '#ffffff', borderColor: '#334155' }}
              >
                <Download size={14} color="#34d399" />
                <span>Brochure Download (PDF)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <div>
            &copy; {new Date().getFullYear()} M/s WeXL Laboratory Pvt. Ltd. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span>Dr. Amit Bishnoi (Director)</span>
            <span>•</span>
            <span>NABL ISO/IEC 17025:2017</span>
            <span>•</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
