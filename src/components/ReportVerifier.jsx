import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Printer, AlertCircle, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

const VERIFIED_REPORTS = {
  'WEXL/2026/MET-8842': {
    ulr: 'ULR-TC892226000008842F',
    reportId: 'WEXL/2026/MET-8842',
    client: 'JTEKT India Limited',
    discipline: 'Mechanical & Chemical Testing of Metals',
    sample: 'Automotive Steering Column Shaft (Forged Alloy Steel 4140)',
    issueDate: '02 March 2026',
    status: 'AUTHENTIC & NABL ACCREDITED',
    technician: 'Er. R. Sharma (Senior Metallurgist)',
    signatory: 'Dr. Amit Bishnoi (Technical Director)',
    parameters: [
      { param: 'Carbon (C)', testMethod: 'ASTM E415 (OES)', result: '0.41 %', requirement: '0.38 - 0.43 %', verdict: 'Pass' },
      { param: 'Chromium (Cr)', testMethod: 'ASTM E415 (OES)', result: '0.98 %', requirement: '0.80 - 1.10 %', verdict: 'Pass' },
      { param: 'Molybdenum (Mo)', testMethod: 'ASTM E415 (OES)', result: '0.21 %', requirement: '0.15 - 0.25 %', verdict: 'Pass' },
      { param: 'Tensile Strength (Rm)', testMethod: 'ASTM A370 / IS 1608', result: '985 MPa', requirement: 'Min. 930 MPa', verdict: 'Pass' },
      { param: 'Yield Strength (Rp0.2)', testMethod: 'ASTM A370 / IS 1608', result: '820 MPa', requirement: 'Min. 780 MPa', verdict: 'Pass' },
      { param: 'Hardness (Core)', testMethod: 'ASTM E18 (Rockwell C)', result: '31.5 HRC', requirement: '28 - 34 HRC', verdict: 'Pass' },
    ]
  },
  'WEXL/2026/POL-1049': {
    ulr: 'ULR-TC892226000001049F',
    reportId: 'WEXL/2026/POL-1049',
    client: 'Bajaj Auto Limited (Tier-1 Supplier)',
    discipline: 'Polymer & Plastic Characterisation',
    sample: 'Automotive Radiator End Tank (PA66 GF30 Black Granules)',
    issueDate: '24 February 2026',
    status: 'AUTHENTIC & NABL ACCREDITED',
    technician: 'Ms. P. Verma (Polymer Chemist)',
    signatory: 'Dr. Amit Bishnoi (Technical Director)',
    parameters: [
      { param: 'FTIR Identification', testMethod: 'ASTM E1252', result: 'Polyamide 66 Match (99.4%)', requirement: 'Pure PA66 Matrix', verdict: 'Pass' },
      { param: 'Glass Fiber Ash Content', testMethod: 'ASTM D5630 (Muffle 600°C)', result: '29.8 %', requirement: '30 ± 2 %', verdict: 'Pass' },
      { param: 'Specific Gravity / Density', testMethod: 'ASTM D792 Method A', result: '1.36 g/cm³', requirement: '1.34 - 1.38 g/cm³', verdict: 'Pass' },
      { param: 'Melt Flow Index (275°C / 5kg)', testMethod: 'ASTM D1238', result: '14.2 g/10 min', requirement: '12 - 18 g/10 min', verdict: 'Pass' },
    ]
  },
  'ULR-TC892226000001234F': {
    ulr: 'ULR-TC892226000001234F',
    reportId: 'WEXL/2026/CORR-1234',
    client: 'Allied Group / Fittings Div.',
    discipline: 'Accelerated Environmental Corrosion Testing',
    sample: 'Stainless Steel Flange SS316L (500-hr Salt Spray Exposure)',
    issueDate: '15 January 2026',
    status: 'AUTHENTIC & NABL ACCREDITED',
    technician: 'Mr. K. Nair (Corrosion Engineer)',
    signatory: 'Dr. Amit Bishnoi (Technical Director)',
    parameters: [
      { param: 'Neutral Salt Spray (NSS)', testMethod: 'ASTM B117 / ISO 9227', result: '500 Hours No Red Rust', requirement: 'Min. 480 Hours', verdict: 'Pass' },
      { param: 'Intergranular Corrosion (IGC)', testMethod: 'ASTM A262 Practice E', result: 'No Fissures under 20x', requirement: 'Zero Fissures', verdict: 'Pass' },
      { param: 'Nickel Content (Ni)', testMethod: 'ASTM E415', result: '10.22 %', requirement: '10.0 - 14.0 %', verdict: 'Pass' },
      { param: 'Molybdenum Content (Mo)', testMethod: 'ASTM E415', result: '2.14 %', requirement: '2.00 - 3.00 %', verdict: 'Pass' },
    ]
  }
};

