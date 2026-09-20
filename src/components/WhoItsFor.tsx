import {
  Activity,
  BookOpen,
  Briefcase,
  Code2,
  FileText,
  GraduationCap,
  HeartPulse,
  Home,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import Reveal from "./Reveal";

const groups = [
  {
    icon: <Briefcase size={22} />,
    title: "Founders & freelancers",
    text: "You live on a screen. Darwin runs the inbox, the calendar and the busywork so your hours go to the work that actually matters.",
  },
  {
    icon: <Code2 size={22} />,
    title: "Makers & developers",
    text: "Describe the tool you need — a script, a small app, an automation — and it's built, tested and explained back to you.",
  },
  {
    icon: <Home size={22} />,
    title: "At home, too",
    text: "Warranties, manuals, household documents, family schedules — it files all of it and answers when you ask.",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Students & learners",
    text: "It builds the exact tool you're studying with — progress charts, quizzes, coaching — and sees where to push you next.",
  },
];

const scenarios = [
  {
    icon: <Code2 size={19} />,
    title: "Need a tool? Darwin codes it — from a sentence.",
    text: "Describe what you want and Darwin builds it: a small app, a script, that clunky macro-Excel turned into a clean browser tool. No developer, no waiting — and when it's missing a capability, it writes that too.",
  },
  {
    icon: <ShoppingBag size={19} />,
    title: "Bought something? It keeps the manual — and the warranty date.",
    text: "Tell Darwin what you bought and to remember the manual. Later you just ask “how do I reset this?” or “how long is the warranty?” and it answers on the spot — it files and organises all of it for you.",
  },
  {
    icon: <HeartPulse size={19} />,
    title: "Your health history — and you can actually find it.",
    text: "Load your own records and Darwin keeps the thread, private, on your machine. When a doctor asks what you were treated for and when, you ask Darwin and read it straight back.",
  },
  {
    icon: <GraduationCap size={19} />,
    title: "Learning or training? It builds the app — and coaches you.",
    text: "Tell Darwin what you're studying or training for and it builds you the exact tool — draws your progress charts, quizzes you to check it really stuck, and advises you on the next step.",
  },
];

export default function WhoItsFor() {
  return (
    <section id="who" className="band">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <UserRound size={13} /> Who it's for
            </span>
            <h2>
              For your work — <span className="accent-text">and the rest of your life.</span>
            </h2>
            <p>
              Darwin fits people who live on a PC — founders, freelancers, anyone who runs their day
              on a screen — and it's just as much your assistant at home. You buy it once; it shapes
              itself to whatever you throw at it.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
          {groups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.07}>
              <div className="card card-glow" style={{ height: "100%" }}>
                <span className="ico">{g.icon}</span>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ display: "grid", gap: 18, marginTop: 22 }}>
          {scenarios.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div
                className="card card-glow"
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  padding: "24px 26px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  className="ico"
                  style={{ margin: 0, flexShrink: 0, width: 52, height: 52, borderRadius: 15 }}
                >
                  {s.icon}
                </span>
                <div style={{ flex: "1 1 320px" }}>
                  <h3 style={{ fontSize: "1.14rem", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: "0.97rem" }}>{s.text}</p>
                </div>
                <div
                  className="mono"
                  style={{
                    alignSelf: "center",
                    color: "var(--dim2)",
                    fontSize: 11,
                    letterSpacing: 2,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
            <span className="badge">
              <FileText size={14} /> Reads your documents
            </span>
            <span className="badge">
              <Activity size={14} /> Tracks what matters
            </span>
            <span className="badge">
              <BookOpen size={14} /> Learns your standards
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
