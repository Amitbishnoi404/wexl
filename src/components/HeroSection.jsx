import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Download, CheckCircle2, Sparkles, MapPin, Award } from 'lucide-react';
import Hero3D from './Hero3D';

export default function HeroSection({ onOpenQuote, onNavigate }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gsap-fade-up', {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: 'power3.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{ paddingTop: '1.75rem', paddingBottom: '4rem', position: 'relative' }}>
      <div className="container">
        {/* ==============================================================
            TOP OF MAIN PAGE: PROMINENT COMPANY BRAND & LOGO LOCKUP
            (Increased Letter Size of Company Logo & Larger Top Typography)
            ============================================================== */}
        <div className="gsap-fade-up" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.75rem',
          padding: '1.6rem 2.25rem',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1.5px solid rgba(209, 250, 229, 0.85)',
          boxShadow: '0 8px 24px rgba(5, 150, 105, 0.07)',
          marginBottom: '3rem'
        }}>
          {/* Left: Prominent Emblem + Large Company Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              width: '92px',
              height: '92px',
              borderRadius: '22px',
              background: '#ffffff',
              border: '2px solid #a7f3d0',
              boxShadow: '0 6px 18px rgba(5, 150, 105, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              flexShrink: 0
            }}>
              <img src="/images/wexl-emblem.png" alt="WeXL Emblem Logo" style={{ height: '76px', width: 'auto', objectFit: 'contain' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-brand-rounded)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                  color: '#000000',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.15
                }}>
                  M/s WeXL Laboratory Pvt. Ltd.
                </span>
                <span style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#059669',
                  background: '#ecfdf5',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1.5px solid rgba(5, 150, 105, 0.35)'
                }}>
                  Govt. Accredited Lab
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.95rem', flexWrap: 'wrap', marginTop: '6px', fontSize: '1.025rem', color: '#475569' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>
                  Materials · Metal · Polymer & Automobile Testing Laboratory
                </span>
                <span style={{ color: '#cbd5e1' }}>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: '#059669' }}>
                  <MapPin size={17} color="#059669" />
                  <span>Plot No.- 177, IMT Manesar, Sector 6, Gurugram</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Quick Accreditations & Leadership */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '9999px',
              background: '#ecfdf5',
              border: '1.5px solid rgba(16, 185, 129, 0.4)',
              color: '#047857',
              fontSize: '0.9rem',
              fontWeight: 800
            }}>
              <Award size={18} color="#059669" />
              <span>NABL ISO/IEC 17025:2017</span>
            </div>

            <div style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#334155',
              background: '#f8fafc',
              padding: '0.6rem 1.15rem',
              borderRadius: '9999px',
              border: '1px solid #cbd5e1'
            }}>
              ISO 9001:2015 CERTIFIED
            </div>

            <div style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#0f172a',
              background: '#f1f5f9',
              padding: '0.6rem 1.15rem',
              borderRadius: '9999px',
              border: '1px solid #cbd5e1'
            }}>
              Director: <strong style={{ color: '#059669', fontWeight: 800 }}>Dr. Amit Bishnoi</strong>
            </div>
          </div>
        </div>

        {/* Main 2-Column Hero Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
          marginBottom: '4.5rem'
        }}>
          {/* Left Column: Headlines & Actions */}
          <div style={{ maxWidth: '590px' }}>
            <h1 className="gsap-fade-up" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4.8vw, 3.8rem)',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1.35rem'
            }}>
              Precision Materials & <br />
              <span className="text-gradient">Automobile Testing</span>.
            </h1>

            <p className="gsap-fade-up" style={{
              fontSize: '1.15rem',
              color: '#475569',
              lineHeight: 1.7,
              marginBottom: '2rem'
            }}>
              Delivering dependable, fast-turnaround quantitative test results across NCR. Equipped with high-resolution <strong>OES Spectrometry, 1000 kN Tensile UTM, FTIR Molecular Characterization, ICP-OES, and Salt Spray Corrosion chambers</strong>.
            </p>

            {/* CTAs */}
            <div className="gsap-fade-up" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <button
                onClick={() => onOpenQuote && onOpenQuote()}
                className="btn btn-primary btn-lg"
              >
                <span>Request Testing Quote</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => onNavigate('calculator')}
                className="btn btn-secondary btn-lg"
              >
                <Sparkles size={17} color="#059669" />
                <span>Estimate Turnaround</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="gsap-fade-up" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e2e8f0',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#475569'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={17} color="#059669" />
                <span>24-hr Express Turnaround</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={17} color="#059669" />
                <span>Pan-NCR Sample Pickup</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <CheckCircle2 size={17} color="#059669" />
                <span>NABL Digital ULR QR Codes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Three.js 3D Interactive Model (WeXL 3D Logo) */}
          <div className="gsap-fade-up">
            <Hero3D />
          </div>
        </div>

        {/* About Anchor: Stats & Company Creed */}
        <div id="about" style={{ scrollMarginTop: '110px' }}></div>

        {/* 4 Discrete Stats Cards */}
        <div className="stats-grid">
          {[
            { value: '20+', title: 'Years Expertise', desc: 'Led by Dr. Amit Bishnoi' },
            { value: '22+', title: 'Major Instruments', desc: 'OES, 1000 kN UTM, FTIR, ICP' },
            { value: '40+', title: 'Corporate Partners', desc: 'Bajaj, JTEKT, Allied, Tenneco' },
            { value: '100%', title: 'Traceable Audit', desc: 'NABL ISO/IEC 17025 Accredited' },
          ].map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Creed Banner */}
        <div className="creed-banner-card">
          <div style={{ maxWidth: '640px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#34d399',
              background: 'rgba(5, 150, 105, 0.25)',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              marginBottom: '0.85rem'
            }}>
              Above all — Company Creed
            </div>
            <blockquote style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              fontWeight: 500,
              color: '#f1f5f9',
              fontStyle: 'italic',
              lineHeight: 1.6,
              marginBottom: '0.5rem'
            }}>
              "To build and support a skilled team that always works honestly and in the best scientific way."
            </blockquote>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              — <span style={{ fontFamily: 'var(--font-brand-rounded)', color: '#ffffff', fontWeight: 700 }}>M/s WeXL Laboratory Pvt. Ltd.</span> (Policy on Technical Competence & Integrity)
            </div>
          </div>

          <a
            href="/wexl-brochure.pdf"
            download="WeXL_Laboratory_Brochure.pdf"
            className="btn btn-secondary btn-sm"
            style={{ fontWeight: 700, gap: '0.6rem', flexShrink: 0 }}
          >
            <Download size={15} />
            <span>Download Official Brochure</span>
          </a>
        </div>
      </div>
    </section>
  );
}
