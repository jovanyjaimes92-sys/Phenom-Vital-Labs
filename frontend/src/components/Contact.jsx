import React, { useState } from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { companyInfo } from '../data/mock';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="contact-section section-padding" id="contact">
      <div className="container">
        <div className="grid-two-column">
          <div className="contact-info">
            <h2 className="heading-1">Get in Touch</h2>
            <p className="body-large">
              Ready to elevate your research with pharmaceutical-grade peptides? 
              Our team is here to assist with your requirements.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <Mail size={20} strokeWidth={1.5} />
                <span className="body-regular">{companyInfo.email}</span>
              </div>
              <div className="contact-item">
                <Phone size={20} strokeWidth={1.5} />
                <span className="body-regular">{companyInfo.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-wrapper">
            {submitted ? (
              <div className="form-success">
                <h3 className="heading-3">Thank you for your inquiry</h3>
                <p className="body-regular">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input form-textarea"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <button type="submit" className="btn-primary btn-full">
                  Send Inquiry
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
