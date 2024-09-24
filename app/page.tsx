import Image from "next/image";
import Hero from "./components/Hero";
import Projects from "./components/Projects";

export default function Home() {
  return (
    <main className="container">
      <div className="scroll-area">
        <Hero />
        <Projects />
      </div>
    </main>
  );
}
