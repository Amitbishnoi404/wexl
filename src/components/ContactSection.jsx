import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection({ initialSubject = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    discipline: initialSubject || 'Metals & OES Spectroscopy',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <section id="contact" className="section-wrap">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center">
          <span className="section-tag">
            <Mail size={13} /> Direct Lab Access
          </span>
          <h2 className="section-title">
            Contact lab & sample drop-off.
          </h2>
          <p className="section-desc">
            Our materials testing metallurgists and test engineers in IMT Manesar, Gurugram are available for immediate sample onboarding and inquiries.
          </p>
        </div>

        {/* 2-Column Contact Container */}
        <div style={{
          maxWidth: '1060px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Left Coordinates Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card-glass" style={{ padding: '2.25rem 2rem', borderRadius: '24px' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#0f172a',
                marginBottom: '1.75rem'
              }}>
                Laboratory Coordinates
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>Testing Facility Address</div>
                    <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '3px', lineHeight: 1.5 }}>
                      Plot No.- 177, IMT Manesar, Sector 6, Gurugram, Haryana - 122052 (India)
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>Telephone Enquiries</div>
                    <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '3px' }}>
                      +91 (0124) 420-WEXL / +91 98100 00000
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>Official Email</div>
                    <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '3px', fontFamily: 'var(--font-mono)' }}>
                      info@wexllab.com / amit@wexllab.com
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>Receiving Hours</div>
                    <div style={{ fontSize: '0.825rem', color: '#64748b', marginTop: '3px' }}>
                      Monday – Saturday: 09:00 AM – 06:30 PM (IST)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Van Pickup Card */}
            <div style={{
              padding: '1.75rem',
              borderRadius: '20px',
              background: '#ecfdf5',
              border: '1px solid #d1fae5',
              fontSize: '0.825rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                <ShieldCheck size={18} color="#059669" />
                <span>Sample Collection Service</span>
              </div>
              <p style={{ color: '#334155', lineHeight: 1.6 }}>
                Daily scheduled sample collection van runs across <strong>IMT Manesar, Bawal, Dharuhera, Gurugram, and Faridabad</strong>. Contact our support desk to register a pickup.
              </p>
            </div>
          </div>

          {/* Right RFQ Form Column */}
          <div className="card-glass" style={{ padding: '2.5rem', borderRadius: '24px' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#0f172a',
              marginBottom: '0.4rem'
            }}>
              Book Sample Test or Request RFQ
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.75rem' }}>
              Fill in your testing parameters and our engineers will respond within 2 hours with standard protocols and quote.
            </p>

            {submitted ? (
              <div style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#ecfdf5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                  Testing Request Received!
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '340px', margin: '0 auto 1.5rem auto' }}>
                  Thank you, <strong>{formData.name || 'valued client'}</strong>. Our technical engineering team in IMT Manesar will reach out to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Er. Rajesh Kumar"
                      className="form-input-control"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Precision Auto Components"
                      className="form-input-control"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rajesh@company.com"
                      className="form-input-control"
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="form-input-control"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Primary Testing Scope *
                  </label>
                  <select
                    value={formData.discipline}
                    onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                    className="form-input-control"
                    style={{ fontWeight: 600, color: '#0f172a' }}
                  >
                    <option value="Metals & OES Spectroscopy">Metals & OES Spectroscopy (Fe/Al/Cu)</option>
                    <option value="Tensile & Mechanical (1000 kN UTM)">Tensile & Mechanical Testing (1000 kN UTM)</option>
                    <option value="Plastics & Polymers (FTIR / MFI)">Plastics & Polymers (FTIR / MFI)</option>
                    <option value="Corrosion & Salt Spray (450L Chamber)">Corrosion & Salt Spray (NSS/CASS)</option>
                    <option value="ELV & RoHS Hazardous Substances">ELV & RoHS Compliance Screening</option>
                    <option value="Traceable Calibration (AVI Partnership)">Traceable Calibration (AVI Partnership)</option>
                    <option value="Failure Analysis & Root Cause">Failure Analysis & Metallurgical Root-Cause</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.35rem' }}>
                    Specific Testing Instructions or Material Grade
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify material grade (e.g. EN8, SS304, PA66), standard (ASTM/IS/ISO), and required sample count."
                    className="form-textarea-control"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', fontWeight: 700 }}
                >
                  <Send size={16} />
                  <span>Submit Testing Inscription</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
