import React from 'react';
import HeroScrollAnimation from '@/components/HeroScrollAnimation';

export default function Home() {
  return (
    <>
      {/* 
        Full-screen pinned canvas animation.
        It uses GSAP to map the scroll position to the 200 frame images.
      */}
      <HeroScrollAnimation />

      {/* 
        Container for main rest-of-page content
      */}
      <div className="page-container" style={{ minHeight: '150vh', backgroundColor: '#111' }}>
        <div className="container py-5">
          <h2 className="section-title text-start mb-5" style={{ marginTop: '10vh' }}>
            Featured Projects
          </h2>
          <div className="row g-4 mb-5">
            {[1, 2, 3].map((item) => (
              <div className="col-md-4" key={item}>
                <div className="card bg-dark text-white border-secondary h-100">
                  <div className="card-body">
                    <h5 className="card-title text-info">Project {item}</h5>
                    <p className="card-text text-white-50">
                      A brief description of this amazing project showcasing React, Next.js, and Node.js capabilities.
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0 pt-0">
                    <a href="#" className="btn btn-outline-info btn-sm rounded-pill">View Details</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="section-title text-start mb-5" style={{ marginTop: '50vh' }}>
            Technical Skills
          </h2>
          <div className="row g-4">
            <div className="col-12">
              <div className="card bg-dark border-secondary p-4">
                <h4 className="text-white mb-4">Frontend</h4>
                <div className="d-flex gap-3 flex-wrap">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'GSAP'].map(skill => (
                    <span key={skill} className="badge bg-primary fs-6 py-2 px-3 rounded-pill">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ paddingBottom: '20vh' }}></div>
        </div>
      </div>
    </>
  );
}
