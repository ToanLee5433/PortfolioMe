import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal } from 'lucide-react';
import { portfolioData } from '../portfolioData';

// Import assets
import chickenInvadersImg from '../assets/chicken-invaders.png';
import gameHubImg from '../assets/game-hub.png';
import quizTriviaImg from '../assets/quiz-trivia.png';
import loveflixImg from '../assets/loveflix.png';

gsap.registerPlugin(ScrollTrigger);

const imageMap = {
  'chicken-invaders': chickenInvadersImg,
  'game-hub': gameHubImg,
  'quiz-trivia': quizTriviaImg,
  'loveflix': loveflixImg,
};

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

interface ProjectsProps {
  mode: 'game' | 'fullstack';
}

export const Projects: React.FC<ProjectsProps> = ({ mode }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  const projects = portfolioData[mode].projects;
  const accentColor = mode === 'game' ? 'var(--accent-cyan)' : '#10b981';

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.children;
    
    // Smooth scroll animations
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // Pulse navigation hint
    if (hintRef.current) {
      gsap.fromTo(
        hintRef.current,
        { opacity: 0.5 },
        { opacity: 1, repeat: -1, yoyo: true, duration: 1.2 }
      );
    }
  }, [mode]);

  return (
    <section id="projects" ref={sectionRef} style={styles.section}>
      {/* Scanline CRT overlay */}
      <div style={styles.scanline} />

      <div className="container">
        <div style={styles.header}>
          <span style={{ ...styles.sectionLabel, color: mode === 'game' ? 'var(--accent-purple)' : '#10b981' }}>
            // DEV LOGS & CODEFILES
          </span>
          <h2 style={styles.sectionTitle}>
            {mode === 'game' ? 'Gameplay Prototypes' : 'Full-Stack Deployments'}
          </h2>
          <div style={{
            ...styles.underline,
            background: mode === 'game' 
              ? 'linear-gradient(to right, var(--accent-cyan), var(--accent-purple))'
              : 'linear-gradient(to right, #10b981, var(--accent-cyan))'
          }} />
          
          <p ref={hintRef} style={{ ...styles.switcherHint, borderLeft: `3px solid ${accentColor}` }}>
            💡 Nhấp vào nút gạt <b>[ {mode === 'game' ? 'GAME DEV' : 'FULL-STACK'} ]</b> ở đầu trang để khám phá các dự án khác của em!
          </p>
        </div>

        <div ref={cardsRef} style={styles.grid}>
          {projects.map((project, index) => (
            <div key={index} className="glass-card" style={styles.card}>
              <div style={styles.imageContainer}>
                <img 
                  src={imageMap[project.imageName]} 
                  alt={project.title} 
                  style={styles.image}
                  className="project-thumbnail"
                />
                <div style={styles.overlay}>
                  <span style={{ ...styles.roleTag, borderColor: accentColor, color: accentColor }}>
                    {project.role}
                  </span>
                </div>
              </div>

              <div style={styles.info}>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <p style={styles.description}>{project.description}</p>
                
                {/* CV Responsibilities bullet points */}
                <div style={styles.responsibilitiesBlock}>
                  <p style={styles.respHeader}>
                    <Terminal size={14} style={{ color: accentColor }} />
                    <span>Key Implementations:</span>
                  </p>
                  <ul style={styles.respList}>
                    {project.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} style={styles.respItem}>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div style={styles.tagGroup}>
                  {project.techTags.map((tag) => (
                    <span key={tag} style={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={styles.links}>
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={styles.link}
                    title="View Source Code"
                  >
                    <GithubIcon size={18} />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    background: 'radial-gradient(100% 100% at bottom, rgba(138, 43, 226, 0.02) 0%, rgba(11, 15, 25, 0) 100%)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
    position: 'relative',
  },
  scanline: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
    backgroundSize: '100% 4px, 6px 100%',
    pointerEvents: 'none',
    zIndex: 1,
    opacity: 0.15,
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionLabel: {
    fontFamily: 'var(--font-mono)',
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
    marginTop: '1rem',
    borderRadius: '2px',
  },
  switcherHint: {
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    backgroundColor: 'rgba(21, 29, 48, 0.5)',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    maxWidth: '650px',
    textAlign: 'left',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    gap: '3rem',
    marginTop: '2rem',
    position: 'relative',
    zIndex: 2,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
    cursor: 'default',
    background: 'rgba(21, 29, 48, 0.35)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '240px',
    overflow: 'hidden',
    backgroundColor: '#070a11',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  },
  overlay: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    zIndex: 1,
  },
  roleTag: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    background: 'rgba(11, 15, 25, 0.9)',
    border: '1px solid transparent',
    padding: '4px 10px',
    borderRadius: '4px',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  info: {
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  projectTitle: {
    fontSize: '1.4rem',
    color: '#ffffff',
    marginBottom: '0.75rem',
    fontFamily: 'var(--font-mono)',
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    marginBottom: '1.25rem',
  },
  responsibilitiesBlock: {
    flexGrow: 1,
    marginBottom: '1.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.02)',
  },
  respHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    color: '#ffffff',
    marginBottom: '0.5rem',
    fontWeight: 600,
  },
  respList: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  respItem: {
    color: 'var(--text-secondary)',
    fontSize: '0.82rem',
    lineHeight: '1.4',
    paddingLeft: '0.75rem',
    position: 'relative',
  },
  tagGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  tag: {
    fontSize: '0.72rem',
    fontFamily: 'var(--font-mono)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    color: 'var(--text-secondary)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '1.25rem',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-mono)',
    transition: 'color 0.2s ease',
  },
};

// CSS hover scale helper injection
const projectGlobalStyle = document.createElement('style');
projectGlobalStyle.innerHTML = `
  .glass-card:hover .project-thumbnail {
    transform: scale(1.03);
  }
  .glass-card .links a:hover {
    color: var(--accent-cyan) !important;
  }
  .glass-card ul li::before {
    content: "•";
    color: var(--accent-cyan);
    position: absolute;
    left: 0;
    top: 0;
  }
`;
document.head.appendChild(projectGlobalStyle);

export default Projects;
