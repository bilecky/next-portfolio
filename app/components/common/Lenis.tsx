"use client";
import React, { useRef, useEffect, PropsWithChildren } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";

const Lenis = ({ children }: PropsWithChildren) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis ref={lenisRef} autoRaf={false} options={{ duration: 3 }} root>
      {children}
    </ReactLenis>
  );
};

export default Lenis;
