import Image from "next/image";
import Hero from "./components/Hero";
import Projects from "./components/Projects/Projects";
import Tech from "./components/Tech";
import About from "./components/About";
import Contact from "./components/Contact";
import Lenis from "./utils/Lenis";

export default function Home() {
  return (
    // <Lenis>
    <main className="w-full overflow-hidden">
      <div className="scroll-area relative">
        <Hero />
        <Projects />
      </div>
      <div className="tech-wrapper relative">
        <Tech />
        <div className="wrapper absolute h-screen w-full">
          <div className="overlap relative grid h-full w-full grid-cols-1 grid-rows-1 place-items-center gap-0">
            <About />
            <Contact />
          </div>
        </div>
      </div>
    </main>
    // </Lenis>
  );
}
