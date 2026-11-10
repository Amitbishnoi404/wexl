import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuoteModal({ isOpen, onClose, defaultScope = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    scope: defaultScope || 'Metals & OES Spectroscopy',
    samples: '1-5 specimens',
    urgency: 'standard',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Request Sent Successfully!</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Thank you, <strong>{formData.name}</strong>. Our laboratory engineering desk in IMT Manesar has received your parameters and will email your formal quote shortly.
            </p>
            <button
              onClick={handleClose}
              className="btn btn-primary btn-sm mt-4 text-xs font-bold"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <ShieldCheck className="w-4 h-4" /> Official Testing RFQ
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Request Laboratory Quotation
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              NABL accredited testing protocols prepared within 2 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Er. Rajesh Kumar"
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / OEM *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="JTEKT / Allied / Vendor"
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="form-input text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="form-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Testing Discipline</label>
                <input
                  type="text"
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  placeholder="e.g. Tensile, OES Spectroscopy, Salt Spray"
                  className="form-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Sample Count</label>
                  <select
                    value={formData.samples}
                    onChange={(e) => setFormData({ ...formData, samples: e.target.value })}
                    className="form-select text-xs"
                  >
                    <option value="1-2 specimens">1 - 2 specimens</option>
                    <option value="3-5 specimens">3 - 5 specimens</option>
                    <option value="Batch / Ongoing">Full Production Batch</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Turnaround Requirement</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="form-select text-xs"
                  >
                    <option value="standard">Standard (2 - 4 Days)</option>
                    <option value="express">Express (24 - 48 Hours)</option>
                    <option value="urgent">Urgent Same-Day Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specific Standards / Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Material grade, ASTM/IS standard, heat treatment state..."
                  className="form-textarea text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary py-3 text-xs font-bold shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Quotation Request</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
