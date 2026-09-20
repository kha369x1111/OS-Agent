import { useEffect, useRef } from "react";

/**
 * Animated "plexus" particle network that sits behind the whole page.
 * Pure canvas 2D — nodes drift slowly, lines connect nearby nodes,
 * and the mouse gently pushes the web around.
 */
export default function PlexusBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];

    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(88, Math.max(34, Math.round((width * height) / 21000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.7 + 0.55,
      }));
    };

    build();

    const onResize = () => build();
    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("mouseout", onLeave);

    let raf = 0;
    const maxDist = 168;

    const frame = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
        }

        // gentle mouse repulsion
        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 20000 && !reduce) {
          const f = (1 - md2 / 20000) * 0.35;
          const d = Math.sqrt(md2) || 1;
          n.x += (mdx / d) * f;
          n.y += (mdy / d) * f;
        }

        if (n.x < -40) n.x = width + 40;
        if (n.x > width + 40) n.x = -40;
        if (n.y < -40) n.y = height + 40;
        if (n.y > height + 40) n.y = -40;
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.2;
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(125, 211, 252, 0.5)";
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
