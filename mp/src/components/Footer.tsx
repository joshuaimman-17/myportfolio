import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="fixed-bottom bg-dark text-white py-2">
      <div className="container d-flex justify-content-center">
        <ul className="list-inline mb-0">
          <li className="list-inline-item mx-2">
            <a
              href="https://linkedin.com/"
              aria-label="LinkedIn"
              data-social="linkedin"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </a>
          </li>
          <li className="list-inline-item mx-2">
            <a
              href="https://www.github.com/"
              aria-label="GitHub"
              data-social="github"
              className="text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};