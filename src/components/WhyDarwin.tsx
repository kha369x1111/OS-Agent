import { Bot, CalendarCheck, Mail, Wrench } from "lucide-react";
import Reveal from "./Reveal";

const mini = [
  {
    icon: <CalendarCheck size={21} />,
    title: "Runs your day",
    text: "Morning briefing, meetings moved, weather, what's still open — before your coffee cools.",
  },
  {
    icon: <Mail size={21} />,
    title: "Handles your mail",
    text: "Reads what arrived, drafts the reply in your tone, files the invoices — you just approve.",
  },
  {
    icon: <Wrench size={21} />,
    title: "Builds things for you",
    text: "That old Excel full of macros becomes a clean app in your browser. You describe — it codes.",
  },
  {
    icon: <Bot size={21} />,
    title: "Evolves with you",
    text: "It learns you, writes itself new tools when one is missing, and every update makes it more capable.",
  },
];

export default function WhyDarwin() {
  return (
    <section id="why">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <span className="pulse-dot" /> Why Darwin
            </span>
            <h2>
              You remember JARVIS — the assistant from Iron Man?
              <br />
              <span className="accent-text">This one is real, and it's yours.</span>
            </h2>
            <p>
              Wake up to a day that's already organised — and take your best hours back. One day
              you're digging through files by hand, copying something into your calendar, retyping an
              e-mail — and it clicks: Darwin could just do this.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(232px, 1fr))", gap: 18 }}>
          {mini.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div className="card card-glow" style={{ height: "100%" }}>
                <span className="ico">{m.icon}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div
            className="hud-panel"
            style={{
              marginTop: 34,
              padding: "26px 28px",
              display: "flex",
              gap: 22,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: "1 1 340px" }}>
              <div className="hud-h">Our promise</div>
              <p style={{ margin: 0, color: "#cdd7e1", fontSize: "1.02rem" }}>
                Buy once and every future update is free. The price grows as features grow — so the
                earlier you join, the lower your price stays, <b style={{ color: "var(--cyan)" }}>for good</b>.
              </p>
            </div>
            <a className="btn btn-primary" href="#pricing">
              See the price
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
