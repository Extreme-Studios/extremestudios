import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OtherProjects from "@/components/OtherProjects";
import Training from "@/components/Training";
import Services from "@/components/Services";
import About from "@/components/About";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Training />
      <Services />
      <OtherProjects />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
