import React from 'react';
import { Compass, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

const CALIBRATION_SCOPES = [
  { discipline: 'Mechanical & Dimensions', items: ['Vernier Calipers, Micrometers, Height Gauges', 'Dial Gauges, Thickness Meters, Feeler Gauges', 'Profile Projector, Optical Coordinate Scales'] },
  { discipline: 'Mass & Volume', items: ['Analytical & Precision Balances (Class I & II)', 'Standard Test Weights (F1, F2, M1 Class)', 'Micro-pipettes, Burettes & Volumetric Flasks'] },
  { discipline: 'Pressure & Vacuum', items: ['Hydraulic & Pneumatic Pressure Gauges', 'Dead Weight Testers & Pressure Transmitters', 'Vacuum Gauges & Manometers up to 700 Bar'] },
  { discipline: 'Thermal & Temperature', items: ['RTDs, Pt100 Sensors, Thermocouples (J, K, T, R, S)', 'Muffle Furnaces, Dry Block Baths, Ovens', 'Infrared Non-contact Pyrometers (-40°C to 1200°C)'] },
  { discipline: 'Force & Torque', items: ['Tensile & Compression UTM Load Cells', 'Torque Wrenches (Click & Digital types)', 'Hardness Test Reference Blocks (HRC, HRB, HV)'] },
  { discipline: 'Electrical & Instrumentation', items: ['Digital Multimeters (4½ & 6½ digit)', 'Temperature Controllers, Timers & Counters', 'Clamp Meters & Insulation Testers (Megger)'] },
];

export default function CalibrationSection({ onOpenQuote }) {
  return (
    <section id="calibration" className="section-wrap" style={{ background: 'rgba(241, 245, 249, 0.4)', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-tag">
            <Compass size={13} /> Metrology & Traceability
          </span>
          <h2 className="section-title">
            Traceable calibration, backed by NABL.
          </h2>
          <p className="section-desc">
            In partnership with <strong>M/s AVI Calibration Services LLP</strong> (NABL Accredited), WeXL delivers high-precision calibration services both inside the lab and on-site at your factory floor.
          </p>
        </div>

        {/* Feature Spotlight Card */}
        <div className="card-glass" style={{
          padding: '2.5rem 3rem',
          borderRadius: '24px',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, rgba(236, 253, 245, 0.7) 0%, #ffffff 100%)',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.8rem',
                borderRadius: '9999px',
                background: '#ecfdf5',
                color: '#059669',
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '1rem',
                border: '1px solid rgba(5, 150, 105, 0.2)'
              }}>
                <ShieldCheck size={14} /> Strategic Calibration Partner
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: '#0f172a',
                lineHeight: 1.25,
                marginBottom: '0.75rem'
              }}>
                M/s AVI Calibration Services LLP
              </h3>

              <p style={{
                fontSize: '0.95rem',
                color: '#475569',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                National and international traceability to National Physical Laboratory (NPL, India) standards. Complete calibration certificates with measurement uncertainty, environmental conditions, and next calibration due date stickers.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={15} color="#059669" /> In-House Metrology Bay
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={15} color="#059669" /> Pan-NCR On-Site Calibration
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={15} color="#059669" /> NPL Traceable Uncertainty
                </span>
              </div>
            </div>

            {/* Certificate Box */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
              maxWidth: '320px',
              margin: '0 auto'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                border: '1px solid #d1fae5'
              }}>
                <Award size={30} />
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Accreditation Standard
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>
                ISO/IEC 17025:2017
              </div>
              <div style={{ fontSize: '0.775rem', color: '#059669', fontWeight: 700, marginBottom: '1.25rem' }}>
                NABL Accredited Calibration
              </div>
              <button
                type="button"
                onClick={() => onOpenQuote && onOpenQuote('Traceable Calibration (AVI Partnership)')}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Book Calibration
              </button>
            </div>
          </div>
        </div>

        {/* 6 Calibration Disciplines Grid */}
        <div className="cards-grid-3">
          {CALIBRATION_SCOPES.map((scope, idx) => (
            <div key={idx} className="card-glass" style={{ padding: '1.75rem 2rem' }}>
              <h4 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1rem'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669' }}></span>
                <span>{scope.discipline}</span>
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {scope.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
                    <CheckCircle2 size={14} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
