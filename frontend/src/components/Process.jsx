import React from 'react';
import { qualitySteps } from '../data/mock';

export const Process = () => {
  return (
    <section className="process-section section-padding-small" id="process">
      <div className="container">
        <div className="grid-two-column">
          <div className="process-content">
            <h2 className="heading-1">Our Quality Process</h2>
            <p className="body-large">
              Every peptide undergoes a rigorous four-stage process to ensure 
              pharmaceutical-grade quality and over 99% purity in every batch.
            </p>
          </div>
          
          <div className="process-steps">
            {qualitySteps.map((item) => (
              <div key={item.id} className="process-step">
                <span className="step-number">{item.step}</span>
                <div className="step-content">
                  <h4 className="heading-3">{item.title}</h4>
                  <p className="body-small">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
