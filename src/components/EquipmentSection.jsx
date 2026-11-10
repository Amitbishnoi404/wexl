import React, { useState } from 'react';
import { Cpu, Search, CheckCircle2, ChevronRight } from 'lucide-react';

const EQUIPMENT_CATALOG = [
  {
    id: 'oes',
    name: 'Hitachi Foundry-Master Smart OES Spectrophotometer',
    category: 'spectroscopy',
    badge: 'Flagship Spectroscopy',
    image: '/images/oes-spectrometer.jpg',
    specs: ['Fe, Al, Cu, Ni, Co Base Matrices', 'Detects C, P, S, Cr, Mo down to PPM', 'High-purity Argon spark chamber', 'Standard: ASTM E415 / IS 8811'],
    desc: 'High-throughput optical emission spectrometer providing precise multi-element quantitative chemical analysis of ferrous and non-ferrous engineering alloys in under 30 seconds.'
  },
  {
    id: 'utm',
    name: 'TRUEMET 1000 kN Universal Testing Machine (UTM)',
    category: 'mechanical',
    badge: 'Heavy Mechanical',
    image: '/images/utm-machine.jpg',
    specs: ['Max Capacity: 1000 kN (100 Tons)', 'Class 0.5 High-precision load cell', 'Tensile, Yield, Proof Stress, Bend, Compression', 'Standard: ASTM A370, IS 1608, ISO 6892'],
    desc: 'Dual-column servo-hydraulic mechanical testing station capable of testing heavy-gauge rebar, forged bolts, automotive structural stampings, and weld coupons.'
  },
  {
    id: 'ftir',
    name: 'Agilent Cary 630 FTIR Spectrometer',
    category: 'polymer',
    badge: 'Polymer Molecular',
    image: '/images/ftir-spectrometer.jpg',
    specs: ['DialPath & Diamond ATR sampling', 'Spectral range: 4000 to 400 cm⁻¹', 'Polymer fingerprint spectral library', 'Standard: ASTM E1252 / ISO 10640'],
    desc: 'Advanced Fourier Transform Infrared spectrophotometer for unambiguous identification of polymers, rubbers, additives, fillers, and organic contaminants.'
  },
  {
    id: 'mfi',
    name: 'Digital Melt Flow Indexer (MFI / MFR)',
    category: 'polymer',
    badge: 'Rheology',
    image: '/images/mfi-polymer.jpg',
    specs: ['Microprocessor temp control: ±0.1°C up to 400°C', 'Automatic motorized extrudate cutter', 'Standard weights: 2.16 kg, 5 kg, 21.6 kg', 'Standard: ASTM D1238 / ISO 1133'],
    desc: 'Precision melt indexer evaluating thermoplastic rheology, molecular weight distribution, and grade verification for tier-1 automotive molders.'
  },
  {
    id: 'icp',
    name: 'Agilent 5100 Synchronous ICP-OES',
    category: 'spectroscopy',
    badge: 'Trace Elements',
    image: '/images/icp-oes.jpg',
    specs: ['Dual view (Axial / Radial plasma torch)', 'Sub-PPB heavy metal detection (Pb, Cd, Hg)', 'ELV & RoHS compliance screening', 'Standard: EPA 3052 / IEC 62321'],
    desc: 'Inductively Coupled Plasma Optical Emission Spectrometer for elemental trace analysis in plastics, plating baths, oils, and automotive ELV regulation verification.'
  },
  {
    id: 'microscope',
    name: 'Inverted Trinocular Metallurgical Microscope',
    category: 'metallography',
    badge: 'Microstructure',
    image: '/images/microscope-hero.jpg',
    specs: ['Magnification: 50x to 1000x', 'Polarised light & darkfield illumination', 'Dedicated high-res CMOS image analysis software', 'Standard: ASTM E112 / IS 4748'],
    desc: 'High-resolution metallurgical imaging station for grain size determination, non-metallic inclusion rating, phase fraction analysis, and decarburisation depth.'
  },
  {
    id: 'corrosion',
    name: 'Salt Spray Accelerated Corrosion Chamber (450 L)',
    category: 'environmental',
    badge: 'Corrosion Study',
    image: '/images/salt-spray-chamber.jpg',
    specs: ['Volume: 450 Liters capacity', 'NSS (Neutral) & CASS (Copper Accelerated)', 'Digital PID temp & atomising tower control', 'Standard: ASTM B117 / ISO 9227'],
    desc: 'Automated cyclic corrosion test chamber determining the protective lifespan of zinc electroplating, chrome finishes, anodising, and powder coatings.'
  }
];

export default function EquipmentSection({ onOpenQuote }) {
  const [activeCat, setActiveCat] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = EQUIPMENT_CATALOG.filter((item) => {
    const matchesCat = activeCat === 'all' || item.category === activeCat;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="equipment" className="section-wrap">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-tag">
            <Cpu size={13} /> Major Instrumentation
          </span>
          <h2 className="section-title">
            List of major equipment & facilities.
          </h2>
          <p className="section-desc">
            Inside WeXL's controlled test bays at IMT Manesar, Gurugram, maintained strictly under ISO/IEC 17025 environmental conditions (23°C ± 2°C, 50% RH).
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          maxWidth: '960px',
          margin: '0 auto 3rem auto'
        }}>
          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(241, 245, 249, 0.85)',
            padding: '0.3rem 0.4rem',
            borderRadius: '9999px',
            border: '1px solid #e2e8f0',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'all', label: 'All Equipment' },
              { id: 'spectroscopy', label: 'Spectroscopy' },
              { id: 'mechanical', label: 'Mechanical' },
              { id: 'polymer', label: 'Polymers' },
              { id: 'metallography', label: 'Metallography' },
              { id: 'environmental', label: 'Corrosion' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCat(cat.id)}
                style={{
                  padding: '0.45rem 1rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  background: activeCat === cat.id ? '#ffffff' : 'transparent',
                  color: activeCat === cat.id ? '#0f172a' : '#64748b',
                  boxShadow: activeCat === cat.id ? '0 2px 6px rgba(15, 23, 42, 0.08)' : 'none'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search instrument..."
              className="form-input-control"
              style={{ paddingLeft: '2.5rem', height: '42px', fontSize: '0.85rem', borderRadius: '9999px' }}
            />
          </div>
        </div>

        {/* Equipment Cards Grid */}
        <div className="cards-grid-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="card-glass"
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Image Header with Badge */}
                <div style={{ position: 'relative', height: '210px', background: '#f1f5f9', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.675rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#059669',
                    border: '1px solid rgba(5, 150, 105, 0.2)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                  }}>
                    {item.badge}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.75rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    lineHeight: 1.35,
                    marginBottom: '0.6rem'
                  }}>
                    {item.name}
                  </h3>

                  <p style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem'
                  }}>
                    {item.desc}
                  </p>

                  {/* Bullet Specs */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid #f1f5f9'
                  }}>
                    {item.specs.map((spec, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.775rem', color: '#334155' }}>
                        <CheckCircle2 size={14} color="#059669" style={{ flexShrink: 0 }} />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ padding: '0 1.75rem 1.75rem 1.75rem' }}>
                <button
                  type="button"
                  onClick={() => onOpenQuote && onOpenQuote(item.name)}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center', fontWeight: 700, fontSize: '0.825rem' }}
                >
                  <span>Book Instrument Test</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
