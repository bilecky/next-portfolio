import Image from "next/image";
import Hero from "./components/Hero";
import Projects from "./components/Projects/Projects";
import Tech from "./components/Tech";
import About from "./components/About";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="">
      <div className="scroll-area w-full overflow-hidden">
        <Hero />
        <Projects />
      </div>

      <div className="pinning-area">
        <Tech />
        <About />
        <Contact />
      </div>
    </main>
  );
}
