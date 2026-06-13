import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code2, Cpu, Wrench } from 'lucide-react';
import { portfolioData } from '../portfolioData';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  mode: 'game' | 'fullstack';
}

const categoryIcons = [
  <Code2 size={22} style={{ color: 'var(--accent-cyan)' }} />,
  <Cpu size={22} style={{ color: 'var(--accent-purple)' }} />,
  <Wrench size={22} style={{ color: '#ff007f' }} />,
];

// Certifications are locked and visible in both modes
const certifications = [
  {
    title: 'Aptis ESOL International Certificate (CEFR Level B2)',
    issuer: 'British Council (2026-2028)',
    points: '+100 EXP',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp (2025)',
    points: '+80 EXP',
  },
  {
    title: 'Unity Essentials & Junior Programmer Foundations',
    issuer: 'Unity Learn (2026)',
    points: '+120 EXP',
  },
];

export const Skills: React.FC<SkillsProps> = ({ mode }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  const skillsData = portfolioData[mode].skills;
  const accentColor = mode === 'game' ? 'var(--accent-cyan)' : '#10b981';

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate skill groups
    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Animate achievements
    if (certRef.current) {
      gsap.fromTo(
        certRef.current.children,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: certRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [mode]);

  return (
    <section id="skills" ref={sectionRef} style={styles.section}>
      <div className="container">
        
        {/* Ambient background light */}
        <div style={{
          ...styles.ambientLight,
          background: `radial-gradient(circle, ${mode === 'game' ? 'rgba(138, 43, 226, 0.04)' : 'rgba(16, 185, 129, 0.04)'} 0%, rgba(0, 0, 0, 0) 70%)`
        }} />

        <div style={styles.header}>
          <span style={{ ...styles.sectionLabel, color: accentColor }}>// CAPABILITY MATRICES</span>
          <h2 style={styles.sectionTitle}>Skills & Credentials</h2>
          <div style={{
            ...styles.underline,
            background: mode === 'game'
              ? 'linear-gradient(to right, var(--accent-purple), var(--accent-cyan))'
              : 'linear-gradient(to right, #10b981, var(--accent-cyan))'
          }} />
        </div>

        <div style={styles.grid}>
          {/* Skills Column */}
          <div ref={skillsRef} style={styles.skillsCol}>
            {skillsData.map((group, idx) => (
              <div key={idx} className="glass-card" style={styles.skillCard}>
                <div style={styles.skillHeader}>
                  {categoryIcons[idx % categoryIcons.length]}
                  <h3 style={styles.categoryTitle}>{group.category}</h3>
                </div>
                <div style={styles.tagGroup}>
                  {group.skills.map((skill) => (
                    <span key={skill} className="skillTag" style={{
                      backgroundColor: mode === 'game' ? 'rgba(0, 242, 254, 0.02)' : 'rgba(16, 185, 129, 0.02)',
                      border: mode === 'game' ? '1px solid rgba(0, 242, 254, 0.08)' : '1px solid rgba(16, 185, 129, 0.08)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--text-primary)',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontWeight: 400,
                      transition: 'all 0.3s ease',
                      cursor: 'default',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Column (Achievements style) */}
          <div>
            <div className="glass-card" style={styles.certCard}>
              <div style={styles.skillHeader}>
                <Award size={24} style={{ color: 'gold', filter: 'drop-shadow(0 0 5px rgba(255, 215, 0, 0.4))' }} />
                <h3 style={styles.categoryTitle}>Achievements Unlocked</h3>
              </div>
              <p style={styles.certSubtitle}>
                Official credentials and professional certifications validating core developer competencies.
              </p>
              
              <div ref={certRef} style={styles.certList}>
                {certifications.map((cert, idx) => (
                  <div key={idx} style={styles.certItem}>
                    {/* Retro medal badge */}
                    <div style={styles.badgeContainer}>
                      <span style={styles.badgeUnlocked}>[UNLOCKED]</span>
                      <span style={styles.expTag}>{cert.points}</span>
                    </div>
                    
                    <div style={styles.certMeta}>
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
    gap: '1.75rem',
  },
  certItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.02)',
  },
  badgeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    paddingBottom: '0.35rem',
  },
  badgeUnlocked: {
    fontSize: '0.7rem',
    fontFamily: 'var(--font-mono)',
    color: 'gold',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textShadow: '0 0 5px rgba(255, 215, 0, 0.4)',
  },
  expTag: {
    fontSize: '0.7rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--accent-cyan)',
    fontWeight: 'bold',
  },
  certMeta: {
    paddingTop: '0.25rem',
  },
  certTitle: {
    fontSize: '0.95rem',
    color: '#ffffff',
    fontWeight: 650,
    lineHeight: '1.4',
    marginBottom: '0.2rem',
  },
  certIssuer: {
    fontSize: '0.82rem',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-sans)',
  },
};

export default Skills;
