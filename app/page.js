import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OtherProjects from "@/components/OtherProjects";
import About from "@/components/About";
import Programs from "@/components/Programs";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <OtherProjects />
      <Programs />
      <Contact />
      <Footer />
    </main>
  );
}
