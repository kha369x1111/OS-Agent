import { useEffect, useRef, useState } from "react";
import { Cpu, Mic, Radio, Square, Volume2, Zap } from "lucide-react";
import OrbCanvas from "./OrbCanvas";
import Reveal from "./Reveal";

/* ------------------------------------------------------------------ */
/* small animated waveform used by the signal panel + agent cards      */
/* ------------------------------------------------------------------ */
function Waveform({
  color = "#22d3ee",
  active = true,
  height = 46,
  bars = 44,
}: {
  color?: string;
  active?: boolean;
  height?: number;
  bars?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let t = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, rect.width * dpr);
      canvas.height = Math.max(1, height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width / dpr;
      const h = height;
      ctx.clearRect(0, 0, w, h);
      t += activeRef.current ? 0.055 : 0.012;

      const gap = w / bars;
      for (let i = 0; i < bars; i++) {
        const n = Math.sin(i * 0.42 + t) * Math.cos(i * 0.17 - t * 0.7);
        const amp = activeRef.current ? 0.24 + Math.abs(n) * 0.72 : 0.1 + Math.abs(n) * 0.12;
        const bh = Math.max(2, amp * h);
        const x = i * gap + gap * 0.22;
        const y = (h - bh) / 2;
        const grad = ctx.createLinearGradient(0, y, 0, y + bh);
        grad.addColorStop(0, color);
        grad.addColorStop(1, color + "22");
        ctx.fillStyle = grad;
        ctx.globalAlpha = activeRef.current ? 0.92 : 0.42;
        ctx.beginPath();
        ctx.roundRect(x, y, Math.max(1.6, gap * 0.5), bh, 3);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [color, height, bars]);

  return <canvas ref={ref} style={{ width: "100%", height, display: "block" }} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* question / answer data                                              */
/* ------------------------------------------------------------------ */
const questions = [
  {
    q: "What's on my plate today?",
    a: "Good morning. You have three commitments: the structural review at 09:30, a client call with Novak at 11:00, and the site visit at 14:15 — I've moved the design sync to Thursday since it clashed with the review. Weather on site: 12 C, light rain after 15:00, so I'd take the measurements indoors. Two invoices are still unpaid past 14 days; shall I draft the reminders?",
  },
  {
    q: "Draft the reply to the supplier.",
    a: "Done — I've read the thread and drafted a reply in your usual tone: confirming the revised delivery window, asking for the updated datasheet, and holding the payment until the discrepancy on line 4 is resolved. It's sitting in your outbox waiting for one nod from you. I also filed the attachments into the Riverview project folder and tagged the warranty date.",
  },
  {
    q: "Turn this spreadsheet into an app.",
    a: "I've rebuilt it. The old macro sheet is now a clean browser tool: the four input columns became a form, the lookup logic runs behind it, and the results export straight back to Excel. It runs locally, needs no server, and I added the validation rules you had buried in the VBA. Want me to theme it in your company colours?",
  },
  {
    q: "What did the standard say about railings?",
    a: "From your loaded documents: the standard requires a minimum clear height of 1100 mm for residential barriers, 1200 mm where the fall exceeds 12 m, and a maximum opening of 100 mm for the sphere test. Your Riverview detail at gridline C-4 uses 1050 mm — that's below the requirement. I've flagged it in the review notes.",
  },
  {
    q: "How is my training going?",
    a: "Steady progress. Your 5 km time has dropped by 41 seconds over six weeks, resting heart rate is down 4 bpm, and you've hit three sessions a week for a month straight. The weak spot is Thursday sessions — you skip them 40% of the time. I'd move the interval day to Friday morning, where your consistency is 92%.",
  },
];

const agents = [
  {
    name: "Support",
    role: "Product help & how-tos",
    color: "#22d3ee",
    line: "I know the product inside out — setup, settings, workflows. Ask me anything and I'll walk you through it step by step.",
  },
  {
    name: "Developer",
    role: "Code, apps & automations",
    color: "#d946ef",
    line: "Scripts, apps, integrations, data pipelines. Describe the outcome you want and I'll build it, test it, and explain what I did.",
  },
  {
    name: "Sales",
    role: "Offers & client care",
    color: "#a78bfa",
    line: "I handle proposals, follow-ups and client summaries — in your voice, with your numbers, ready for you to approve.",
  },
];

const worldClocks = [
  { city: "BRATISLAVA", tz: "Europe/Bratislava" },
  { city: "LONDON", tz: "Europe/London" },
  { city: "NEW YORK", tz: "America/New_York" },
  { city: "TOKYO", tz: "Asia/Tokyo" },
];

export default function Dashboard() {
  const [now, setNow] = useState(() => new Date());
  const [uptime, setUptime] = useState(0);
  const [activeQ, setActiveQ] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [typing, setTyping] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [turns, setTurns] = useState(1284);
  const [tokensUp, setTokensUp] = useState(4821934);
  const [tokensDown, setTokensDown] = useState(9182734);
  const [cost, setCost] = useState(128.44);
  const [speakingAgent, setSpeakingAgent] = useState<number | null>(null);
  const [introducing, setIntroducing] = useState(false);
  const typeTimer = useRef<number | null>(null);
  const introTimer = useRef<number | null>(null);

  /* clocks + uptime */
  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date());
      setUptime((u) => u + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  /* fake telemetry drift */
  useEffect(() => {
    const id = window.setInterval(() => {
      setTokensUp((v) => v + Math.floor(Math.random() * 420) + 60);
      setTokensDown((v) => v + Math.floor(Math.random() * 900) + 120);
      setCost((v) => +(v + Math.random() * 0.02).toFixed(2));
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(
    () => () => {
      if (typeTimer.current) window.clearInterval(typeTimer.current);
      if (introTimer.current) window.clearInterval(introTimer.current);
    },
    [],
  );

  const ask = (index: number) => {
    if (typeTimer.current) window.clearInterval(typeTimer.current);
    setActiveQ(index);
    setExpanded(false);
    setTyping(true);
    setTyped("");
    const text = questions[index].a;
    let i = 0;
    typeTimer.current = window.setInterval(() => {
      i += 2;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        if (typeTimer.current) window.clearInterval(typeTimer.current);
        setTyping(false);
      }
    }, 16);
    setTurns((t) => t + 1);
    setTokensUp((v) => v + 380 + index * 20);
    setTokensDown((v) => v + text.length * 9);
    setCost((v) => +(v + 0.01 + index * 0.004).toFixed(3));
  };

  const stop = () => {
    if (typeTimer.current) window.clearInterval(typeTimer.current);
    setTyping(false);
  };

  const introduceTeam = () => {
    if (introducing) return;
    setIntroducing(true);
    let step = 0;
    setSpeakingAgent(0);
    introTimer.current = window.setInterval(() => {
      step += 1;
      if (step >= agents.length) {
        if (introTimer.current) window.clearInterval(introTimer.current);
        setSpeakingAgent(null);
        setIntroducing(false);
      } else {
        setSpeakingAgent(step);
      }
    }, 2600);
    setTurns((t) => t + 1);
    setTokensDown((v) => v + 1240);
  };

  const fmtUptime = () => {
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = uptime % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <section id="dash" className="band" style={{ overflow: "hidden" }}>
      {/* soft glow behind the orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: 760,
          height: 760,
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(34,211,238,0.12), transparent 62%)",
          pointerEvents: "none",
        }}
      />

      <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <span className="pulse-dot" /> Live demo — this IS the product
            </span>
            <h2>
              Ask Darwin. <span className="accent-text">Meet the team.</span>
            </h2>
            <p>
              This section works like Darwin's own dashboard. Tap a question — he answers in his real
              voice. Then let the agents introduce themselves.
            </p>
          </div>
        </Reveal>

        <div className="dash-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,232px) minmax(0,1fr) minmax(0,248px)",
            gap: 20,
            alignItems: "start",
          }}
        >
          {/* ---------------- left column ---------------- */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Reveal>
              <div className="hud-panel">
                <div className="hud-h">Mission clock</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 27, fontWeight: 600, letterSpacing: 1 }}>
                  {now.toLocaleTimeString("en-GB")}
                </div>
                <div className="dim2 mono" style={{ fontSize: 10.5, marginTop: 3, letterSpacing: 1.4 }}>
                  {now
                    .toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short" })
                    .toUpperCase()}
                </div>
                <div style={{ marginTop: 12 }}>
                  <Waveform color="#22d3ee" height={38} bars={30} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="hud-panel">
                <div className="hud-h">Telemetry</div>
                <div className="hud-row">
                  <span>TURNS</span>
                  <b>{turns.toLocaleString("en-US")}</b>
                </div>
                <div className="hud-row">
                  <span>TOKENS up</span>
                  <b>{tokensUp.toLocaleString("en-US")}</b>
                </div>
                <div className="hud-row">
                  <span>TOKENS down</span>
                  <b>{tokensDown.toLocaleString("en-US")}</b>
                </div>
                <div className="hud-row">
                  <span>COST</span>
                  <b style={{ color: "var(--cyan)" }}>${cost.toFixed(2)}</b>
                </div>
                <div className="hud-row">
                  <span>BRAIN</span>
                  <b>claude-opus</b>
                </div>
                <div className="hud-row">
                  <span>VOICE</span>
                  <b>EL · Darwin</b>
                </div>
                <div className="hud-row">
                  <span>UPTIME</span>
                  <b>{fmtUptime()}</b>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="hud-panel">
                <div className="hud-h">// signal</div>
                <Waveform color="#d946ef" height={52} bars={38} active={typing || introducing} />
                <button
                  onClick={stop}
                  className="mono"
                  style={{
                    marginTop: 12,
                    width: "100%",
                    background: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.45)",
                    color: "#fca5a5",
                    borderRadius: 9,
                    padding: "8px 12px",
                    fontSize: 11,
                    letterSpacing: 2.2,
                    cursor: "pointer",
                  }}
                >
                  <Square size={10} style={{ display: "inline", marginRight: 7 }} />
                  STOP
                </button>
              </div>
            </Reveal>
          </div>

          {/* ---------------- center column ---------------- */}
          <div style={{ textAlign: "center" }}>
            <Reveal>
              <div style={{ position: "relative", width: "min(390px, 82%)", margin: "0 auto" }}>
                <div className="orb-stage" style={{ width: "100%" }}>
                  <OrbCanvas speaking={typing || introducing} />
                  <svg className="reticle" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                    <g className="spin-slow" stroke="rgba(34,211,238,0.3)">
                      <circle cx="200" cy="200" r="184" strokeDasharray="6 14" />
                    </g>
                    <g className="spin-rev" stroke="rgba(217,70,239,0.28)">
                      <circle cx="200" cy="200" r="150" strokeDasharray="26 18" />
                    </g>
                  </svg>
                </div>
              </div>
            </Reveal>

            {/* answer area */}
            <Reveal delay={0.1}>
              <div
                onClick={() => setExpanded((v) => !v)}
                style={{
                  margin: "26px auto 0",
                  maxWidth: 640,
                  fontFamily: "var(--mono)",
                  fontSize: "0.925rem",
                  lineHeight: 1.85,
                  color: expanded ? "#dce6ef" : "var(--dim)",
                  minHeight: "4.6em",
                  cursor: "pointer",
                  WebkitMaskImage: expanded
                    ? "none"
                    : "linear-gradient(180deg, #000 38%, transparent 96%)",
                  maskImage: expanded ? "none" : "linear-gradient(180deg, #000 38%, transparent 96%)",
                  transition: "color .3s ease",
                  padding: "0 8px",
                }}
              >
                {activeQ === null ? (
                  <span className="dim2">
                    // awaiting input — pick a question below and Darwin answers in his own voice.
                    <br />
                    // the full build also listens hands-free, works your files and runs the agents.
                  </span>
                ) : (
                  <>
                    <span style={{ color: "var(--cyan)" }}>&gt; {questions[activeQ].q}</span>
                    <br />
                    {typed}
                    {typing && <span className="caret">|</span>}
                  </>
                )}
              </div>
            </Reveal>

            {/* question chips */}
            <Reveal delay={0.14}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 26,
                }}
              >
                {questions.map((item, i) => (
                  <button
                    key={item.q}
                    className={`chip ${activeQ === i ? "active" : ""}`}
                    onClick={() => ask(i)}
                  >
                    {item.q}
                  </button>
                ))}
              </div>
              <p className="dim2" style={{ fontSize: 12, marginTop: 16 }}>
                Tap a question — Darwin answers in his own voice. Another question, or a technical
                issue? Ask Darwin directly.
              </p>
            </Reveal>

            {/* world clocks */}
            <Reveal delay={0.18}>
              <div
                style={{
                  display: "flex",
                  gap: 13,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  marginTop: 38,
                }}
              >
                {worldClocks.map((c) => (
                  <div
                    key={c.city}
                    className="hud-panel"
                    style={{ padding: "11px 17px", minWidth: 128, textAlign: "center" }}
                  >
                    <div className="mono" style={{ fontSize: 9.5, letterSpacing: 2, color: "var(--cyan)" }}>
                      {c.city}
                    </div>
                    <div className="mono" style={{ fontSize: 20, fontWeight: 600, margin: "3px 0" }}>
                      {now.toLocaleTimeString("en-GB", {
                        timeZone: c.tz,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="dim2 mono" style={{ fontSize: 9.5, letterSpacing: 1.2 }}>
                      {now.toLocaleDateString("en-GB", {
                        timeZone: c.tz,
                        day: "2-digit",
                        month: "short",
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---------------- right column ---------------- */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Reveal delay={0.06}>
              <div className="hud-h" style={{ marginBottom: 10 }}>
                // team
              </div>
            </Reveal>

            {agents.map((agent, i) => (
              <Reveal key={agent.name} delay={0.1 + i * 0.07}>
                <div
                  className="agent-card"
                  style={{
                    borderColor: speakingAgent === i ? agent.color : "var(--border)",
                    boxShadow:
                      speakingAgent === i
                        ? `0 0 26px ${agent.color}33, 0 0 0 1px ${agent.color}55`
                        : "none",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "0.85rem",
                      right: "0.85rem",
                      top: 0,
                      height: 2,
                      background: `linear-gradient(90deg, transparent, ${agent.color}, transparent)`,
                      opacity: 0.55,
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9,
                        background: `${agent.color}1f`,
                        border: `1px solid ${agent.color}44`,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: agent.color,
                      }}
                    >
                      {i === 0 ? <Radio size={15} /> : i === 1 ? <Cpu size={15} /> : <Zap size={15} />}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 0.3 }}>
                        {agent.name}
                      </div>
                    </div>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: speakingAgent === i ? agent.color : "rgba(232,240,247,0.32)",
                        boxShadow: speakingAgent === i ? `0 0 11px ${agent.color}` : "none",
                        transition: "all .25s",
                      }}
                    />
                  </div>

                  <div style={{ margin: "7px 0 3px" }}>
                    <Waveform color={agent.color} height={27} bars={26} active={speakingAgent === i} />
                  </div>

                  <div style={{ fontSize: 11.5, color: "var(--dim)" }}>{agent.role}</div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 9.5,
                      letterSpacing: 1.9,
                      textTransform: "uppercase",
                      marginTop: 5,
                      color: speakingAgent === i ? agent.color : "rgba(232,240,247,0.4)",
                      transition: "color .25s",
                    }}
                  >
                    {speakingAgent === i ? "speaking..." : "standby"}
                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      lineHeight: 1.62,
                      color: "var(--dim2)",
                      marginTop: 8,
                      maxHeight: speakingAgent === i ? 96 : 0,
                      opacity: speakingAgent === i ? 1 : 0,
                      overflow: "hidden",
                      transition: "all .45s ease",
                    }}
                  >
                    "{agent.line}"
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <button className="btn btn-magenta block intro-btn" onClick={introduceTeam}>
                <Volume2 size={16} /> {introducing ? "Introducing..." : "Introduce the team"}
              </button>
              <p className="dim2" style={{ fontSize: 10.5, textAlign: "center", marginTop: 8 }}>
                Three built in — the Pro plan grows the team without limits.
              </p>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="hud-panel" style={{ marginTop: 6 }}>
                <div className="hud-h">Session</div>
                <div className="hud-row">
                  <span>LISTENING</span>
                  <b style={{ color: typing ? "#4ade80" : "var(--dim)" }}>{typing ? "ACTIVE" : "IDLE"}</b>
                </div>
                <div className="hud-row">
                  <span>WAKE WORD</span>
                  <b>"Hey Darwin"</b>
                </div>
                <div className="hud-row">
                  <span>LATENCY</span>
                  <b>142 ms</b>
                </div>
                <div style={{ marginTop: 11, display: "flex", alignItems: "center", gap: 8 }}>
                  <Mic size={14} style={{ color: "var(--cyan)" }} />
                  <div
                    style={{
                      flex: 1,
                      height: 5,
                      borderRadius: 99,
                      background: "rgba(255,255,255,0.07)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: typing ? "78%" : "22%",
                        height: "100%",
                        borderRadius: 99,
                        background: "linear-gradient(90deg, var(--cyan), var(--magenta))",
                        transition: "width .6s ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .agent-card {
          position: relative;
          background: linear-gradient(180deg, rgba(10,18,28,0.62), rgba(6,10,16,0.5));
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0.85rem 0.95rem 0.9rem;
          transition: border-color .3s, box-shadow .3s, transform .25s;
        }
        .agent-card:hover { transform: translateY(-3px); }
        .caret { color: var(--cyan); animation: caretBlink 1s steps(2) infinite; }
        @keyframes caretBlink { 50% { opacity: 0; } }
        @media (max-width: 1024px) {
          .dash-grid { grid-template-columns: 1fr !important; }
          .dash-grid > div:first-child { flex-direction: row !important; flex-wrap: wrap; }
          .dash-grid > div:first-child > * { flex: 1 1 210px; }
          .dash-grid > div:last-child { flex-direction: row !important; flex-wrap: wrap; }
          .dash-grid > div:last-child > * { flex: 1 1 220px; }
        }
      `}</style>
    </section>
  );
}
