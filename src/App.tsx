import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import { Volume2, VolumeX } from 'lucide-react';
import './App.css';

const App: React.FC = () => {
  const [portfolioMode, setPortfolioMode] = useState<'game' | 'fullstack'>('game');
  const [isMuted, setIsMuted] = useState<boolean>(true); // Muted by default to respect quiet environments
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  
  // Unlocks audio context on first interaction (browser security rule)
  useEffect(() => {
    const unlockAudio = () => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
        }
      } catch (e) {
        // ignore errors
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  // Web Audio Synth for sci-fi mode change sound
  const playModeSwitchBeep = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Cyberpunk slide-up pitch beep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.18);
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Audio context error
    }
  };

  const handleModeChange = (mode: 'game' | 'fullstack') => {
    if (mode === portfolioMode) return;
    
    // Play sci-fi switch sound
    playModeSwitchBeep();
    
    // Activate 0.3s glitch effect
    setGlitchActive(true);
    setTimeout(() => {
      setPortfolioMode(mode);
    }, 120); // Switch data midway in the glitch
    
    setTimeout(() => {
      setGlitchActive(false);
    }, 300); // Stop glitch redraws at exactly 0.3s (performance optimization)
  };

  return (
    <div className={`app-layout ${glitchActive ? 'screen-glitch' : ''}`} style={appStyles.layout}>
      {/* Navigation Header */}
      <header style={appStyles.header}>
        <div className="container" style={appStyles.headerContainer}>
          <div style={appStyles.logo}>
            <span style={appStyles.logoIcon}>&lt;/&gt;</span>
            <span style={appStyles.logoText}>TOAN.DEV</span>
          </div>

          <div style={appStyles.navGroup}>
            {/* Ecosystem Dual-Mode Switcher */}
            <div className="mode-toggle-container">
              <div className={`mode-toggle-slider ${portfolioMode}`} />
              <button 
                onClick={() => handleModeChange('game')} 
                className={`mode-toggle-btn ${portfolioMode === 'game' ? 'active' : ''}`}
              >
                GAME DEV
              </button>
              <button 
                onClick={() => handleModeChange('fullstack')} 
                className={`mode-toggle-btn ${portfolioMode === 'fullstack' ? 'active' : ''}`}
              >
                FULL-STACK
              </button>
            </div>

            {/* Audio Mute/Unmute Control */}
            <button 
              onClick={() => {
                setIsMuted(!isMuted);
                // Unmute sound trigger
                if (isMuted) {
                  setTimeout(() => playModeSwitchBeep(), 50);
                }
              }} 
              className="audio-control-btn"
              title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic Sections */}
      <main>
        <Hero mode={portfolioMode} isMuted={isMuted} />
        <Projects mode={portfolioMode} />
        <Skills mode={portfolioMode} />
      </main>

      {/* Footer details */}
      <Footer />
    </div>
  );
};

const appStyles: { [key: string]: React.CSSProperties } = {
  layout: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'var(--bg-primary)',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
    padding: '1.5rem 0',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-mono)',
    fontWeight: 700,
    fontSize: '1.25rem',
  },
  logoIcon: {
    color: 'var(--accent-cyan)',
    textShadow: '0 0 10px rgba(0, 242, 254, 0.5)',
  },
  logoText: {
    letterSpacing: '1px',
    color: '#ffffff',
  },
  navGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
};

export default App;
