import React from 'react';
import { companyInfo } from '../data/mock';

export const PurityBanner = () => {
  return (
    <section className="purity-banner-section">
      <div className="container">
        <div className="purity-banner-content">
          <div className="purity-highlight">
            <span className="purity-number">{companyInfo.purity}</span>
            <span className="purity-label">Purity</span>
          </div>
          <div className="purity-text">
            <h2 className="heading-2">Uncompromising Quality</h2>
            <p className="body-regular">
              Every peptide we produce exceeds 99% purity, verified through 
              independent third-party HPLC analysis and mass spectrometry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
