import Stack from "../components/Stack";
import About from "../components/About";
import Contact from "../components/Contact/Contact";
import WaitForModel from "../components/WaitForModel";

export default function Home() {
  return (
    <main className="main w-full overflow-hidden">
      <WaitForModel />

      <Stack />
      <div className="scrolling-container pin relative min-h-screen w-full">
        <Contact />
        <About />
      </div>
    </main>
  );
}
