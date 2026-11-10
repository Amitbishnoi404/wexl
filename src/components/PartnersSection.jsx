import React, { useState } from 'react';
import { Users, Search, Building2, CheckCircle2 } from 'lucide-react';

const PARTNERS = [
  {
    name: 'Bajaj Auto Limited',
    sector: 'Automotive OEM',
    location: 'Pune / Pantnagar / Chakan',
    category: 'Automotive',
    logo: '/images/partners/bajaj-auto-limited.jpg'
  },
  {
    name: 'JTEKT India Limited',
    sector: 'Automotive Steering',
    location: 'Gurugram / Bawal / Dharuhera',
    category: 'Automotive',
    logo: '/images/partners/jtekt-india.jpg'
  },
  {
    name: 'Allied Group (Allied Fittings)',
    sector: 'Piping & Heavy Eng.',
    location: 'Global / India / USA',
    category: 'Energy',
    logo: '/images/partners/allied-fittings-usa.jpg'
  },
  {
    name: 'GAIL (India) Limited',
    sector: 'Energy & Infrastructure',
    location: 'New Delhi / NCR / Pata',
    category: 'Energy',
    logo: '/images/partners/gail-india-limited-pata.jpg'
  },
  {
    name: 'Forza Medi India Pvt. Ltd.',
    sector: 'Medical Mobility',
    location: 'Gurugram',
    category: 'Medical',
    logo: '/images/partners/forza-medi-india-ltd.jpg'
  },
  {
    name: 'Dantal Hydraulics Pvt. Ltd.',
    sector: 'Hydraulics & Fluid Power',
    location: 'Manesar, Gurugram',
    category: 'Industrial',
    logo: '/images/partners/dantal-hydraulics.jpg'
  },
  {
    name: 'Imperial Auto Industries',
    sector: 'Fluid Transmission Systems',
    location: 'Faridabad / NCR',
    category: 'Automotive',
    logo: '/images/partners/imperial-auto-limited.jpg'
  },
  {
    name: 'Indo Autotech Limited',
    sector: 'Sheet Metal & Assemblies',
    location: 'Faridabad / NCR',
    category: 'Automotive',
    logo: '/images/partners/indo-autotech-ltd.jpg'
  },
  {
    name: 'Advik Hi-Tech Pvt. Ltd.',
    sector: 'Automotive Oil & Water Pumps',
    location: 'Pune / NCR',
    category: 'Automotive',
    logo: '/images/partners/advik-india-pvt-ltd.jpg'
  },
  {
    name: 'Bellsonica Auto Components',
    sector: 'Precision Body Parts',
    location: 'Manesar, Gurugram',
    category: 'Automotive',
    logo: '/images/partners/bellsonica-auto-components.jpg'
  },
  {
    name: 'Best Koki Automotive Pvt. Ltd.',
    sector: 'Precision Transmission Shift',
    location: 'Gurugram / Bilaspur',
    category: 'Automotive',
    logo: '/images/partners/best-koki-automotive-pvt-ltd.jpg'
  },
  {
    name: 'Botil Oil Tools India Pvt. Ltd.',
    sector: 'Oilfield & Drilling Hardware',
    location: 'Bawal, Haryana',
    category: 'Energy',
    logo: '/images/partners/botil-oil-tools-india-pvt-ltd.jpg'
  },
  {
    name: 'Casewell Drilling Services',
    sector: 'Downhole & Well Equipment',
    location: 'NCR Region',
    category: 'Energy',
    logo: '/images/partners/casewell-drilling-services.jpg'
  },
  {
    name: 'Completion Oil Tools Pvt. Ltd.',
    sector: 'High-Pressure Wellheads',
    location: 'Gurugram / NCR',
    category: 'Energy',
    logo: '/images/partners/completion-oil-tools-pvt-ltd.jpg'
  },
  {
    name: 'Daido India Pvt. Ltd.',
    sector: 'Transmission Drive Chains',
    location: 'Bawal, Haryana',
    category: 'Automotive',
    logo: '/images/partners/daido-india-pvt-ltd.jpg'
  },
  {
    name: 'Everest Industries Limited',
    sector: 'Building & Construction Steel',
    location: 'Haridwar / NCR',
    category: 'Industrial',
    logo: '/images/partners/everest-industries-ltd-haridwar.jpg'
  },
  {
    name: 'Horizon Aerospace Pvt. Ltd.',
    sector: 'Aerospace & Defence Fasteners',
    location: 'NCR Region',
    category: 'Industrial',
    logo: '/images/partners/horizon-aerospace-pvt-ltd.jpg'
  },
  {
    name: 'RITES Limited (Ministry of Railways)',
    sector: 'Transport & Rail Infrastructure',
    location: 'Faridabad / Gurugram',
    category: 'Infrastructure',
    logo: '/images/partners/rites-limited-faridabad.jpg'
  },
  {
    name: 'Imasen Manufacturing India',
    sector: 'Seat Adjusters & Latches',
    location: 'Bawal, Haryana',
    category: 'Automotive',
    logo: '/images/partners/imasen-manufacturing-india.jpg'
  },
  {
    name: 'Maruichi Kuma Steel Tubes',
    sector: 'Precision Structural Tubes',
    location: 'Bawal, Haryana',
    category: 'Industrial',
    logo: '/images/partners/maruichi-kuma-steel-tubes.jpg'
  },
  {
    name: 'NICE Steel Industries',
    sector: 'High-Tensile Cold Heading Wire',
    location: 'Manesar, Gurugram',
    category: 'Industrial',
    logo: '/images/partners/nice-steel-industries.jpg'
  },
  {
    name: 'Nirankari Electrochem Pvt. Ltd.',
    sector: 'Surface Treatment & Plating',
    location: 'Faridabad / NCR',
    category: 'Industrial',
    logo: '/images/partners/nirankari-electrochem-pvt-ltd.jpg'
  },
  {
    name: 'Neel Metal Products Limited',
    sector: 'Exhausts & Tubular Stampings',
    location: 'Gurugram / Bawal',
    category: 'Automotive',
    logo: '/images/partners/neel-metal-group.jpg'
  },
  {
    name: 'NHK Springs India Limited',
    sector: 'Suspension Coil Springs & Bars',
    location: 'Bawal, Haryana',
    category: 'Automotive',
    logo: '/images/partners/nhk-springs-india-ltd.jpg'
  },
  {
    name: 'Tenneco Clean Air India',
    sector: 'Automotive Emission Systems',
    location: 'Bawal, Haryana',
    category: 'Automotive',
    logo: null
  },
  {
    name: 'Lucas TVS Limited',
    sector: 'Auto Electrical & Starters',
    location: 'Rewari / Pantnagar',
    category: 'Automotive',
    logo: null
  },
  {
    name: 'Subros Limited',
    sector: 'Thermal & AC Systems',
    location: 'Manesar / Noida',
    category: 'Automotive',
    logo: null
  },
  {
    name: 'Spark Minda Corporation',
    sector: 'Electronic & Mechanical Security',
    location: 'Rudrapur / NCR',
    category: 'Automotive',
    logo: null
  },
  {
    name: 'Anand Group (Gabriel India)',
    sector: 'Ride Control & Shock Absorbers',
    location: 'Gurugram / Khandsa',
    category: 'Automotive',
    logo: null
  },
  {
    name: 'Sona Comstar',
    sector: 'Driveline & EV Systems',
    location: 'Gurugram',
    category: 'Automotive',
    logo: null
  },
  {
    name: 'Omax Autos Limited',
    sector: 'Sheet Metal & Frame Assemblies',
    location: 'Dharuhera / Manesar',
    category: 'Automotive',
    logo: null
  }
];

