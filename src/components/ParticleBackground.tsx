import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  mode: 'game' | 'fullstack';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, lastX: -1000, lastY: -1000, isMoving: false });
  const activeModeRef = useRef(mode);

  // Sync mode ref to read it inside animation loops without resetting useEffect
  useEffect(() => {
    activeModeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let thrusters: ThrusterParticle[] = [];
    const colorsGame = ['#00f2fe', '#8a2be2', '#ffffff'];
    const colorsFullstack = ['#10b981', '#34d399', '#059669'];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      fadeSpeed: number;

      constructor(w: number, h: number, isFS: boolean) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.color = isFS 
          ? colorsFullstack[Math.floor(Math.random() * colorsFullstack.length)]
          : colorsGame[Math.floor(Math.random() * colorsGame.length)];
        this.alpha = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = (Math.random() - 0.5) * 0.003;
      }

      update(w: number, h: number, mouseX: number, mouseY: number, isGame: boolean) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary checks
        if (this.x < 0 || this.x > w) this.speedX *= -1;
        if (this.y < 0 || this.y > h) this.speedY *= -1;

        // Evasion logic in Game Mode
        if (isGame && mouseX > -500 && mouseY > -500) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            // Push away
            const force = (80 - dist) / 80;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 3;
            this.y += Math.sin(angle) * force * 3;
          }
        }

        // Float alpha
        this.alpha += this.fadeSpeed;
        if (this.alpha > 0.8 || this.alpha < 0.15) {
          this.fadeSpeed *= -1;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.globalAlpha = this.alpha;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    class ThrusterParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = Math.random() * 2.5 + 1.5; // fly downwards
        this.size = Math.random() * 2 + 1;
        this.alpha = 1.0;
        this.color = Math.random() > 0.5 ? '#ff007f' : '#00f2fe';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.04;
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        context.fillStyle = this.color;
        context.shadowBlur = 6;
        context.shadowColor = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initParticles(canvas.width, canvas.height);
      }
    };

    const initParticles = (w: number, h: number) => {
      particles = [];
      thrusters = [];
      const isFS = activeModeRef.current === 'fullstack';
      const count = isFS 
        ? Math.min(Math.floor((w * h) / 18000), 75) // fewer connected nodes for clean data stream look
        : Math.min(Math.floor((w * h) / 12000), 100);

      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h, isFS));
      }
    };

    // Tracking mouse movements
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const m = mouseRef.current;
      m.lastX = m.x;
      m.lastY = m.y;
      m.x = x;
      m.y = y;
      m.isMoving = true;

      // Spawn thrusters in game mode when spaceship moves
      if (activeModeRef.current === 'game') {
        thrusters.push(new ThrusterParticle(x, y + 15));
        if (thrusters.length > 40) thrusters.shift();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.isMoving = false;
    };

    const handleMouseDown = () => {
      // Game mode explosion burst
      if (activeModeRef.current === 'game' && mouseRef.current.x > 0) {
        for (let i = 0; i < 15; i++) {
          const tp = new ThrusterParticle(mouseRef.current.x, mouseRef.current.y);
          tp.vx = (Math.random() - 0.5) * 5;
          tp.vy = (Math.random() - 0.5) * 5;
          thrusters.push(tp);
        }
      }
    };

    // Synthesize spaceship shape
    const drawSpaceship = (context: CanvasRenderingContext2D, x: number, y: number) => {
      context.save();
      context.translate(x, y);
      
      // Outer glow
      context.shadowBlur = 10;
      context.shadowColor = 'var(--accent-cyan)';
      context.strokeStyle = 'var(--accent-cyan)';
      context.lineWidth = 1.5;
      
      // Wireframe ship hull (pointing up)
      context.beginPath();
      context.moveTo(0, -12); // nose
      context.lineTo(10, 10);  // right wing tip
      context.lineTo(4, 6);    // right inner
      context.lineTo(-4, 6);   // left inner
      context.lineTo(-10, 10); // left wing tip
      context.closePath();
      context.stroke();

      // Wing engines
      context.fillStyle = '#ff007f';
      context.beginPath();
      context.arc(-4, 6, 2, 0, Math.PI * 2);
      context.arc(4, 6, 2, 0, Math.PI * 2);
      context.fill();
      
      context.restore();
    };

    // Mode-based drawing & updates
    const animate = (time: number) => {
      const isGame = activeModeRef.current === 'game';
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. UPDATE AND DRAW BACKGROUND STARS
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height, mouseRef.current.x, mouseRef.current.y, isGame);
        particle.draw(ctx);
      });

      // 2. MODE SPECIFIC RENDERING
      if (isGame) {
        // Update & Draw thruster fire
        thrusters.forEach((t, index) => {
          t.update();
          t.draw(ctx);
          if (t.alpha <= 0) {
            thrusters.splice(index, 1);
          }
        });

        // Draw Spaceship cursor
        if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
          drawSpaceship(ctx, mouseRef.current.x, mouseRef.current.y);
        }
      } else {
        // Fullstack Mode: Draw Connected Network Grid + Pulsing Data Streams
        ctx.lineWidth = 0.5;
        const maxDist = 110;
        
        // Loop pairs to draw grid connections
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < maxDist) {
              const alphaRatio = (maxDist - dist) / maxDist;
              ctx.strokeStyle = `rgba(16, 185, 129, ${alphaRatio * 0.12})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              // Draw Data Stream Packet
              // Packet position flows along the line using time
              const speed = 0.0004;
              const flowRatio = ((time * speed) + (i * 0.1)) % 1;
              const packetX = p1.x + (p2.x - p1.x) * flowRatio;
              const packetY = p1.y + (p2.y - p1.y) * flowRatio;

              ctx.save();
              ctx.fillStyle = '#10b981';
              ctx.shadowBlur = 4;
              ctx.shadowColor = '#10b981';
              ctx.beginPath();
              ctx.arc(packetX, packetY, 1.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Attach event listeners to parent container of canvas
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
      parent.addEventListener('mousedown', handleMouseDown);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
        parent.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [mode]); // Re-run effect completely on mode toggle to reset grids/particles, preventing leakage

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

export default ParticleBackground;
