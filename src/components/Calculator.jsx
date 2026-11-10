import React, { useState } from 'react';
import { Calculator as CalcIcon, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

const MATERIAL_DATABASE = {
  metals: {
    label: 'Metals & Ferrous / Non-Ferrous Alloys',
    tests: [
      { id: 'oes', name: 'OES Chemical Spectroscopy (Fe/Al/Cu/Ni Base)', standard: 'ASTM E415 / IS 8811', price: '₹1,200', turn: '24 - 48 Hours' },
      { id: 'tensile', name: 'Tensile & Yield Strength (1000 kN UTM)', standard: 'ASTM A370 / IS 1608', price: '₹1,800', turn: '2 - 3 Days' },
      { id: 'hardness', name: 'Hardness Test (Rockwell / Micro-Vickers / Brinell)', standard: 'ASTM E18 / ASTM E384', price: '₹750', turn: 'Same Day / 24 Hours' },
      { id: 'impact', name: 'Charpy V-Notch Impact (Sub-Zero down to -196°C)', standard: 'ASTM E23 / ISO 148', price: '₹2,200', turn: '2 - 3 Days' },
      { id: 'metallography', name: 'Microstructure & Grain Size (Inverted Optical)', standard: 'ASTM E112 / IS 4748', price: '₹1,500', turn: '2 Days' },
    ]
  },
  polymers: {
    label: 'Plastics & Thermoplastics (Raw / Molded)',
    tests: [
      { id: 'ftir', name: 'FTIR Polymer Identification & Fingerprinting', standard: 'ASTM E1252 / ISO 10640', price: '₹2,500', turn: '24 Hours' },
      { id: 'mfi', name: 'Melt Flow Index (MFI / MFR)', standard: 'ASTM D1238 / ISO 1133', price: '₹1,400', turn: '24 Hours' },
      { id: 'density', name: 'Specific Gravity & Density by Immersion', standard: 'ASTM D792 / ISO 1183', price: '₹800', turn: '24 Hours' },
      { id: 'ash', name: 'Ash Content & Glass Fiber Reinforcement', standard: 'ASTM D5630 / ISO 3451', price: '₹1,100', turn: '24 - 48 Hours' },
      { id: 'flammability', name: 'UL94 Horizontal & Vertical Flammability', standard: 'UL 94 / ASTM D635', price: '₹2,800', turn: '3 Days' },
    ]
  },
  rubber: {
    label: 'Rubber Compounds & Elastomers',
    tests: [
      { id: 'shore', name: 'Hardness Shore A & Shore D', standard: 'ASTM D2240 / ISO 7619', price: '₹700', turn: 'Same Day' },
      { id: 'set', name: 'Compression Set at Elevated Temperature', standard: 'ASTM D395 Method B', price: '₹1,600', turn: '3 - 4 Days' },
      { id: 'tensilerubber', name: 'Tensile Strength, Elongation & Modulus', standard: 'ASTM D412 / ISO 37', price: '₹1,500', turn: '2 Days' },
      { id: 'ozone', name: 'Ozone & Environmental Weather Aging', standard: 'ASTM D1149 / ISO 1431', price: '₹3,200', turn: '5 - 7 Days' },
    ]
  },
  coatings: {
    label: 'Paints, Plating & Surface Coatings',
    tests: [
      { id: 'saltspray', name: 'Neutral Salt Spray NSS (450 L Chamber)', standard: 'ASTM B117 / ISO 9227', price: '₹250/day', turn: '24 to 1,000+ Hours' },
      { id: 'cass', name: 'Copper Accelerated CASS Salt Spray', standard: 'ASTM B368 / ISO 9227', price: '₹550/day', turn: '24 to 240 Hours' },
      { id: 'xrf', name: 'Coating Thickness (Coulometric / Magnetic)', standard: 'ASTM B499 / ISO 2178', price: '₹950', turn: 'Same Day' },
      { id: 'crosshatch', name: 'Cross-Hatch Adhesion Tape Test', standard: 'ASTM D3359 Method B', price: '₹800', turn: '24 Hours' },
    ]
  },
  elv: {
    label: 'ELV & RoHS Regulated Hazardous Substances',
    tests: [
      { id: 'lead', name: 'Heavy Metals (Pb, Cd, Hg, Cr6+) by ICP-OES', standard: 'IEC 62321 / EPA 3052', price: '₹4,500', turn: '3 - 4 Days' },
      { id: 'cr6', name: 'Hexavalent Chromium Spot & Colorimetric', standard: 'ISO 3613 / IEC 62321-7', price: '₹1,800', turn: '2 Days' },
      { id: 'reach', name: 'SVHC Candidate List Screening', standard: 'EU REACH Regulation', price: '₹6,000', turn: '5 Days' },
    ]
  },
  water: {
    label: 'Water, Effluents & Plating Bath Solutions',
    tests: [
      { id: 'potable', name: 'Complete Drinking Water Quality Suite', standard: 'IS 10500:2012', price: '₹3,200', turn: '3 Days' },
      { id: 'bath', name: 'Plating Bath Metal Concentration (ICP-OES)', standard: 'Internal Validated SOP', price: '₹1,900', turn: '24 Hours' },
      { id: 'effluent', name: 'ETP Treated Effluent Discharge Standards', standard: 'CPCB Guidelines', price: '₹2,800', turn: '3 Days' },
    ]
  }
};

export default function Calculator({ onOpenQuote }) {
  const [material, setMaterial] = useState('metals');
  const [selectedTestId, setSelectedTestId] = useState('oes');
  const [speed, setSpeed] = useState('standard');

  const currentCategory = MATERIAL_DATABASE[material];
  const activeTest = currentCategory.tests.find(t => t.id === selectedTestId) || currentCategory.tests[0];

  const handleMaterialChange = (newMat) => {
    setMaterial(newMat);
    setSelectedTestId(MATERIAL_DATABASE[newMat].tests[0].id);
  };

  return (
    <section id="calculator" className="section-wrap">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-tag">
            <Sparkles size={13} /> Instant Estimator
          </span>
          <h2 className="section-title">
            Turnaround & testing cost calculator.
          </h2>
          <p className="section-desc">
            Select your material and required test parameters to calculate realistic turnaround times and standard reference protocols.
          </p>
        </div>

        {/* 2-Column Calculator Container */}
        <div className="card-glass" style={{
          maxWidth: '980px',
          margin: '0 auto',
          padding: '2.75rem',
          borderRadius: '26px',
          boxShadow: '0 12px 36px rgba(15, 23, 42, 0.06)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch'
          }}>
            {/* Left Form Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: '0.5rem' }}>
                  1. Select Material Category
                </label>
                <select
                  value={material}
                  onChange={(e) => handleMaterialChange(e.target.value)}
                  className="form-input-control"
                  style={{ fontWeight: 600, color: '#0f172a' }}
                >
                  {Object.entries(MATERIAL_DATABASE).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: '0.5rem' }}>
                  2. Select Required Test Method
                </label>
                <select
                  value={selectedTestId}
                  onChange={(e) => setSelectedTestId(e.target.value)}
                  className="form-input-control"
                  style={{ fontWeight: 600, color: '#0f172a' }}
                >
                  {currentCategory.tests.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#64748b', marginBottom: '0.5rem' }}>
                  3. Turnaround Priority
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                  {[
                    { id: 'standard', name: 'Standard', sub: '2-4 Days' },
                    { id: 'express', name: 'Express (+35%)', sub: '24-48 Hrs' },
                    { id: 'urgent', name: 'Urgent (+75%)', sub: 'Same Day' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSpeed(s.id)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: '14px',
                        border: speed === s.id ? '2px solid #059669' : '1px solid #cbd5e1',
                        background: speed === s.id ? '#ecfdf5' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.775rem', fontWeight: 800, color: speed === s.id ? '#059669' : '#0f172a' }}>
                        {s.name}
                      </div>
                      <div style={{ fontSize: '0.675rem', color: '#64748b', marginTop: '2px' }}>
                        {s.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', color: '#64748b', marginTop: '0.5rem' }}>
                <ShieldCheck size={16} color="#059669" style={{ flexShrink: 0 }} />
                <span>All tests conducted strictly under NABL ISO/IEC 17025:2017 conditions.</span>
              </div>
            </div>

            {/* Right Summary Box */}
            <div style={{
              background: 'linear-gradient(145deg, #0f172a 0%, #1e293b 100%)',
              borderRadius: '20px',
              padding: '2.25rem 2rem',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CalcIcon size={14} /> Testing Estimate
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', color: '#cbd5e1' }}>
                    ISO/IEC 17025
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Standard Reference
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: '#6ee7b7', marginTop: '2px' }}>
                      {activeTest.standard}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Selected Test Method
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc', marginTop: '2px', lineHeight: 1.4 }}>
                      {activeTest.name}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Turnaround Time
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
                        <Clock size={14} color="#38bdf8" />
                        <span>{speed === 'urgent' ? 'Same Day (Priority)' : speed === 'express' ? '24 - 48 Hours' : activeTest.turn}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Indicative Rate
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: 800, color: '#34d399' }}>
                        {activeTest.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  type="button"
                  onClick={() => onOpenQuote && onOpenQuote(`${currentCategory.label} - ${activeTest.name}`)}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}
                >
                  <span>Request Official Lab Quote</span>
                  <ArrowRight size={15} />
                </button>
                <div style={{ fontSize: '0.7rem', textAlign: 'center', color: '#94a3b8', marginTop: '0.6rem' }}>
                  Pickup available across Manesar, Gurugram & Delhi-NCR
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
