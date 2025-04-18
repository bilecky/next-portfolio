"use client";

import Hero from "@/app/components/Hero";
import Projects from "@/app/components/Projects/Projects";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const WaitForModel = () => {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      requestAnimationFrame(() => {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
      });
    }
  }, [lenis]);

  return (
    <div className="scroll-area relative">
      <Hero setIntroComplete={setIsIntroComplete} />
      <Projects isIntroComplete={isIntroComplete} />
    </div>
  );
};

export default WaitForModel;
