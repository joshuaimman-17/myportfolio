import React, { useState, useEffect } from 'react';
import './About.css';

interface About {
  profileImage: string;
  name: string;
  role: string;
  bio: string;
  resume: string;
}

const About: React.FC = () => {
  const [aboutData, setAboutData] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/myDATA/about.json');
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="about-container">
        <div className="container">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="about-container">
        <div className="container">
          <div className="text-center">Error loading about data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="about-container">
      <div className="container">
        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body text-center">
            <img 
              src={aboutData.profileImage} 
              alt={aboutData.name} 
              className="profile-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400`;
              }}
            />
            <h1 className="about-title">{aboutData.name}</h1>
            <h2 className="about-role">{aboutData.role}</h2>
            <p className="about-bio">{aboutData.bio}</p>
            <a
              href={aboutData.resume}
              target="_blank"
              rel="noreferrer"
              className="resume-button"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;