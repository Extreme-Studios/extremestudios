import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OtherProjects from "@/components/OtherProjects";
import Services from "@/components/Services";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Capabilities from "@/components/Capabilities";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <OtherProjects />
      <Programs />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}
