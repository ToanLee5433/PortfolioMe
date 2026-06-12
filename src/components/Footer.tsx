import React from 'react';
import { Mail, Phone, MapPin, Terminal } from 'lucide-react';

const GithubIcon = ({ size = 20, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    style={style}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" style={styles.footer}>
      <div className="container" style={styles.container}>
        
        {/* Contact info grid */}
        <div style={styles.contactGrid}>
          <div style={styles.contactItem}>
            <Mail size={20} style={styles.iconCyan} />
            <div>
              <p style={styles.label}>Email</p>
              <a href="mailto:lequytoanptit0303@gmail.com" style={styles.link}>
                lequytoanptit0303@gmail.com
              </a>
            </div>
          </div>

          <div style={styles.contactItem}>
            <Phone size={20} style={styles.iconPurple} />
            <div>
              <p style={styles.label}>Phone</p>
              <a href="tel:0338825003" style={styles.link}>
                033 882 5003
              </a>
            </div>
          </div>

          <div style={styles.contactItem}>
            <GithubIcon size={20} style={styles.iconMagenta} />
            <div>
              <p style={styles.label}>GitHub</p>
              <a 
                href="https://github.com/ToanLee5433" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={styles.link}
              >
                github.com/ToanLee5433
              </a>
            </div>
          </div>

          <div style={styles.contactItem}>
            <MapPin size={20} style={styles.iconCyan} />
            <div>
              <p style={styles.label}>Location</p>
              <p style={styles.text}>Hà Đông, Hà Nội</p>
            </div>
          </div>
        </div>

        {/* Bottom footer text */}
        <div style={styles.bottom}>
          <div style={styles.consoleText}>
            <Terminal size={14} style={{ color: 'var(--accent-cyan)' }} />
            <span>sys.status = "Available for opportunities"</span>
          </div>
          <p style={styles.copyright}>
            &copy; {currentYear} Le Quy Toan. Built with React, TypeScript & GSAP. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: '#070a11',
    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
    padding: '60px 0 30px 0',
    position: 'relative',
    zIndex: 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'rgba(21, 29, 48, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    padding: '1.25rem',
    borderRadius: '12px',
  },
  iconCyan: {
    color: 'var(--accent-cyan)',
    filter: 'drop-shadow(0 0 5px rgba(0, 242, 254, 0.3))',
    flexShrink: 0,
  },
  iconPurple: {
    color: 'var(--accent-purple)',
    filter: 'drop-shadow(0 0 5px rgba(138, 43, 226, 0.3))',
    flexShrink: 0,
  },
  iconMagenta: {
    color: '#ff007f',
    filter: 'drop-shadow(0 0 5px rgba(255, 0, 127, 0.3))',
    flexShrink: 0,
  },
  label: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '2px',
  },
  link: {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s ease',
    wordBreak: 'break-all',
  },
  text: {
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
  },
  bottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  consoleText: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '6px 14px',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.03)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  copyright: {
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
    textAlign: 'center',
  },
};

// Global style helper for link hover color
const footerHoverStyle = document.createElement('style');
footerHoverStyle.innerHTML = `
  footer a:hover {
    color: var(--accent-cyan) !important;
  }
`;
document.head.appendChild(footerHoverStyle);

export default Footer;
