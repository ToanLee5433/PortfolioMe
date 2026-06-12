import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Download } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset initial state to avoid flash of unstyled content
    gsap.set([tagRef.current, titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 30,
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    tl.to(tagRef.current, {
      opacity: 1,
      y: 0,
      delay: 0.2,
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
    }, '-=0.6')
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
    }, '-=0.7')
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
    }, '-=0.7');

  }, []);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="hero-section" style={heroStyles.section}>
      <ParticleBackground />
      
      {/* Decorative ambient lights */}
      <div style={heroStyles.ambientCyan} />
      <div style={heroStyles.ambientPurple} />
      
      <div className="container" style={heroStyles.contentContainer}>
        <div style={heroStyles.wrapper}>
          <span ref={tagRef} style={heroStyles.tag}>
            [ PORTFOLIO ECOSYSTEM ]
          </span>
          
          <h1 ref={titleRef} style={heroStyles.title}>
            Hi, I'm <span style={heroStyles.highlight}>Le Quy Toan</span>
            <br />
            <span style={heroStyles.subHighlight}>Aspiring Game & Playable Ads Developer</span>
          </h1>
          
          <p ref={subtitleRef} style={heroStyles.subtitle}>
            Specialized in Unity game development, interactive playable ads, and high-performance graphic particle systems. Creating immersive, responsive, and pixel-perfect gaming experiences.
          </p>
          
          <div ref={ctaRef} style={heroStyles.ctaGroup}>
            <a href="#projects" onClick={handleExploreClick} className="btn-neon btn-neon-cyan">
              <ArrowDown size={18} />
              Explore Projects
            </a>
            
            <a 
              href="/Le-Quy-Toan-CV.pdf" 
              download="Le-Quy-Toan-CV.pdf" 
              className="btn-neon btn-neon-purple"
              style={heroStyles.downloadBtn}
            >
              <Download size={18} />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const heroStyles: { [key: string]: React.CSSProperties } = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 2,
  },
  wrapper: {
    maxWidth: '850px',
    margin: '0 auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
    letterSpacing: '0.3em',
    color: 'var(--accent-cyan)',
    marginBottom: '1.5rem',
    textShadow: '0 0 10px rgba(0, 242, 254, 0.3)',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 'clamp(2.2rem, 5vw, 4rem)',
    lineHeight: '1.2',
    marginBottom: '1.5rem',
    color: '#ffffff',
    letterSpacing: '-0.02em',
  },
  highlight: {
    background: 'linear-gradient(to right, var(--accent-cyan), #a15bf9)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 800,
  },
  subHighlight: {
    fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)',
    fontWeight: 500,
    color: 'var(--text-primary)',
    display: 'block',
    marginTop: '0.75rem',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
    marginBottom: '2.5rem',
    maxWidth: '700px',
  },
  ctaGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.25rem',
    justifyContent: 'center',
  },
  downloadBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  ambientCyan: {
    position: 'absolute',
    width: '35vw',
    height: '35vw',
    top: '10%',
    left: '10%',
    background: 'radial-gradient(circle, rgba(0, 242, 254, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  ambientPurple: {
    position: 'absolute',
    width: '40vw',
    height: '40vw',
    bottom: '10%',
    right: '10%',
    background: 'radial-gradient(circle, rgba(138, 43, 226, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
};

export default Hero;