export default function PartnersSection() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = PARTNERS.filter(p => {
    const matchesFilter = filter === 'all' || p.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sector.toLowerCase().includes(search.toLowerCase()) ||
                          p.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="partners" className="section-wrap" style={{ background: 'rgba(241, 245, 249, 0.45)', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-tag">
            <Users size={13} /> Corporate Roster & Client Logos
          </span>
          <h2 className="section-title">
            Trusted by 40+ engineering leaders.
          </h2>
          <p className="section-desc">
            Direct client logos from our official company credentials profile. Automotive tier-1 OEMs, infrastructure leaders, and precision manufacturers rely on WeXL Laboratory for accredited testing.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          maxWidth: '920px',
          margin: '0 auto 3rem auto'
        }}>
          {/* Sector Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(241, 245, 249, 0.9)',
            padding: '0.35rem 0.45rem',
            borderRadius: '9999px',
            border: '1px solid #e2e8f0',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'all', label: 'All Partners' },
              { id: 'Automotive', label: 'Automotive' },
              { id: 'Energy', label: 'Energy & Heavy Eng' },
              { id: 'Medical', label: 'Medical' },
              { id: 'Industrial', label: 'Industrial Steel' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilter(cat.id)}
                style={{
                  padding: '0.45rem 1.05rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  background: filter === cat.id ? '#ffffff' : 'transparent',
                  color: filter === cat.id ? '#0f172a' : '#64748b',
                  boxShadow: filter === cat.id ? '0 2px 8px rgba(15, 23, 42, 0.08)' : 'none'
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
              placeholder="Search partner or city..."
              className="form-input-control"
              style={{ paddingLeft: '2.5rem', height: '42px', fontSize: '0.85rem', borderRadius: '9999px' }}
            />
          </div>
        </div>

        {/* 4-Column Partners Cards Grid with Real Client Logos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(265px, 1fr))',
          gap: '1.35rem'
        }}>
          {filtered.map((partner, i) => (
            <div
              key={i}
              className="card-glass"
              style={{
                padding: '1.5rem',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                border: '1.5px solid rgba(226, 232, 240, 0.95)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Official Partner Logo Box */}
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px',
                  flexShrink: 0,
                  overflow: 'hidden'
                }}>
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement.querySelector('.fallback-icon');
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="fallback-icon"
                    style={{
                      display: partner.logo ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      background: '#ecfdf5',
                      borderRadius: '10px',
                      color: '#059669'
                    }}
                  >
                    <Building2 size={22} />
                  </div>
                </div>

                {/* Partner Name & Engineering Sector */}
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    lineHeight: 1.3
                  }}>
                    {partner.name}
                  </h4>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', marginTop: '3px' }}>
                    {partner.sector}
                  </div>
                </div>
              </div>

              {/* Card Footer: Location & Verified Client Tag */}
              <div style={{
                marginTop: '1.35rem',
                paddingTop: '0.85rem',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: '#64748b'
              }}>
                <span style={{ fontWeight: 500 }}>{partner.location}</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontWeight: 700,
                  color: '#059669',
                  background: '#ecfdf5',
                  padding: '0.15rem 0.55rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(5, 150, 105, 0.25)',
                  fontSize: '0.7rem'
                }}>
                  <CheckCircle2 size={12} color="#059669" />
                  <span>Active Client</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
