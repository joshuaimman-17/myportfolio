import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

const Projects: React.FC = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/myDATA/projects.json');
        const data = await response.json();
        setProjectList(data);
      } catch (error) {
        console.error('Error fetching projects data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="projects-container">
        <div className="container">
          <div className="text-center">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {projectList.map((project) => (
            <div key={project.id} className="col">
              <div className="project-card card h-100">
                <div className="card-body">
                  <h3 className="project-title card-title">{project.title}</h3>
                  <p className="project-description card-text">{project.description}</p>
                  <div className="tech-tags">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} className="project-link" target="_blank" rel="noreferrer">
                        <Github size={16} />
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} className="project-link" target="_blank" rel="noreferrer">
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;