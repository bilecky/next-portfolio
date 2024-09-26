"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type PageTransitionProps = {
  children: React.ReactNode;
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const transitionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(transitionRef.current, {
        duration: 1.5,
        y: "-100%",
        ease: "power2.inOut",
      });
    },
    { scope: transitionRef },
  );

  return (
    <div className="relative">
      <div
        ref={transitionRef}
        className="page-transition absolute inset-0 bg-background"
      />
      {children}
    </div>
  );
};

export default PageTransition;
