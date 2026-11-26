import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  vRot: number;
  alpha: number;
  kind: 'petal' | 'spark';
}

export function PetalCanvas({ intensity = 'soft' }: { intensity?: 'cover' | 'soft' }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const count = intensity === 'cover' ? (width < 640 ? 24 : 38) : width < 640 ? 14 : 22;
    const particles: Particle[] = Array.from({ length: count }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: -0.25 + Math.random() * 0.55,
      vy: 0.32 + Math.random() * 0.55,
      size:
        idx % 4 === 0
          ? 10 + Math.random() * 14
          : idx % 3 === 0
            ? 2.2 + Math.random() * 2.2
            : 5 + Math.random() * 5,
      rotation: Math.random() * Math.PI * 2,
      vRot: -0.015 + Math.random() * 0.03,
      alpha: idx % 4 === 0 ? 0.06 + Math.random() * 0.08 : 0.22 + Math.random() * 0.38,
      kind: idx % 3 === 0 ? 'spark' : 'petal',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx + Math.sin(p.y * 0.012) * 0.25;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.y > height + 24) {
          p.y = -24;
          p.x = Math.random() * width;
        }
        if (p.x > width + 24) p.x = -24;
        if (p.x < -24) p.x = width + 24;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;

        if (p.size > 11) {
          // Soft ambient bokeh orb
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, '#DFC484');
          grad.addColorStop(1, 'rgba(223, 196, 132, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === 'spark') {
          ctx.fillStyle = '#C6A358';
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Delicate white jasmine / ivory petal silhouette
          ctx.fillStyle = intensity === 'cover' ? '#F3ECE0' : '#D9C8A9';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.52, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animId = window.requestAnimationFrame(render);
    };

    animId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 w-full h-full"
    />
  );
}
