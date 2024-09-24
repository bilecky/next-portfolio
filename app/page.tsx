import Image from "next/image";
import Hero from "./components/Hero";
import Projects from "./components/Projects/Projects";
import Tech from "./components/Tech";

export default function Home() {
  return (
    <main className="">
      <div className="scroll-area container">
        <Hero />
        <Projects />
      </div>
      <Tech />
    </main>
  );
}
