import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  mode: 'game' | 'fullstack';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, lastX: -1000, lastY: -1000, isMoving: false });
  const activeModeRef = useRef(mode);

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
    let ripples: Ripple[] = [];
    const colorsGame = ['#00f2fe', '#8a2be2', '#ffffff'];
    const colorsFullstack = ['#10b981', '#34d399', '#ffffff'];

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
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25;
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

        // Evasion logic in Game Mode (particles dodge spaceship cursor)
        if (isGame && mouseX > -500 && mouseY > -500) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const force = (90 - dist) / 90;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 2.5;
            this.y += Math.sin(angle) * force * 2.5;
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
        this.vy = Math.random() * 2 + 1; // downward
        this.size = Math.random() * 2 + 1;
        this.alpha = 0.9;
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

    class Ripple {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      maxRadius: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 12;
        this.alpha = 1.0;
        this.maxRadius = 60;
      }

      update() {
        this.radius += 2.2;
        this.alpha -= 0.04;
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        context.strokeStyle = '#ff007f';
        context.shadowColor = '#ff007f';
        context.shadowBlur = 10;
        context.lineWidth = 1.5;
        
        // expanding target lock ring
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.stroke();
        
        // draw crosshair indicators on the ring
        context.beginPath();
        context.moveTo(this.x - this.radius, this.y);
        context.lineTo(this.x - this.radius + 6, this.y);
        context.moveTo(this.x + this.radius, this.y);
        context.lineTo(this.x + this.radius - 6, this.y);
        context.moveTo(this.x, this.y - this.radius);
        context.lineTo(this.x, this.y - this.radius + 6);
        context.moveTo(this.x, this.y + this.radius);
        context.lineTo(this.x, this.y + this.radius - 6);
        context.stroke();

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
      ripples = [];
      const isFS = activeModeRef.current === 'fullstack';
      const count = isFS 
        ? Math.min(Math.floor((w * h) / 18000), 70) 
        : Math.min(Math.floor((w * h) / 12000), 100);

      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h, isFS));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const m = mouseRef.current;
      m.x = x;
      m.y = y;
      m.isMoving = true;

      // Spawn thruster trails in Game mode
      if (activeModeRef.current === 'game') {
        thrusters.push(new ThrusterParticle(x, y + 10));
        if (thrusters.length > 50) thrusters.shift();
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.isMoving = false;
    };

    const handleMouseDown = () => {
      if (mouseRef.current.x > 0) {
        // Trigger lock-on ripple
        ripples.push(new Ripple(mouseRef.current.x, mouseRef.current.y));
        if (ripples.length > 5) ripples.shift();

        // Game mode thruster blast
        if (activeModeRef.current === 'game') {
          for (let i = 0; i < 15; i++) {
            const tp = new ThrusterParticle(mouseRef.current.x, mouseRef.current.y);
            tp.vx = (Math.random() - 0.5) * 6;
            tp.vy = (Math.random() - 0.5) * 6;
            thrusters.push(tp);
          }
        }
      }
    };

    // Draw Spaceship cursor with tactical radar circle
    const drawTacticalSpaceship = (context: CanvasRenderingContext2D, x: number, y: number, time: number) => {
      context.save();
      context.translate(x, y);

      // 1. ROTATING TACTICAL RADAR
      const rotation = (time * 0.001) % (Math.PI * 2);
      context.rotate(rotation);

      context.lineWidth = 1;
      context.strokeStyle = 'rgba(0, 242, 254, 0.4)';
      context.shadowBlur = 4;
      context.shadowColor = 'var(--accent-cyan)';

      // Dotted radar ring
      context.setLineDash([2, 5]);
      context.beginPath();
      context.arc(0, 0, 24, 0, Math.PI * 2);
      context.stroke();

      // Outer radar arcs
      context.setLineDash([]);
      context.beginPath();
      context.arc(0, 0, 32, -Math.PI / 6, Math.PI / 6);
      context.stroke();
      context.beginPath();
      context.arc(0, 0, 32, 5 * Math.PI / 6, 7 * Math.PI / 6);
      context.stroke();

      // Reset rotation for spaceship drawing
      context.rotate(-rotation);

      // 2. RETRO WIREFRAME SPACESHIP
      context.strokeStyle = 'var(--accent-cyan)';
      context.shadowBlur = 10;
      context.lineWidth = 1.8;
      
      context.beginPath();
      context.moveTo(0, -14); // Nose tip
      context.lineTo(11, 10);  // Right wing
      context.lineTo(4, 6);    // Inner indent
      context.lineTo(-4, 6);
      context.lineTo(-11, 10); // Left wing
      context.closePath();
      context.stroke();

      // Glowing engine flame nodes
      context.fillStyle = '#ff007f';
      context.shadowBlur = 6;
      context.shadowColor = '#ff007f';
      context.beginPath();
      context.arc(-4, 6, 2, 0, Math.PI * 2);
      context.arc(4, 6, 2, 0, Math.PI * 2);
      context.fill();

      context.restore();
    };

    const animate = (time: number) => {
      const isGame = activeModeRef.current === 'game';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. STARS & STARS EVASION
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height, mouseRef.current.x, mouseRef.current.y, isGame);
        particle.draw(ctx);
      });

      // 2. RIPPLES (Target locks)
      ripples.forEach((r, idx) => {
        r.update();
        r.draw(ctx);
        if (r.alpha <= 0) {
          ripples.splice(idx, 1);
        }
      });

      // 3. MODE SPECIFIC DRAWING
      if (isGame) {
        // Draw thrusters
        thrusters.forEach((t, index) => {
          t.update();
          t.draw(ctx);
          if (t.alpha <= 0) {
            thrusters.splice(index, 1);
          }
        });

        // Draw Spaceship & Radar cursor
        if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
          drawTacticalSpaceship(ctx, mouseRef.current.x, mouseRef.current.y, time);
        }
      } else {
        // Fullstack Mode: Draw Network Grid + Glowing Data Stream Packets
        ctx.lineWidth = 0.5;
        const maxDist = 110;
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < maxDist) {
              const alphaRatio = (maxDist - dist) / maxDist;
              ctx.strokeStyle = `rgba(16, 185, 129, ${alphaRatio * 0.14})`;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              // Data Packet Flow along lines
              const speed = 0.00045;
              const flowRatio = ((time * speed) + (i * 0.15)) % 1;
              const packetX = p1.x + (p2.x - p1.x) * flowRatio;
              const packetY = p1.y + (p2.y - p1.y) * flowRatio;

              ctx.save();
              ctx.fillStyle = '#10b981';
              ctx.shadowBlur = 6;
              ctx.shadowColor = '#10b981';
              ctx.beginPath();
              ctx.arc(packetX, packetY, 1.8, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

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
  }, [mode]); // Triggers re-initialization on mode toggle, wiping old state

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
