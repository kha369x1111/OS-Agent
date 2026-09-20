import { useState } from "react";
import { Check, LayoutDashboard, MonitorPlay, Palette } from "lucide-react";
import Reveal from "./Reveal";

const themes = [
  { id: "cyan", name: "Operations", color: "#22d3ee" },
  { id: "magenta", name: "Night Ops", color: "#d946ef" },
  { id: "violet", name: "Deep Space", color: "#a78bfa" },
  { id: "green", name: "Terminal", color: "#4ade80" },
];

export default function PeekInside() {
  const [theme, setTheme] = useState(0);
  const active = themes[theme];

  return (
    <section id="inside">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <MonitorPlay size={13} /> Peek inside
            </span>
            <h2>
              Your dashboard — <span className="accent-text">your way.</span>
            </h2>
            <p>
              This is Darwin's real interface, and it's yours to arrange: switch themes, add or
              remove agents, turn each capability on or off. Try the theme switcher below.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="glass-frame">
            <div className="frame-bar">
              <span className="frame-dot" style={{ background: "#ff5f57" }} />
              <span className="frame-dot" style={{ background: "#febc2e" }} />
              <span className="frame-dot" style={{ background: "#28c840" }} />
              <div
                className="mono"
                style={{
                  marginLeft: 12,
                  fontSize: 10.5,
                  letterSpacing: 1.6,
                  color: "var(--dim2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <LayoutDashboard size={12} style={{ color: active.color }} />
                DARWIN · CONTROL · THEME: {active.name.toUpperCase()}
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: 7 }}>
                {themes.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(i)}
                    aria-label={`Switch to ${t.name} theme`}
                    style={{
                      width: 17,
                      height: 17,
                      borderRadius: "50%",
                      background: t.color,
                      border: i === theme ? "2px solid #fff" : "2px solid transparent",
                      opacity: i === theme ? 1 : 0.55,
                      cursor: "pointer",
                      transition: "all .22s",
                      transform: i === theme ? "scale(1.16)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <img
                src="/images/dashboard.jpg"
                alt="Darwin's control dashboard"
                style={{ width: "100%", display: "block", aspectRatio: "16 / 8.2", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(180deg, rgba(7,11,17,0.18), rgba(7,11,17,0.86)), radial-gradient(60% 70% at 22% 32%, ${active.color}22, transparent 70%)`,
                  transition: "background .5s ease",
                }}
              />

              {/* floating HUD chips over the image */}
              <div
                style={{
                  position: "absolute",
                  left: "5%",
                  bottom: "9%",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 9,
                  maxWidth: "70%",
                }}
              >
                {["Voice control", "Agent teams", "Local memory", "File actions", "Web search"].map(
                  (c) => (
                    <span
                      key={c}
                      className="mono"
                      style={{
                        fontSize: 9.6,
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        padding: "6px 11px",
                        borderRadius: 99,
                        background: "rgba(7,11,17,0.66)",
                        border: `1px solid ${active.color}44`,
                        color: "#dff3fb",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      {c}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 16, marginTop: 22 }}>
          {[
            {
              icon: <Palette size={19} />,
              t: "Themes that fit you",
              d: "Four built-in palettes, plus custom accent colours, density and glow controls.",
            },
            {
              icon: <LayoutDashboard size={19} />,
              t: "Arrange everything",
              d: "Drag panels where you want them — hide what you don't use, pin what you do.",
            },
            {
              icon: <Check size={19} />,
              t: "Capabilities on/off",
              d: "Every skill is a switch. Turn off email access, keep the calendar — your call.",
            },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.07}>
              <div className="card card-glow" style={{ height: "100%" }}>
                <span className="ico" style={{ width: 41, height: 41 }}>
                  {f.icon}
                </span>
                <h3 style={{ fontSize: "1.04rem" }}>{f.t}</h3>
                <p style={{ fontSize: "0.925rem" }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
