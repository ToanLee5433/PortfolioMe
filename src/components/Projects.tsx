import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import chickenInvadersImg from '../assets/chicken-invaders.png';
import gameHubImg from '../assets/game-hub.png';

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

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  techTags: string[];
  image: string;
  githubLink: string;
  demoLink?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Chicken Invaders Remake',
    role: 'Gameplay & Tool Developer',
    description: 'A polished remake of the classic Chicken Invaders space shooter in Unity. Re-engineered core flight mechanics, a dynamic grid-based wave spawning system, custom editor scripts for quick wave configuration, and optimized object pooling.',
    techTags: ['Unity Engine', 'C#', 'New Input System', 'Custom Editor Scripting', 'Coroutines'],
    image: chickenInvadersImg,
    githubLink: 'https://github.com/ToanLee5433',
  },
  {
    id: 2,
    title: 'Web Game Hub Portal',
    role: 'Solo Web Developer',
    description: 'A fully responsive web game hub hosting 6 games (Wood Block Puzzle, Snake Hunter, Tetris, Memory Game, Blackjack/Poker, and Caro/Gomoku with minimax AI opponents). Integrated HTML5 Canvas, high-performance animations, and local server features.',
    techTags: ['HTML5 Canvas', 'Vanilla JS/TS', 'GSAP', 'Node.js', 'Socket.io'],
    image: gameHubImg,
    githubLink: 'https://github.com/ToanLee5433',
  }
];

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.children;
    
    // Animation for cards staggering up on scroll
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <span style={styles.sectionLabel}>// DEV PORTFOLIO</span>
          <h2 style={styles.sectionTitle}>Featured Games & Apps</h2>
          <div style={styles.underline} />
        </div>

        <div ref={cardsRef} style={styles.grid}>
          {projectsData.map((project) => (
            <div key={project.id} className="glass-card" style={styles.card}>
              <div style={styles.imageContainer}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={styles.image}
                  className="project-thumbnail"
                />
                <div style={styles.overlay}>
                  <span style={styles.roleTag}>{project.role}</span>
                </div>
              </div>

              <div style={styles.info}>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                
                <p style={styles.description}>{project.description}</p>
                
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
                    <GithubIcon size={20} />
                    <span>Repository</span>
                  </a>
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={styles.link}
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  )}
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
    background: 'radial-gradient(100% 100% at bottom, rgba(138, 43, 226, 0.03) 0%, rgba(11, 15, 25, 0) 100%)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '4rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionLabel: {
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-purple)',
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
    background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-purple))',
    marginTop: '1rem',
    borderRadius: '2px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    gap: '2.5rem',
    marginTop: '2rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
    cursor: 'default',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '220px',
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
    background: 'rgba(11, 15, 25, 0.85)',
    border: '1px solid var(--accent-cyan)',
    color: 'var(--accent-cyan)',
    padding: '4px 10px',
    borderRadius: '4px',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  info: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  projectTitle: {
    fontSize: '1.35rem',
    color: '#ffffff',
    marginBottom: '0.75rem',
    fontFamily: 'var(--font-mono)',
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    flexGrow: 1,
  },
  tagGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  tag: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: 'var(--text-secondary)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '1rem',
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

// CSS hover scale helper via global styles
const styleElement = document.createElement('style');
styleElement.innerHTML = `
  .glass-card:hover .project-thumbnail {
    transform: scale(1.05);
  }
  .glass-card .links a:hover {
    color: var(--accent-cyan) !important;
  }
`;
document.head.appendChild(styleElement);

export default Projects;
