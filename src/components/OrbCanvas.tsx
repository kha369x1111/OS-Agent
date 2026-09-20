import { useEffect, useRef } from "react";

/**
 * Glowing AI core drawn on canvas: soft radial glow, orbiting particle
 * rings and a pulsing heart. Used inside the hero reticle.
 */
export default function OrbCanvas({ speaking = false }: { speaking?: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const speakingRef = useRef(speaking);
  speakingRef.current = speaking;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += speakingRef.current ? 0.022 : 0.0105;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.31;
      ctx.clearRect(0, 0, w, h);

      // outer bloom
      const bloom = ctx.createRadialGradient(cx, cy, R * 0.15, cx, cy, R * 2.2);
      bloom.addColorStop(0, "rgba(34,211,238,0.30)");
      bloom.addColorStop(0.35, "rgba(34,211,238,0.11)");
      bloom.addColorStop(0.72, "rgba(217,70,239,0.07)");
      bloom.addColorStop(1, "rgba(217,70,239,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      // core
      const pulse = 1 + Math.sin(t * 1.6) * (speakingRef.current ? 0.11 : 0.05);
      const core = ctx.createRadialGradient(
        cx - R * 0.22,
        cy - R * 0.26,
        R * 0.06,
        cx,
        cy,
        R * pulse,
      );
      core.addColorStop(0, "rgba(226,246,255,0.96)");
      core.addColorStop(0.18, "rgba(125,211,252,0.85)");
      core.addColorStop(0.48, "rgba(34,211,238,0.55)");
      core.addColorStop(0.78, "rgba(217,70,239,0.28)");
      core.addColorStop(1, "rgba(217,70,239,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * pulse, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();

      // wispy arcs
      for (let i = 0; i < 5; i++) {
        const rr = R * (1.16 + i * 0.2);
        const start = t * (i % 2 === 0 ? 0.42 : -0.31) + i * 1.15;
        const span = 1.05 + i * 0.16;
        ctx.beginPath();
        ctx.arc(cx, cy, rr, start, start + span);
        ctx.strokeStyle = i % 2 === 0 ? "rgba(34,211,238,0.36)" : "rgba(217,70,239,0.30)";
        ctx.lineWidth = 1.4 + i * 0.22;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // orbiting particles
      const count = 74;
      for (let i = 0; i < count; i++) {
        const seed = i * 2.399963;
        const orbit = R * (1.28 + (i % 9) * 0.16);
        const speed = 0.16 + (i % 7) * 0.045;
        const ang = seed + t * speed;
        const px = cx + Math.cos(ang) * orbit;
        const py = cy + Math.sin(ang) * orbit * (0.42 + (i % 5) * 0.14);
        const size = 0.7 + (i % 4) * 0.62;
        const alpha = 0.22 + (i % 6) * 0.1;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? `rgba(217,70,239,${alpha})` : `rgba(165,243,252,${alpha})`;
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="orb-canvas" aria-hidden="true" />;
}
