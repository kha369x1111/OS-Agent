import PlexusBackground from "./components/PlexusBackground";
import HudFrame from "./components/HudFrame";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyDarwin from "./components/WhyDarwin";
import WhoItsFor from "./components/WhoItsFor";
import Dashboard from "./components/Dashboard";
import Founder from "./components/Founder";
import MemorySection from "./components/MemorySection";
import FeaturesSection from "./components/FeaturesSection";
import Brains from "./components/Brains";
import VoiceSection from "./components/VoiceSection";
import PeekInside from "./components/PeekInside";
import PrivacySection from "./components/PrivacySection";
import PricingSection from "./components/PricingSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#070b11",
        color: "#e8f0f7",
      }}
    >
      <PlexusBackground />
      <HudFrame />

      <div className="shell">
        <Navbar />
        <main>
          <Hero />
          <WhyDarwin />
          <WhoItsFor />
          <Dashboard />
          <Founder />
          <MemorySection />
          <FeaturesSection />
          <Brains />
          <VoiceSection />
          <PeekInside />
          <PrivacySection />
          <PricingSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
