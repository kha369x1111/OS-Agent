import { CloudOff, EyeOff, Fingerprint, HardDrive, KeyRound, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

export default function PrivacySection() {
  return (
    <section id="privacy" className="band">
      <div className="wrap">
        <div className="privacy-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 42, alignItems: "center" }}>
          <Reveal>
            <div>
              <span className="eyebrow">
                <ShieldCheck size={13} /> Privacy by design
              </span>
              <h2 style={{ fontSize: "clamp(1.85rem, 3.8vw, 2.65rem)", margin: "18px 0 16px" }}>
                It runs on your computer.
                <br />
                <span className="accent-text">Your data stays yours.</span>
              </h2>
              <p className="dim" style={{ fontSize: "1.075rem" }}>
                Darwin lives on your machine — your files, your keys, your conversations never come
                to us. We collect nothing and sell nothing. If it's free, you're the product. Darwin
                you buy once — so you're the customer.
              </p>

              <ul className="tick-list" style={{ marginTop: 22 }}>
                <li>
                  <b style={{ color: "var(--text)" }}>Zero telemetry.</b> No analytics on your
                  conversations, no usage tracking, no shadow profiles.
                </li>
                <li>
                  <b style={{ color: "var(--text)" }}>Your own accounts.</b> When you use a cloud
                  brain, messages go to that provider under your key — exactly as if you used it
                  directly.
                </li>
                <li>
                  <b style={{ color: "var(--text)" }}>Fully offline mode.</b> Switch to the local
                  brain and nothing leaves your computer — not a single byte.
                </li>
                <li>
                  <b style={{ color: "var(--text)" }}>Portable memory.</b> Plain markdown files you
                  can read, edit, back up or delete at any moment.
                </li>
              </ul>

              <div style={{ display: "flex", gap: 11, flexWrap: "wrap", marginTop: 24 }}>
                <a className="btn btn-primary" href="#pricing">
                  Get Darwin
                </a>
                <a className="btn btn-ghost" href="#memory">
                  How memory works
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div style={{ position: "relative" }}>
              <div className="glass-frame">
                <img
                  src="/images/privacy.jpg"
                  alt="Encrypted local data"
                  style={{ width: "100%", display: "block", aspectRatio: "16 / 11", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(7,11,17,0.1), rgba(7,11,17,0.72))",
                  }}
                />
              </div>

              {/* floating stat cards */}
              <div
                className="hud-panel"
                style={{
                  position: "absolute",
                  left: -18,
                  bottom: -22,
                  width: "min(230px, 62%)",
                  padding: "15px 17px",
                }}
              >
                <div className="hud-h" style={{ marginBottom: 6 }}>
                  Data to our servers
                </div>
                <div className="stat-big" style={{ fontSize: "1.95rem", color: "var(--cyan)" }}>
                  0 B
                </div>
                <div className="dim2" style={{ fontSize: 10.5, marginTop: 3 }}>
                  verified · no endpoints configured
                </div>
              </div>

              <div
                className="hud-panel"
                style={{
                  position: "absolute",
                  right: -14,
                  top: -18,
                  width: "min(212px, 58%)",
                  padding: "14px 16px",
                }}
              >
                <div className="hud-h" style={{ marginBottom: 6 }}>
                  Encryption
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <KeyRound size={17} style={{ color: "#4ade80" }} />
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11.5, color: "#cdd7e1" }}>
                    AES-256 · local keychain
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(212px, 1fr))", gap: 15, marginTop: 52 }}>
          {[
            {
              icon: <HardDrive size={19} />,
              t: "Local-first",
              d: "Installed on your machine, running under your user account.",
            },
            {
              icon: <EyeOff size={19} />,
              t: "No tracking",
              d: "No cookies for ads, no third-party trackers, no data brokers.",
            },
            {
              icon: <Fingerprint size={19} />,
              t: "Your identity",
              d: "No account required to run it. Your keys, your identity.",
            },
            {
              icon: <CloudOff size={19} />,
              t: "Offline capable",
              d: "Pull the network cable and Darwin keeps working.",
            },
          ].map((f, i) => (
            <Reveal key={f.t} delay={i * 0.06}>
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
        @media (max-width: 900px) {
          .privacy-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
