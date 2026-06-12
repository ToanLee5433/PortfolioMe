import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-layout" style={appStyles.layout}>
      {/* Navigation Header */}
      <header style={appStyles.header}>
        <div className="container" style={appStyles.headerContainer}>
          <div style={appStyles.logo}>
            <span style={appStyles.logoIcon}>&lt;/&gt;</span>
            <span style={appStyles.logoText}>TOAN.DEV</span>
          </div>
          <nav style={appStyles.nav}>
            <a href="#projects" style={appStyles.navLink}>Projects</a>
            <a href="#skills" style={appStyles.navLink}>Skills</a>
            <a href="#contact" style={appStyles.navLink}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Sections */}
      <main>
        <Hero />
        <Projects />
        <Skills />
      </main>

      {/* Footer Details */}
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
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  },
};

// Nav Link Hover Injection
const navStyle = document.createElement('style');
navStyle.innerHTML = `
  header nav a:hover {
    color: var(--accent-cyan) !important;
    text-shadow: 0 0 8px rgba(0, 242, 254, 0.4);
  }
`;
document.head.appendChild(navStyle);

export default App;
