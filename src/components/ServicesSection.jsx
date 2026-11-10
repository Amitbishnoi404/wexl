import React from 'react';
import { Microscope, Activity, ShieldCheck, Flame, Droplets, Layers, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'metals',
    title: 'Metals & Chemical Spectroscopy',
    category: 'Chemical',
    icon: Microscope,
    standards: 'ASTM E415 · IS 8811 · ISO 14707',
    summary: 'High-throughput quantitative optical emission spectrometry for Carbon, Sulfur, Phosphorus, Chromium, Nickel, and Molybdenum in alloy steels, aluminum, brass, and copper.',
    features: ['Fe, Al, Cu, Ni, Co Base matrices', 'Fast 24-hr turnaround available', 'NABL accredited quantitative analysis']
  },
  {
    id: 'mechanical',
    title: 'Mechanical & Tensile Testing',
    category: 'Mechanical',
    icon: Activity,
    standards: 'ASTM A370 · IS 1608 · ISO 6892-1',
    summary: 'Heavy-duty 1000 kN servo-hydraulic universal testing station measuring Yield Strength, Ultimate Tensile Strength (UTS), Elongation %, Reduction of Area, and Bend tests.',
    features: ['Up to 1000 kN load capacity', 'Weld coupon bend & shear testing', 'Sub-zero Charpy impact down to -196°C']
  },
  {
    id: 'polymers',
    title: 'Plastics & Polymers (FTIR / MFI)',
    category: 'Polymer',
    icon: Layers,
    standards: 'ASTM D1238 · ASTM E1252 · ISO 1133',
    summary: 'Complete physical, rheological, and spectroscopic fingerprinting of engineering thermoplastics, virgin polymers, masterbatches, and recycled compounds.',
    features: ['FTIR spectral library identification', 'Melt Flow Index (MFI / MFR)', 'Ash content & glass reinforcement %']
  },
  {
    id: 'corrosion',
    title: 'Corrosion & Salt Spray (NSS / CASS)',
    category: 'Environmental',
    icon: Droplets,
    standards: 'ASTM B117 · ISO 9227 · JIS Z 2371',
    summary: 'Accelerated environmental corrosion testing in cyclic 450L fog chambers determining red/white rust breakdown hours for zinc plating, coatings, and passivated fasteners.',
    features: ['Neutral Salt Spray (NSS)', 'Copper-Accelerated CASS exposure', 'Daily photographic degradation logs']
  },
  {
    id: 'elv',
    title: 'ELV & RoHS Hazardous Substances',
    category: 'Compliance',
    icon: ShieldCheck,
    standards: 'IEC 62321 · EPA 3052 · EU Directives',
    summary: 'Trace detection of Lead (Pb), Cadmium (Cd), Mercury (Hg), and Hexavalent Chromium (Cr6+) in automotive hardware and assemblies for export compliance.',
    features: ['ICP-OES PPB-level detection', 'Hexavalent Chromium spot test', 'Automotive OEM homologation reports']
  },
  {
    id: 'failure',
    title: 'Failure Analysis & Root Cause',
    category: 'Specialized',
    icon: Flame,
    standards: 'ASM Handbook · ASTM E2332',
    summary: 'Forensic metallurgical investigation of cracked shafts, fatigued springs, sheared bolts, and corroded piping using optical microscopy, SEM, and micro-hardness mapping.',
    features: ['Fractography & crack propagation path', 'Decarburization & heat treat depth', 'Expert technical reports & remedies']
  }
];

export default function ServicesSection({ onOpenQuote }) {
  return (
    <section id="services" className="section-wrap" style={{ background: 'rgba(241, 245, 249, 0.4)', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-tag">
            <Sparkles size={13} /> Testing Disciplines
          </span>
          <h2 className="section-title">
            Accredited materials testing domains.
          </h2>
          <p className="section-desc">
            Certified to ISO 9001:2015 and accredited by NABL to ISO/IEC 17025:2017 across metals, polymers, rubber, coatings, and automotive systems.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="cards-grid-3">
          {SERVICES_DATA.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="card-glass"
                style={{
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Top Bar: Icon + Category Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: '#ecfdf5',
                      border: '1px solid #d1fae5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#059669'
                    }}>
                      <Icon size={22} />
                    </div>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#64748b',
                      background: '#f1f5f9',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '9999px',
                      border: '1px solid #e2e8f0'
                    }}>
                      {srv.category}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    lineHeight: 1.3,
                    marginBottom: '0.4rem'
                  }}>
                    {srv.title}
                  </h3>

                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#059669',
                    marginBottom: '0.85rem'
                  }}>
                    {srv.standards}
                  </div>

                  <p style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}>
                    {srv.summary}
                  </p>

                  {/* Feature Checkmarks */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid #f1f5f9',
                    marginBottom: '1.75rem'
                  }}>
                    {srv.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#334155', fontWeight: 500 }}>
                        <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenQuote && onOpenQuote(srv.title)}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700, fontSize: '0.825rem' }}
                >
                  <span>Request Testing Protocol</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
