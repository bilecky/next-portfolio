"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { reuseHeaderLineAnimation } from "../../utils/ReusableGSAPAnimations";

type PageTransitionProps = {
  children: React.ReactNode;
};

gsap.registerPlugin(useGSAP);

const PageTransition = ({ children }: PageTransitionProps) => {
  const transitionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const pageTl = gsap.timeline();

    pageTl
      .set(".header", { opacity: 1, duration: 1 })

      .from(transitionRef.current, {
        duration: 2,
        yPercent: -100,
        ease: "power4.in",
      })
      .from(".logo", { opacity: 0, y: -50, duration: 0.4 })
      .from(".white-line", { scaleX: 0, duration: 0.5 })
      .from(".header-nav li", {
        opacity: 0,
        y: -50,
        duration: 0.4,
        stagger: 0.3,
        ease: "power2.out",
      })
      .to(
        {},
        {
          onStart: reuseHeaderLineAnimation,
        },
      );
  });

  return (
    <div className="relative">
      <div
        ref={transitionRef}
        className="page-transition absolute inset-0 bg-secondBackground dark:bg-background"
      />
      {children}
    </div>
  );
};

export default PageTransition;