export default function ReportVerifier() {
  const [searchQuery, setSearchQuery] = useState('');
  const [report, setReport] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e && e.preventDefault();
    const q = searchQuery.trim().toUpperCase();
    if (!q) return;

    setHasSearched(true);
    const found = VERIFIED_REPORTS[q] || Object.values(VERIFIED_REPORTS).find(r => r.ulr === q || r.reportId === q);

    if (found) {
      setReport(found);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      setReport(null);
    }
  };

  const handleDemoSelect = (key) => {
    setSearchQuery(key);
    setHasSearched(true);
    setReport(VERIFIED_REPORTS[key]);
  };

  return (
    <section id="verify" className="section-wrap">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-tag">
            <ShieldCheck size={13} /> Official Audit Trail
          </span>
          <h2 className="section-title">
            Verify test certificate & NABL report.
          </h2>
          <p className="section-desc">
            Ensure the authenticity of any material testing report issued by M/s WeXL Laboratory Pvt. Ltd. Enter your ULR or Report ID below.
          </p>
        </div>

        {/* Search Bar Card */}
        <div className="card-glass" style={{
          maxWidth: '780px',
          margin: '0 auto 3rem auto',
          padding: '2rem 2.5rem',
          borderRadius: '24px',
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)'
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Report ID (e.g. WEXL/2026/MET-8842) or ULR..."
                className="form-input-control"
                style={{ paddingLeft: '3rem', height: '50px', borderRadius: '9999px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ height: '50px', padding: '0 2rem', fontWeight: 700, gap: '0.5rem' }}
            >
              <ShieldCheck size={16} />
              <span>Verify Now</span>
            </button>
          </form>

          {/* Quick Demo Lookups */}
          <div style={{
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.8rem',
            color: '#64748b'
          }}>
            <span style={{ fontWeight: 600 }}>Quick sample lookups:</span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleDemoSelect('WEXL/2026/MET-8842')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#0f172a'
                }}
              >
                Metals: WEXL/2026/MET-8842
              </button>
              <button
                type="button"
                onClick={() => handleDemoSelect('WEXL/2026/POL-1049')}
                style={{
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: '#0f172a'
                }}
              >
                Polymer: WEXL/2026/POL-1049
              </button>
            </div>
          </div>
        </div>

        {/* Verified Report Certificate Box */}
        {hasSearched && report && (
          <div style={{
            maxWidth: '860px',
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: '26px',
            border: '2px solid #10b981',
            boxShadow: '0 20px 50px rgba(16, 185, 129, 0.12)',
            padding: '2.5rem 3rem'
          }}>
            {/* Certificate Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '16px',
                  background: '#ecfdf5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.6rem', borderRadius: '9999px', border: '1px solid #a7f3d0' }}>
                      {report.status}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>ISO/IEC 17025</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem' }}>
                    Authentic Verified Report
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.775rem', fontWeight: 700, gap: '0.4rem' }}
              >
                <Printer size={14} />
                <span>Print Certificate</span>
              </button>
            </div>

            {/* Core Metadata 4-Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '1rem',
              padding: '1.25rem 1.5rem',
              background: '#f8fafc',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              marginBottom: '1.5rem',
              fontSize: '0.8rem'
            }}>
              <div>
                <div style={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.675rem' }}>Report ID</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>{report.reportId}</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.675rem' }}>ULR Number</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#059669', marginTop: '2px' }}>{report.ulr}</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.675rem' }}>Issue Date</div>
                <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{report.issueDate}</div>
              </div>
              <div>
                <div style={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.675rem' }}>Testing Client</div>
                <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>{report.client}</div>
              </div>
            </div>

            {/* Sample Description */}
            <div style={{
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              background: '#ecfdf5',
              border: '1px solid #d1fae5',
              fontSize: '0.8rem',
              marginBottom: '1.5rem'
            }}>
              <span style={{ fontWeight: 800, color: '#065f46', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.04em' }}>Sample Tested: </span>
              <span style={{ color: '#1e293b', fontWeight: 600 }}>{report.sample}</span>
            </div>

            {/* Results Table */}
            <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', color: '#475569', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Test Parameter</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Test Method</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Observed Result</th>
                    <th style={{ padding: '0.85rem 1rem' }}>Required Specification</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {report.parameters.map((p, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>{p.param}</td>
                      <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', color: '#64748b' }}>{p.testMethod}</td>
                      <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#059669' }}>{p.result}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>{p.requirement}</td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '9999px', background: '#ecfdf5', color: '#059669', fontWeight: 800, fontSize: '0.7rem' }}>
                          ✓ {p.verdict}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Signatures & Accreditation Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e2e8f0',
              fontSize: '0.8rem',
              color: '#64748b'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: '#f1f5f9',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e2e8f0',
                  color: '#334155'
                }}>
                  <QrCode size={36} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-brand-rounded)', fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>M/s <span style={{ color: '#059669' }}>WeXL</span> Laboratory Pvt. Ltd.</div>
                  <div style={{ fontSize: '0.75rem' }}>Plot No.- 177, IMT Manesar, Sector 6, Gurugram, Haryana</div>
                  <div style={{ fontSize: '0.725rem', color: '#059669', fontWeight: 700, marginTop: '2px' }}>NABL ISO/IEC 17025:2017 & ISO 9001:2015</div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Authorised Signatory</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                  {report.signatory}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>Technical Director (20+ Years Exp.)</div>
              </div>
            </div>
          </div>
        )}

        {hasSearched && !report && (
          <div style={{
            maxWidth: '480px',
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: '20px',
            padding: '2rem',
            textAlign: 'center',
            border: '1px solid #fecaca',
            boxShadow: '0 4px 16px rgba(239, 68, 68, 0.06)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#fef2f2',
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <AlertCircle size={26} />
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
              Report ID Not Found
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              No verified certificate matched "{searchQuery}". Please check your Report ID or click one of the quick sample lookups above.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
