import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import CinematicJourney from "@/components/CinematicJourney";
import DianaChat from "@/components/DianaChat";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CinematicJourney />
      <Contact />
      <Footer />
      <DianaChat />
    </main>
  );
}
