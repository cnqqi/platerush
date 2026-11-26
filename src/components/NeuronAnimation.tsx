import { useRef, useEffect } from 'react';

interface Neuron {
  x: number;
  y: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
  connections: number[];
}

interface Signal {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export function NeuronAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let neurons: Neuron[] = [];
    let signals: Signal[] = [];
    let isActive = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = parent.clientWidth + 'px';
      canvas.style.height = parent.clientHeight + 'px';
      ctx.scale(dpr, dpr);
      initNeurons(parent.clientWidth, parent.clientHeight);
    };

    const initNeurons = (w: number, h: number) => {
      const count = Math.max(12, Math.floor((w * h) / 12000));
      neurons = [];
      const padding = 30;

      for (let i = 0; i < count; i++) {
        neurons.push({
          x: padding + Math.random() * (w - padding * 2),
          y: padding + Math.random() * (h - padding * 2),
          radius: 3 + Math.random() * 4,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          connections: [],
        });
      }

      // Build connections — each neuron connects to 2-4 nearest
      neurons.forEach((n, i) => {
        const distances = neurons
          .map((other, j) => ({
            j,
            dist: Math.hypot(n.x - other.x, n.y - other.y),
          }))
          .filter((d) => d.j !== i)
          .sort((a, b) => a.dist - b.dist);

        const connCount = 2 + Math.floor(Math.random() * 3);
        const maxDist = Math.min(w, h) * 0.35;
        n.connections = distances
          .slice(0, connCount)
          .filter((d) => d.dist < maxDist)
          .map((d) => d.j);
      });

      signals = [];
    };

    const spawnSignal = () => {
      if (neurons.length === 0) return;
      const fromIdx = Math.floor(Math.random() * neurons.length);
      const from = neurons[fromIdx];
      if (from.connections.length === 0) return;
      const toIdx = from.connections[Math.floor(Math.random() * from.connections.length)];

      signals.push({
        from: fromIdx,
        to: toIdx,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
      });
    };

    let lastSignalTime = 0;

    const draw = (timestamp: number) => {
      if (!isActive) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // Spawn signals periodically
      if (timestamp - lastSignalTime > 200) {
        spawnSignal();
        lastSignalTime = timestamp;
      }

      // Draw connections
      neurons.forEach((n) => {
        n.connections.forEach((ci) => {
          const other = neurons[ci];
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = 'rgba(251, 146, 60, 0.1)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Draw signals
      signals.forEach((sig) => {
        const from = neurons[sig.from];
        const to = neurons[sig.to];
        const x = from.x + (to.x - from.x) * sig.progress;
        const y = from.y + (to.y - from.y) * sig.progress;

        // Glow trail
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 12);
        grad.addColorStop(0, 'rgba(251, 146, 60, 0.8)');
        grad.addColorStop(0.5, 'rgba(251, 146, 60, 0.3)');
        grad.addColorStop(1, 'rgba(251, 146, 60, 0)');
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(249, 115, 22, 0.9)';
        ctx.fill();

        sig.progress += sig.speed;
      });

      // Remove completed signals
      signals = signals.filter((s) => s.progress < 1);

      // Draw neurons
      neurons.forEach((n) => {
        n.pulsePhase += n.pulseSpeed;
        const pulse = 0.5 + 0.5 * Math.sin(n.pulsePhase);
        const glowRadius = n.radius + pulse * 8;

        // Outer glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);
        glow.addColorStop(0, `rgba(251, 146, 60, ${0.3 + pulse * 0.3})`);
        glow.addColorStop(0.6, `rgba(251, 146, 60, ${0.1 + pulse * 0.1})`);
        glow.addColorStop(1, 'rgba(251, 146, 60, 0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${0.6 + pulse * 0.4})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 237, 213, ${0.5 + pulse * 0.5})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    animationId = requestAnimationFrame(draw);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
