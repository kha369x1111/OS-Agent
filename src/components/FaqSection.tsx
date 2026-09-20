import { useState } from "react";
import { HelpCircle } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Is Darwin a subscription?",
    a: "No. You buy it once and it's yours. There is no recurring fee to use the app itself — the only ongoing cost is whatever the AI provider charges for the model usage you choose (and the fully local brain is free).",
  },
  {
    q: "Does my data leave my computer?",
    a: "Darwin itself collects nothing. When you use a cloud brain, your messages go to that provider under your own account — exactly as if you used it directly. If you switch to the local, offline brain, nothing leaves your machine at all.",
  },
  {
    q: "Do I need technical skills to set it up?",
    a: "No. The installer walks you through everything, and Darwin itself is your first line of support — ask it how to configure anything and it explains, step by step, in your language.",
  },
  {
    q: "Which AI models does it work with?",
    a: "You can bring your own API key for the major cloud models, connect a flat-rate developer subscription, or run a local model completely offline. Pick per task and switch anytime — context follows you.",
  },
  {
    q: "What happens if I get a new computer?",
    a: "Your license follows you, and your memory is plain files — copy the folder to the new machine, install Darwin, and everything is exactly where you left it.",
  },
  {
    q: "Are future updates really free?",
    a: "Yes — that's the early-launch guarantee. Once you've bought, nothing ever changes for you. The price may rise for future buyers as features grow, but your price stays locked for good.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="band">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <HelpCircle size={13} /> Questions, answered
            </span>
            <h2>
              Everything you're <span className="accent-text">wondering about.</span>
            </h2>
            <p>Short, honest answers. If yours isn't here — ask Darwin directly.</p>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className={`faq-item ${open === i ? "open" : ""}`}>
                <button
                  className="faq-q"
                  aria-expanded={open === i}
                  onClick={() => setOpen((v) => (v === i ? null : i))}
                >
                  <span>{f.q}</span>
                  <span className="plus">+</span>
                </button>
                <div className="faq-a" style={{ maxHeight: open === i ? 320 : 0 }}>
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <p className="dim" style={{ marginBottom: 16 }}>
              Still curious? Take the guided tour — Darwin explains every setting in his own voice.
            </p>
            <a className="btn btn-primary" href="#dash">
              Ask Darwin anything
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
