"use client";
import React, { useRef, useEffect, PropsWithChildren } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import gsap from "gsap";

const Lenis = ({ children }: PropsWithChildren) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000); // Synchronizacja z GSAP
    }

    gsap.ticker.add(update); // Dodanie Lenis do GSAP ticker
    return () => {
      gsap.ticker.remove(update); // Usunięcie po odmontowaniu
    };
  }, []);

  return (
    <ReactLenis ref={lenisRef} autoRaf={false} options={{ duration: 3 }} root>
      {children}
    </ReactLenis>
  );
};

export default Lenis;
