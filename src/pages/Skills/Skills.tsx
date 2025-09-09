import React, { useState, useEffect } from 'react';
import './Skills.css';

interface Skill {
  name: string;
  level: string;
}

const Skills: React.FC = () => {
  const [skillList, setSkillList] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/myDATA/skills.json');
        const data = await response.json();
        setSkillList(data);
      } catch (error) {
        console.error('Error fetching skills data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="skills-container">
        <div className="container">
          <div className="text-center">Loading skills...</div>
        </div>
      </div>
    );
  }
console.log(skillList)
  return (
    <div className="skills-container">
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {skillList.map((skill, index) => (
            <div key={index} className="col">
              <div className="skill-card card h-100">
                <div className="card-body text-center">
                  <h3 className="skill-name card-title">{skill.name}</h3>
                  <p className="skill-level card-text">{skill.level}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;