import { useEffect, useRef, useState } from "react";
import { Database, FileCode2, Fingerprint, Network, Search, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const categories = [
  { name: "Projects", color: "#22d3ee" },
  { name: "People", color: "#d946ef" },
  { name: "Invoices", color: "#a78bfa" },
  { name: "Standards", color: "#4ade80" },
  { name: "Health", color: "#fbbf24" },
];

const queryLabels = [
  "How much did we invoice Novak?",
  "What does the standard say about railings?",
  "What did the supplier write last week?",
  "When was I last on site?",
  "What did the doctor prescribe in March?",
];

type Node = {
  x: number;
  y: number;
  z: number;
  cat: number;
  size: number;
  links: number[];
};

function buildNodes(): Node[] {
  const nodes: Node[] = [];
  const perCat = 26;
  for (let c = 0; c < categories.length; c++) {
    // cluster centre on a sphere
    const phi = (c / categories.length) * Math.PI * 2 + 0.6;
    const theta = 0.65 + (c % 3) * 0.52;
    const cx = Math.cos(phi) * Math.sin(theta) * 172;
    const cy = Math.cos(theta) * 152;
    const cz = Math.sin(phi) * Math.sin(theta) * 172;
    for (let i = 0; i < perCat; i++) {
      nodes.push({
        x: cx + (Math.random() - 0.5) * 118,
        y: cy + (Math.random() - 0.5) * 108,
        z: cz + (Math.random() - 0.5) * 118,
        cat: c,
        size: 1.6 + Math.random() * 2.6,
        links: [],
      });
    }
  }
  // link each node to its 2 nearest neighbours in the same category
  nodes.forEach((n, i) => {
    const same = nodes
      .map((m, j) => ({
        j,
        d:
          j === i || m.cat !== n.cat
            ? Infinity
            : (m.x - n.x) ** 2 + (m.y - n.y) ** 2 + (m.z - n.z) ** 2,
      }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    n.links = same.filter((s) => Number.isFinite(s.d)).map((s) => s.j);
  });
  return nodes;
}

const queryTargets = [
  { x: 120, y: -40, z: 90 },
  { x: -140, y: 60, z: -80 },
  { x: 60, y: 120, z: -130 },
  { x: -90, y: -110, z: 110 },
  { x: 20, y: -130, z: -120 },
];

export default function MemorySection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const angleRef = useRef(0);
  const tiltRef = useRef(-0.36);
  const draggingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });
  const filterRef = useRef<number | null>(null);
  const queryRef = useRef<number>(0);

  const [filter, setFilter] = useState<number | null>(null);
  const [queryIdx, setQueryIdx] = useState(0);
  const [labelsOn, setLabelsOn] = useState(true);
  const labelsRef = useRef(true);
  useEffect(() => { labelsRef.current = labelsOn; }, [labelsOn]);

  useEffect(() => {
    nodesRef.current = buildNodes();
  }, []);

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);
  useEffect(() => {
    queryRef.current = queryIdx;
  }, [queryIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (x: number, y: number, z: number, ay: number, ax: number) => {
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const fov = 470;
      const scale = fov / (fov + z2);
      return { px: w / 2 + x1 * scale, py: h / 2 + y1 * scale, depth: z2, scale };
    };

    const draw = () => {
      const nodes = nodesRef.current;
      if (!nodes.length) {
        raf = requestAnimationFrame(draw);
        return;
      }
      if (!draggingRef.current && !reduce) angleRef.current += 0.0022;

      ctx.clearRect(0, 0, w, h);

      // background sphere guides
      const ay = angleRef.current;
      const ax = tiltRef.current;
      for (let r = 120; r <= 250; r += 65) {
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.12) {
          const p = project(Math.cos(a) * r, Math.sin(a) * r * 0.36, Math.sin(a) * r, ay, ax);
          if (a === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }
        ctx.strokeStyle = "rgba(34,211,238,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const projected = nodes.map((n) => ({
        n,
        ...project(n.x, n.y, n.z, ay, ax),
      }));

      // links
      for (let i = 0; i < projected.length; i++) {
        const a = projected[i];
        const dimA = filterRef.current !== null && a.n.cat !== filterRef.current;
        for (const j of a.n.links) {
          const b = projected[j];
          const dimB = filterRef.current !== null && b.n.cat !== filterRef.current;
          const alpha = (dimA || dimB ? 0.05 : 0.2) * ((a.scale + b.scale) / 2 - 0.35);
          if (alpha <= 0) continue;
          ctx.beginPath();
          ctx.moveTo(a.px, a.py);
          ctx.lineTo(b.px, b.py);
          ctx.strokeStyle = categories[a.n.cat].color + Math.round(alpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // query target + nearest nodes
      const target = queryTargets[queryRef.current];
      const tp = project(target.x, target.y, target.z, ay, ax);
      const nearest = [...projected]
        .map((p, i) => ({
          i,
          d: (p.n.x - target.x) ** 2 + (p.n.y - target.y) ** 2 + (p.n.z - target.z) ** 2,
          p,
        }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 9);

      for (const { p } of nearest) {
        ctx.beginPath();
        ctx.moveTo(tp.px, tp.py);
        ctx.lineTo(p.px, p.py);
        ctx.strokeStyle = "rgba(34,211,238,0.34)";
        ctx.lineWidth = 1.05;
        ctx.stroke();
      }

      // query marker
      const pulse = 1 + Math.sin(Date.now() / 320) * 0.22;
      ctx.beginPath();
      ctx.arc(tp.px, tp.py, 16 * pulse * tp.scale, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34,211,238,0.1)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(tp.px, tp.py, 5.4, 0, Math.PI * 2);
      ctx.fillStyle = "#22d3ee";
      ctx.fill();
      if (labelsRef.current) {
        ctx.font = "600 10px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(165,243,252,0.92)";
        ctx.fillText("QUERY VECTOR", tp.px + 11, tp.py - 9);
      }

      // nodes (back to front)
      projected.sort((a, b) => b.depth - a.depth);
      for (const p of projected) {
        const isNear = nearest.some((q) => q.p.n === p.n);
        const dim = filterRef.current !== null && p.n.cat !== filterRef.current;
        const alpha = dim ? 0.16 : 0.92;
        const r = p.n.size * p.scale * (isNear ? 1.65 : 1);

        const glow = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 5.2);
        const col = categories[p.n.cat].color;
        glow.addColorStop(0, col + (dim ? "22" : "77"));
        glow.addColorStop(1, col + "00");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.px, p.py, r * 5.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fillStyle = col + Math.round(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        if (isNear) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, r + 4.2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(34,211,238,0.75)";
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }

        if (labelsRef.current && isNear && p.scale > 0.72) {
          ctx.font = "500 9px 'JetBrains Mono', monospace";
          ctx.fillStyle = "rgba(232,240,247,0.68)";
          ctx.fillText(categories[p.n.cat].name.toUpperCase(), p.px + 9, p.py + 3);
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* drag to rotate */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const down = (e: PointerEvent) => {
      draggingRef.current = true;
      lastRef.current = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      angleRef.current += (e.clientX - lastRef.current.x) * 0.0068;
      tiltRef.current = Math.max(
        -1.15,
        Math.min(1.15, tiltRef.current + (e.clientY - lastRef.current.y) * 0.005),
      );
      lastRef.current = { x: e.clientX, y: e.clientY };
    };
    const up = (e: PointerEvent) => {
      draggingRef.current = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer capture may already be released */
      }
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    return () => {
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section id="memory">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <Network size={13} /> MyMemory
            </span>
            <h2>
              An assistant that <span className="accent-text">actually knows you.</span>
            </h2>
            <p>
              Everything Darwin and the agents learn lives in plain files on your disk — facts,
              notes, project knowledge, each agent's own diary. You can browse it as a living graph,
              just like this one.
            </p>
          </div>
        </Reveal>

        <div className="memory-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,0.85fr)", gap: 30, alignItems: "center" }}>
          <Reveal>
            <div>
              <div
                className="glass-frame"
                style={{ background: "rgba(8,13,20,0.66)", padding: "10px 10px 4px" }}
              >
                <canvas
                  ref={canvasRef}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 0.92",
                    display: "block",
                    cursor: "grab",
                    borderRadius: 13,
                    touchAction: "none",
                  }}
                  aria-label="Interactive memory graph — drag to rotate"
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                  marginTop: 14,
                }}
              >
                {categories.map((c, i) => (
                  <button
                    key={c.name}
                    className={`chip ${filter === i ? "active" : ""}`}
                    style={{
                      padding: "6px 13px",
                      fontSize: 11.5,
                      fontFamily: "var(--mono)",
                      letterSpacing: 1,
                      opacity: filter === null || filter === i ? 1 : 0.42,
                    }}
                    onClick={() => setFilter((f) => (f === i ? null : i))}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: c.color,
                        display: "inline-block",
                        marginRight: 7,
                        boxShadow: `0 0 8px ${c.color}`,
                      }}
                    />
                    {c.name}
                  </button>
                ))}
                <button
                  className="chip"
                  style={{ padding: "6px 13px", fontSize: 11.5, fontFamily: "var(--mono)" }}
                  onClick={() => setLabelsOn((v) => !v)}
                >
                  {labelsOn ? "Labels: ON" : "Labels: OFF"}
                </button>
              </div>

              <p className="dim2" style={{ textAlign: "center", fontSize: 11, marginTop: 10 }}>
                Drag the brain — this is a live simulation. Tap a category to isolate it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <div className="hud-h">// the meaning map</div>
              <h3 style={{ fontSize: "clamp(1.35rem,2.6vw,1.85rem)", margin: "10px 0 13px" }}>
                The graph above is structure. This is meaning.
              </h3>
              <p className="dim" style={{ fontSize: "1.01rem" }}>
                Every memory is a point in space — similar things sit close together, and a question
                pulls in the nearest ones. Tap a question and watch what Darwin grabs.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 18 }}>
                {queryLabels.map((label, i) => (
                  <button
                    key={label}
                    className={`chip ${queryIdx === i ? "active" : ""}`}
                    style={{ fontSize: 12.5, padding: "8px 14px" }}
                    onClick={() => setQueryIdx(i)}
                  >
                    <Search size={12} style={{ display: "inline", marginRight: 6, marginTop: -2 }} />
                    {label}
                  </button>
                ))}
              </div>

              <div
                className="hud-panel"
                style={{ marginTop: 20, background: "rgba(34,211,238,0.06)" }}
              >
                <div className="hud-h">Query result</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12.5, lineHeight: 1.9, color: "#cdd7e1" }}>
                  <div>
                    <span style={{ color: "var(--cyan)" }}>&gt;</span> {queryLabels[queryIdx]}
                  </div>
                  <div className="dim2" style={{ marginTop: 6 }}>
                    vectorised in 0.42s · 9 chunks retrieved · 3 files touched · cost $0.0000
                  </div>
                  <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["notes/2026-09.md", "projects/riverview/", "inbox/supplier.eml"].map((f) => (
                      <span
                        key={f}
                        style={{
                          fontSize: 10,
                          letterSpacing: 0.8,
                          padding: "3px 9px",
                          borderRadius: 99,
                          border: "1px solid var(--border)",
                          color: "var(--dim)",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(228px, 1fr))", gap: 16, marginTop: 38 }}>
          {[
            {
              icon: <Database size={19} />,
              t: "Permanent memory",
              d: "Never wiped by a reset — your context survives every session, restart and update.",
            },
            {
              icon: <Search size={19} />,
              t: "Finds by meaning",
              d: "Not just the exact word — it understands what you meant, even months later.",
            },
            {
              icon: <Fingerprint size={19} />,
              t: "Reads documents",
              d: "Scans, photos, PDFs and spreadsheets — extracted, indexed and searchable.",
            },
            {
              icon: <FileCode2 size={19} />,
              t: "Plain markdown",
              d: "Yours, portable, human-readable. No lock-in, no proprietary database.",
            },
            {
              icon: <Sparkles size={19} />,
              t: "Per-agent expertise",
              d: "Each agent keeps its own knowledge separately — and shares only what you allow.",
            },
            {
              icon: <Network size={19} />,
              t: "Local vector search",
              d: "About a second per query, on your machine, at no cost per search.",
            },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className="card card-glow" style={{ height: "100%", padding: "21px 22px" }}>
                <span className="ico" style={{ width: 40, height: 40, marginBottom: 12 }}>
                  {f.icon}
                </span>
                <h3 style={{ fontSize: "1.02rem" }}>{f.t}</h3>
                <p style={{ fontSize: "0.915rem" }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .memory-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
