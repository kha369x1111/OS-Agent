import { useState } from "react";
import { Check, Copy, Mic, Play, SlidersHorizontal, Sparkles, Volume2 } from "lucide-react";
import Reveal from "./Reveal";

const variants = [
  {
    id: "a",
    name: "Variant A — Warm Professional",
    badge: "Recommended",
    accent: "#22d3ee",
    prompt:
      "Create a deep male voice around 35-40 years old. The voice should sound calm, intelligent and trustworthy. It should have a warm tone without sounding overly dramatic. Speak naturally with confident pacing. Avoid radio-announcer energy. Avoid exaggerated emotions. The voice should feel like an experienced engineer or AI assistant that explains complex things in a simple way. Suitable for long conversations, tutorials and daily assistance.",
  },
  {
    id: "b",
    name: "Variant B — Cinematic",
    badge: null,
    accent: "#d946ef",
    prompt:
      "Create a deep cinematic male voice. Calm and authoritative. Slightly more dramatic than everyday conversation. Suitable for introductions, presentations and storytelling. Not theatrical. Natural breathing.",
  },
  {
    id: "c",
    name: "Variant C — Jarvis Style",
    badge: null,
    accent: "#a78bfa",
    prompt:
      "Create a calm futuristic AI assistant. Intelligent. Confident. Warm. Helpful. Slightly dry humour. Never robotic. Natural pauses. Medium speaking speed.",
  },
];

const testLines = [
  "Good morning, sir.",
  "All systems are operational.",
  "Today's schedule is ready.",
  "How can I help you?",
];

function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}
function fallbackCopy(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {
    /* clipboard unavailable — nothing else to do */
  }
  document.body.removeChild(ta);
}

export default function VoiceSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  const copy = (id: string, text: string) => {
    copyText(text);
    setCopied(id);
    window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 1900);
  };

  return (
    <section id="voice">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <Volume2 size={13} /> Darwin's voice
            </span>
            <h2>
              Give Darwin <span className="accent-text">his voice.</span>
            </h2>
            <p>
              Darwin speaks through a neural voice engine — and voices can't be shared between
              accounts, so you create yours once. We generated over thirty voices; these three came
              out best. Paste a prompt into Voice Design, and Darwin sounds like Darwin.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(272px, 1fr))", gap: 18 }}>
          {variants.map((v, i) => (
            <Reveal key={v.id} delay={i * 0.08}>
              <div
                className="card"
                style={{
                  height: "100%",
                  borderColor: v.badge ? "rgba(34,211,238,0.42)" : undefined,
                  background: v.badge
                    ? "linear-gradient(180deg, rgba(34,211,238,0.08), rgba(15,22,32,0.7))"
                    : undefined,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 13 }}>
                  <span
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      background: `${v.accent}1c`,
                      border: `1px solid ${v.accent}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: v.accent,
                    }}
                  >
                    <Mic size={17} />
                  </span>
                  <h3 style={{ margin: 0, fontSize: "1.04rem" }}>{v.name}</h3>
                  {v.badge && (
                    <span
                      className="mono"
                      style={{
                        marginLeft: "auto",
                        fontSize: 8.8,
                        letterSpacing: 1.6,
                        textTransform: "uppercase",
                        padding: "4px 9px",
                        borderRadius: 99,
                        background: "var(--cyan)",
                        color: "#06121a",
                        fontWeight: 700,
                      }}
                    >
                      {v.badge}
                    </span>
                  )}
                </div>

                <div
                  className="mono"
                  style={{
                    fontSize: 11.6,
                    lineHeight: 1.82,
                    color: "var(--dim)",
                    background: "rgba(255,255,255,0.028)",
                    border: "1px solid var(--border2)",
                    borderRadius: 12,
                    padding: "13px 15px",
                    minHeight: 132,
                  }}
                >
                  {v.prompt}
                </div>

                <button
                  className="btn btn-ghost block"
                  style={{ marginTop: 14, padding: "11px 16px", fontSize: 13.5 }}
                  onClick={() => copy(v.id, v.prompt)}
                >
                  {copied === v.id ? (
                    <>
                      <Check size={15} /> Copied to clipboard
                    </>
                  ) : (
                    <>
                      <Copy size={15} /> Copy prompt
                    </>
                  )}
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* settings readout */}
        <Reveal delay={0.1}>
          <div
            className="hud-panel"
            style={{ marginTop: 26, padding: "20px 24px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <SlidersHorizontal size={17} style={{ color: "var(--cyan)" }} />
              <div className="hud-h" style={{ margin: 0 }}>
                Variant A — recommended settings
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginLeft: "auto" }}>
                {["Stability 45", "Similarity 80", "Style 10", "Speaker Boost ON"].map((s) => (
                  <span
                    key={s}
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: 1.4,
                      padding: "5px 11px",
                      borderRadius: 99,
                      border: "1px solid var(--border)",
                      color: "var(--dim)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* test lines */}
        <Reveal delay={0.14}>
          <div style={{ marginTop: 30, textAlign: "center" }}>
            <div className="hud-h">Hear it before you keep it — the standard test lines</div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 11,
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              {testLines.map((line) => (
                <button
                  key={line}
                  className="chip"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "11px 17px",
                    fontSize: 14,
                  }}
                  onClick={() => {
                    setPlaying(line);
                    window.setTimeout(() => setPlaying((p) => (p === line ? null : p)), 1400);
                  }}
                >
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: playing === line ? "var(--cyan)" : "rgba(34,211,238,0.16)",
                      color: playing === line ? "#06121a" : "var(--cyan)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all .25s",
                    }}
                  >
                    <Play size={11} fill="currentColor" />
                  </span>
                  {line}
                </button>
              ))}
            </div>
            <button
              className="btn btn-primary"
              style={{ marginTop: 20 }}
              onClick={() => copy("testline", testLines.join(" "))}
            >
              {copied === "testline" ? (
                <>
                  <Check size={16} /> Copied
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Copy test lines
                </>
              )}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
