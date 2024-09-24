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

      gsap.set(cursorRef.current, {
        opacity: 1,
        x: x - cursorRef.current.offsetWidth / 2,
        y: y - cursorRef.current.offsetHeight / 2,
      });
      gsap.to(cursorRef.current, {
        x: x - cursorRef.current.offsetWidth / 2,
        y: y - cursorRef.current.offsetHeight / 2,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.05,
      });
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
