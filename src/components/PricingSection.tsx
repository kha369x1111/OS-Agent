import { useState } from "react";
import { Check, Infinity as InfinityIcon, LifeBuoy, Sparkles, Star, Zap } from "lucide-react";
import Reveal from "./Reveal";

const tiers = [
  {
    name: "Starter",
    price: "€149",
    suffix: "one-time",
    tagline: "Everything you need to meet Darwin.",
    features: [
      "Darwin desktop app",
      "Your own API key support",
      "Local brain included",
      "Voice control & wake word",
      "1 agent seat",
      "Free updates for 12 months",
    ],
    cta: "Start with Starter",
    featured: false,
  },
  {
    name: "Pro",
    price: "€249",
    suffix: "one-time",
    tagline: "The full team, the full memory, forever.",
    features: [
      "Everything in Starter",
      "Unlimited agent teams",
      "Advanced MyMemory graph",
      "Flat-rate brain support",
      "Priority feature requests",
      "Free updates for life",
      "Custom voices & themes",
      "Family / study mode",
    ],
    cta: "Get Pro",
    featured: true,
  },
  {
    name: "Studio",
    price: "€449",
    suffix: "one-time",
    tagline: "For teams that run on Darwin.",
    features: [
      "Everything in Pro",
      "5 seats included",
      "Shared team memory",
      "Admin & policy controls",
      "Onboarding session",
      "Direct support channel",
      "Free updates for life",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export default function PricingSection() {
  const [billing, setBilling] = useState<"once" | "early">("once");

  return (
    <section id="pricing">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <span className="eyebrow">
              <Sparkles size={13} /> Pricing
            </span>
            <h2>
              Buy once. <span className="accent-text">Own it for good.</span>
            </h2>
            <p>
              No subscription to us, no seat that disappears when you stop paying. The price grows
              as features grow — so the earlier you join, the lower your price stays.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
            <div
              style={{
                display: "inline-flex",
                gap: 5,
                padding: 5,
                borderRadius: 99,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {(
                [
                  { id: "once", label: "One-time price" },
                  { id: "early", label: "Early-launch price" },
                ] as const
              ).map((o) => (
                <button
                  key={o.id}
                  onClick={() => setBilling(o.id)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 99,
                    border: 0,
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13.5,
                    fontWeight: 600,
                    background: billing === o.id ? "var(--cyan)" : "transparent",
                    color: billing === o.id ? "#06121a" : "var(--dim)",
                    transition: "all .22s",
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(262px, 1fr))", gap: 18, alignItems: "stretch" }}>
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <div className={`tier ${t.featured ? "featured" : ""}`} style={{ height: "100%" }}>
                {t.featured && <span className="tier-badge">Most popular</span>}

                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 11,
                      background: t.featured ? "rgba(34,211,238,0.16)" : "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: t.featured ? "var(--cyan)" : "var(--dim)",
                    }}
                  >
                    {t.featured ? <Star size={16} /> : t.name === "Starter" ? <Zap size={16} /> : <LifeBuoy size={16} />}
                  </span>
                  <h3 style={{ margin: 0, fontSize: "1.14rem" }}>{t.name}</h3>
                </div>

                <div className="price" style={{ marginTop: 15 }}>
                  {billing === "early" && t.featured ? "€199" : t.price}
                  <small> {t.suffix}</small>
                </div>
                <p style={{ color: "var(--dim)", fontSize: "0.925rem", margin: "9px 0 4px" }}>{t.tagline}</p>

                <ul className="tick-list" style={{ marginTop: 12, marginBottom: 22 }}>
                  {t.features.map((f) => (
                    <li key={f} style={{ padding: "6px 0 6px 28px", fontSize: "0.915rem" }}>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  className={`btn ${t.featured ? "btn-primary" : "btn-ghost"} block`}
                  href="#pricing"
                  style={{ marginTop: "auto" }}
                >
                  {t.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div
            className="hud-panel"
            style={{
              marginTop: 30,
              padding: "24px 28px",
              display: "flex",
              gap: 20,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div style={{ flex: "1 1 360px", display: "flex", gap: 15, alignItems: "flex-start" }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  borderRadius: 13,
                  background: "rgba(34,211,238,0.12)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--cyan)",
                }}
              >
                <InfinityIcon size={21} />
              </span>
              <div>
                <div className="hud-h" style={{ marginBottom: 6 }}>
                  The early-launch guarantee
                </div>
                <p style={{ margin: 0, color: "#cdd7e1", fontSize: "0.995rem" }}>
                  Buy once and every future update is free. Once you've bought, nothing ever changes
                  for you — we just can't promise the same offer stays open for future buyers.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {["30-day money-back", "No auto-renewal", "Instant download"].map((g) => (
                <div key={g} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.8 }}>
                  <Check size={15} style={{ color: "var(--cyan)" }} />
                  <span className="dim">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
