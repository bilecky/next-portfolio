// components/CursorFollower.tsx
"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const CursorFollower: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  useGSAP(() => {
    if (isTouchDevice || !cursorRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      const { clientX: x, clientY: y } = e;
      const xTo = gsap.quickTo(cursorRef.current, "x");
      const yTo = gsap.quickTo(cursorRef.current, "y");
      const opacityTo = gsap.quickTo(cursorRef.current, "opacity");

      opacityTo(1); // Ustawia przezroczystość na 1
      xTo(x - cursorRef.current.offsetWidth / 2); // Ustawia pozycję X
      yTo(y - cursorRef.current.offsetHeight / 2); // Ustawia pozycję Y
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null; // Ukryj kursor na urządzeniach dotykowych

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-14 w-14 items-center justify-center rounded-full border border-white opacity-0 mix-blend-difference md:flex"
    >
      <div className="h-1 w-1 rounded-full bg-white" /> {/* Kropka w środku */}
    </div>
  );
};

export default CursorFollower;
