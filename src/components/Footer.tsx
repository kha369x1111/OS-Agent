import { useState } from "react";
import { ArrowUpRight, Check, Github, Instagram, Linkedin, Mail, Send, Youtube } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="footer">
      <div className="wrap">
        {/* CTA banner */}
        <div
          className="hud-panel"
          style={{
            padding: "32px 34px",
            display: "flex",
            gap: 22,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: 46,
            background:
              "linear-gradient(120deg, rgba(34,211,238,0.12), rgba(217,70,239,0.09) 62%, rgba(15,22,32,0.6))",
          }}
        >
          <div style={{ flex: "1 1 320px" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: "clamp(1.35rem,3vw,1.95rem)" }}>
              Ready to meet your assistant?
            </h3>
            <p className="dim" style={{ margin: 0, fontSize: "1.02rem" }}>
              Buy once, run it on your machine, and keep every update for good.
            </p>
          </div>
          <div style={{ display: "flex", gap: 11, flexWrap: "wrap" }}>
            <a className="btn btn-primary" href="#pricing">
              Get Darwin <ArrowUpRight size={17} />
            </a>
            <a className="btn btn-ghost" href="#dash">
              Try the live demo
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <a href="#top" className="brand" style={{ fontSize: 19 }}>
              <span className="glyph" />
              D<b>.</b>A<b>.</b>R<b>.</b>W<b>.</b>I<b>.</b>N<b>.</b>
            </a>
            <p className="dim" style={{ fontSize: 14.2, maxWidth: 330, marginTop: 15 }}>
              A real-life JARVIS for your desktop — private, local-first, and built to do real work.
              Buy once, own it for good.
            </p>

            {/* newsletter */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.trim()) return;
                setSent(true);
                setEmail("");
                window.setTimeout(() => setSent(false), 4200);
              }}
              style={{ display: "flex", gap: 8, marginTop: 20, maxWidth: 340, flexWrap: "wrap" }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                style={{
                  flex: "1 1 180px",
                  minWidth: 0,
                  background: "rgba(255,255,255,0.045)",
                  border: "1px solid var(--border)",
                  borderRadius: 11,
                  padding: "11px 14px",
                  color: "var(--text)",
                  fontSize: 13.5,
                  outline: "none",
                  fontFamily: "var(--font-sans)",
                }}
              />
              <button className="btn btn-primary" type="submit" style={{ padding: "11px 17px", fontSize: 13.5 }}>
                {sent ? <Check size={16} /> : <Send size={15} />}
                {sent ? "Joined" : "Updates"}
              </button>
            </form>
            {sent && (
              <p className="mono" style={{ fontSize: 11, color: "var(--cyan)", marginTop: 9 }}>
                &gt; you're on the list. welcome aboard.
              </p>
            )}

            <div style={{ display: "flex", gap: 9, marginTop: 20 }}>
              {[
                { icon: <Instagram size={16} />, label: "Instagram" },
                { icon: <Youtube size={16} />, label: "YouTube" },
                { icon: <Github size={16} />, label: "GitHub" },
                { icon: <Linkedin size={16} />, label: "LinkedIn" },
                { icon: <Mail size={16} />, label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    border: "1px solid var(--border2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--dim)",
                    background: "rgba(255,255,255,0.028)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4>Product</h4>
            <a href="#features">What it does</a>
            <a href="#memory">MyMemory</a>
            <a href="#voice">Darwin's voice</a>
            <a href="#brains">Brains &amp; models</a>
            <a href="#inside">The dashboard</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div>
            <h4>Resources</h4>
            <a href="#guides">Guides &amp; tutorials</a>
            <a href="#faq">FAQ</a>
            <a href="#dash">Live demo</a>
            <a href="#founder">From the founder</a>
            <a href="#why">Why Darwin</a>
            <a href="#privacy">Privacy</a>
          </div>

          <div>
            <h4>Company</h4>
            <a href="#top">About</a>
            <a href="#pricing">Buy Darwin</a>
            <a href="#faq">Support</a>
            <a href="#privacy">Security</a>
            <a href="#top">Terms of use</a>
            <a href="#top">Privacy policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} D.A.R.W.I.N. AI Assistant — all rights reserved.</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 9px #4ade80",
                }}
              />
              ALL SYSTEMS OPERATIONAL
            </span>
            <a href="#top" style={{ display: "inline-flex", padding: 0, color: "var(--dim2)" }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
