import Contact from "@/components/Contact";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import OtherProjects from "@/components/OtherProjects";
import Philosophy from "@/components/Philosophy";
import Positioning from "@/components/Positioning";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Featured />
      <OtherProjects />
      <Positioning />
      <Philosophy />
      <Contact />
    </main>
  );
}
