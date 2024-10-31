import Hero from "./components/Hero";
import Projects from "./components/Projects/Projects";
import Tech from "./components/Tech";
import About from "./components/About";
import Contact from "./components/Contact/Contact";
import { Suspense } from "react";
import WaitForModel from "./utils/helpers/WaitForModel";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <div className="scroll-area relative">
        {/* <Hero />
        <Projects /> */}
        <WaitForModel />
      </div>
      <div className="tech-wrapper sticky">
        <Tech />
        <div className="wrapper absolute h-screen w-full">
          <div className="overlap relative grid h-full w-full grid-cols-1 grid-rows-1 place-items-center gap-0">
            <About />

            <Suspense fallback={<p>Loading...</p>}>
              {/* @ts-expect-error Server Component */}
              <Contact />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
