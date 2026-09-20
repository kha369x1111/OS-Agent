import { Check, Cloud, Cpu, KeyRound, Server } from "lucide-react";
import Reveal from "./Reveal";

const brains = [
  {
    icon: <KeyRound size={22} />,
    tag: "Simplest",
    title: "Your own API key",
    text: "Pennies per conversation, billed to you by the model provider. Works the moment you paste it in — no account with us required.",
    points: ["Pay only for what you use", "Latest models, day one", "Switch providers anytime"],
    accent: "#22d3ee",
  },
  {
    icon: <Server size={22} />,
    tag: "Best value",
    title: "Flat-rate subscription",
    text: "Runs on your existing developer subscription — no per-use cost. Best value for heavy, multi-step work; the same engine professionals use.",
    points: ["Predictable monthly cost", "Ideal for long agent runs", "No usage anxiety"],
    accent: "#d946ef",
    featured: true,
  },
  {
    icon: <Cpu size={22} />,
    tag: "Free & offline",
    title: "Local brain",
    text: "Runs on your PC and nothing leaves it. Great for chat, web look-ups and simple file jobs — a smaller model, and it says so honestly.",
    points: ["Zero cloud dependency", "Works with no internet", "Total privacy"],
    accent: "#a78bfa",
  },
];

export default function Brains() {
  return (
    <section id="brains" className="band">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <Cloud size={13} /> Local brain vs cloud — honestly
            </span>
            <h2>
              Three brains. <span className="accent-text">You choose.</span>
            </h2>
            <p>
              We'd rather tell you the truth than oversell. Pick the brain per the task — and switch
              anytime, mid-conversation, without losing context.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(268px, 1fr))", gap: 18 }}>
          {brains.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div
                className="tier"
                style={{
                  height: "100%",
                  borderColor: b.featured ? "rgba(34,211,238,0.5)" : undefined,
                  background: b.featured
                    ? "linear-gradient(180deg, rgba(34,211,238,0.09), rgba(15,22,32,0.72))"
                    : undefined,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: `${b.accent}1c`,
                    border: `1px solid ${b.accent}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: b.accent,
                    marginBottom: 16,
                  }}
                >
                  {b.icon}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 9.8,
                    letterSpacing: 2.1,
                    textTransform: "uppercase",
                    color: b.accent,
                    marginBottom: 7,
                  }}
                >
                  {b.tag}
                </div>
                <h3 style={{ fontSize: "1.22rem", margin: "0 0 10px" }}>{b.title}</h3>
                <p style={{ color: "var(--dim)", fontSize: "0.95rem", margin: 0 }}>{b.text}</p>
                <ul className="tick-list" style={{ marginTop: 16 }}>
                  {b.points.map((p) => (
                    <li key={p} style={{ fontSize: "0.915rem", padding: "6px 0 6px 28px" }}>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div
            className="hud-panel"
            style={{
              marginTop: 30,
              display: "flex",
              gap: 18,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              textAlign: "center",
              padding: "22px 26px",
            }}
          >
            <Check size={20} style={{ color: "var(--cyan)" }} />
            <p style={{ margin: 0, color: "#cdd7e1", maxWidth: 720 }}>
              When you use a cloud brain, your messages go to that provider under your own account —
              exactly as if you used it directly. Want zero of that? Switch to the fully local,
              offline brain and <b style={{ color: "var(--cyan)" }}>nothing leaves your computer</b>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
