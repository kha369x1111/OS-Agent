import { Quote } from "lucide-react";
import Reveal from "./Reveal";

export default function Founder() {
  return (
    <section id="founder">
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.15fr) minmax(0,0.85fr)",
            gap: 40,
            alignItems: "center",
          }}
          className="founder-grid"
        >
          <Reveal>
            <div className="hud-panel" style={{ padding: "34px 36px" }}>
              <div className="hud-h">From the founder</div>
              <h2 style={{ fontSize: "clamp(1.55rem, 3vw, 2.15rem)", margin: "10px 0 18px" }}>
                I built this for myself first.
              </h2>

              <div style={{ position: "relative", color: "#cdd7e1", fontSize: "1.015rem" }}>
                <Quote
                  size={38}
                  style={{
                    position: "absolute",
                    left: -12,
                    top: -18,
                    color: "rgba(34,211,238,0.16)",
                  }}
                />
                <p style={{ margin: "0 0 15px" }}>
                  I've wanted a JARVIS ever since I first saw Iron Man — the technology just wasn't
                  there yet. When AI finally arrived I was thrilled, and like many I started on
                  ChatGPT, trying to make it real. It wasn't quite the thing.
                </p>
                <p style={{ margin: "0 0 15px" }}>
                  A couple of years later I tried again — this time with an agent CLI. I built a
                  prototype, saw what it could really do, and honestly it overwhelmed me; I shelved
                  it. A few weeks later I came back and went all in.
                </p>
                <p style={{ margin: 0 }}>
                  I'm a bridge engineer — for 15 years I've built 3D design software that engineers
                  rely on for real work. So I know what trustworthy, everyday software has to feel
                  like. What Darwin and I have done in the last months I can barely believe. That
                  leap people talk about — a ten-year plan done in half a year — stopped sounding
                  like a slogan.
                </p>
              </div>

              <div
                style={{
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: "1px solid var(--border2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--cyan), var(--magenta))",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    color: "#06121a",
                  }}
                >
                  G
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14.5 }}>Gabriel — founder</div>
                  <div className="dim2" style={{ fontSize: 12 }}>
                    bridge engineer &amp; maker of professional design software
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="card" style={{ padding: "22px 24px" }}>
                <div className="stat-label">Years building tools</div>
                <div className="stat-big">15+</div>
                <p style={{ marginTop: 8 }}>
                  Professional 3D design software used by engineering offices across the region.
                </p>
              </div>
              <div className="card" style={{ padding: "22px 24px" }}>
                <div className="stat-label">Time to first real result</div>
                <div className="stat-big">1 day</div>
                <p style={{ marginTop: 8 }}>
                  From install to Darwin running your inbox, calendar and files — on your own
                  machine, with your own keys.
                </p>
              </div>
              <div className="card" style={{ padding: "22px 24px" }}>
                <div className="stat-label">Data leaving your PC</div>
                <div className="stat-big" style={{ color: "var(--cyan)" }}>
                  0 bytes
                </div>
                <p style={{ marginTop: 8 }}>
                  No telemetry, no analytics on your conversations, nothing sold. Ever.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .founder-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
