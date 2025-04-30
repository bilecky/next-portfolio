"use client";

import Hero from "@/components/Hero";
import Projects from "@/components/Projects/Projects";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useGSAP } from "@gsap/react";
import { useTheme } from "@/context/ThemeProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WaitForModel = () => {
  const [isIntroComplete, setIsIntroComplete] = useState<boolean>(false);
  const lenis = useLenis();
  const { theme } = useTheme();

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

  useGSAP(
    () => {
      const bgColor = theme === "dark" ? "#222222" : "#FBFCF8";
      const endColor = theme === "dark" ? "#FBFCF8" : "#a6aba5";
      const bgArea = gsap.timeline({
        scrollTrigger: {
          id: "bgScrollTrigger",
          trigger: ".scroll-area",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });

      if (!isIntroComplete) return;

      bgArea.fromTo(
        [".main", ".black-overlay"],
        { backgroundColor: bgColor },
        { backgroundColor: endColor, overwrite: "auto", ease: "power3.inOut" },
      );
    },
    { dependencies: [theme, isIntroComplete], revertOnUpdate: true },
  );

  return (
    <div className="scroll-area relative">
      <Hero setIntroComplete={setIsIntroComplete} />
      <Projects isIntroComplete={isIntroComplete} />
    </div>
  );
};

export default WaitForModel;
