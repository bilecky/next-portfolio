"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { reuseHeaderLineAnimation } from "../../utils/ReusableGSAPAnimations";
import { blockScroll } from "@/app/utils/helperFunctions";

type PageTransitionProps = {
  children: React.ReactNode;
};

gsap.registerPlugin(useGSAP);

const PageTransition = ({ children }: PageTransitionProps) => {
  const transitionRef = useRef<HTMLDivElement | null>(null);
  const [blockInitialScroll, setBlockInitialScroll] = useState<boolean>(true);
  const sectionWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (blockInitialScroll && sectionWrapperRef.current) {
      blockScroll(true);
      sectionWrapperRef.current.style.pointerEvents = "none";
    } else {
      blockScroll(false);
      if (sectionWrapperRef.current)
        sectionWrapperRef.current.style.pointerEvents = "auto";
    }
  }, [blockInitialScroll]);

  useGSAP(() => {
    const pageTl = gsap.timeline({
      onComplete: () => {
        setBlockInitialScroll(false);
      },
    });

    pageTl
      .set(".header", { opacity: 1, duration: 1 })

      .from(transitionRef.current, {
        delay: 0.1,
        duration: 1.5,
        yPercent: -100,
        ease: "power4.inOut",
      })

      .from(".logo", { opacity: 0, y: -50, duration: 0.3 })
      .from(".white-line", { scaleX: 0, duration: 0.3 })
      .from(".header-nav li", {
        opacity: 0,
        y: -50,
        duration: 0.3,
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
    <div
      ref={sectionWrapperRef}
      className="section_wrapper relative bg-secondBackground dark:bg-background"
    >
      <div className="white-overlay opacity-1 absolute left-0 top-0 h-screen w-full bg-background dark:bg-secondBackground"></div>
      <div
        ref={transitionRef}
        className="page-transition absolute left-0 top-0 h-screen w-full bg-secondBackground dark:bg-background"
      />
      {children}
    </div>
  );
};

export default PageTransition;
