import React from 'react';
import { companyInfo, footerLinks } from '../data/mock';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">{companyInfo.name}</span>
            <p className="body-small footer-tagline">
              {companyInfo.tagline}
            </p>
          </div>
          
          <nav className="footer-nav">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="footer-purity">
            <span className="purity-indicator">{companyInfo.purity}</span>
            <span className="body-small">Purity Guaranteed</span>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="body-small">
            © {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <p className="body-small footer-disclaimer">
            For research purposes only. Not for human consumption.
          </p>
        </div>
      </div>
    </footer>
  );
};
