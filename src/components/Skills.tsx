import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code2, Cpu, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillGroup {
  category: string;
  icon: React.ReactNode;
  skills: string[];
}

interface Certification {
  title: string;
  issuer: string;
  date?: string;
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Programming Languages',
    icon: <Code2 size={22} className="text-glow-cyan" style={{ color: 'var(--accent-cyan)' }} />,
    skills: ['C#', 'TypeScript', 'JavaScript', 'C++', 'HTML5 / CSS3', 'SQL', 'Python'],
  },
  {
    category: 'Game Engines & Web Tech',
    icon: <Cpu size={22} className="text-glow-purple" style={{ color: 'var(--accent-purple)' }} />,
    skills: ['Unity Engine', 'Cocos Creator', 'WebGL / Canvas API', 'GSAP Animations', 'React', 'Node.js', 'Socket.io'],
  },
  {
    category: 'Development Tools',
    icon: <Wrench size={22} style={{ color: '#ff007f' }} />,
    skills: ['Git / GitHub', 'Unity Custom Editors', 'Visual Studio', 'VS Code', 'Firebase', 'Vite', 'NPM'],
  },
];

const certifications: Certification[] = [
  {
    title: 'Aptis ESOL B2',
    issuer: 'British Council',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
  },
  {
    title: 'Unity Essentials & Junior Programmer Foundations',
    issuer: 'Unity Learn',
  },
];

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate skill categories
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animate certifications
    if (certRef.current) {
      gsap.fromTo(
        certRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: certRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={styles.section}>
      <div className="container">
        
        {/* Decorative Grid Light */}
        <div style={styles.ambientLight} />

        <div style={styles.header}>
          <span style={styles.sectionLabel}>// SYSTEM LOGS</span>
          <h2 style={styles.sectionTitle}>Capabilities & Certifications</h2>
          <div style={styles.underline} />
        </div>

        <div style={styles.grid}>
          {/* Skills Column */}
          <div ref={skillsRef} style={styles.skillsCol}>
            {skillGroups.map((group, idx) => (
              <div key={idx} className="glass-card" style={styles.skillCard}>
                <div style={styles.skillHeader}>
                  {group.icon}
                  <h3 style={styles.categoryTitle}>{group.category}</h3>
                </div>
                <div style={styles.tagGroup}>
                  {group.skills.map((skill) => (
                    <span key={skill} style={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Column */}
          <div>
            <div className="glass-card" style={styles.certCard}>
              <div style={styles.skillHeader}>
                <Award size={24} style={{ color: 'var(--accent-cyan)' }} />
                <h3 style={styles.categoryTitle}>Credentials & Verification</h3>
              </div>
              <p style={styles.certSubtitle}>
                Verified certifications highlighting specialized training in game development, core programming algorithms, and communication.
              </p>
              <div ref={certRef} style={styles.certList}>
                {certifications.map((cert, idx) => (
                  <div key={idx} style={styles.certItem}>
                    <div style={styles.certBullet} />
                    <div>
                      <h4 style={styles.certTitle}>{cert.title}</h4>
                      <p style={styles.certIssuer}>{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    background: 'transparent',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
    position: 'relative',
    overflow: 'hidden',
  },
  ambientLight: {
    position: 'absolute',
    width: '450px',
    height: '450px',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'radial-gradient(circle, rgba(138, 43, 226, 0.035) 0%, rgba(0, 0, 0, 0) 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  header: {
    textAlign: 'center',
    marginBottom: '4.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionLabel: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-cyan)',
    fontSize: '0.85rem',
    letterSpacing: '0.2em',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
    color: '#ffffff',
  },
  underline: {
    width: '50px',
    height: '3px',
    background: 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan))',
    marginTop: '1rem',
    borderRadius: '2px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '3rem',
    position: 'relative',
    zIndex: 1,
  },
  skillsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  skillCard: {
    padding: '1.5rem',
    background: 'rgba(21, 29, 48, 0.45)',
  },
  skillHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.25rem',
  },
  categoryTitle: {
    fontSize: '1.15rem',
    color: '#ffffff',
    fontWeight: 600,
    fontFamily: 'var(--font-mono)',
  },
  tagGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.65rem',
  },
  skillTag: {
    fontSize: '0.85rem',
    fontFamily: 'var(--font-sans)',
    backgroundColor: 'rgba(0, 242, 254, 0.03)',
    color: 'var(--text-primary)',
    border: '1px solid rgba(0, 242, 254, 0.1)',
    padding: '5px 12px',
    borderRadius: '6px',
    fontWeight: 400,
    transition: 'all 0.3s ease',
  },
  certCard: {
    padding: '2rem',
    height: '100%',
    background: 'rgba(21, 29, 48, 0.65)',
  },
  certSubtitle: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  certList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  certItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  certBullet: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-cyan)',
    boxShadow: '0 0 8px var(--accent-cyan)',
    marginTop: '7px',
    flexShrink: 0,
  },
  certTitle: {
    fontSize: '1rem',
    color: '#ffffff',
    fontWeight: 650,
    marginBottom: '0.25rem',
  },
  certIssuer: {
    fontSize: '0.85rem',
    color: 'var(--accent-cyan)',
    fontFamily: 'var(--font-mono)',
  },
};

// CSS style helper for skills interaction
const skillsStyle = document.createElement('style');
skillsStyle.innerHTML = `
  .glass-card .skillTag:hover {
    border-color: var(--accent-cyan) !important;
    background: rgba(0, 242, 254, 0.1) !important;
    box-shadow: 0 0 10px rgba(0, 242, 254, 0.2);
    transform: translateY(-2px);
  }
`;
document.head.appendChild(skillsStyle);

export default Skills;
