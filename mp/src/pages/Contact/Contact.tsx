import React, { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';
import './Contact.css';

interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

const Contact: React.FC = () => {
  const [contactData, setContactData] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/myDATA/contact.json');
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="contact-container">
        <div className="container">
          <div className="text-center">Loading contact information...</div>
        </div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="contact-container">
        <div className="container">
          <div className="text-center">Error loading contact data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-container">
      <div className="container">
        <h2 className="contact-title">Contact Me</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={20} />
              <span>
                <a href={`mailto:${contactData.email}`} className="contact-link">
                  {contactData.email}
                </a>
              </span>
            </div>
            <div className="contact-item">
              <Phone size={20} />
              <span>{contactData.phone}</span>
            </div>
          </div>
          <div className="social-links">
            <a
              href={contactData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social-link linkedin"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href={contactData.github}
              target="_blank"
              rel="noreferrer"
              className="social-link github"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;