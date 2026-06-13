import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Download, Play } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import { portfolioData } from '../portfolioData';

interface HeroProps {
  mode: 'game' | 'fullstack';
  isMuted: boolean;
}

export const Hero: React.FC<HeroProps> = ({ mode, isMuted }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const data = portfolioData[mode];

  useEffect(() => {
    if (!containerRef.current) return;

    // Reset initial state to prevent flash of content
    gsap.set([tagRef.current, titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 20,
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    
    tl.to(tagRef.current, {
      opacity: 1,
      y: 0,
      delay: 0.1,
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
    }, '-=0.5')
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
    }, '-=0.6')
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
    }, '-=0.6');

  }, [mode]); // Re-animate smoothly on mode toggle

  // Web Audio Synth Generator for Arcade SFX
  const playSynthSound = (frequency: number, type: 'sine' | 'sawtooth' = 'sine') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      if (type === 'sine') {
        // High pitch clean arcade blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else {
        // Sawtooth sweep (sci-fi laser style)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(frequency / 3, ctx.currentTime + 0.25);
        gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (err) {
      // Browser autoplay policy might block audio context initialization until direct click
    }
  };

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playSynthSound(500, 'sawtooth');
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHoverBtn = () => {
    playSynthSound(700, 'sine');
  };

  // Prepend base path from vite.config.ts base path setting (e.g. '/PortfolioMe/')
  const cvDownloadUrl = `${import.meta.env.BASE_URL}Le-Quy-Toan-CV.pdf`;

  const accentColor = mode === 'game' ? 'var(--accent-cyan)' : '#10b981';

  return (
    <section ref={containerRef} className="hero-section" style={heroStyles.section}>
      <ParticleBackground mode={mode} />
      
      {/* Dynamic ambient grid colors */}
      <div style={{
        ...heroStyles.ambientCyan,
        background: `radial-gradient(circle, ${mode === 'game' ? 'rgba(0, 242, 254, 0.08)' : 'rgba(16, 185, 129, 0.08)'} 0%, rgba(0, 0, 0, 0) 70%)`
      }} />
      <div style={heroStyles.ambientPurple} />
      
      <div className="container" style={heroStyles.contentContainer}>
        <div style={heroStyles.wrapper}>
          <span ref={tagRef} style={{ ...heroStyles.tag, color: accentColor, textShadow: `0 0 10px ${accentColor}4D` }}>
            [ {mode === 'game' ? 'GAME DEV ENVIRONMENT' : 'FULL-STACK ENVIRONMENT'} ]
          </span>
          
          <h1 ref={titleRef} style={heroStyles.title}>
            Hi, I'm <span style={{
              ...heroStyles.highlight,
              background: mode === 'game' 
                ? 'linear-gradient(to right, var(--accent-cyan), #a15bf9)' 
                : 'linear-gradient(to right, #10b981, var(--accent-cyan))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Le Quy Toan</span>
            <br />
            <span style={heroStyles.subHighlight}>{data.subTitle}</span>
          </h1>
          
          <p ref={subtitleRef} style={heroStyles.subtitle}>
            {data.objective}
          </p>
          
          <div ref={ctaRef} style={heroStyles.ctaGroup}>
            <a 
              href="#projects" 
              onClick={handleExploreClick} 
              onMouseEnter={handleHoverBtn}
              className="btn-neon"
              style={{
                color: accentColor,
                border: `2px solid ${accentColor}`,
                boxShadow: `0 0 10px ${accentColor}1D`,
              }}
            >
              <ArrowDown size={18} />
              Explore Projects
            </a>
            
            <a 
              href={cvDownloadUrl}
              download="Le-Quy-Toan-CV.pdf" 
              onMouseEnter={handleHoverBtn}
              onClick={() => playSynthSound(800, 'sine')}
              className="btn-neon btn-neon-purple"
              style={heroStyles.downloadBtn}
            >
              <Download size={18} />
              Download CV
            </a>
          </div>

          <div style={heroStyles.arcadePrompt}>
            <Play size={10} style={{ animation: 'pulse-opacity 1s infinite alternate', marginRight: '4px' }} />
            <span>PRESS TABS TO EXPLORE SYSTEMS</span>
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
    marginBottom: '1.5rem',
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
    maxWidth: '720px',
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
  arcadePrompt: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: 'var(--text-muted)',
    marginTop: '3.5rem',
    letterSpacing: '2px',
  }
};

const pulseStyle = document.createElement('style');
pulseStyle.innerHTML = `
  @keyframes pulse-opacity {
    from { opacity: 0.2; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(pulseStyle);

export default Hero;
