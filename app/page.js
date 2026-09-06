import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import CinematicJourney from "@/components/CinematicJourney";
import DianaChat from "@/components/DianaChat";
import GlobalParticleField from "@/components/GlobalParticleField";

export default function Home() {
  return (
    <main className="home-particle-world">
      <GlobalParticleField />
      <Navbar />
      <Hero />
      <CinematicJourney />
      <Contact />
      <Footer />
      <DianaChat />
    </main>
  );
}
