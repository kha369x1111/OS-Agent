import {
  ArrowRight,
  Check,
  CloudOff,
  KeyRound,
  Lock,
  Mic,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import OrbCanvas from "./OrbCanvas";

const fade: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.12 * i },
  }),
};

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
      <div className="hero-tint" />

      <div className="wrap hero-inner">
        {/* Orb + reticle */}
        <motion.div
          className="orb-stage"
          initial={{ opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg className="reticle" viewBox="0 0 400 400" fill="none" aria-hidden="true">
            <g className="spin-slow" stroke="rgba(34,211,238,0.34)" strokeWidth="1">
              <circle cx="200" cy="200" r="182" strokeDasharray="7 13" />
              <circle cx="200" cy="200" r="160" stroke="rgba(217,70,239,0.18)" strokeDasharray="30 22" />
            </g>
            <g className="spin-rev" stroke="rgba(34,211,238,0.5)" strokeWidth="1.2">
              <circle cx="200" cy="200" r="138" strokeDasharray="2 9" />
              <path d="M200 42 L212 66 L188 66 Z" fill="rgba(34,211,238,0.5)" stroke="none" />
              <path d="M200 358 L212 334 L188 334 Z" fill="rgba(217,70,239,0.5)" stroke="none" />
            </g>
            <g className="spin-fast" stroke="rgba(125,211,252,0.42)" strokeWidth="1">
              <circle cx="200" cy="200" r="112" strokeDasharray="1 6" />
            </g>
            {/* tick marks */}
            <g stroke="rgba(34,211,238,0.42)" strokeWidth="1.4">
              <line x1="200" y1="12" x2="200" y2="30" />
              <line x1="200" y1="370" x2="200" y2="388" />
              <line x1="12" y1="200" x2="30" y2="200" />
              <line x1="370" y1="200" x2="388" y2="200" />
            </g>
          </svg>

          <OrbCanvas />
        </motion.div>

        <motion.span
          className="eyebrow"
          style={{ marginTop: 30 }}
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="pulse-dot" /> Tactical operations interface
        </motion.span>

        <motion.h1 variants={fade} initial="hidden" animate="visible" custom={1}>
          Your AI assistant,
          <br />
          <span className="accent-text">on your desktop.</span>
        </motion.h1>

        <motion.p className="lead" variants={fade} initial="hidden" animate="visible" custom={2}>
          You're the boss — just tell Darwin what you need, and it gets done. Spin up your own team of
          AI agents, hand them the work, and simply talk. No menus, no learning curve.
        </motion.p>

        <motion.div className="hero-cta" variants={fade} initial="hidden" animate="visible" custom={3}>
          <a className="btn btn-primary" href="#pricing">
            Get Darwin <ArrowRight size={17} />
          </a>
          <a className="btn btn-ghost" href="#dash">
            See it work <Sparkles size={16} />
          </a>
        </motion.div>

        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={4}
          style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}
        >
          <span className="badge" style={{ borderColor: "rgba(34,211,238,0.34)", color: "#a5f3fc" }}>
            <Zap size={14} /> Always improving
          </span>
          <span className="dim" style={{ fontSize: 13, alignSelf: "center" }}>
            · new updates are built in — pull them whenever
          </span>
        </motion.div>

        <motion.p
          className="mono"
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={5}
          style={{ marginTop: 16, fontSize: 13, letterSpacing: "0.6px", color: "var(--dim)" }}
        >
          Buy once <span style={{ color: "var(--cyan)" }}>·</span> no subscription to us{" "}
          <span style={{ color: "var(--cyan)" }}>·</span> runs on your machine
        </motion.p>

        <motion.div className="hero-badges" variants={fade} initial="hidden" animate="visible" custom={6}>
          <span className="badge">
            <Lock size={15} /> Private — runs locally
          </span>
          <span className="badge">
            <KeyRound size={15} /> Bring your own keys
          </span>
          <span className="badge">
            <CloudOff size={15} /> Works offline
          </span>
          <span className="badge">
            <Mic size={15} /> Hands-free voice
          </span>
          <span className="badge">
            <ShieldCheck size={15} /> Free updates for life
          </span>
        </motion.div>

        {/* trust strip */}
        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          custom={7}
          className="marquee-mask"
          style={{ marginTop: 54 }}
        >
          <div className="marquee-track mono" style={{ fontSize: 11.5, letterSpacing: 2.4 }}>
            {[0, 1].map((k) => (
              <div key={k} style={{ display: "flex", gap: 46 }}>
                {[
                  "LOCAL-FIRST ARCHITECTURE",
                  "CLAUDE · GPT · LOCAL MODELS",
                  "ELEVENLABS VOICE",
                  "PLAIN-FILE MEMORY",
                  "AGENT TEAMS",
                  "ZERO TELEMETRY",
                  "WORKS OFFLINE",
                  "BUILT FOR REAL WORK",
                ].map((item) => (
                  <span key={item} style={{ color: "rgba(232,240,247,0.34)", display: "flex", alignItems: "center", gap: 46 }}>
                    {item}
                    <Check size={12} style={{ color: "var(--cyan)" }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
