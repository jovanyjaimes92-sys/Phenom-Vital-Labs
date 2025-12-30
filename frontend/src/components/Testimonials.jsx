import React from 'react';
import { testimonials } from '../data/mock';

export const Testimonials = () => {
  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-1">Trusted by Researchers</h2>
          <p className="body-large section-subtitle">
            What the scientific community says about our peptides
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <blockquote className="testimonial-quote">
                "{testimonial.quote}"
              </blockquote>
              <div className="testimonial-author">
                <span className="author-name">{testimonial.author}</span>
                <span className="author-role">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
