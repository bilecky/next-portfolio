import Stack from "../components/Stack";
import About from "../components/About";
import Contact from "../components/Contact/Contact";
import WaitForModel from "../components/WaitForModel";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects/Projects";

export default function Home() {
  return (
    <main className="main w-full overflow-hidden">
      <Hero />
      <div className="scroll-area">
        <Projects />
        <Stack />
      </div>
      <div className="scrolling-container pin relative min-h-screen w-full">
        <Contact />
        <About />
      </div>
    </main>
  );
}
