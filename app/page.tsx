import Tech from "./components/Tech";
import About from "./components/About";
import Contact from "./components/Contact/Contact";
import WaitForModel from "./components/WaitForModel";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <WaitForModel />
      <div className="tech-wrapper">
        <Tech />
        <div className="wrapper absolute h-screen w-full">
          <div className="overlap relative grid h-full w-full grid-cols-1 grid-rows-1 place-items-center gap-0">
            <About />
            <Contact />
          </div>
        </div>
      </div>
    </main>
  );
}
