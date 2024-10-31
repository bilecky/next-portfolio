"use client";

import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TfiAngleDoubleUp } from "react-icons/tfi";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GoUpBtn = () => {
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

  return (
    <div className="goUp glassmorphism-goUpBtn group fixed bottom-5 right-5 z-50 cursor-pointer rounded-md opacity-0 mix-blend-difference shadow-2xl transition-colors hover:bg-secondBackground/90">
      <a href="#header" className="block p-3 lg:p-4">
        <TfiAngleDoubleUp size={25} />
      </a>
    </div>
  );
};

export default GoUpBtn;
