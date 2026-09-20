import {
  ArrowRight,
  Bot,
  Clock,
  FileStack,
  Globe,
  Image as ImageIcon,
  MailCheck,
  MessageSquare,
  Puzzle,
  ShieldQuestion,
  Users,
} from "lucide-react";
import Reveal from "./Reveal";

const pillars = [
  {
    tag: "Calm",
    icon: <MailCheck size={22} />,
    title: "Your day, handled.",
    text: "Wake up to a sorted inbox and a planned day. Darwin reads your mail, drafts replies in your tone for a quick nod, triages what matters, and briefs you on the day ahead — before the coffee cools. You just approve.",
    points: [
      "Email & calendar, on autopilot",
      "Smart inbox triage & morning briefing",
      "Talk to it, hands-free",
    ],
    accent: "#22d3ee",
  },
  {
    tag: "Time",
    icon: <Clock size={22} />,
    title: "The busywork, gone.",
    text: "Stop retyping and digging. Hand Darwin your files and it reads, converts and rebuilds them — even an old macro sheet into a clean browser app. It searches the web, pulls what you need, and turns it into a document or an image, on demand.",
    points: ["Works your files & builds apps", "Searches & reads the whole web", "Generates images & media"],
    accent: "#d946ef",
  },
  {
    tag: "Team",
    icon: <Users size={22} />,
    title: "Real teammates — not costumes.",
    text: "Spin up specialist agents and hand them the work. Each is more than a name and a voice: its own lasting memory, its own project folders, its own tools — and when one is missing, Darwin writes it. You delegate; they work in parallel and report back.",
    points: [
      "Its own memory, folders & tools",
      "Remembers your projects across sessions",
      "Works in parallel, on your machine",
    ],
    accent: "#a78bfa",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="band">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <Bot size={13} /> What Darwin does for you
            </span>
            <h2>
              Less a chatbot. <span className="accent-text">More a member of staff.</span>
            </h2>
            <p>
              It doesn't just answer — it acts, on your computer, with real tools. Here's what that
              looks like in practice.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
          {pillars.map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.08}>
              <div className="card card-glow" style={{ height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 15 }}>
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 13,
                      background: `${p.accent}1c`,
                      border: `1px solid ${p.accent}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: p.accent,
                    }}
                  >
                    {p.icon}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: 2.3,
                      textTransform: "uppercase",
                      color: p.accent,
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.22rem" }}>{p.title}</h3>
                <p>{p.text}</p>
                <ul className="tick-list">
                  {p.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* why it isn't just a prompt */}
        <Reveal delay={0.1}>
          <div
            className="hud-panel"
            style={{ marginTop: 34, padding: "32px 34px" }}
          >
            <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 32 }}>
              <div>
                <div className="hud-h">Why it isn't just a prompt</div>
                <h3 style={{ fontSize: "clamp(1.45rem,2.8vw,2rem)", margin: "10px 0 14px" }}>
                  A demo is easy.
                  <br />
                  Making it truly work — <span className="accent-text">and keeping it from falling apart</span> — isn't.
                </h3>
                <p className="dim" style={{ fontSize: "1.01rem" }}>
                  Tutorials get you a talking orb in an evening. A tool you rely on every day — one
                  that actually works, and keeps working — is a different thing, and that's exactly
                  the part those tutorials quietly skip.
                </p>
                <div
                  style={{
                    marginTop: 18,
                    padding: "15px 17px",
                    borderRadius: 13,
                    background: "rgba(217,70,239,0.08)",
                    border: "1px solid rgba(217,70,239,0.22)",
                  }}
                >
                  <div className="mono" style={{ fontSize: 10.5, letterSpacing: 1.8, color: "#f0abfc" }}>
                    THE COST TRAP
                  </div>
                  <p style={{ margin: "7px 0 0", color: "#cdd7e1", fontSize: "0.955rem" }}>
                    Pour everything into text files and feed the whole pile to the model on every
                    question — and the more your assistant knows, the slower and pricier every single
                    reply gets.
                  </p>
                </div>
              </div>

              <div>
                <div
                  style={{
                    padding: "18px 20px",
                    borderRadius: 14,
                    background: "rgba(34,211,238,0.07)",
                    border: "1px solid rgba(34,211,238,0.22)",
                  }}
                >
                  <div className="mono" style={{ fontSize: 10.5, letterSpacing: 1.8, color: "var(--cyan)" }}>
                    THE DARWIN WAY
                  </div>
                  <h4 style={{ margin: "9px 0 10px", fontSize: "1.12rem" }}>
                    Darwin doesn't remember more. It remembers well.
                  </h4>
                  <ul className="tick-list" style={{ marginTop: 4 }}>
                    <li>Pulls only the notes that fit the question</li>
                    <li>Decides what's worth keeping — and what to let go</li>
                    <li>Keeps your critical rules always at hand</li>
                    <li>Search runs locally, in about a second, at no cost</li>
                    <li>The price of an answer never grows with what it knows</li>
                  </ul>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
                  <div className="card" style={{ padding: "17px 18px" }}>
                    <Globe size={19} style={{ color: "var(--cyan)" }} />
                    <div className="stat-label" style={{ marginTop: 9 }}>
                      Searches the web
                    </div>
                    <p style={{ fontSize: "0.885rem" }}>
                      Reads pages, follows links, cites what it found — then turns it into a document.
                    </p>
                  </div>
                  <div className="card" style={{ padding: "17px 18px" }}>
                    <ImageIcon size={19} style={{ color: "#d946ef" }} />
                    <div className="stat-label" style={{ marginTop: 9, color: "#f0abfc" }}>
                      Generates media
                    </div>
                    <p style={{ fontSize: "0.885rem" }}>
                      Images, diagrams, charts and assets — produced on demand, in your style.
                    </p>
                  </div>
                  <div className="card" style={{ padding: "17px 18px" }}>
                    <Puzzle size={19} style={{ color: "#a78bfa" }} />
                    <div className="stat-label" style={{ marginTop: 9, color: "#c4b5fd" }}>
                      Writes its own tools
                    </div>
                    <p style={{ fontSize: "0.885rem" }}>
                      Missing a capability? It builds the plugin, tests it, and puts it to work.
                    </p>
                  </div>
                  <div className="card" style={{ padding: "17px 18px" }}>
                    <ShieldQuestion size={19} style={{ color: "#4ade80" }} />
                    <div className="stat-label" style={{ marginTop: 9, color: "#86efac" }}>
                      Is its own helpdesk
                    </div>
                    <p style={{ fontSize: "0.885rem" }}>
                      Not sure how to set something up? Just ask — it explains itself and walks you
                      through.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 26, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="#pricing">
                Get Darwin <ArrowRight size={16} />
              </a>
              <a className="btn btn-ghost" href="#dash">
                <MessageSquare size={16} /> Try the live demo
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 26 }}>
            <span className="badge">
              <FileStack size={14} /> Attach files — don't retype
            </span>
            <span className="badge">
              <Bot size={14} /> Iterate like with a colleague
            </span>
            <span className="badge">
              <Clock size={14} /> Real tasks take real minutes
            </span>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
