"use client";

import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TfiAngleDoubleUp } from "react-icons/tfi";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const GoUpBtn = () => {
  const lenis = useLenis(); // Uzyskaj instancję Lenis

  useGSAP(() => {
    gsap.set(".goUp", { opacity: 0, x: 100, rotation: 0 });

    ScrollTrigger.create({
      trigger: ".header",
      start: "bottom top",
      end: "bottom top",
      onEnter: () => {
        gsap.to(".goUp", {
          opacity: 1,
          x: 0,
          rotation: 360,
          duration: 0.5,
          repeat: 0, // Upewnij się, że animacja nie powtarza się
        });
      },
      onLeaveBack: () => {
        gsap.to(".goUp", {
          opacity: 0,
          x: 100,
          rotation: 0,
          duration: 0.5,
          repeat: 0,
        });
      },
    });
  });

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault(); // Zapobiegaj domyślnemu działaniu linku
    lenis?.scrollTo(0, { duration: 3.5 }); // Płynne przewijanie do góry
  };

  return (
    <div className="goUp glassmorphism-goUpBtn group fixed bottom-5 right-5 z-50 cursor-pointer rounded-md opacity-0 mix-blend-difference shadow-2xl transition-colors hover:bg-secondBackground/90">
      <a
        href="#header"
        onClick={handleScrollToTop}
        className="block p-3 lg:p-4"
      >
        <TfiAngleDoubleUp size={25} />
      </a>
    </div>
  );
};

export default GoUpBtn;
