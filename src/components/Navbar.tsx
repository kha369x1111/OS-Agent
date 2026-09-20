import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Ask Darwin", href: "#dash", cls: "" },
  { label: "What it does", href: "#features", cls: "hide-md" },
  { label: "Memory", href: "#memory", cls: "hide-md" },
  { label: "Privacy", href: "#privacy", cls: "hide-sm" },
  { label: "Voice", href: "#voice", cls: "hide-sm" },
  { label: "Pricing", href: "#pricing", cls: "" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 26);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap">
        <div className="nav-inner">
          <a href="#top" className="brand" aria-label="Darwin home">
            <span className="glyph" />
            D<b>.</b>A<b>.</b>R<b>.</b>W<b>.</b>I<b>.</b>N<b>.</b>
            <span className="brand-sub">AI Assistant</span>
          </a>

          <nav className="nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href} className={l.cls}>
                {l.label}
              </a>
            ))}
            <a className="btn btn-primary" href="#pricing" style={{ padding: "9px 19px", fontSize: 14 }}>
              Buy
            </a>
          </nav>

          <button
            className="mobile-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <div className="mobile-menu-inner">
          {[...links, { label: "Guides", href: "#guides", cls: "" }].map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="btn btn-primary"
            style={{ marginTop: 14 }}
          >
            Get Darwin
          </a>
        </div>
      </div>
    </header>
  );
}
