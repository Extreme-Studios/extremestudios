import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OtherProjects from "@/components/OtherProjects";
import About from "@/components/About";
import Services from "@/components/Services";
import Programs from "@/components/Programs";
import DianaChat from "@/components/DianaChat";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <OtherProjects />
      <Programs />
      <Contact />
      <Footer />
      <DianaChat />
    </main>
  );
}
