import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import EquipmentSection from './components/EquipmentSection';
import CalibrationSection from './components/CalibrationSection';
import PartnersSection from './components/PartnersSection';
import Calculator from './components/Calculator';
import ReportVerifier from './components/ReportVerifier';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteDefaultScope, setQuoteDefaultScope] = useState('');

  const handleOpenQuote = (scope = '') => {
    setQuoteDefaultScope(scope);
    setIsQuoteOpen(true);
  };

  const handleNavigate = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 light-grid-bg text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Ambient Glow Background Orbs */}
      <div className="ambient-glow-orb orb-emerald"></div>
      <div className="ambient-glow-orb orb-cyan"></div>

      {/* Floating Modern Header */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onOpenQuote={handleOpenQuote}
          onNavigate={handleNavigate}
        />

        <ServicesSection
          onOpenQuote={handleOpenQuote}
        />

        <EquipmentSection
          onOpenQuote={handleOpenQuote}
        />

        <CalibrationSection
          onOpenQuote={handleOpenQuote}
        />

        <Calculator
          onOpenQuote={handleOpenQuote}
        />

        <PartnersSection />

        <ReportVerifier />

        <ContactSection
          initialSubject={quoteDefaultScope}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuote={handleOpenQuote}
      />

      {/* Global RFQ Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultScope={quoteDefaultScope}
      />
    </div>
  );
}
