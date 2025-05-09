import Stack from "../components/Stack";
import About from "../components/About";
import Contact from "../components/Contact/Contact";
import WaitForModel from "../components/WaitForModel";

export default function Home() {
  return (
    <main className="main w-full overflow-hidden">
      <WaitForModel />
      <div className="tech-wrapper">
        <Stack />
        <div className="wrapper absolute h-screen w-full will-change-transform">
          <div className="overlap grid h-full w-full grid-cols-1 grid-rows-1 place-items-center">
            <About />
            <Contact />
          </div>
        </div>
      </div>
    </main>
  );
}
{
  /* <div className="tech-wrapper will-change-transform">
{/* <Tech /> */
}
{
  /* <div className="tech h-screen w-full bg-red-500 py-28"></div>
<div className="wrapper h-screen w-full">
<div className="overlap h-full w-full grid grid-cols-1 grid-rows-1 place-items-center">
<About />
<Contact />
</div>
</div> */
}
